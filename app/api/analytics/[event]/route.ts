import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Mirrors the three hooks in the game's analytics script: game_started,
// game_ended and reward_claimed, which post to /start, /end and /claim.
const EVENTS = new Set(['start', 'end', 'claim'])

type RouteContext = { params: Promise<{ event: string }> }

/**
 * Counted in the Supabase analytics_events table, one row per call, so counts
 * can be sliced by event or by day without a second aggregation step.
 *
 * Exported as both GET and POST because the game calls
 * HTTPRequest.request(url) with no method argument, and Godot 4 defaults that
 * to GET. POST alone returned 405. GET is a reasonable verb for a beacon and
 * avoids a CORS preflight, so both are accepted rather than requiring a game
 * rebuild.
 *
 * Fire and forget from the game's side: Godot treats a non-2xx as a background
 * failure and carries on. Every failure path still returns 2xx so a transient
 * database problem never surfaces to the player as a broken game.
 */
async function record(
  request: NextRequest,
  { params }: RouteContext,
  verb: string,
) {
  const { event } = await params

  if (!EVENTS.has(event)) {
    console.log(`[Analytics] ${verb} — rejected unknown event "${event}"`)
    return NextResponse.json({ ok: true })
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.from('analytics_events').insert({
      event,
      useragent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
    })

    if (error) {
      console.error(`[Analytics] ${verb} — insert failed (${event}):`, error)
      return NextResponse.json({ ok: true })
    }

    console.log(`[Analytics] ${verb} — recorded ${event}`)
  } catch (error) {
    console.error(`[Analytics] ${verb} — failed (${event}):`, error)
  }

  return NextResponse.json({ ok: true })
}

export async function POST(request: NextRequest, context: RouteContext) {
  return record(request, context, 'POST')
}

export async function GET(request: NextRequest, context: RouteContext) {
  return record(request, context, 'GET')
}
