/* eslint-disable react/no-unescaped-entities */
"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
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

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setAlert(true);
        reset();
      } else {
        console.error("Échec de l'envoi de l'email");
      }
    } catch (error) {
      console.error("Erreur dans l'envoi de l'email", error);
    }
  };
  return(
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-black p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Mot de passe oublie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Entrez votre email"
              {...register("email", {
                required: "Veuillez entrer votre email.",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
