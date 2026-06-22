# SkillPulse AI 🚀

<div align="center">

**Real-time hiring intelligence for India's technology ecosystem.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)

</div>

---

## 📌 Overview

**SkillPulse AI** is an AI-powered market intelligence platform that tracks and visualises real-time hiring trends across India's technology sector. It helps developers, job seekers, and hiring professionals discover high-demand skills, explore career paths, compare regional salary insights, and predict future opportunities — all in one sleek, interactive dashboard.

> Created by **Mowleen Armstrong** · Powered for the Indian GCC ecosystem.

---

## ✨ Features

- 🔍 **Smart Skill Search** — Search any technology or role and get instant market intelligence
- 🎙️ **Voice Search** — Trigger voice-based skill queries
- 📊 **Live Analytics Dashboard** — Interactive charts for demand, salary bands, and growth trends
- 🗺️ **Regional Reports** — City-wise hiring data across major Indian tech hubs (Bengaluru, Hyderabad, Pune, Mumbai, Chennai, Delhi NCR)
- 🛤️ **Career Path Explorer** — Visual roadmaps for roles like AI Engineer, Cloud Architect, and more
- 📈 **Skill Trends** — Track rising and declining technologies with market velocity scores
- 📋 **Custom Report Builder** — Generate personalised market reports based on selected skills and city
- 🌐 **Multi-category Filtering** — Filter by AI & ML, Cloud, DevOps, Web, Cybersecurity, and more
- 💡 **Animated UI** — Smooth parallax backgrounds, cursor-reactive glow, and spring-physics animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (motion/react) |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Express.js (Node.js) |
| AI Integration | AI-powered market analysis API |
| Runtime | tsx (dev) / esbuild (prod) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mowleen12/SkillPulseAI.git
cd SkillPulseAI

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your API key
```

### Running Locally

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

### Building for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
skillpulse-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive navigation with hide-on-scroll
│   │   ├── BackgroundEffect.tsx # Interactive cursor-reactive background
│   │   ├── RightAnalytics.tsx  # Live analytics dashboard panel
│   │   ├── SkillTrends.tsx     # Skill trend charts and metrics
│   │   ├── CareerPaths.tsx     # Career roadmap explorer
│   │   └── RegionalReports.tsx # City-wise market reports
│   ├── data/
│   │   └── categoriesData.ts   # Preloaded skill category analytics
│   ├── App.tsx                 # Main app layout and logic
│   ├── types.ts                # Shared TypeScript interfaces
│   ├── index.css               # Global styles and design tokens
│   └── main.tsx                # React entry point
├── server.ts                   # Express backend + AI analysis API
├── index.html                  # HTML shell
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🌍 Supported Skill Categories

- AI & Machine Learning
- Cloud Computing
- DevOps & Platform Engineering
- Full Stack Web Development
- Cybersecurity
- Data Engineering & Analytics
- Mobile Development
- Blockchain & Web3

---

## 📸 Highlights

- **Parallax hero section** with cursor-tracking glow effect
- **Hide-on-scroll navbar** that reappears when scrolling back up
- **Spring-physics animations** for zero-lag cursor responsiveness
- **Glassmorphism card designs** with dynamic data visualisations
- **Regional intelligence builder** for 6 major Indian tech cities

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [Apache 2.0 License](LICENSE).

---

<div align="center">
  <strong>© 2026 SkillPulse AI · Created by Mowleen Armstrong · Powered for the Indian GCC Ecosystem</strong>
</div>
