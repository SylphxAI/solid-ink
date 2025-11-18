# Bun Demo for @sylphx/solid-tui

Simple demo showing Bun runtime support.

## Setup

```bash
bun install
```

## Run

```bash
bun --conditions=browser demo.tsx
```

## Files

- `bunfig.toml` - Bun configuration with preload
- `demo.tsx` - Simple counter demo
- `package.json` - Dependencies

## Key Points

1. **bunfig.toml** required for JSX transformation
2. Run with `--conditions=browser` to load correct solid-js exports
3. Preload automatically transforms JSX for terminal rendering
