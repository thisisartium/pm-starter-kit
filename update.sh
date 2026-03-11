#!/usr/bin/env bash
# =============================================================================
# PM Starter Kit — omp updater
# Pulls the latest changes from git and syncs your ~/.omp agent setup.
# Safe to run at any time — idempotent for symlinks, re-copies for --copy mode.
#
# Usage:
#   ./update.sh         # pull + sync (symlink users — recommended)
#   ./update.sh --copy  # pull + re-copy all files (copy-mode users)
# =============================================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OMP_SRC="$REPO_DIR/omp"
OMP_DIR="$HOME/.omp"
AGENTS_DIR="$OMP_DIR/agent/agents"
COMMANDS_DIR="$OMP_DIR/agent/commands"
SKILLS_DIR="$OMP_DIR/skills"

green()  { echo -e "\033[32m$1\033[0m"; }
yellow() { echo -e "\033[33m$1\033[0m"; }
bold()   { echo -e "\033[1m$1\033[0m"; }

bold "\n🔄 PM Starter Kit — updating\n"

# ── Pull latest ───────────────────────────────────────────────────────────────

bold "Pulling latest changes..."
git -C "$REPO_DIR" pull
echo ""

# ── Sync file structure ───────────────────────────────────────────────────────
# Re-runs install.sh to create any new directories, add symlinks for new files,
# and update copies for --copy users. Existing symlinks are replaced cleanly.

"$REPO_DIR/install.sh" "$@"

# ── Prune stale symlinks ──────────────────────────────────────────────────────
# Removes symlinks that point to files no longer in the repo (e.g. renamed or
# deleted agents/commands/skills). Copy-mode users don't need this step.

if [[ "$1" != "--copy" ]]; then
  bold "Pruning stale symlinks..."
  pruned=0

  prune_stale() {
    local dir="$1"
    [[ -d "$dir" ]] || return
    for link in "$dir"/*.md; do
      [[ -L "$link" ]] || continue
      target="$(readlink "$link")"
      if [[ ! -f "$target" ]]; then
        yellow "  ✗  Removed stale: $(basename "$link")"
        rm "$link"
        ((pruned++)) || true
      fi
    done
  }

  prune_stale "$AGENTS_DIR"
  prune_stale "$COMMANDS_DIR"

  for skill_dir in "$SKILLS_DIR"/*/; do
    [[ -d "$skill_dir" ]] || continue
    prune_stale "$skill_dir"
  done

  if [[ $pruned -eq 0 ]]; then
    green "  ✓  No stale symlinks found"
  fi
  echo ""
fi

bold "✅ Update complete. Restart omp to apply (/exit, then omp)."
echo ""
