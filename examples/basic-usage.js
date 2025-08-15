/**
 * @fileoverview Exemplo básico de uso do sistema de criptografia
 * @author Seu Nome
 * @version 1.0.0
 */

const CryptoManager = require('../src/crypto');

/**
 * Exemplo básico de criptografia e descriptografia
 */
async function basicExample() {
  try {
    console.log('🔐 Exemplo Básico de Criptografia\n');

    // 1. Gerar salt e chave
    console.log('1️⃣ Gerando salt e derivando chave...');
    const password = 'MinhaSenhaSuperSegura123!';
    const salt = CryptoManager.generateSalt(16);
    const derivedKey = CryptoManager.deriveKeyPBKDF2(password, salt);

    console.log(`   Salt: ${salt.toString('hex')}`);
    console.log(`   Chave derivada: ${derivedKey.toString('hex').substring(0, 32)}...`);
    console.log('   ✅ Chave derivada com sucesso!\n');

    // 2. Criptografar uma mensagem
    console.log('2️⃣ Criptografando mensagem...');
    const message = 'Esta é uma mensagem secreta!';
    const encryptionResult = CryptoManager.encryptPassword(message, derivedKey);

    console.log(`   Mensagem original: ${message}`);
    console.log(`   Mensagem criptografada: ${encryptionResult.encryptedHex}`);
    console.log(`   IV: ${encryptionResult.iv.toString('hex')}`);
    console.log('   ✅ Mensagem criptografada com sucesso!\n');

    // 3. Descriptografar a mensagem
    console.log('3️⃣ Descriptografando mensagem...');
    const decryptedMessage = CryptoManager.decryptPassword(
      encryptionResult.encryptedPassword,
      derivedKey,
      encryptionResult.iv
    );

    console.log(`   Mensagem descriptografada: ${decryptedMessage}`);
    console.log(`   Verificação: ${message === decryptedMessage ? '✅' : '❌'} - Mensagens são iguais!\n`);

    // 4. Demonstrar que a mesma senha gera chaves diferentes com salts diferentes
    console.log('4️⃣ Demonstração: Senhas iguais com salts diferentes...');
    const salt2 = CryptoManager.generateSalt(16);
    const derivedKey2 = CryptoManager.deriveKeyPBKDF2(password, salt2);

    console.log(`   Salt 1: ${salt.toString('hex')}`);
    console.log(`   Salt 2: ${salt2.toString('hex')}`);
    console.log(`   Chave 1: ${derivedKey.toString('hex').substring(0, 16)}...`);
    console.log(`   Chave 2: ${derivedKey2.toString('hex').substring(0, 16)}...`);
    console.log(`   Chaves são diferentes: ${!derivedKey.equals(derivedKey2) ? '✅' : '❌'}\n`);

    // 5. Demonstrar validação de senha
    console.log('5️⃣ Validação de força da senha...');
    const weakPassword = '123';
    const strongPassword = 'MinhaSenha123!';

    console.log(`   Senha fraca (${weakPassword}): ${weakPassword.length >= 8 ? '✅' : '❌'} - Muito curta`);
    console.log(`   Senha forte (${strongPassword}): ${strongPassword.length >= 8 ? '✅' : '❌'} - Comprimento adequado`);
    console.log(`   Contém maiúscula: ${/[A-Z]/.test(strongPassword) ? '✅' : '❌'}`);
    console.log(`   Contém minúscula: ${/[a-z]/.test(strongPassword) ? '✅' : '❌'}`);
    console.log(`   Contém número: ${/\d/.test(strongPassword) ? '✅' : '❌'}\n`);

    console.log('🎉 Exemplo concluído com sucesso!');

  } catch (error) {
    console.error('❌ Erro no exemplo:', error.message);
  }
}

/**
 * Exemplo de gerenciamento de múltiplas chaves
 */
async function multipleKeysExample() {
  try {
    console.log('🔑 Exemplo de Múltiplas Chaves\n');

    const passwords = [
      'Senha1!',
      'Senha2@',
      'Senha3#'
    ];

    const keys = [];

    // Gerar chaves para cada senha
    for (let i = 0; i < passwords.length; i++) {
      const salt = CryptoManager.generateSalt(16);
      const key = CryptoManager.deriveKeyPBKDF2(passwords[i], salt);
      keys.push({ password: passwords[i], salt, key });

      console.log(`   Senha ${i + 1}: ${passwords[i]} -> Chave: ${key.toString('hex').substring(0, 16)}...`);
    }

    console.log('\n   ✅ Todas as chaves foram geradas com sucesso!\n');

    // Demonstrar que cada chave é única
    console.log('🔍 Verificando unicidade das chaves...');
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const areEqual = keys[i].key.equals(keys[j].key);
        console.log(`   Chave ${i + 1} vs Chave ${j + 1}: ${areEqual ? '❌ Iguais' : '✅ Diferentes'}`);
      }
    }

  } catch (error) {
    console.error('❌ Erro no exemplo de múltiplas chaves:', error.message);
  }
}

/**
 * Função principal que executa todos os exemplos
 */
async function runExamples() {
  console.log('🚀 Node Cryptography Demo - Exemplos de Uso\n');
  console.log('=' .repeat(60) + '\n');

  await basicExample();

  console.log('\n' + '=' .repeat(60) + '\n');

  await multipleKeysExample();

  console.log('\n' + '=' .repeat(60));
  console.log('\n📚 Para mais informações, consulte o README.md');
  console.log('🔗 GitHub: https://github.com/your-username/node-cryptography-demo');
}

// Executa os exemplos se este arquivo for executado diretamente
if (require.main === module) {
  runExamples().catch((error) => {
    console.error('❌ Erro fatal nos exemplos:', error.message);
    process.exit(1);
  });
}

module.exports = {
  basicExample,
  multipleKeysExample,
  runExamples
};
