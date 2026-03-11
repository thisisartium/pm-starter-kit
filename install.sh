#!/usr/bin/env bash
# =============================================================================
# PM Starter Kit — omp agent installer
# Creates symlinks from ~/.omp into this repo so your local omp setup
# stays in sync with the team's shared agents, commands, and skills.
#
# Usage:
#   ./install.sh          # install with symlinks (recommended)
#   ./install.sh --copy   # copy files instead of symlinking
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OMP_SRC="$REPO_DIR/omp"
OMP_DIR="$HOME/.omp"
AGENTS_DIR="$OMP_DIR/agent/agents"
COMMANDS_DIR="$OMP_DIR/agent/commands"
SKILLS_DIR="$OMP_DIR/skills"

MODE="symlink"
if [[ "$1" == "--copy" ]]; then
  MODE="copy"
fi

# ── Helpers ──────────────────────────────────────────────────────────────────

green()  { echo -e "\033[32m$1\033[0m"; }
yellow() { echo -e "\033[33m$1\033[0m"; }
red()    { echo -e "\033[31m$1\033[0m"; }
bold()   { echo -e "\033[1m$1\033[0m"; }

link_or_copy() {
  local src="$1"
  local dest="$2"
  local label="$3"

  # Remove existing file or symlink at destination
  if [[ -L "$dest" ]]; then
    rm "$dest"
  elif [[ -f "$dest" ]]; then
    yellow "  ⚠  Backed up existing: $dest → $dest.bak"
    mv "$dest" "$dest.bak"
  fi

  if [[ "$MODE" == "symlink" ]]; then
    ln -s "$src" "$dest"
    green "  ✓  $label → (symlink)"
  else
    cp "$src" "$dest"
    green "  ✓  $label → (copy)"
  fi
}

# ── Preflight ─────────────────────────────────────────────────────────────────

bold "\n📦 PM Starter Kit — omp installer"
echo "Mode: $MODE"
echo "Repo: $REPO_DIR"
echo "Installing into: $OMP_DIR"
echo ""

if [[ ! -d "$OMP_DIR" ]]; then
  red "Error: ~/.omp not found. Is omp installed?"
  echo "Install omp first: https://github.com/can1357/oh-my-pi"
  exit 1
fi

# ── Create directories ────────────────────────────────────────────────────────

mkdir -p "$AGENTS_DIR"
mkdir -p "$COMMANDS_DIR"
mkdir -p "$SKILLS_DIR"
mkdir -p "$OMP_DIR/clients"

# ── AGENTS.md ─────────────────────────────────────────────────────────────────

bold "Context file:"
link_or_copy "$OMP_SRC/AGENTS.md" "$OMP_DIR/AGENTS.md" "AGENTS.md"

# ── Agents ────────────────────────────────────────────────────────────────────

bold "\nAgents:"
for f in "$OMP_SRC/agents/"*.md; do
  name=$(basename "$f")
  link_or_copy "$f" "$AGENTS_DIR/$name" "agent/$name"
done

# ── Commands ──────────────────────────────────────────────────────────────────

bold "\nCommands:"
for f in "$OMP_SRC/commands/"*.md; do
  name=$(basename "$f")
  cmd="${name%.md}"
  link_or_copy "$f" "$COMMANDS_DIR/$name" "/$cmd"
done

# ── Skills ────────────────────────────────────────────────────────────────────

bold "\nSkills:"
for skill_dir in "$OMP_SRC/skills/"*/; do
  skill_name=$(basename "$skill_dir")
  mkdir -p "$SKILLS_DIR/$skill_name"
  for f in "$skill_dir"*.md; do
    [[ -f "$f" ]] || continue
    name=$(basename "$f")
    link_or_copy "$f" "$SKILLS_DIR/$skill_name/$name" "skill/$skill_name/$name"
  done
done

# ── Done ──────────────────────────────────────────────────────────────────────

echo ""
bold "✅ Installation complete."
echo ""
echo "Next steps:"
echo "  1. Restart omp (exit with /exit, then run: omp)"
echo "  2. Run /setup to create your first client config in ~/.omp/clients/"
echo "  3. Type / to see your PM commands: /story /feature /epic /review-story /split-story"
echo ""
if [[ "$MODE" == "symlink" ]]; then
  echo "Your omp setup is now linked to this repo."
  echo "Run 'git pull' to get updates from the team."
fi
