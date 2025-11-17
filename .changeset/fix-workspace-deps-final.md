---
"@sylphx/solid-tui-inputs": patch
"@sylphx/solid-tui-components": patch
"@sylphx/solid-tui-markdown": patch
"@sylphx/solid-tui-visual": patch
---

fix: resolve workspace:* dependencies in published packages

Now using prepare-publish script to replace workspace:* with actual versions before publishing.
