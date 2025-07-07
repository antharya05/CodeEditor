# 🧠 Code Reviewer AI

A web-based code review assistant powered by **Google Gemini (Gemini 2.5 Flash)** and built with **React**, **Monaco Editor**, and **Tailwind CSS**. It helps developers get instant feedback, quality scores, bug detection, and improvement suggestions for code written in multiple programming languages.

---

## 🚀 Features

- ✅ Supports multiple programming languages (Python, C++, Java, JS, Go, etc.)
- ✅ Uses Google Gemini AI for intelligent, contextual code reviews
- ✅ Clean interface with Monaco code editor and Markdown-rendered responses
- ✅ Dark theme with custom-styled language selector
- ✅ Spinner for loading feedback
- ✅ Secure API key usage via environment variables

---

## 🛠️ Tech Stack

| Frontend     | AI/LLM         | Styling       | Editor        |
|--------------|----------------|----------------|----------------|
| React (Vite) | Google GenAI (Gemini) | Tailwind CSS | Monaco Editor |

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/code-reviewer-ai.git
cd code-reviewer-ai
2. Install dependencies
bash
Copy
Edit
npm install
3. Add Google API Key
Create a .env file in the root:

env
Copy
Edit
VITE_GOOGLE_API_KEY=your_google_genai_api_key_here
🔐 You must have access to the Google Generative AI API.

4. Run the app locally
bash
Copy
Edit
npm run dev
⚙️ Build for Production
bash
Copy
Edit
npm run build
Output will be generated in the dist/ folder.

🌐 Deployment
You can deploy the dist/ folder using:

Vercel

Netlify

GitHub Pages

📋 Example Prompt Sent to Gemini
text
Copy
Edit
You are a skilled software developer who writes clean and efficient code. A user is sharing some code written in Python.

Your task is to carefully review the code and give the following:
1. Rate the code quality.
2. Suggest improvements.
3. Explain what the code does.
4. Identify bugs or logic issues.
5. Mention syntax/runtime errors.
6. Recommend fixes like a senior dev.

Code:
<user-input-code>
🧠 Future Improvements
 Add code formatting support (Prettier/ESLint)

 Allow file upload (.py, .js, etc.)

 Add history of reviews with timestamps

 Export review as PDF or Markdown

 Mobile responsive layout

🤝 Contributing
Pull requests are welcome! Feel free to open issues or submit improvements.

📄 License
MIT License © 2025 Your Name

🙏 Acknowledgements
Google Generative AI

Monaco Editor

React Select

Tailwind CSS
