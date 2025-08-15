/**
 * @fileoverview Testes unitários para o módulo CryptoManager
 */

const CryptoManager = require('../src/crypto');

describe('CryptoManager', () => {
  describe('deriveKeyPBKDF2', () => {
    it('should derive a valid key from password and salt', () => {
      const password = 'testPassword123';
      const salt = Buffer.from('testSalt', 'utf8');
      
      const key = CryptoManager.deriveKeyPBKDF2(password, salt);
      
      expect(key).toBeInstanceOf(Buffer);
      expect(key.length).toBe(32);
    });

    it('should throw error for empty password', () => {
      expect(() => {
        CryptoManager.deriveKeyPBKDF2('', 'salt');
      }).toThrow('Password deve ser uma string não vazia');
    });

    it('should throw error for null password', () => {
      expect(() => {
        CryptoManager.deriveKeyPBKDF2(null, 'salt');
      }).toThrow('Password deve ser uma string não vazia');
    });

    it('should throw error for undefined password', () => {
      expect(() => {
        CryptoManager.deriveKeyPBKDF2(undefined, 'salt');
      }).toThrow('Password deve ser uma string não vazia');
    });

    it('should throw error for missing salt', () => {
      expect(() => {
        CryptoManager.deriveKeyPBKDF2('password', null);
      }).toThrow('Salt é obrigatório');
    });

    it('should work with string salt', () => {
      const password = 'testPassword123';
      const salt = 'testSalt';
      
      const key = CryptoManager.deriveKeyPBKDF2(password, salt);
      
      expect(key).toBeInstanceOf(Buffer);
      expect(key.length).toBe(32);
    });

    it('should work with custom parameters', () => {
      const password = 'testPassword123';
      const salt = Buffer.from('testSalt', 'utf8');
      
      const key = CryptoManager.deriveKeyPBKDF2(password, salt, 5000, 64, 'sha512');
      
      expect(key).toBeInstanceOf(Buffer);
      expect(key.length).toBe(64);
    });
  });

  describe('encryptPassword', () => {
    let testKey;

    beforeEach(() => {
      testKey = CryptoManager.generateRandomKey(32);
    });

    it('should encrypt password successfully', () => {
      const password = 'testPassword123';
      
      const result = CryptoManager.encryptPassword(password, testKey);
      
      expect(result).toHaveProperty('encryptedPassword');
      expect(result).toHaveProperty('iv');
      expect(result).toHaveProperty('encryptedHex');
      expect(result.encryptedPassword).toBeInstanceOf(Buffer);
      expect(result.iv).toBeInstanceOf(Buffer);
      expect(result.iv.length).toBe(16);
      expect(result.encryptedHex).toBe(result.encryptedPassword.toString('hex'));
    });

    it('should throw error for empty password', () => {
      expect(() => {
        CryptoManager.encryptPassword('', testKey);
      }).toThrow('Password deve ser uma string não vazia');
    });

    it('should throw error for invalid key length', () => {
      const invalidKey = Buffer.alloc(16); // 16 bytes instead of 32
      
      expect(() => {
        CryptoManager.encryptPassword('password', invalidKey);
      }).toThrow('Chave deve ser um Buffer de 32 bytes');
    });

    it('should generate different IVs for same password', () => {
      const password = 'testPassword123';
      
      const result1 = CryptoManager.encryptPassword(password, testKey);
      const result2 = CryptoManager.encryptPassword(password, testKey);
      
      expect(result1.iv).not.toEqual(result2.iv);
      expect(result1.encryptedHex).not.toEqual(result2.encryptedHex);
    });
  });

  describe('decryptPassword', () => {
    let testKey;
    let testIV;
    let testEncryptedPassword;

    beforeEach(() => {
      testKey = CryptoManager.generateRandomKey(32);
      testIV = CryptoManager.generateRandomKey(16);
      testEncryptedPassword = Buffer.from('test encrypted data', 'utf8');
    });

    it('should decrypt password successfully', () => {
      // First encrypt
      const password = 'testPassword123';
      const encryptionResult = CryptoManager.encryptPassword(password, testKey);
      
      // Then decrypt
      const decryptedPassword = CryptoManager.decryptPassword(
        encryptionResult.encryptedPassword,
        testKey,
        encryptionResult.iv
      );
      
      expect(decryptedPassword).toBe(password);
    });

    it('should throw error for invalid encrypted password', () => {
      expect(() => {
        CryptoManager.decryptPassword('invalid', testKey, testIV);
      }).toThrow('Senha criptografada deve ser um Buffer');
    });

    it('should throw error for invalid key length', () => {
      const invalidKey = Buffer.alloc(16);
      
      expect(() => {
        CryptoManager.decryptPassword(testEncryptedPassword, invalidKey, testIV);
      }).toThrow('Chave deve ser um Buffer de 32 bytes');
    });

    it('should throw error for invalid IV length', () => {
      const invalidIV = Buffer.alloc(8);
      
      expect(() => {
        CryptoManager.decryptPassword(testEncryptedPassword, testKey, invalidIV);
      }).toThrow('IV deve ser um Buffer de 16 bytes');
    });
  });

  describe('generateSalt', () => {
    it('should generate salt with default length', () => {
      const salt = CryptoManager.generateSalt();
      
      expect(salt).toBeInstanceOf(Buffer);
      expect(salt.length).toBe(16);
    });

    it('should generate salt with custom length', () => {
      const salt = CryptoManager.generateSalt(32);
      
      expect(salt).toBeInstanceOf(Buffer);
      expect(salt.length).toBe(32);
    });

    it('should generate different salts each time', () => {
      const salt1 = CryptoManager.generateSalt();
      const salt2 = CryptoManager.generateSalt();
      
      expect(salt1).not.toEqual(salt2);
    });
  });

  describe('generateRandomKey', () => {
    it('should generate key with default length', () => {
      const key = CryptoManager.generateRandomKey();
      
      expect(key).toBeInstanceOf(Buffer);
      expect(key.length).toBe(32);
    });

    it('should generate key with custom length', () => {
      const key = CryptoManager.generateRandomKey(64);
      
      expect(key).toBeInstanceOf(Buffer);
      expect(key.length).toBe(64);
    });

    it('should generate different keys each time', () => {
      const key1 = CryptoManager.generateRandomKey();
      const key2 = CryptoManager.generateRandomKey();
      
      expect(key1).not.toEqual(key2);
    });
  });

  describe('saveEncryptedKeyAndIV and readEncryptedKeyAndIV', () => {
    let testKey;
    let testIV;
    const testFilename = 'test_key_iv.txt';

    beforeEach(() => {
      testKey = CryptoManager.generateRandomKey(32);
      testIV = CryptoManager.generateRandomKey(16);
    });

    afterEach(() => {
      // Clean up test file
      if (require('fs').existsSync(testFilename)) {
        require('fs').unlinkSync(testFilename);
      }
    });

    it('should save and read encrypted key and IV', () => {
      // Save
      CryptoManager.saveEncryptedKeyAndIV(testKey, testIV, testFilename);
      
      // Verify file exists
      expect(require('fs').existsSync(testFilename)).toBe(true);
      
      // Read back
      const readIV = CryptoManager.readEncryptedKeyAndIV(testKey, testFilename);
      
      expect(readIV).toEqual(testIV);
    });

    it('should throw error for invalid key length when saving', () => {
      const invalidKey = Buffer.alloc(16);
      
      expect(() => {
        CryptoManager.saveEncryptedKeyAndIV(invalidKey, testIV, testFilename);
      }).toThrow('Chave deve ser um Buffer de 32 bytes');
    });

    it('should throw error for invalid IV length when saving', () => {
      const invalidIV = Buffer.alloc(8);
      
      expect(() => {
        CryptoManager.saveEncryptedKeyAndIV(testKey, invalidIV, testFilename);
      }).toThrow('IV deve ser um Buffer de 16 bytes');
    });

    it('should throw error for invalid filename when saving', () => {
      expect(() => {
        CryptoManager.saveEncryptedKeyAndIV(testKey, testIV, '');
      }).toThrow('Nome do arquivo deve ser uma string válida');
    });

    it('should throw error for non-existent file when reading', () => {
      expect(() => {
        CryptoManager.readEncryptedKeyAndIV(testKey, 'non_existent_file.txt');
      }).toThrow('Arquivo non_existent_file.txt não encontrado');
    });
  });
});
