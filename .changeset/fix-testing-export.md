---
"@sylphx/solid-tui": patch
---

Fix missing ./testing export in published package

The ./testing export was defined in package.json but not included in the published v1.0.1 package. This fixes test imports from '@sylphx/solid-tui/testing'.
