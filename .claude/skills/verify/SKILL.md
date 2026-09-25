---
name: verify
description: Verify a UI change in the live preview — resize to a known-good viewport, screenshot, clear and re-read console logs, and report whether the UI rendered correctly with any real errors.
---

# verify

Run the standard visual verification loop after a UI change:

1. Ensure a preview server is running (`preview_start` if needed).
2. `preview_resize` to a known-good desktop viewport (**1440x900**) and confirm the dimensions actually applied before screenshotting — the harness can collapse to ~1px.
3. Reload the page, then take a `preview_screenshot`.
4. **Clear, then re-read** `preview_console_logs` fresh — do not trust a stale buffer. Only treat errors that appear after this reset as real.
5. Optionally repeat the screenshot at tablet (768) and mobile (375) widths.
6. Report whether the UI rendered correctly and list any real errors (with proof: screenshot + fresh console output).

If issues are found, read the source, fix, and repeat from step 3.
