/**
 * @fileoverview Arquivo principal do sistema de criptografia
 * @author Seu Nome
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const CryptoManager = require('./crypto');
const CLI = require('./cli');

/**
 * Classe principal do sistema de criptografia
 */
class CryptoSystem {
  constructor() {
    this.cli = new CLI();
  }

  /**
   * Executa o fluxo principal de criptografia
   */
  async run() {
    try {
      this.cli.initialize();
      this.cli.displayProjectInfo();

      // Verifica argumentos da linha de comando
      const args = process.argv.slice(2);
      
      if (args.includes('--help') || args.includes('-h')) {
        this.cli.displayHelp();
        return;
      }

      if (args.includes('--decrypt') || args.includes('-d')) {
        await this.decryptPassword();
      } else {
        await this.encryptPassword();
      }

    } catch (error) {
      this.cli.displayError(error);
      process.exit(1);
    } finally {
      this.cli.close();
    }
  }

  /**
   * Executa o fluxo de criptografia de senha
   */
  async encryptPassword() {
    try {
      // Obtém credenciais do usuário
      const credentials = await this.cli.getCredentials();
      
      console.log('\n🔐 Iniciando processo de criptografia...\n');

      // Gera salt e deriva chave
      const salt = CryptoManager.generateSalt(16);
      const derivedKey = CryptoManager.deriveKeyPBKDF2(
        credentials.password,
        salt,
        10000, // 10.000 iterações para segurança
        32,    // 256 bits
        'sha256'
      );

      // Criptografa a senha
      const encryptionResult = CryptoManager.encryptPassword(
        credentials.password,
        derivedKey
      );

      // Salva arquivos
      this.savePasswordFile(credentials.username, encryptionResult.encryptedHex);
      CryptoManager.saveEncryptedKeyAndIV(
        derivedKey,
        encryptionResult.iv,
        `${credentials.username}_chaveEIV.txt`
      );

      // Exibe informações
      this.cli.displayEncryptionInfo(
        credentials.username,
        encryptionResult.encryptedHex
      );

    } catch (error) {
      throw new Error(`Erro na criptografia: ${error.message}`);
    }
  }

  /**
   * Executa o fluxo de descriptografia de senha
   */
  async decryptPassword() {
    try {
      console.log('\n🔓 Modo de descriptografia\n');
      
      // Verifica se os arquivos necessários existem
      if (!fs.existsSync('passwordFile.txt')) {
        throw new Error('Arquivo passwordFile.txt não encontrado. Execute primeiro a criptografia.');
      }

      // Lê o arquivo de senha
      const passwordData = fs.readFileSync('passwordFile.txt', 'utf8').split('\n');
      const username = passwordData[0];
      const encryptedHex = passwordData[1];

      if (!username || !encryptedHex) {
        throw new Error('Arquivo passwordFile.txt corrompido ou incompleto.');
      }

      const keyIVFile = `${username}_chaveEIV.txt`;
      if (!fs.existsSync(keyIVFile)) {
        throw new Error(`Arquivo ${keyIVFile} não encontrado.`);
      }

      console.log(`👤 Usuário detectado: ${username}`);
      
      // Solicita senha para descriptografar
      const password = await this.cli.askQuestion('🔑 Digite a senha para descriptografar: ');
      
      // Deriva a chave
      const salt = Buffer.from('salt', 'utf8');
      const derivedKey = CryptoManager.deriveKeyPBKDF2(password, salt, 10000, 32, 'sha256');
      
      // Lê o IV criptografado
      const iv = CryptoManager.readEncryptedKeyAndIV(derivedKey, keyIVFile);
      
      // Descriptografa a senha
      const encryptedPassword = Buffer.from(encryptedHex, 'hex');
      const decryptedPassword = CryptoManager.decryptPassword(
        encryptedPassword,
        derivedKey,
        iv
      );

      // Exibe resultado
      this.cli.displayDecryptionInfo(username, decryptedPassword);

    } catch (error) {
      throw new Error(`Erro na descriptografia: ${error.message}`);
    }
  }

  /**
   * Salva o arquivo de senha criptografada
   * @param {string} username - Nome do usuário
   * @param {string} encryptedHex - Senha criptografada em hexadecimal
   */
  savePasswordFile(username, encryptedHex) {
    try {
      const content = `${username}\n${encryptedHex}`;
      fs.writeFileSync('passwordFile.txt', content, 'utf8');
    } catch (error) {
      throw new Error(`Erro ao salvar arquivo de senha: ${error.message}`);
    }
  }
}

/**
 * Função principal que inicia o sistema
 */
async function main() {
  const cryptoSystem = new CryptoSystem();
  await cryptoSystem.run();
}

// Executa o sistema se este arquivo for executado diretamente
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  });
}

module.exports = CryptoSystem;
