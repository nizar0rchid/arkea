import { NextResponse, type NextRequest } from 'next/server'

import { isCountdown } from '@/config'

/**
 * During the countdown the site is a single teaser page, so every other route
 * redirects to /. Driven by NEXT_PUBLIC_SITE_STATE so this can be lifted by
 * changing one env var rather than by merging a revert branch.
 *
 * The matcher keeps /api, Next internals and static assets out of scope, so
 * the leaderboard API and the game bundle are unaffected. .html is
 * deliberately not excluded, which means /game-content/index.html is gated
 * too and the raw game is not reachable until launch.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isCountdown) {
    return NextResponse.next()
  }

  if (pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|json|js|css|woff2?|ttf|otf|eot|mp4|webm|pdf|xml|txt|wasm|pck)).*)',
  ],
}
