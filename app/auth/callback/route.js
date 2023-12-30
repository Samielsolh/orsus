import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    const {searchParams} = new URL(req.url)

    const code = searchParams.get('code');

    if (code) {
        // Attempt to exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);
    
        if (error) {
            // Throw an error if the code exchange fails
            throw new Error("Code exchange failed: " + error.message);
        }
    }
    
    // Redirect to '/rounds' after successful code exchange
    return NextResponse.redirect(new URL('/rounds', req.url));   
}