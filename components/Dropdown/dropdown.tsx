"use client"
import { useState, useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronCircleDown } from "react-icons/fa";
import Cookies from 'js-cookie';
import React from 'react';
import { useRouter } from 'next/navigation';
export default function AvatarDropdown() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data.data);  // Assuming the user data is under 'data' key
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8000/auth/deconnexion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        console.log('Déconnexion réussie');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/connexion');
      } else {
        console.log('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    isLoggedIn && (
      <div className="flex items-center justify-center">
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <Avatar aria-label="Profil" style={{ zIndex: 20 }}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <FaChevronCircleDown
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
                >
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/update"
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm`}
                        >
                          Modifier le profil
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm`}
                        >
                          Se déconnecter
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    )
  );
}
