# 🔐 Node Cryptography Demo

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-Cryptography-red.svg)](https://en.wikipedia.org/wiki/Cryptography)

Um projeto demonstrativo de criptografia em Node.js que implementa técnicas avançadas de segurança para gerenciamento de senhas e criptografia de dados.

## 🚀 Funcionalidades

- **🔑 Derivação de Chaves PBKDF2**: Geração segura de chaves criptográficas
- **🔒 Criptografia AES-256-CBC**: Criptografia simétrica de alta segurança
- **📝 Gerenciamento de Credenciais**: Interface CLI para entrada de usuário e senha
- **💾 Armazenamento Seguro**: Salvamento criptografado de chaves e IVs
- **🛡️ Tratamento de Erros**: Sistema robusto de tratamento de exceções

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **crypto** - Módulo nativo de criptografia
- **readline** - Interface de linha de comando
- **fs** - Sistema de arquivos
- **PBKDF2** - Derivação de chaves
- **AES-256** - Algoritmo de criptografia

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conhecimento básico de linha de comando

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/your-username/node-cryptography-demo.git
cd node-cryptography-demo
```

2. **Instale as dependências:**
```bash
npm install
```

## 💻 Como Usar

### Execução Básica
```bash
node nodeCrypto.js
```

### Exemplo de Uso
```bash
$ node nodeCrypto.js
Digite o nome de usuário: admin
Digite a senha: MinhaSenha123!
Senha criptografada: a1b2c3d4e5f6...
```

### Arquivos Gerados
- `passwordFile.txt` - Arquivo com usuário e senha criptografada
- `{username}_chaveEIV.txt` - Arquivo com chave e IV criptografados

## 🔧 Funcionalidades Técnicas

### Derivação de Chaves PBKDF2
```javascript
function derivarChavePBKDF2(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");
}
```

### Criptografia AES-256-CBC
```javascript
function criptografarSenha(senha, chave) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", chave, iv);
  // ... implementação
}
```

## 📁 Estrutura do Projeto

```
node-cryptography-demo/
├── src/
│   ├── crypto.js          # Funções de criptografia
│   ├── cli.js             # Interface de linha de comando
│   └── utils.js           # Utilitários
├── tests/                 # Testes unitários
├── examples/              # Exemplos de uso
├── docs/                  # Documentação adicional
├── package.json           # Dependências e scripts
├── README.md              # Este arquivo
└── LICENSE                # Licença MIT
```

## 🧪 Testes

Execute os testes com:
```bash
npm test
```

## 📚 Documentação

- [Guia de Criptografia](docs/cryptography-guide.md)
- [API Reference](docs/api-reference.md)
- [Exemplos Avançados](examples/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ⚠️ Aviso de Segurança

**Este é um projeto educacional/demonstrativo. Não use em produção sem revisão de segurança adequada.**

## 🆘 Suporte

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/node-cryptography-demo/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/your-username/node-cryptography-demo/wiki)

---

⭐ **Se este projeto foi útil, considere dar uma estrela!**
