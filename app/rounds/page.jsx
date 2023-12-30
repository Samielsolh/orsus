import Link from "next/link";
import { DollarSignIcon, HomeIcon, PlusIcon, RainbowIcon, DatabaseIcon } from '../icons';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Nav } from "../nav";

export default async function Rounds() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <div>
      <main>
        <Nav />
        <h1 className="flex justify-center"> Hey {user?.email}! </h1>
      </main>
    </div>
  );
}
