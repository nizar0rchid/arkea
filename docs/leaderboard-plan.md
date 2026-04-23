# Leaderboard Feature Plan

## Overview

Add a leaderboard feature allowing players to submit their game completion times and view rankings. The leaderboard is displayed in-game only, and requires player names.

## Architecture

```
Godot Game → HTTP Requests → Next.js API Routes → SQLite Database (via Prisma)
```

## Implementation Steps

### 1. Set Up Database

- Install Prisma and SQLite
- Initialize Prisma with `prisma init`
- Define `Leaderboard` model in `schema.prisma`:
  - id: Int (primary key, auto-increment)
  - playerName: String (required)
  - completionTime: Float (time in seconds)
  - createdAt: DateTime (default: now)
- Run migration to create database

### 2. Create Next.js API Routes

Create the following endpoints in `app/api/leaderboard/`:

#### GET /api/leaderboard
- Fetch top 10 scores
- Return sorted by completionTime ascending (fastest first)
- No authentication required

#### POST /api/leaderboard
- Accept JSON: `{ playerName: string, completionTime: number }`
- Validate input (non-empty name, positive time)
- Insert into database
- Return the saved entry

### 3. Update Godot Game

Modify Godot source files to:

#### Send Score on Game Completion
- When player completes the game, send POST request to `/api/leaderboard`
- Payload: `{ playerName: string, completionTime: float }`
- Handle success/failure responses

#### Display Leaderboard In-Game
- Add UI element to show top scores
- Fetch from GET `/api/leaderboard`
- Display rankings with player names and times

### 4. Data Flow

1. Player finishes game
2. Godot prompts for player name (or uses saved name)
3. Godot sends `{ playerName, completionTime }` to API
4. API validates and saves to SQLite
5. Leaderboard UI fetches and displays rankings

## File Changes

### New Files (Next.js)

- `prisma/schema.prisma` - Database schema
- `app/api/leaderboard/route.ts` - GET and POST endpoints

### Modified Files (Godot)

- `time_manager.gd` - Send score on completion
- Create new leaderboard UI script
- Add HTTPRequest node for API calls

## Configuration

- Leaderboard shows top 10 scores
- Times stored in seconds (lower is better)
- No authentication required for simplicity
- No need for gameId (single leaderboard for now)