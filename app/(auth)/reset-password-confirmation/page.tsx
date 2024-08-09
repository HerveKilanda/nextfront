"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/constants/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { getCsrf } from "@/utils/csrf";

export default function ResetPasswordConfirmation() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [csrfToken, setCsrfToken] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
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
      const response = await fetch(`${API_URL}/auth/reset-password-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-csrf-token': csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setAlert({ type: "success", message: "Mot de passe réinitialisé avec succès." });
        reset();
      } else {
        const errorData = await response.json();
        setAlert({ type: "error", message: errorData.message || "Erreur lors de la réinitialisation." });
      }
    } catch (error) {
      console.error("Erreur dans la réinitialisation du mot de passe", error);
      setAlert({ type: "error", message: "Erreur lors de la réinitialisation." });
    }
  };

  return (
    <div className="flex justify-center items-center rounded-lg bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Confirmation de la réinitialisation du mot de passe
        </h2>
        {alert.message && (
          <Alert className={`mb-4 ${alert.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
            <AlertTitle>{alert.type === "success" ? "Succès" : "Erreur"}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
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
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Code de vérification"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("code", {
                required: "Le code est requis",
              })}
            />
            {errors.code && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.code.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 8,
                  message: "Le mot de passe doit contenir au moins 8 caractères",
                },
              })}
            />
            {errors.password && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.password.message}
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
