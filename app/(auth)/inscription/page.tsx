/* eslint-disable react/no-unescaped-entities */
"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCsrf } from "@/utils/csrf";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Inscription() {
  const [alert, setAlert] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onChange", // Validate form on change
  });

  function Notification() {
    return (
      <div className="mb-3">
        {alert ? (
          <Alert className="bg-green-600 text-black">
            <AlertTitle>Félicitations !</AlertTitle>
            <AlertDescription>Inscription réussie.</AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-600 text-black">
            <AlertTitle>Erreur !</AlertTitle>
            <AlertDescription>Échec de l'inscription.</AlertDescription>
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
      const response = await fetch(`http://localhost:5000/auth/inscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Inscription reussie avec success !");
        setAlert(true);
        setIsNotified(true);
        reset();
      } else {
        console.error("Échec de l'inscription");
        setAlert(false);
        setIsNotified(true);
      }
    } catch (error) {
      console.error("Erreur dans l'inscription", error);
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
          Inscription
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
            type="text"
            placeholder="username"
            className="text-xl bg-[#333] placeholder:text-gray-50 w-full inline-block"
            {...register("username", {
              required: "Le nom d'utilisateur est requis",
            })}
          />
          {errors.username && (
            <p role="alert" className="text-red-500">
              {errors.username.message}
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
