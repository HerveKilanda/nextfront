// pages/reset-password-confirmation.js

"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
export default function ResetPasswordConfirmation() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      code: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/auth/reset-password-confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        <Alert className="bg-green-600 text-black">
            <AlertTitle>Félicitations !</AlertTitle>
            <AlertDescription>Mot de passe mis a jour avec succès !</AlertDescription>
          </Alert>
      } else {
        const result = await response.json();
        setMessage(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
      setMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Confirmer la réinitialisation du mot de passe
        </h2>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "L'email est requis" })}
                  type="email"
                  autoComplete="email"
                  required
                  className={`rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p role="alert" className="text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Code de confirmation
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  {...register("code", { required: "Le code est requis" })}
                  type="text"
                  required
                  className={`rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black block w-full sm:text-sm ${
                    errors.code ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.code && (
                  <p role="alert" className="text-red-500">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nouveau mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: "Le mot de passe est requis" })}
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black block w-full sm:text-sm ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p role="alert" className="text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Envoi en cours..." : "Mettre à jour le mot de passe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
