# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Node Cryptography Demo**! Este documento fornece diretrizes para contribuições.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Documentação](#documentação)
- [Processo de Pull Request](#processo-de-pull-request)
- [Código de Conduta](#código-de-conduta)

## 🚀 Como Contribuir

### Tipos de Contribuições

- 🐛 **Bug Fixes**: Correções de problemas existentes
- ✨ **Novas Funcionalidades**: Adição de recursos úteis
- 📚 **Documentação**: Melhorias na documentação
- 🧪 **Testes**: Adição ou melhoria de testes
- 🔧 **Refatoração**: Melhorias no código existente
- 🎨 **UI/UX**: Melhorias na interface (se aplicável)

### Antes de Começar

1. Verifique se já existe uma [issue](../../issues) para o que você quer fazer
2. Se não existir, crie uma nova issue descrevendo o problema ou funcionalidade
3. Aguarde feedback da equipe antes de começar a implementar

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- npm 8+
- Git

### Configuração Local

1. **Fork o repositório**
   ```bash
   # No GitHub, clique em "Fork"
   ```

2. **Clone seu fork**
   ```bash
   git clone https://github.com/your-username/node-cryptography-demo.git
   cd node-cryptography-demo
   ```

3. **Configure o upstream**
   ```bash
   git remote add upstream https://github.com/original-owner/node-cryptography-demo.git
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Execute os testes**
   ```bash
   npm test
   ```

## 📝 Padrões de Código

### JavaScript/Node.js

- Use **ES2022** features
- Siga o estilo definido no `.eslintrc`
- Use **Prettier** para formatação
- Mantenha funções pequenas e focadas
- Adicione JSDoc para funções públicas

### Estrutura de Arquivos

```
src/
├── crypto.js      # Lógica de criptografia
├── cli.js         # Interface de linha de comando
├── main.js        # Arquivo principal
└── utils.js       # Utilitários

tests/
├── crypto.test.js
├── cli.test.js
└── main.test.js

docs/
├── api-reference.md
└── cryptography-guide.md
```

### Convenções de Nomenclatura

- **Arquivos**: `camelCase.js`
- **Classes**: `PascalCase`
- **Funções**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Variáveis**: `camelCase`

## 🧪 Testes

### Executando Testes

```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage

# Testes específicos
npm test -- --grep "nome do teste"
```

### Escrevendo Testes

- Use **Jest** como framework de teste
- Mantenha cobertura acima de 80%
- Teste casos de sucesso e erro
- Use mocks quando apropriado

### Exemplo de Teste

```javascript
describe('CryptoManager', () => {
  describe('deriveKeyPBKDF2', () => {
    it('should derive a valid key from password and salt', () => {
      const password = 'testPassword123';
      const salt = Buffer.from('testSalt', 'utf8');

      const key = CryptoManager.deriveKeyPBKDF2(password, salt);

      expect(key).toBeInstanceOf(Buffer);
      expect(key.length).toBe(32);
    });

    it('should throw error for invalid password', () => {
      expect(() => {
        CryptoManager.deriveKeyPBKDF2('', 'salt');
      }).toThrow('Password deve ser uma string não vazia');
    });
  });
});
```

## 📚 Documentação

### JSDoc

- Documente todas as funções públicas
- Use tipos TypeScript-like quando possível
- Inclua exemplos de uso

```javascript
/**
 * Criptografa uma senha usando AES-256-CBC
 * @param {string} password - Senha em texto plano
 * @param {Buffer} key - Chave de criptografia
 * @returns {Object} Objeto com senha criptografada e IV
 * @throws {Error} Se os parâmetros forem inválidos
 * @example
 * const result = CryptoManager.encryptPassword('minhaSenha', key);
 * console.log(result.encryptedHex);
 */
```

### README e Documentação

- Mantenha o README atualizado
- Documente mudanças na API
- Inclua exemplos práticos
- Adicione screenshots quando relevante

## 🔄 Processo de Pull Request

### 1. Preparação

- Certifique-se de que seus testes passam
- Execute `npm run lint` e `npm run format`
- Atualize a documentação se necessário

### 2. Commit

- Use mensagens de commit claras e descritivas
- Siga o padrão [Conventional Commits](https://conventionalcommits.org/)

```bash
# Exemplos de mensagens
feat: add password strength validation
fix: resolve memory leak in encryption
docs: update API documentation
test: add coverage for error handling
```

### 3. Pull Request

- **Título**: Descreva a mudança de forma clara
- **Descrição**: Explique o que foi feito e por quê
- **Issue**: Referencie a issue relacionada
- **Checklist**: Marque as tarefas completadas

### Template de Pull Request

```markdown
## 📝 Descrição

Breve descrição das mudanças implementadas.

## 🔗 Issue Relacionada

Closes #123

## ✅ Checklist

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Lint e formatação passaram
- [ ] Todos os testes passaram

## 🧪 Como Testar

1. Clone o branch
2. Execute `npm install`
3. Execute `npm test`
4. Teste manualmente a funcionalidade

## 📸 Screenshots (se aplicável)

Adicione screenshots aqui se a mudança afetar a UI.
```

### 4. Revisão

- Responda aos comentários da revisão
- Faça as alterações solicitadas
- Mantenha o histórico de commits limpo

## 📋 Código de Conduta

### Nossos Compromissos

- Ambiente acolhedor e inclusivo
- Respeito mútuo entre contribuidores
- Foco na qualidade do código
- Comunicação construtiva

### Nossos Padrões

✅ **Comportamentos aceitáveis:**
- Usar linguagem acolhedora e inclusiva
- Respeitar diferentes pontos de vista
- Aceitar feedback construtivo
- Focar no que é melhor para a comunidade

❌ **Comportamentos inaceitáveis:**
- Linguagem ou imagens sexualizadas
- Trolling, comentários insultuosos/pejorativos
- Assédio público ou privado
- Publicar informações privadas de outros

## 🆘 Precisando de Ajuda?

- 📧 **Email**: your-email@example.com
- 💬 **Issues**: [GitHub Issues](../../issues)
- 📖 **Wiki**: [GitHub Wiki](../../wiki)
- 💻 **Discord**: [Link do servidor]

## 🙏 Agradecimentos

Obrigado por contribuir para tornar este projeto melhor! Cada contribuição, por menor que seja, é muito valorizada.

---

**Lembre-se**: Contribuir para projetos open source é uma excelente forma de aprender, crescer e ajudar outros desenvolvedores! 🚀
