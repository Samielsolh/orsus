import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// Exporting an asynchronous middleware function that will be called with the request object.
export async function middleware(req) {
    try {
        const res = NextResponse.next();
        const supabase = createMiddlewareClient({ req, res });
        const { data: { user } } = await supabase.auth.getUser();

        if (user && req.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/rounds', req.url));
        }

        if (!user && req.nextUrl.pathname !== '/') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return res;
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.error({ status: 500 });
    }
}
// Configuring the middleware to run on specific routes - the home page ('/') and the '/watch-list' page.
export const config = {
    matcher: ['/', '/rounds']
};