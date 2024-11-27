"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import DOMPurify from "dompurify";
import { API_URL } from "@/app/constants/api";
import ButtonValidation from "./ButtonValidation";
import { Input } from "./ui/input";
import { getCsrf } from "@/utils/csrf";

const sqlXssRegex =
  /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|EXEC|UNION|ALTER|SCRIPT|ONERROR|ONCLICK|ONLOAD|<|>|\*|;|--|\(\)|\{\})\b)/gi;

const FormShema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(12)
    .refine((val) => !sqlXssRegex.test(val), {
      message: "Le mot de passe contient des caractères non autorisés",
    }),
  username: z
    .string()
    .min(3)
    .refine((val) => !sqlXssRegex.test(val), {
      message: "Le nom d'utilisateur contient des caractères non autorisés",
    }),
});

export default function Inscription() {
  const [notification, setNotification] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(FormShema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrf(); // Assurez-vous de définir la méthode pour obtenir le CSRF token
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  const onSubmit = async (data) => {
    try {
      const sanitizedData = {
        ...data,
        email: DOMPurify.sanitize(data.email),
        username: DOMPurify.sanitize(data.username),
        password: DOMPurify.sanitize(data.password),
      };
      const response = await fetch(`${API_URL}/auth/inscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        setNotification({ type: "success", message: "Inscription réussie" });
        reset();
      } else {
        setNotification({ type: "error", message: "Échec de l'inscription" });
      }
    } catch (error) {
      setNotification({ type: "error", message: "Erreur dans l'inscription" });
    }
  };

  return (
    <div>
      {notification && (
        <div
          className={`alert ${
            notification.type === "error" ? "alert-error" : "alert-success"
          }`}
        >
          {notification.message}
        </div>
      )}
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
          <Input
            type="text"
            placeholder="username"
            className="text-xl bg-[#333] placeholder:text-gray-50 w-full inline-block"
            {...register("username", {
              required: "Le nom d'utilisateur est requis",
            })}
          />
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
          <ButtonValidation />
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
