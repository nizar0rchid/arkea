import type { Metadata } from 'next'

export const siteConfig: Metadata = {
  title: 'ArkeA',
  description: 'Welcome to ArkeA',
  keywords: [] as Array<string>,
  authors: {
    name: 'Nizar Ferchichi',
    url: 'https://github.com/nizar0rchid',
  },
} as const

/**
 * What the root route shows.
 *
 * - 'countdown' : teaser page, every other route redirects to /
 * - 'game'      : the game, as before the countdown was added
 * - 'home'      : the archived landing page, for bringing the site back
 *
 * Set NEXT_PUBLIC_SITE_STATE in the Vercel env to switch. Deliberately a
 * single variable with named states rather than booleans, so flipping from
 * countdown to game and later to the restored homepage is one value change
 * and never a branch merge.
 */
export type SiteState = 'countdown' | 'game' | 'home'

const parseState = (value: string | undefined): SiteState => {
  if (value === 'game' || value === 'home' || value === 'countdown') {
    return value
  }

  // Default to the countdown so an unset var in production cannot accidentally
  // expose the game early
  return 'countdown'
}

export const SITE_STATE = parseState(process.env.NEXT_PUBLIC_SITE_STATE)

export const isCountdown = SITE_STATE === 'countdown'
