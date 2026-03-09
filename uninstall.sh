#!/usr/bin/env bash
# =============================================================================
# PM Starter Kit — omp uninstaller
# Removes all symlinks (or copies) installed by install.sh
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OMP_SRC="$REPO_DIR/omp"
OMP_DIR="$HOME/.omp"
AGENTS_DIR="$OMP_DIR/agent/agents"
COMMANDS_DIR="$OMP_DIR/agent/commands"
SKILLS_DIR="$OMP_DIR/skills"

red()    { echo -e "\033[31m$1\033[0m"; }
green()  { echo -e "\033[32m$1\033[0m"; }
bold()   { echo -e "\033[1m$1\033[0m"; }

remove_if_linked() {
  local dest="$1"
  local label="$2"
  if [[ -L "$dest" ]]; then
    rm "$dest"
    green "  ✓  removed $label"
  elif [[ -f "$dest" ]]; then
    red "  ⚠  $label is a regular file (not a symlink) — skipping. Remove manually if needed."
  fi
}

bold "\n🗑  PM Starter Kit — omp uninstaller\n"

bold "Context file:"
remove_if_linked "$OMP_DIR/AGENTS.md" "AGENTS.md"

bold "\nAgents:"
for f in "$OMP_SRC/agents/"*.md; do
  name=$(basename "$f")
  remove_if_linked "$AGENTS_DIR/$name" "agent/$name"
done

bold "\nCommands:"
for f in "$OMP_SRC/commands/"*.md; do
  name=$(basename "$f")
  cmd="${name%.md}"
  remove_if_linked "$COMMANDS_DIR/$name" "/$cmd"
done

bold "\nSkills:"
for skill_dir in "$OMP_SRC/skills/"*/; do
  skill_name=$(basename "$skill_dir")
  for f in "$skill_dir"*.md; do
    [[ -f "$f" ]] || continue
    name=$(basename "$f")
    remove_if_linked "$SKILLS_DIR/$skill_name/$name" "skill/$skill_name/$name"
  done
done

echo ""
bold "✅ Uninstall complete. Restart omp to apply."
