import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Mirrors the three hooks in the game's analytics script: game_started,
// game_ended and reward_claimed, which post to /start, /end and /claim.
const EVENTS = new Set(['start', 'end', 'claim'])

/**
 * Counted in the Supabase analytics_events table, one row per call, so counts
 * can be sliced by event or by day without a second aggregation step.
 *
 * Fire and forget from the game's side: Godot treats a non-2xx as a background
 * failure and carries on. Every failure path still returns 2xx so a transient
 * database problem never surfaces to the player as a broken game.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ event: string }> },
) {
  const { event } = await params

  if (!EVENTS.has(event)) {
    console.log(`[Analytics] POST — rejected unknown event "${event}"`)
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
      console.error(`[Analytics] POST — insert failed (${event}):`, error)
      return NextResponse.json({ ok: true })
    }

    console.log(`[Analytics] POST — recorded ${event}`)
  } catch (error) {
    console.error(`[Analytics] POST — failed (${event}):`, error)
  }

  return NextResponse.json({ ok: true })
}

// Stops anyone probing the endpoint to fingerprint what it accepts
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
