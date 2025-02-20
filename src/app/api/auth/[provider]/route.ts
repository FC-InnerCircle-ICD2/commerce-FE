import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://3.37.67.153:8082/';

export async function GET(request: NextRequest, { params }: { params: { provider: string } }) {
    const provider = (await params).provider;

    try {
        const response = await fetch(`${API_BASE_URL}api/v1/auth/uri/${provider}`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch auth URL' }, { status: response.status });
        }

        const data = await response.text();
        console.log('auth url',data)
        return NextResponse.json({ url: data });

    } catch (error) {
        console.error('OAuth URL 요청 실패:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
