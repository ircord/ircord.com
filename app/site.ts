/** Addresses the website links to. */
const org = 'https://github.com/ircord'
const hosting = `${org}/hosting`

export const site = {
  url: 'https://ircord.com',
  tagline: 'Your IRC, wherever you are',
  app: 'https://chat.ircord.com',
  /** Opens the app on its sign-up form. */
  signup: 'https://chat.ircord.com/?signup',
  ircNetwork: 'irc.ircord.com',
  repo: org,
  docker: `${hosting}#docker-compose`,
  kubernetes: `${hosting}#kubernetes`,
  ergo: `${hosting}#associated-ergo-server`,
  issues: `${org}/issues/issues`,
  cliReleases: `${org}/cli/releases/latest`,
  desktop: `${org}/desktop`,
  mobile: `${org}/mobile`,
  license: `${org}/ircord.com/blob/main/LICENSE`,
}

export const desktopDownloads = [
  { label: 'macOS (Apple Silicon)', asset: 'IRCord-macOS-Apple-Silicon.dmg' },
  { label: 'Windows (x64)', asset: 'IRCord-Windows-x64-setup.exe' },
  { label: 'Linux (x64, .deb)', asset: 'IRCord-Linux-x64.deb' },
].map(({ label, asset }) => ({
  label,
  href: `${site.desktop}/releases/latest/download/${asset}`,
}))
