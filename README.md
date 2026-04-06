# Kernel Methods & One-Class SVM Visualization

A 3Blue1Brown-inspired interactive presentation explaining Kernel Methods and One-Class SVM for Anomaly Detection. Built with React, Three.js, and Framer Motion.

## Prerequisites

- **Node.js v20+** — required by TailwindCSS v4
- **npm** (bundled with Node.js)

Download from [https://nodejs.org/](https://nodejs.org/) — choose the **LTS** or **Current** version (≥ 20).

## Setup & Run

### macOS / Linux

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

> **Tip:** If your default `node` is v18 but you have a newer version via Homebrew:
> ```bash
> export PATH="/opt/homebrew/opt/node@25/bin:$PATH"
> npm install && npm run dev
> ```
> Or use the automated setup script:
> ```bash
> chmod +x setup.sh && ./setup.sh
> ```

### Windows

```powershell
# 1. Open Terminal / PowerShell in this folder

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

> **Tip:** If you have multiple Node versions, use [nvm-windows](https://github.com/coreybutler/nvm-windows):
> ```powershell
> nvm install 20
> nvm use 20
> npm install && npm run dev
> ```

### Open in Browser

After running `npm run dev`, open **http://localhost:3000**.

Use arrow keys **←** / **→** to navigate between slides.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with TypeScript |

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| 3D Rendering | Three.js + React Three Fiber |
| Animations | Framer Motion |
| Icons | Lucide React |

## Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Root component
├── index.css             # Global styles
└── components/
    ├── Presentation.tsx  # All interactive slides
    └── Math.tsx          # Math rendering components
```
