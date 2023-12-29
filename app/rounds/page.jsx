import Link from "next/link"
import { DollarSignIcon, HomeIcon, PlusIcon, RainbowIcon, DatabaseIcon} from '../icons';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Component() {
  return (
    <div key="1" className="grid min-h-screen w-full lg:grid-cols-[200px_1fr]">
      {/* Navigation Sidebar */}
      <div className="hidden border-r bg-[#f5f5f5] lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/">
              <RainbowIcon className="rainbow-icon h-6 w-6" />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link href="#">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <HomeIcon className="h-4 w-4" />
                  Home
                </div>
              </Link>
              <Link href="#">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <DollarSignIcon className="h-4 w-4" />
                  Fundraises
                </div>
              </Link>
              <Link href="#">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  <DatabaseIcon className="h-4 w-4" />
                  My Database
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Fundraise Section */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <h1 className="font-semibold text-lg md:text-2xl">Fundraises</h1>
        {/* You can add content for Fundraises here */}
      </main>
    </div>
  );
}