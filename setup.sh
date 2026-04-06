#!/usr/bin/env bash
set -e

echo "=== Kernel Methods & One-Class SVM Visualization — Setup ==="

# --- Resolve Node.js 20+ ---
# TailwindCSS v4 requires Node >= 20. Detect best available version.

resolve_node() {
  # 1. Check if current node is sufficient
  if command -v node &> /dev/null; then
    NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
    if [ "$NODE_MAJOR" -ge 20 ]; then
      echo "Using system Node $(node -v)"
      return 0
    fi
  fi

  # 2. Homebrew (macOS) — check for node@20..25
  for ver in 25 24 23 22 21 20; do
    local bin="/opt/homebrew/opt/node@${ver}/bin"
    if [ -x "${bin}/node" ]; then
      export PATH="${bin}:$PATH"
      echo "Using Homebrew Node $(node -v) from ${bin}"
      return 0
    fi
  done

  # 3. nvm
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    . "$HOME/.nvm/nvm.sh"
    if nvm use 20 &>/dev/null || nvm install 20; then
      echo "Using nvm Node $(node -v)"
      return 0
    fi
  fi

  echo "ERROR: Node.js >= 20 is required (TailwindCSS v4 native bindings)."
  echo "Your version: $(node -v 2>/dev/null || echo 'not found')"
  echo ""
  echo "Fix options:"
  echo "  brew install node@20        # macOS"
  echo "  nvm install 20              # nvm users"
  echo "  https://nodejs.org/         # manual download"
  exit 1
}

resolve_node

echo ""
echo "[1/2] Installing dependencies..."
npm install

echo ""
echo "[2/2] Done! Start the app:"
echo ""
echo "    npm run dev"
echo ""
echo "Then open http://localhost:3000"
