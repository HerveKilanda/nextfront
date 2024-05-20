import { Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Dropdown from "../Dropdown/dropdown";


export default function Header() {
  return (
    <nav className="flex flex-wrap items-center justify-between w-full p-4 bg-blue-700 text-white shadow-md">
      <div className="flex items-center flex-shrink-0 text-3xl">Otakulinks</div>
      <div className="block sm:hidden">
        <button
          type="button"
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="text-sm sm:flex-grow">
          <form className="flex items-center w-full justify-center">
            <input
              type="search"
              className="w-96 ml-28 h-12 px-4 rounded-full  text-black border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Rechercher un manga"
            />
            <Search
              size={24}
              strokeWidth={3}
              className="ml-2 relative right-10 text-black cursor-pointer"
            />
          </form>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:flex-grow sm:justify-end text-xl">
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/inscription"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Inscription
          </Link>
          <Link
            href="/connexion"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Connexion
          </Link>
          <Dropdown />
        </div>
      </div>
    </nav>
  );
}
