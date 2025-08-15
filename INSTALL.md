# 🚀 Instalação Rápida - Node Cryptography Demo

Este guia fornece instruções rápidas para configurar e executar o projeto.

## ⚡ Instalação em 3 Passos

### 1. Clone o Repositório
```bash
git clone https://github.com/your-username/node-cryptography-demo.git
cd node-cryptography-demo
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Execute o Projeto
```bash
npm start
```

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
# Executar em modo desenvolvimento
npm run dev

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Verificar cobertura de testes
npm run test:coverage
```

### Qualidade de Código
```bash
# Verificar linting
npm run lint

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

### Documentação
```bash
# Gerar documentação JSDoc
npm run docs

# Limpar arquivos gerados
npm run clean
```

## 🐛 Solução de Problemas

### Erro: "Node.js version not supported"
- **Solução**: Instale Node.js 18+ ou superior
- **Verificar versão**: `node --version`

### Erro: "npm install failed"
- **Solução**: Limpe o cache do npm: `npm cache clean --force`
- **Alternativa**: Use yarn: `yarn install`

### Erro: "Permission denied"
- **Solução**: Use `sudo` no Linux/Mac ou execute como administrador no Windows
- **Alternativa**: Configure npm para não usar sudo: `npm config set prefix ~/.npm-global`

### Erro: "Port already in use"
- **Solução**: Mude a porta ou pare outros processos usando a porta

## 📱 Requisitos do Sistema

### Mínimos
- **Node.js**: 18.0.0+
- **npm**: 8.0.0+
- **RAM**: 512MB
- **Espaço em disco**: 100MB

### Recomendados
- **Node.js**: 20.0.0+
- **npm**: 10.0.0+
- **RAM**: 1GB+
- **Espaço em disco**: 500MB+

## 🌐 Suporte

- 📧 **Email**: your-email@example.com
- 💬 **Issues**: [GitHub Issues](https://github.com/your-username/node-cryptography-demo/issues)
- 📖 **Documentação**: [README.md](README.md)
- 🔧 **Contribuição**: [CONTRIBUTING.md](CONTRIBUTING.md)

## ✅ Verificação de Instalação

Para verificar se tudo está funcionando:

```bash
# Execute os testes
npm test

# Execute o exemplo básico
node examples/basic-usage.js

# Execute o sistema principal
npm start
```

Se todos os comandos executarem sem erros, a instalação foi bem-sucedida! 🎉

---

**Problema persistente?** Abra uma [issue](../../issues/new) no GitHub com detalhes do erro e informações do seu sistema.
