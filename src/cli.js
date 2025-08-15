/**
 * @fileoverview Interface de linha de comando para o sistema de criptografia
 * @author lucas Rodrigues
 * @version 1.0.0
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const CryptoManager = require('./crypto');

/**
 * Classe para gerenciar a interface de linha de comando
 */
class CLI {
  constructor() {
    this.rl = null;
  }

  /**
   * Inicializa a interface de linha de comando
   */
  initialize() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Fecha a interface de linha de comando
   */
  close() {
    if (this.rl) {
      this.rl.close();
    }
  }

  /**
   * Faz uma pergunta de forma assíncrona
   * @param {string} question - Pergunta a ser feita
   * @returns {Promise<string>} Resposta do usuário
   */
  async askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Valida se uma string não está vazia
   * @param {string} value - Valor a ser validado
   * @param {string} fieldName - Nome do campo para mensagem de erro
   * @returns {string} Valor validado
   * @throws {Error} Se o valor for inválido
   */
  validateNonEmpty(value, fieldName) {
    if (!value || value.trim() === '') {
      throw new Error(`${fieldName} não pode estar vazio`);
    }
    return value.trim();
  }

  /**
   * Valida se uma senha atende aos critérios mínimos de segurança
   * @param {string} password - Senha a ser validada
   * @returns {string} Senha validada
   * @throws {Error} Se a senha não atender aos critérios
   */
  validatePassword(password) {
    if (!password || password.length < 8) {
      throw new Error('Senha deve ter pelo menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error('Senha deve conter pelo menos uma letra maiúscula');
    }

    if (!/[a-z]/.test(password)) {
      throw new Error('Senha deve conter pelo menos uma letra minúscula');
    }

    if (!/\d/.test(password)) {
      throw new Error('Senha deve conter pelo menos um número');
    }

    return password;
  }

  /**
   * Obtém credenciais do usuário com validação
   * @returns {Promise<Object>} Objeto com username e password
   */
  async getCredentials() {
    try {
      console.log('\n🔐 Sistema de Criptografia de Senhas\n');
      console.log('Por favor, insira suas credenciais:\n');

      const username = await this.askQuestion('👤 Nome de usuário: ');
      const validatedUsername = this.validateNonEmpty(username, 'Nome de usuário');

      const password = await this.askQuestion('🔒 Senha: ');
      const validatedPassword = this.validatePassword(password);

      return {
        username: validatedUsername,
        password: validatedPassword
      };
    } catch (error) {
      throw new Error(`Erro na entrada de credenciais: ${error.message}`);
    }
  }

  /**
   * Exibe informações sobre o processo de criptografia
   * @param {string} username - Nome do usuário
   * @param {string} encryptedHex - Senha criptografada em hexadecimal
   */
  displayEncryptionInfo(username, encryptedHex) {
    console.log('\n✅ Criptografia concluída com sucesso!\n');
    console.log(`👤 Usuário: ${username}`);
    console.log(`🔐 Senha criptografada: ${encryptedHex.substring(0, 32)}...`);
    console.log(`📁 Arquivos gerados:`);
    console.log(`   - passwordFile.txt`);
    console.log(`   - ${username}_chaveEIV.txt`);
  }

  /**
   * Exibe informações sobre o processo de descriptografia
   * @param {string} username - Nome do usuário
   * @param {string} decryptedPassword - Senha descriptografada
   */
  displayDecryptionInfo(username, decryptedPassword) {
    console.log('\n✅ Descriptografia concluída com sucesso!\n');
    console.log(`👤 Usuário: ${username}`);
    console.log(`🔓 Senha descriptografada: ${decryptedPassword}`);
  }

  /**
   * Exibe mensagem de erro formatada
   * @param {Error} error - Erro a ser exibido
   */
  displayError(error) {
    console.error('\n❌ Erro:', error.message);
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', error.stack);
    }
  }

  /**
   * Exibe informações de ajuda
   */
  displayHelp() {
    console.log('\n📖 Ajuda - Sistema de Criptografia\n');
    console.log('Comandos disponíveis:');
    console.log('  node cli.js          - Criptografar nova senha');
    console.log('  node cli.js --help   - Exibir esta ajuda');
    console.log('  node cli.js --decrypt - Descriptografar senha existente');
    console.log('\nPara mais informações, consulte o README.md');
  }

  /**
   * Exibe informações sobre o projeto
   */
  displayProjectInfo() {
    console.log('\n🚀 Node Cryptography Demo v1.0.0');
    console.log('🔐 Sistema seguro de criptografia de senhas');
          console.log('📧 Para suporte: your-email@example.com');
    console.log('⭐ GitHub: https://github.com/your-username/node-cryptography-demo\n');
  }
}

module.exports = CLI;
