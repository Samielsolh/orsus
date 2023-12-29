import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import {cookies} from "next/headers";

export async function POST(req){
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    if(session){
        await supabase.auth.signOut()
    }

    return NextResponse.redirect(new URL('/', req.url), {status: 302})

}