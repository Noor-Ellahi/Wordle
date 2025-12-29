import { Words } from '../../../data/words';
import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json(Words)
}