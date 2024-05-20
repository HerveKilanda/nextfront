"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { useForm, useFormState } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import result from "postcss/lib/result";



export default  function Connexion() {
  const [alert, setAlert] = useState(false)
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/auth/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Assurez-vous que les cookies sont inclus
        body: JSON.stringify(data), // Correction de la syntaxe
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Connexion réussie", result);
        setAlert(true);
        reset();
      }

      // Afficher l'alerte en cas de succès
    } catch (error) {
      if (error.response) {
        const data = await error.response.json();
        console.error("Erreur de connexion:", error.response.message);
      } else {
        console.error("Erreur lors de la requête", error);
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center mt-48">
      {alert && (
        <Alert className="mb-3 bg-green-600 text-black ">
          <AlertTitle>Félicitations !</AlertTitle>
          <AlertDescription>
            Vous vous êtes connecté et vous pouvez accéder maintenant aux mangas
            disponibles !
          </AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative border-4 border-blueivy bg-black rounded w-96 py-10 px-8 md:mt-0 md:mx-w-sm md:px:14 "
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
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères",
              },
            })}
          />
          {errors.password && (
            <p role="alert" className="text-red-500">
              {errors.password.message}
            </p>
          )}
          <Button
            onClick={() => setAlert(true)}
            type="submit"
            className="w-full"
          >
            Connectez-vous
          </Button>
        </div>
      </form>
    </div>
  );

}