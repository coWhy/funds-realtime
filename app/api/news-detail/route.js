import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const newsid = searchParams.get('newsid');

  if (!newsid) {
    return NextResponse.json({ error: 'Missing newsid' }, { status: 400 });
  }

  // Target URL with parameters from user's curl command
  const targetUrl = `https://newsinfo.eastmoney.com/kuaixun/v2/api/content/getnews?newsid=${newsid}&newstype=1&guid=appzxzw3a6955ac-8410-f613-62f9-ed66a9c23dd7&source=wap&version=1&language=&pkg=`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Connection': 'keep-alive',
        'Origin': 'https://wap.eastmoney.com',
        'Referer': 'https://wap.eastmoney.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
