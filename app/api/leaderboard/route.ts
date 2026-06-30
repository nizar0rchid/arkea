import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

async function getCountry(request: NextRequest): Promise<string | null> {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous'

    if (ip === 'anonymous' || ip.startsWith('::')) {
      return null
    }

    const response = await fetch(`http://ipapi.co/${ip}/json/`, {
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) return null

    const data = await response.json()
    return data?.country_code || null
  } catch {
    return null
  }
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

    return NextResponse.json(data || [])
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
    const { playerName, completionTime } = body

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

    if (typeof completionTime !== 'number' || completionTime < 0) {
      return NextResponse.json(
        { error: 'Valid completion time is required' },
        { status: 400 },
      )
    }

    const country = await getCountry(request)

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

    return NextResponse.json(data?.[0] || { success: true }, { status: 201 })
  } catch (error) {
    console.error('Failed to save score:', error)
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 })
  }
}
