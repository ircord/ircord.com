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
