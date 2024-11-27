"use client";
import { useCallback, useEffect, useState } from "react";
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
import { getCsrf } from "@/utils/csrf";

const UserMenu = ({ user }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const csrf = await getCsrf();
      setCsrfToken(csrf);
    };

    fetchCsrfToken();
  }, []);

  const deconnexion = useCallback(() => {
    fetch(`${API_URL}/auth/deconnexion`, {
      method: "POST",
      credentials: "include",
      headers: {
        'x-csrf-token': csrfToken,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Déconnexion réussie");
          router.refresh();
          router.push("/connexion");
        } else {
          throw new Error("La déconnexion a échoué");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [csrfToken, router]);

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
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/update">Modification de Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/emprunt">Vos emprunts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deconnexion}>Déconnexion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
