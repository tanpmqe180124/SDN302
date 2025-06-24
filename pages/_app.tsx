import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function NavBar() {
  const { data: session, status } = useSession();
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur shadow-sm mb-8 px-4 py-3 flex justify-between items-center border-b border-gray-200">
      <div>
        <Link
          href="/"
          className="font-extrabold text-2xl text-blue-700 tracking-tight hover:opacity-80 transition"
        >
          Clothing Store
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {!session && status !== "loading" && (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
        {session && (
          <>
            <span className="text-gray-700 font-medium mr-2 hidden sm:inline">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-12">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
