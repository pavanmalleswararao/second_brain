"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Second Brain
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-indigo-600"
          >
            Dashboard
          </Link>

          {!session && (
            <Link
              href="/signin"
              className="text-gray-700 hover:text-indigo-600"
            >
              Sign In
            </Link>
          )}

          {session && (
            <div className="relative">
              <button
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                onClick={() => setOpen((o) => !o)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.33 0 4.523.565 6.379 1.554M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {session.user?.email}
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/signin" });
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
