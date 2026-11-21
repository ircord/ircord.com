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
