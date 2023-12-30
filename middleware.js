import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// Exporting an asynchronous middleware function that will be called with the request object.
export async function middleware(req) {
    // Creating a Next.js response object.
    const res = NextResponse.next();
    // Initializing a Supabase client for the middleware, passing in the request and response objects.
    const supabase = createMiddlewareClient({ req, res });

    // Using the Supabase client to get the current user based on the request.
    const { data: { user } } = await supabase.auth.getUser();

    // Redirecting authenticated users trying to access the home page ('/') to the '/rounds' page.
    if (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/rounds', req.url));
    }

    // Redirecting unauthenticated users trying to access any page other than the home page ('/') back to the home page.
    if (!user && req.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Returning the response object if none of the above conditions are met.
    return res;
}

// Configuring the middleware to run on specific routes - the home page ('/') and the '/watch-list' page.
export const config = {
    matcher: ['/', '/rounds']
};
