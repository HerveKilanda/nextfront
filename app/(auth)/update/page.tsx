"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { useForm, useFormState } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UpdateProfile() {
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setAlert(true);
        reset();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-48">
      {alert && (
        <Alert className="mb-3 bg-green-600 text-black ">
          <AlertTitle>Félicitations !</AlertTitle>
          <AlertDescription>
            Vos informations ont été mises à jour avec succès !
          </AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative border-4 border-blueivy bg-black rounded w-96 py-10 px-8 md:mt-0 md:mx-w-sm md:px:14 "
      >
        <h1 className="text-3xl text-center font-semibold text-white">
          Mise à jour du profil
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
          <Button type="submit" className="w-full">
            Mettre à jour
          </Button>
        </div>
      </form>
    </div>
  );
}
