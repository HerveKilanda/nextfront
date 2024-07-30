// components/Dropdown/dropdown.tsx

"use client";
import { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { API_URL } from "@/app/constants/api";
import { useRouter } from "next/navigation";

const UserMenu = ({ user }) => {
  const router = useRouter();
  const deconnexion = useCallback(() => {
    fetch(`${API_URL}/auth/deconnexion`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Deconnexion reussie");
          router.refresh();
          router.push("/connexion");
        } else {
          throw new Error("La deconnexion à echouer");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mon Profil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/update">Modification de Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/emprunt">Vos emprunts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deconnexion}>deconnexion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
