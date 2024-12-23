  /* eslint-disable react/no-unescaped-entities */
"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { API_URL } from "@/app/constants/api";
import { getCsrf } from "@/utils/csrf";
import Link from "next/link";

export default function Connexion() {
  const [alert, setAlert] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      
    },
    mode: "onChange",
  });

  function Notification() {
    return (
      <div className="mb-3">
        {alert ? (
          <Alert className="bg-green-600 text-black">
            <AlertTitle>Félicitations !</AlertTitle>
            <AlertDescription>Connexion réussie.</AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-600 text-black">
            <AlertTitle>Erreur !</AlertTitle>
            <AlertDescription>Échec de la connexion.</AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const protection = await getCsrf();
      setCsrfToken(protection);
    };

    fetchCsrfToken();
  }, []);


  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-csrf-token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (response.ok) {
      
        console.log("Connexion réussie !");
        const responseData = await response.json();
        Cookie.set("token", responseData.token);
        setAlert(true);
        setIsNotified(true);
        reset();
      } else {
        console.error("Échec de la connexion");
        setAlert(false);
        setIsNotified(true);
      }
    } catch (error) {
      console.error("Erreur dans la connexion", error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error("Problème de connexion au serveur. Vérifiez l'URL de l'API et la configuration CORS.");
      }
      setAlert(false);
      setIsNotified(true);
    }
  };

  return (
    <div>
      {isNotified && <Notification />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative border-4 border-blueivy bg-black rounded w-96 py-10 px-8 md:mt-0 md:mx-w-sm md:px:14"
      >
        <h1 className="text-3xl text-center font-semibold text-white">
          Connexion
        </h1>
        <div className="space-y-5 mt-5 p-6">
          

          <Input
            type="text"
            placeholder="email"
            className="text-xl bg-[#333] placeholder:text-gray-50 w-full inline-block"
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "L'email n'est pas valide",
              },
            })}
          />
          {errors.email && (
            <p role="alert" className="text-red-500">
              {errors.email.message}
            </p>
          )}
          <Input
            type="password"
            placeholder="password"
            className="text-xl bg-[#333] placeholder:text-gray-50 w-full inline-block"
            {...register("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 12,
                message: "Le mot de passe doit contenir au moins 12 caractères",
              },
            })}
          />
          {errors.password && (
            <p role="alert" className="text-red-500">
              {errors.password.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={!isValid}>
            Valider
          </Button>
          <p className="text-white text-right underline">
            <Link href="/reset-password">Mot de passe oublie</Link>
          </p>
        </div>
        {isSubmitSuccessful && (
          <p className="text-green-500 text-center mt-4">
            Le formulaire a été soumis avec succès !
          </p>
        )}
      </form>
    </div>
  );
}
