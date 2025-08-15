# 📚 API Reference - Node Cryptography Demo

Esta documentação descreve todas as APIs públicas do projeto Node Cryptography Demo.

## 📋 Índice

- [CryptoManager](#cryptomanager)
- [CLI](#cli)
- [CryptoSystem](#cryptosystem)
- [Exemplos de Uso](#exemplos-de-uso)

## 🔐 CryptoManager

Classe principal para operações de criptografia.

### `deriveKeyPBKDF2(password, salt, iterations?, keyLength?, digest?)`

Deriva uma chave criptográfica usando PBKDF2.

**Parâmetros:**
- `password` (string): Senha em texto plano
- `salt` (Buffer|string): Salt para derivação da chave
- `iterations` (number, opcional): Número de iterações (padrão: 10000)
- `keyLength` (number, opcional): Tamanho da chave em bytes (padrão: 32)
- `digest` (string, opcional): Algoritmo de hash (padrão: 'sha256')

**Retorna:** `Buffer` - Chave derivada

**Exemplo:**
```javascript
const salt = CryptoManager.generateSalt(16);
const key = CryptoManager.deriveKeyPBKDF2('minhaSenha', salt);
```

### `encryptPassword(password, key)`

Criptografa uma senha usando AES-256-CBC.

**Parâmetros:**
- `password` (string): Senha em texto plano
- `key` (Buffer): Chave de criptografia (32 bytes)

**Retorna:** `Object` com:
- `encryptedPassword` (Buffer): Senha criptografada
- `iv` (Buffer): Vetor de inicialização
- `encryptedHex` (string): Senha criptografada em hexadecimal

**Exemplo:**
```javascript
const result = CryptoManager.encryptPassword('minhaSenha', key);
console.log(result.encryptedHex);
```

### `decryptPassword(encryptedPassword, key, iv)`

Descriptografa uma senha usando AES-256-CBC.

**Parâmetros:**
- `encryptedPassword` (Buffer): Senha criptografada
- `key` (Buffer): Chave de descriptografia (32 bytes)
- `iv` (Buffer): Vetor de inicialização (16 bytes)

**Retorna:** `string` - Senha descriptografada

**Exemplo:**
```javascript
const decrypted = CryptoManager.decryptPassword(
  encryptedPassword,
  key,
  iv
);
```

### `saveEncryptedKeyAndIV(key, iv, filename)`

Salva chave e IV criptografados em arquivo.

**Parâmetros:**
- `key` (Buffer): Chave para criptografar o IV (32 bytes)
- `iv` (Buffer): Vetor de inicialização (16 bytes)
- `filename` (string): Nome do arquivo de saída

**Exemplo:**
```javascript
CryptoManager.saveEncryptedKeyAndIV(key, iv, 'chave_iv.txt');
```

### `readEncryptedKeyAndIV(key, filename)`

Lê chave e IV criptografados do arquivo.

**Parâmetros:**
- `key` (Buffer): Chave para descriptografar o IV (32 bytes)
- `filename` (string): Nome do arquivo de entrada

**Retorna:** `Buffer` - IV descriptografado

**Exemplo:**
```javascript
const iv = CryptoManager.readEncryptedKeyAndIV(key, 'chave_iv.txt');
```

### `generateSalt(length?)`

Gera um salt aleatório.

**Parâmetros:**
- `length` (number, opcional): Tamanho do salt em bytes (padrão: 16)

**Retorna:** `Buffer` - Salt aleatório

**Exemplo:**
```javascript
const salt = CryptoManager.generateSalt(32);
```

### `generateRandomKey(length?)`

Gera uma chave aleatória.

**Parâmetros:**
- `length` (number, opcional): Tamanho da chave em bytes (padrão: 32)

**Retorna:** `Buffer` - Chave aleatória

**Exemplo:**
```javascript
const key = CryptoManager.generateRandomKey(64);
```

## 💻 CLI

Classe para gerenciar a interface de linha de comando.

### `initialize()`

Inicializa a interface de linha de comando.

**Exemplo:**
```javascript
const cli = new CLI();
cli.initialize();
```

### `close()`

Fecha a interface de linha de comando.

**Exemplo:**
```javascript
cli.close();
```

### `askQuestion(question)`

Faz uma pergunta de forma assíncrona.

**Parâmetros:**
- `question` (string): Pergunta a ser feita

**Retorna:** `Promise<string>` - Resposta do usuário

**Exemplo:**
```javascript
const answer = await cli.askQuestion('Digite sua senha: ');
```

### `validateNonEmpty(value, fieldName)`

Valida se uma string não está vazia.

**Parâmetros:**
- `value` (string): Valor a ser validado
- `fieldName` (string): Nome do campo para mensagem de erro

**Retorna:** `string` - Valor validado

**Exemplo:**
```javascript
const username = cli.validateNonEmpty(input, 'Nome de usuário');
```

### `validatePassword(password)`

Valida se uma senha atende aos critérios mínimos de segurança.

**Parâmetros:**
- `password` (string): Senha a ser validada

**Retorna:** `string` - Senha validada

**Critérios:**
- Mínimo 8 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número

**Exemplo:**
```javascript
const validPassword = cli.validatePassword('MinhaSenha123!');
```

### `getCredentials()`

Obtém credenciais do usuário com validação.

**Retorna:** `Promise<Object>` com:
- `username` (string): Nome de usuário validado
- `password` (string): Senha validada

**Exemplo:**
```javascript
const credentials = await cli.getCredentials();
console.log(`Usuário: ${credentials.username}`);
```

### `displayEncryptionInfo(username, encryptedHex)`

Exibe informações sobre o processo de criptografia.

**Parâmetros:**
- `username` (string): Nome do usuário
- `encryptedHex` (string): Senha criptografada em hexadecimal

### `displayDecryptionInfo(username, decryptedPassword)`

Exibe informações sobre o processo de descriptografia.

**Parâmetros:**
- `username` (string): Nome do usuário
- `decryptedPassword` (string): Senha descriptografada

### `displayError(error)`

Exibe mensagem de erro formatada.

**Parâmetros:**
- `error` (Error): Erro a ser exibido

### `displayHelp()`

Exibe informações de ajuda.

### `displayProjectInfo()`

Exibe informações sobre o projeto.

## 🚀 CryptoSystem

Classe principal do sistema de criptografia.

### `run()`

Executa o fluxo principal de criptografia.

**Exemplo:**
```javascript
const cryptoSystem = new CryptoSystem();
await cryptoSystem.run();
```

### `encryptPassword()`

Executa o fluxo de criptografia de senha.

### `decryptPassword()`

Executa o fluxo de descriptografia de senha.

### `savePasswordFile(username, encryptedHex)`

Salva o arquivo de senha criptografada.

**Parâmetros:**
- `username` (string): Nome do usuário
- `encryptedHex` (string): Senha criptografada em hexadecimal

## 📖 Exemplos de Uso

### Exemplo Básico

```javascript
const CryptoManager = require('./src/crypto');

// Gerar salt e chave
const salt = CryptoManager.generateSalt(16);
const key = CryptoManager.deriveKeyPBKDF2('minhaSenha', salt);

// Criptografar
const result = CryptoManager.encryptPassword('mensagem secreta', key);

// Descriptografar
const decrypted = CryptoManager.decryptPassword(
  result.encryptedPassword,
  key,
  result.iv
);

console.log('Mensagem descriptografada:', decrypted);
```

### Exemplo com CLI

```javascript
const CLI = require('./src/cli');

async function main() {
  const cli = new CLI();
  cli.initialize();
  
  try {
    const credentials = await cli.getCredentials();
    console.log(`Usuário: ${credentials.username}`);
    console.log(`Senha: ${credentials.password}`);
  } finally {
    cli.close();
  }
}

main();
```

### Exemplo com Sistema Completo

```javascript
const CryptoSystem = require('./src/main');

async function main() {
  const cryptoSystem = new CryptoSystem();
  await cryptoSystem.run();
}

main();
```

## 🔧 Tratamento de Erros

Todas as funções lançam erros descritivos quando algo dá errado:

```javascript
try {
  const key = CryptoManager.deriveKeyPBKDF2('', 'salt');
} catch (error) {
  console.error('Erro:', error.message);
  // Saída: "Erro: Password deve ser uma string não vazia"
}
```

## 📝 Notas de Segurança

- **Nunca** use este projeto em produção sem revisão de segurança
- As chaves são derivadas usando PBKDF2 com 10.000 iterações
- IVs são gerados aleatoriamente para cada operação
- Senhas são validadas quanto à força mínima
- Arquivos de chave e IV são criptografados antes de salvar

## 🚨 Limitações

- Modo ECB é usado para criptografar IVs (não ideal para produção)
- Salt fixo é usado em algumas operações
- Não há proteção contra ataques de timing
- Falta de proteção contra ataques de força bruta

## 🔮 Melhorias Futuras

- [ ] Suporte a algoritmos de criptografia mais modernos
- [ ] Implementação de proteção contra ataques de timing
- [ ] Suporte a múltiplos algoritmos de hash
- [ ] Interface gráfica (GUI)
- [ ] Integração com gerenciadores de senha
- [ ] Suporte a hardware security modules (HSM)
