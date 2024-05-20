import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateProfile() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Inclure les cookies dans la requête
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("User updated successfully", result);
      reset();
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input type="text" {...register("username")} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
      </div>
      <button type="submit">Update</button>
    </form>
  );
}
