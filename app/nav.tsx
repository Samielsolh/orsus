import Navbar from './navbar';
import React from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function Nav() {

  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore})
  const {data: {session}} = await supabase.auth.getSession();

  return <Navbar user={session?.user} />;
  
}
