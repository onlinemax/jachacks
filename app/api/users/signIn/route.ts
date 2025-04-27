import { NextResponse } from "next/server";

function jSONResponse(data: any, status: number) {
    return new Response(JSON.stringify(data), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function POST(req: Request) {

    // email could be an username
    const { email, password }: { email?: string, password?: string } = await req.json();
    if (!email || !password) {
        return jSONResponse({ error: 'Missing credentials' }, 400);
    }

    // Call Auth0's /oauth/token endpoint
    const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'password',
            username: email,
            password,
            connection: 'MangoDb',
            realm: 'MangoDb',
            audience: process.env.AUTH0_AUDIENCE,
            scope: 'openid profile email',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
        }),
    });

    const { access_token, id_token, expires_in } = await tokenRes.json()

    // 3. Build a NextResponse and set a secure, httpOnly cookie
    const res = NextResponse.json({ success: true })
    res.cookies.set('auth_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: expires_in,  // in seconds
    })

    return res
}

