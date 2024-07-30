// components/Header.tsx

"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserMenu from "../Dropdown/dropdown";
import { getMe } from "@/utils/get-me";
import { searchManga } from "@/utils/search-manga";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export default function Header({params}) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/${params.mangaId}`);
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-blue-700 text-white shadow-md">
      <div className="flex items-center justify-between flex-grow sm:flex-grow-0">
        <h1 className="text-3xl">Otakulinks</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-3xl"
        >
          <i>Menu</i>
        </button>
      </div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} sm:block flex-grow sm:flex sm:items-center sm:justify-center`}
      >
        <SearchInput />
      </div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} flex sm:flex-grow sm:flex sm:items-center sm:space-x-4 sm:justify-end text-xl gap-4 mt-4 sm:mt-0`}
      >
        <NavLink href="/" text="Home" />
        <NavLink href="/inscription" text="Inscription" />
        <NavLink href="/connexion" text="Connexion" />
        {user && <UserMenu user={user} />}
      </div>
    </nav>
  );

  function SearchInput() {
    return (
      <div className="relative">
        <form onSubmit={handleSearchSubmit}>
        <Input
        type="search"
        placeholder="Rechercher..."
        className="text-xl bg-[#333] placeholder:text-gray-50 w-full inline-block"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
        </form>
      </div>
    );
  }

  function NavLink({ href, text }) {
    return (
      <Link
        href={href}
        className="transition-colors duration-300 hover:text-gray-300"
      >
        {text}
      </Link>
    );
  }
}
