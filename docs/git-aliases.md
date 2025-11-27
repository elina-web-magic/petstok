# Git aliases for Petstok

This file lists the shortened git commands configured via `~/.zshrc`.

> All aliases are added to `~/.zshrc`. After changes, restart the shell:
>
> ```bash
> exec "$SHELL"
> ```

## Status and staging

| Alias | Full command            | Description                            |
| ----- | ----------------------- | -------------------------------------- |
| `gs`  | `git status`            | Show repository status                 |
| `ga`  | `git add`               | Add file(s) to the index               |
| `gaa` | `git add .`             | Add all modified files                 |

## Switching branches

| Alias | Full command                | Description                            |
| ----- | --------------------------- | -------------------------------------- |
| `gco` | `git checkout`              | Switch to an existing branch           |
| `gcb` | `git checkout -b`           | Create a new branch and switch to it   |

**Example:**

```bash
gco main
gcb feature/release-1-core-feed
