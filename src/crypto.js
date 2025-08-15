/**
 * @fileoverview Módulo de criptografia para gerenciamento seguro de senhas
 * @author Seu Nome
 * @version 1.0.0
 */

const crypto = require('crypto');
const fs = require('fs');

/**
 * Classe para operações de criptografia
 */
class CryptoManager {
  /**
   * Deriva uma chave criptográfica usando PBKDF2
   * @param {string} password - Senha em texto plano
   * @param {Buffer|string} salt - Salt para derivação da chave
   * @param {number} iterations - Número de iterações (padrão: 10000)
   * @param {number} keyLength - Tamanho da chave em bytes (padrão: 32)
   * @param {string} digest - Algoritmo de hash (padrão: 'sha256')
   * @returns {Buffer} Chave derivada
   * @throws {Error} Se os parâmetros forem inválidos
   */
  static deriveKeyPBKDF2(password, salt, iterations = 10000, keyLength = 32, digest = 'sha256') {
    try {
      if (!password || typeof password !== 'string') {
        throw new Error('Password deve ser uma string não vazia');
      }
      
      if (!salt) {
        throw new Error('Salt é obrigatório');
      }

      const saltBuffer = Buffer.isBuffer(salt) ? salt : Buffer.from(salt, 'utf8');
      
      return crypto.pbkdf2Sync(password, saltBuffer, iterations, keyLength, digest);
    } catch (error) {
      throw new Error(`Erro na derivação da chave: ${error.message}`);
    }
  }

  /**
   * Criptografa uma senha usando AES-256-CBC
   * @param {string} password - Senha em texto plano
   * @param {Buffer} key - Chave de criptografia
   * @returns {Object} Objeto com senha criptografada e IV
   * @throws {Error} Se os parâmetros forem inválidos
   */
  static encryptPassword(password, key) {
    try {
      if (!password || typeof password !== 'string') {
        throw new Error('Password deve ser uma string não vazia');
      }
      
      if (!Buffer.isBuffer(key) || key.length !== 32) {
        throw new Error('Chave deve ser um Buffer de 32 bytes');
      }

      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

      const encryptedPassword = Buffer.concat([
        cipher.update(password, 'utf8'),
        cipher.final()
      ]);

      return {
        encryptedPassword,
        iv,
        encryptedHex: encryptedPassword.toString('hex')
      };
    } catch (error) {
      throw new Error(`Erro na criptografia da senha: ${error.message}`);
    }
  }

  /**
   * Descriptografa uma senha usando AES-256-CBC
   * @param {Buffer} encryptedPassword - Senha criptografada
   * @param {Buffer} key - Chave de descriptografia
   * @param {Buffer} iv - Vetor de inicialização
   * @returns {string} Senha descriptografada
   * @throws {Error} Se os parâmetros forem inválidos
   */
  static decryptPassword(encryptedPassword, key, iv) {
    try {
      if (!Buffer.isBuffer(encryptedPassword)) {
        throw new Error('Senha criptografada deve ser um Buffer');
      }
      
      if (!Buffer.isBuffer(key) || key.length !== 32) {
        throw new Error('Chave deve ser um Buffer de 32 bytes');
      }
      
      if (!Buffer.isBuffer(iv) || iv.length !== 16) {
        throw new Error('IV deve ser um Buffer de 16 bytes');
      }

      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      
      const decryptedPassword = Buffer.concat([
        decipher.update(encryptedPassword),
        decipher.final()
      ]);

      return decryptedPassword.toString('utf8');
    } catch (error) {
      throw new Error(`Erro na descriptografia da senha: ${error.message}`);
    }
  }

  /**
   * Salva chave e IV criptografados em arquivo
   * @param {Buffer} key - Chave para criptografar o IV
   * @param {Buffer} iv - Vetor de inicialização
   * @param {string} filename - Nome do arquivo de saída
   * @throws {Error} Se houver erro na escrita do arquivo
   */
  static saveEncryptedKeyAndIV(key, iv, filename) {
    try {
      if (!Buffer.isBuffer(key) || key.length !== 32) {
        throw new Error('Chave deve ser um Buffer de 32 bytes');
      }
      
      if (!Buffer.isBuffer(iv) || iv.length !== 16) {
        throw new Error('IV deve ser um Buffer de 16 bytes');
      }
      
      if (!filename || typeof filename !== 'string') {
        throw new Error('Nome do arquivo deve ser uma string válida');
      }

      // Criptografa o IV usando a chave (modo ECB para simplicidade)
      const cipher = crypto.createCipheriv('aes-256-ecb', key, Buffer.alloc(0));
      const encryptedData = Buffer.concat([cipher.update(iv), cipher.final()]);
      
      fs.writeFileSync(filename, encryptedData);
    } catch (error) {
      throw new Error(`Erro ao salvar chave e IV: ${error.message}`);
    }
  }

  /**
   * Lê chave e IV criptografados do arquivo
   * @param {Buffer} key - Chave para descriptografar o IV
   * @param {string} filename - Nome do arquivo de entrada
   * @returns {Buffer} IV descriptografado
   * @throws {Error} Se houver erro na leitura do arquivo
   */
  static readEncryptedKeyAndIV(key, filename) {
    try {
      if (!Buffer.isBuffer(key) || key.length !== 32) {
        throw new Error('Chave deve ser um Buffer de 32 bytes');
      }
      
      if (!filename || typeof filename !== 'string') {
        throw new Error('Nome do arquivo deve ser uma string válida');
      }

      if (!fs.existsSync(filename)) {
        throw new Error(`Arquivo ${filename} não encontrado`);
      }

      const encryptedData = fs.readFileSync(filename);
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, Buffer.alloc(0));
      
      const iv = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
      
      if (iv.length !== 16) {
        throw new Error('IV inválido - tamanho incorreto');
      }
      
      return iv;
    } catch (error) {
      throw new Error(`Erro ao ler chave e IV: ${error.message}`);
    }
  }

  /**
   * Gera um salt aleatório
   * @param {number} length - Tamanho do salt em bytes (padrão: 16)
   * @returns {Buffer} Salt aleatório
   */
  static generateSalt(length = 16) {
    return crypto.randomBytes(length);
  }

  /**
   * Gera uma chave aleatória
   * @param {number} length - Tamanho da chave em bytes (padrão: 32)
   * @returns {Buffer} Chave aleatória
   */
  static generateRandomKey(length = 32) {
    return crypto.randomBytes(length);
  }
}

module.exports = CryptoManager;
