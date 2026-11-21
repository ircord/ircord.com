# ircord.com

This repository builds the public IRCord site. Use Bun 1.4.4.

```sh
bun install --frozen-lockfile
bun run dev
```

The development site listens on port 3100. Run `bun run lint`,
`bun run typecheck`, `bun run test`, and `bun run generate` to check and
build the site. Run `docker build .` to build the nginx image.

The changelog pages load release notes from GitHub when readers open them.
The static build serves the page layout and includes links to the source repositories.

Builds use the checked-in contributor list. Set `IRCORD_RELEASE_DIR` to a directory
containing a different `COLLABORATORS.md` for a local preview.

## Release the website

Move the website changes under `Unreleased` in `CHANGELOG.md` to a dated release
section. Push the release commit and its version tag from this repository.
The [publish workflow](.github/workflows/publish.yaml) runs the website checks,
publishes `ghcr.io/ircord/ircord-website`, and creates a GitHub release from the
matching changelog section. Flux watches stable `vX.Y.Z` tags for production.
