import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const time = Number(request.nextUrl.searchParams.get('time'))
    if (!time || time < 60000000) {
      console.log(`[Leaderboard] CHECK — rejected: time=${time} (min 60000000)`)
      return NextResponse.json(
        { error: 'Valid time (in microseconds, min 60000000) is required' },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    const { data: topScores } = await supabase
      .from('leaderboard')
      .select('completiontime')
      .order('completiontime', { ascending: true })
      .limit(10)

    const threshold = topScores?.at(-1)?.completiontime ?? null
    const isTop10 = !topScores || topScores.length < 10 || time < threshold

    console.log(
      `[Leaderboard] CHECK — ${(time / 1_000_000).toFixed(1)}s isTop10=${isTop10} threshold=${threshold ? (threshold / 1_000_000).toFixed(1) + 's' : 'N/A'}`,
    )

    return NextResponse.json({ isTop10, threshold })
  } catch (error) {
    console.error('Failed to check leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to check leaderboard' },
      { status: 500 },
    )
  }
}
