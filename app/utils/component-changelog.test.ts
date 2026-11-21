import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { readComponentChangelog } from './component-changelog'

test('reads released notes from the selected GitHub repository', async () => {
  const releases = await readComponentChangelog('backend', async (url, options) => {
    assert.equal(url, 'https://raw.githubusercontent.com/ircord/backend/main/CHANGELOG.md')
    assert.equal(options?.cache, 'no-cache')
    assert.equal(options?.credentials, 'omit')
    return new Response('## Unreleased\n\n- Draft note.\n\n## v1.2.3\n\n- Published note.\n')
  })
  assert.deepEqual(
    releases.map(({ version }) => version),
    ['v1.2.3'],
  )
})

test('uses published desktop releases in release order', async () => {
  const releases = await readComponentChangelog('desktop', async (url) => {
    assert.equal(url, 'https://api.github.com/repos/ircord/desktop/releases?per_page=30')
    return Response.json([
      {
        tag_name: 'v0.1.0',
        published_at: '2026-11-21T15:00:00Z',
        body: '### New\n\n- First release.',
      },
      {
        tag_name: 'v0.1.1',
        published_at: '2026-11-21T16:00:00Z',
        body: '## Fixed\n\n- Bundled fix.',
      },
      {
        tag_name: 'v0.1.2',
        published_at: '2026-11-21T17:00:00Z',
        draft: true,
        body: '- Draft note.',
      },
      {
        tag_name: 'v0.2.0',
        published_at: '2026-11-21T17:00:00Z',
        prerelease: true,
        body: '- Preview.',
      },
    ])
  })
  assert.deepEqual(
    releases.map(({ version }) => version),
    ['v0.1.1', 'v0.1.0'],
  )
  assert.equal(releases[0]?.groups[0]?.title, 'Fixed')
})

test('allows an empty desktop release list', async () => {
  assert.deepEqual(await readComponentChangelog('desktop', async () => Response.json([])), [])
})

test('reports a GitHub error instead of showing an empty changelog', async () => {
  const unavailable = async () => new Response(null, { status: 503 })
  await assert.rejects(readComponentChangelog('desktop', unavailable), /desktop.*HTTP 503/)
})
