# Creator Kit

<p align="center">
  <img src="docs/promo.jpeg" alt="Creator Kit" width="600">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/creator-kit"><img src="https://img.shields.io/npm/v/creator-kit.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/creator-kit"><img src="https://img.shields.io/npm/dm/creator-kit.svg" alt="npm downloads"></a>
  <a href="https://github.com/mkremnev/creator-kit/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/creator-kit.svg" alt="license"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/node/v/creator-kit.svg" alt="node version"></a>
  <a href="https://github.com/mkremnev/creator-kit"><img src="https://img.shields.io/github/stars/mkremnev/creator-kit?style=social" alt="GitHub stars"></a>
</p>

<p align="center">
  CLI tool for scaffolding AI-assisted content creation workflow files.
</p>

---

## Installation

```bash
npm install -g creator-kit
```

## Quick Start

```bash
# Initialize in your project
cd my-content-project
creator init --ai claude

# Start creating content
# In Claude, run:
# /creator.constitution
# /creator.brief "Your content idea"
```

## Commands

### `creator init --ai claude`

Initialize creator-kit in the current directory. Creates:

- `.claude/commands/` - 8 workflow commands
- `.contents/templates/content/` - Social media templates
- `.contents/templates/workflow/` - Workflow templates
- `.contents/scripts/bash/` - Helper scripts
- `.contents/memory/constitution.md` - Content principles
- `.contents/config.json` - Configuration

Options:
- `--ai <provider>` - AI provider (required, currently only `claude`)
- `--force` - Overwrite existing files without prompt

### `creator update`

Update existing installation to latest templates.

Options:
- `--force` - Overwrite user-modified files (creates `.bak` backups)

## Workflow Commands

After initialization, use these commands in Claude:

| Command | Purpose |
|---------|---------|
| `/creator.constitution` | Define your content principles |
| `/creator.brief` | Create a content brief from an idea |
| `/creator.refine` | Refine and clarify the brief |
| `/creator.outline` | Create content outline/plan |
| `/creator.todo` | Generate task list |
| `/creator.write` | Write the content |
| `/creator.review` | Review and analyze content |
| `/creator.verify` | Verify against checklist |

## Content Templates

Pre-built templates for:
- LinkedIn posts
- Twitter/X threads
- Telegram posts

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CREATOR_KIT_DEBUG` | Enable debug output |
| `NO_COLOR` | Disable colored output |

## License

MIT
