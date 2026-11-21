// Small additions to the script-free pages. Every page works without this file.

// Closes the phone menu in the site header (SiteHeader.vue) after a link in it is chosen, on a
// tap outside it, and on Escape. Without this script the menu still opens and closes.
const menu = document.getElementById('site-menu')

if (menu) {
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.open = false
  })
  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false
  })
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.open) return
    menu.open = false
    menu.querySelector('summary').focus()
  })
}

// Shows the copy button on each terminal block (index.vue). It copies the commands without
// their `$ ` prompts.
for (const terminal of document.querySelectorAll('[data-terminal]')) {
  const button = terminal.querySelector('[data-copy]')
  const label = terminal.querySelector('[data-copy-label]')
  const code = terminal.querySelector('code')
  if (!button || !label || !code || !navigator.clipboard) continue

  const idle = label.textContent
  let reset
  button.hidden = false
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.replace(/^\$ /gm, ''))
      label.textContent = 'Copied'
    } catch {
      label.textContent = 'Couldn’t copy'
    }
    clearTimeout(reset)
    reset = setTimeout(() => (label.textContent = idle), 2000)
  })
}
