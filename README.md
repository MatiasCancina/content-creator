# 🤖 AI Content Generator

AI Content Generator is a web application that allows users to generate optimized product content using Large Language Models (LLMs). It supports multiple tones, keeps a persistent generation history, and provides a modern, user-friendly interface with dark mode support.

This project was built following best practices in modern frontend development with **Next.js, TypeScript, and Tailwind CSS**.

---

## ✨ Features

* 🔮 **AI-powered content generation** using LLMs (Groq / LLaMA)
* 🎭 **Tone customization**: neutral, formal, playful, technical, sales-oriented
* 🕓 **Generation history** with persistence (localStorage)
* 🗑️ **Delete history items** with confirmation
* 📋 **Copy generated content** for easy reuse
* 🌙 **Dark mode** with system preference support
* ✅ **Form validation** with React Hook Form + Zod
* ⚡ **Fast and responsive UI** with Tailwind CSS

---

## 🧠 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Forms & Validation:** React Hook Form, Zod
* **AI Integration:** Groq API (LLaMA models)
* **State & Persistence:** React Hooks, localStorage
* **Theming:** next-themes (Dark / Light / System)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MatiasCancina/content-creator.git
cd content-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
```

> ⚠️ Make sure not to commit your API key.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Usage

1. Enter a product name and description
2. Select the desired tone
3. Generate AI-powered content
4. View, copy, or reuse previous generations from the history
5. Toggle dark mode for a better visual experience

All generated content and history are persisted locally.

---

## 🧩 Project Structure

```
src/
├── app/                # Next.js App Router
├── components/         # UI components (GeneratorForm, HistoryList, etc.)
├── lib/                # Utilities, hooks, validators
├── styles/             # Global styles
```

---

## 💡 Design Decisions

* **Separation of concerns:** business logic handled in container components
* **Reusable UI components:** presentational components are stateless
* **Client-side persistence:** localStorage used for fast UX
* **Scalable validation:** shared schemas between frontend and API

---

## 📌 Future Improvements

* Export generated content to Markdown / PDF
* Backend persistence with authentication
* Presets and templates per tone
* Automated tests (Playwright / Vitest)

---

## 👤 Author

**Matías**
Frontend Developer (React / Next.js / TypeScript)

---

## 📄 License

This project is for educational and portfolio purposes.
