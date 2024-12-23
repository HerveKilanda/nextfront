"use client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCsrf } from "@/utils/csrf";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "@/app/constants/api";

const sqlXssRegex = /(<|>|'|\"|\*|;|--|\/|\\)/gi;
const usernameRegex = /^[a-zA-Z0-9_-]+$/; // Valide le nom d'utilisateur
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]+$/; // Valide le mot de passe
const sqlInjectionRegex =
  /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|EXEC|UNION|ALTER|SCRIPT|ONERROR|ONCLICK|ONLOAD|<|>|\*|;|--|\(\)|\{\})\b)/gi;

export default function UpdateProfile() {
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

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const protection = await getCsrf();
      setCsrfToken(protection);
    };

    fetchCsrfToken();
  }, []);

  function Notification() {
    return (
      <div className="mb-3">
        {alert ? (
          <Alert className="bg-green-600 text-black">
            <AlertTitle>Félicitations !</AlertTitle>
            <AlertDescription>Modifications réussie.</AlertDescription>
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
      const response = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(data),
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
    <div className="flex flex-col items-center justify-center">
      {isNotified && <Notification />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative border-4 border-blueivy bg-black rounded w-96 py-10 px-8 md:mt-0 md:mx-w-sm md:px:14"
      >
        <h1 className="text-3xl text-center font-semibold text-white">
          Modification du profile
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
              pattern: {
                value: usernameRegex,
                message:
                  "Le nom d'utilisateur contient des caractères interdits",
              },
              validate: (value) =>
                !sqlInjectionRegex.test(value) ||
                "Caractères ou mots interdits dans le nom d'utilisateur",
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
              pattern: {
                value: passwordRegex,
                message: "Le mot de passe contient des caractères interdits",
              },
              validate: (value) =>
                !sqlInjectionRegex.test(value) ||
                "Caractères ou mots interdits dans le mot de passe",
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
            Vos informations ont été modifié avec succès
          </p>
        )}
      </form>
    </div>
  );
}
