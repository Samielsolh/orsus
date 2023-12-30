import Link from "next/link";
import { DollarSignIcon, HomeIcon, PlusIcon, RainbowIcon, DatabaseIcon } from '../icons';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";



export default async function Rounds() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({cookies: () => cookieStore});
  const {data: {session}} = await supabase.auth.getSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigation.navigate("/auth/signout"); // Use navigation to navigate
  };

  return (
    <div>
      <form action="/auth/signout" method="post">
                <button 
              type="submit" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
              sign out
          </button>
      </form>
    </div>
  );
}
