# CLAUDE.md

Guidance for Claude Code when working in this repository.

This is a **Vite + React 19** single-page portfolio site (React Router, Lucide icons). Contact form delivery runs through a Netlify function backed by Brevo.

## Preview & Verification

- After making UI changes, always verify functionality with a properly-sized preview viewport: **resize before screenshot** (the preview harness can collapse to a ~1px viewport and produce blank/black screenshots).
- **Clear stale console buffers before diagnosing errors.** Reload, then re-read the console fresh — stale buffers have previously led to chasing phantom errors that were already resolved.
- Order of operations for any UI check: resize → clear console → reload → screenshot → re-read logs. Only report errors that appear after this reset.

## Debugging

- This project uses **JavaScript/TypeScript with Vite + React** (not Next.js).
- When `'X is not defined'` errors persist after a fix, verify all refs/handlers are actually declared and in scope before assuming the fix worked.
- If a stale build seems to blame, clear Vite's cache (`rm -rf node_modules/.vite`) and restart the dev server rather than trusting hot-module-reload state.
- Confirm a fix functionally by reproducing the failing interaction (e.g. clicking the element) in the preview — don't declare it fixed without demonstrating it.

## UI Development

- For UI/portfolio work, build the **full visual mockups** — not text placeholders with token icons — and confirm each frame/section visually before moving on.
- Treat the described design intent as the fidelity target; when a first pass comes back simplified or text-heavy, rebuild to match the intended visual result.
