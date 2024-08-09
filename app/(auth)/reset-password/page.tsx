"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { API_URL } from "@/app/constants/api";
import { getCsrf } from "@/utils/csrf";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [csrfToken, setCsrfToken] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const csrf = await getCsrf();
      setCsrfToken(csrf);
    };

    fetchCsrfToken();
  }, []);

  const onSubmit = async (data) => {
    try {
      setErrorMessage(''); 
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-csrf-token': csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Demande de réinitialisation envoyée avec succès");
        setIsNotified(true);
        reset();
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la réinitialisation:", errorData);
        setErrorMessage(errorData.message || "Une erreur s'est produite");
        setIsNotified(false);
      }
    } catch (error) {
      console.error("Erreur dans la réinitialisation", error);
      setErrorMessage("Erreur réseau ou serveur");
      setIsNotified(false);
    }
  };

  return (
    <div className="flex justify-center items-center rounded-md brightness-75  bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Réinitialiser le mot de passe
        </h2>
        {isNotified && <p className="text-green-500 text-center mb-4">Demande de réinitialisation envoyée.</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "L'email n'est pas valide",
                },
              })}
            />
            {errors.email && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >
            Valider
          </Button>
        </form>
      </div>
    </div>
  );
}
