/* eslint-disable react/no-unescaped-entities */
"use client";
import { API_URL } from "@/app/constants/api";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function EmpruntUpdate() {
  const [alert, setAlert] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      mal_id: "",
      
    },
    mode: "onChange", // Validate form on change
  });

  function Notification() {
    return (
      <div className="mb-3">
        {alert ? (
          <Alert className="bg-green-600 text-black">
            <AlertTitle>Félicitations !</AlertTitle>
            <AlertDescription>Suppression réussie.</AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-600 text-black">
            <AlertTitle>Erreur !</AlertTitle>
            <AlertDescription>Veuillez recommencez</AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/emprunt/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...data,
         
          
        }),
      });

      if (response.ok) {
        console.log("Connexion réussie avec le backend NestJS");
        setAlert(true);
        setIsNotified(true);
        reset();
      } else {
        console.error("Erreur lors de la modification des données");
        setAlert(false);
        setIsNotified(true);
      }
    } catch (error) {
      console.error("Erreur", error);
      setAlert(false);
      setIsNotified(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
      {isNotified && <Notification />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white bg-opacity-70 shadow-lg rounded-lg w-full max-w-md text-black  p-10"
      >
        <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">
          Suppression de l'emprunt
        </h1>
        <div className="space-y-5">
          <div>
            <Input
              type="number"
              placeholder="ID de l'emprunt (mal_id)"
              className="text-xl bg-gray-100 placeholder-gray-500 text-center w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              {...register("mal_id", {
                required: "L'id est requis",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "L'id n'est pas valide",
                },
              })}
            />
            {errors.mal_id && (
              <p role="alert" className="text-red-500 mt-1 text-sm">
                {errors.mal_id.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-700 transition duration-300"
            disabled={!isValid}
          >
            Valider
          </Button>
        </div>
       
        {isSubmitSuccessful && (
          <p className="text-green-500 text-center mt-4">
            Vos informations ont été modifiées avec succès
          </p>
        )}
      </form>
    </div>
  );
}
