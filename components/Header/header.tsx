"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserMenu from "../Dropdown/dropdown";
import { getMe } from "@/utils/get-me";
import { searchManga } from "@/utils/search-manga";
import { useRouter } from "next/navigation";

import { FaSearch } from "react-icons/fa";

export default function Header() {
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

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Veuillez entrer un terme de recherche valide.");
      return;
    }
    try {
      const data = await searchManga(searchQuery);
      console.log(data);
      router.push(
        `/search-results/${encodeURIComponent(
          searchQuery
        )}?query=${encodeURIComponent(
          searchQuery
        )}&results=${encodeURIComponent(JSON.stringify(data))}`
      );
    } catch (error) {
      console.error("Error during search:", error);
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
        className={`${
          isOpen ? "block" : "hidden"
        }  flex-grow sm:flex sm:items-center sm:justify-center`}
      >
        <SearchInput />
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } flex sm:flex-grow sm:flex sm:items-center sm:space-x-4 sm:justify-end text-xl gap-4 mt-4 sm:mt-0`}
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
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          className="w-96 sm:w-96 h-12 px-4 rounded-full text-black border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          placeholder="Rechercher un manga"
          autoFocus
        />
         <button onClick={handleSearchSubmit} type="submit" className="ml-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
          <FaSearch  />
        </button>
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
