# 🧠 Action Plan – `code-relay`

## 🎯 Project Goal

The purpose of **`code-relay`** is to build a bridge between conversational AI tools (like ChatGPT, Copilot Chat, Gemini CLI, etc.) and your live code environment. It allows developers to take suggestions or generated code snippets and **apply them into their project using tokens**, rather than copy/pasting manually.

This approach:
- Reduces friction between chat and code
- Encourages trackable, auditable interactions with AI
- Enables **undo** and **history tracking** for applied code snippets
- Creates a foundation for building future AI-assisted dev tooling

Think of it as a **"chat-to-source patching system"** with memory, versioning, and reversibility.

---

## ✅ Completed So Far

### 🗂 Project Structure
- `src/index.ts`: CLI entry point
- `.relay-tokens.json`: Maps unique tokens to code snippets
- `relay-output.ts`: Default target file for applying code
- `.relay-history/`: Stores undo history per token

### 🛠️ CLI Commands Implemented
- `apply <token>`: Injects snippet into `relay-output.ts` and saves backup
- `undo <token>`: Reverts file to its prior state before the token was applied
- `history`: Lists previously applied tokens

### ⚙️ Setup Tasks Done
- Configured TypeScript project using `tsc`
- Fixed Node module compatibility by switching to `"type": "commonjs"`
- Generated `README.md`, `package.json`, `.gitignore`, `.relay-tokens.json`
- Ran first live test with `hello-world` token

---

## 🔧 Suggested Enhancements (Optional / Future)

- [ ] **Custom output file support**
  ```bash
  code-relay apply token123 --output src/utils/helper.ts
  ```

- [ ] **Preview mode before applying a snippet**
  ```bash
  code-relay preview token123
  ```

- [ ] **Token sourcing from online ChatGPT sessions**  
  (e.g. pulling snippets via share links or embedded code blocks)

- [ ] **Integration with VS Code / GitHub Copilot Chat**

- [ ] **Change log per token**  
  Write a diff or note to explain what a token changes and why.

- [ ] **Git integration**  
  Auto-create a commit or branch when applying a token.

---

## 🔄 Relationship to Other Repos

This project could eventually plug into [`lewm-lint-runner`](https://github.com/marcnoon/lewm-lint-runner) to:
- Apply structural fixes
- Share AI-generated rule sets
- Relay build/lint patches via tracked tokens

---

## 🧘 Status

You’ve set the foundation.  
You tested and debugged it successfully.  
Now it’s time to rest, reflect, and revisit when the energy returns. 🧉

---

## 📌 Next Time

- Test `undo` on a second token
- Try `npm link` to enable global CLI
- Build a tiny UI or web preview for `.relay-tokens.json`?

Let me know when you’re ready to go again.
