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

test('allows the desktop project to be missing a changelog before its first release', async () => {
  const missing = async () => new Response(null, { status: 404 })
  assert.deepEqual(await readComponentChangelog('desktop', missing), [])
  await assert.rejects(readComponentChangelog('frontend', missing), /frontend.*HTTP 404/)
})

test('reports a GitHub error instead of showing an empty changelog', async () => {
  const unavailable = async () => new Response(null, { status: 503 })
  await assert.rejects(readComponentChangelog('desktop', unavailable), /desktop.*HTTP 503/)
})
