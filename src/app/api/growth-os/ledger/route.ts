import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

const LEDGER_PATH = join(process.cwd(), 'quietforge-growth-os', 'content-engine', 'ledger.json');

export interface LedgerEntry {
  timestamp: string;
  proposal_id?: string;
  post_id?: string;
  clientId: 'flexgrafik' | 'quietforge';
  agent: string;
  expected_cpa: number;
  actual_cpa: number;
  dwell_time_seconds: number;
  impressions: number;
  clicks: number;
  saves: number;
  bookings_count: number;
  reliability_score: number;
  was_profitable: boolean;
  metrics?: {
    estimated_cpa?: number;
    clicks?: number;
    saves?: number;
    bookings_count?: number;
  };
}

interface LedgerRequestBody {
  timestamp?: string;
  proposal_id?: string;
  post_id?: string;
  clientId: 'flexgrafik' | 'quietforge';
  agent: string;
  expected_cpa: number;
  actual_cpa: number;
  dwell_time_seconds: number;
  impressions: number;
  clicks: number;
  saves: number;
  bookings_count: number;
  reliability_score: number;
  was_profitable: boolean;
  metrics?: {
    estimated_cpa?: number;
    clicks?: number;
    saves?: number;
    bookings_count?: number;
  };
}

async function ensureLedgerDir() {
  const dir = join(process.cwd(), 'quietforge-growth-os', 'content-engine');
  try {
    await mkdir(dir, { recursive: true });
  } catch {}
}

async function getLedgerData(): Promise<LedgerEntry[]> {
  await ensureLedgerDir();
  try {
    const fileContent = await readFile(LEDGER_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    // Return default mock data if file doesn't exist
    return [
      {
        timestamp: "2026-08-09T14:30:00Z",
        proposal_id: "post_1_linkedin_inbox",
        clientId: "quietforge",
        agent: "DemandTrust",
        expected_cpa: 150,
        actual_cpa: 96.60,
        dwell_time_seconds: 42.5,
        impressions: 1240,
        clicks: 98,
        saves: 14,
        bookings_count: 3,
        reliability_score: 1.0,
        was_profitable: true
      },
      {
        timestamp: "2026-08-09T15:00:00Z",
        proposal_id: "post_2_linkedin_wizard",
        clientId: "quietforge",
        agent: "ConversionRetention",
        expected_cpa: 290,
        actual_cpa: 240.00,
        dwell_time_seconds: 38.0,
        impressions: 850,
        clicks: 45,
        saves: 8,
        bookings_count: 1,
        reliability_score: 1.0,
        was_profitable: true
      }
    ];
  }
}

async function saveLedgerData(data: LedgerEntry[]): Promise<void> {
  await ensureLedgerDir();
  await writeFile(LEDGER_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = await getLedgerData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Ledger API] GET error:', error);
    return NextResponse.json({ error: 'Failed to read ledger' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LedgerRequestBody;
    const ledger = await getLedgerData();
    
    const newEntry: LedgerEntry = {
      timestamp: new Date().toISOString(),
      ...body
    };
    
    ledger.push(newEntry);
    await saveLedgerData(ledger);
    
    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('[Ledger API] POST error:', error);
    return NextResponse.json({ error: 'Failed to write ledger' }, { status: 500 });
  }
}