# ircord.com

This repository builds the public IRCord site. Use Bun 1.4.4.

```sh
bun install --frozen-lockfile
bun run dev
```

The development site listens on port 3100. Run `bun run lint`,
`bun run typecheck`, `bun run test`, and `bun run generate` to check and
build the site. Run `docker build .` to build the nginx image.

Standalone builds use the checked-in release notes and contributor list.
Release builds use the current files from the
[development environment](https://github.com/ircord/dev-environment).
Set `IRCORD_RELEASE_DIR` to their directory for a local preview.
