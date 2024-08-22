"use client"

import { useAppSelector } from "@/lib/storeHooks";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
  // Client check to prevent SSR Hydration issues
  const [isClient, setIsClient] = useState(false);
  const { favourites } = useAppSelector((state) => state.favourite);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav
      className="text-center text-white mt-8"
      data-testid="error"
    >
      <Link 
        href="/"
        className="inline-block text-lg text-white bg-gradient-to-br from-purple-700 to-purple-500 rounded-lg px-4 py-2 text-center shadow-sm transform transition duration-250 hover:scale-105"
      >
        Home
      </Link>
      <Link
        href="/form/search"
        className="inline-block text-lg text-white bg-gradient-to-br from-purple-700 to-purple-500 rounded-lg px-4 py-2 text-center ml-4 shadow-sm transform transition duration-250 hover:scale-105"
      >
        Search
      </Link>
    </nav>
  );
};

export default Navigation;