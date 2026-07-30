import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const day = d.getUTCDate()
  const month = months[d.getUTCMonth()]
  const year = d.getUTCFullYear()
  const hours = d.getUTCHours().toString().padStart(2, '0')
  const mins = d.getUTCMinutes().toString().padStart(2, '0')
  return `${month} ${day}, ${year} ${hours}:${mins}`
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('completiontime', { ascending: true })
      .limit(10)

    if (error) {
      console.error('Failed to fetch leaderboard:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leaderboard' },
        { status: 500 },
      )
    }

    const formatted = (data || []).map((entry) => ({
      ...entry,
      createdat: formatDate(entry.createdat),
    }))

    console.log(`[Leaderboard] GET — returned ${formatted.length} entries`)
    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { playerName, completionTime, country } = body

    if (
      !playerName ||
      typeof playerName !== 'string' ||
      playerName.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'Player name is required' },
        { status: 400 },
      )
    }

    if (typeof completionTime !== 'number' || completionTime < 60000000) {
      return NextResponse.json(
        { error: 'Completion time must be at least 1 minute' },
        { status: 400 },
      )
    }

    const { data: topScores } = await supabase
      .from('leaderboard')
      .select('completiontime')
      .order('completiontime', { ascending: true })
      .limit(10)

    const isTop10 =
      !topScores ||
      topScores.length < 10 ||
      completionTime < topScores.at(-1)?.completiontime

    console.log(
      `[Leaderboard] POST — ${playerName.trim()} ${(completionTime / 1_000_000).toFixed(1)}s ${country} — isTop10=${isTop10}`,
    )

    if (!isTop10) {
      return NextResponse.json(
        { error: 'Score not in top 10' },
        { status: 422 },
      )
    }

    const { data, error } = await supabase
      .from('leaderboard')
      .insert([
        {
          playername: playerName.trim(),
          completiontime: completionTime,
          country: country,
        },
      ])
      .select()

    if (error) {
      console.error('Failed to save score:', error)
      return NextResponse.json(
        { error: 'Failed to save score' },
        { status: 500 },
      )
    }

    console.log(`[Leaderboard] POST — score saved (id=${data?.[0]?.id})`)
    return NextResponse.json(data?.[0] || { success: true }, { status: 201 })
  } catch (error) {
    console.error('Failed to save score:', error)
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 })
  }
}
