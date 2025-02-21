import { CategoryApis } from '@/constants/apiUrl';
import { BASE_URL } from '@/constants/constant';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_URL = `${BASE_URL}${CategoryApis.getCategory}?page=1&size=8&sort=%5B"created%2CDESC"%5D`;

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data', details: error }, { status: 500 });
  }
}
