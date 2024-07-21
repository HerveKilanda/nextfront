// import fetch, { RequestInit } from "node-fetch";

// export default async function handler(req, res) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { credentials } = req.headers;

//   if (!credentials) {
//     return res.status(400).json({ message: "Credentials are required" });
//   }

//   try {
//     const requestInit = {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: credentials,
//       },
//       body: JSON.stringify(req.body),
//       credentials: "include",
//     } as RequestInit;

//     const response = await fetch(
//       `http://localhost:8000/auth/${userId}`,
//       requestInit
//     );

//     const data = await response.json();

//     if (response.ok) {
//       return res.status(200).json(data);
//     }

//     return res.status(response.status).json(data);
//   } catch (error) {
//     console.error("Error updating auth:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
