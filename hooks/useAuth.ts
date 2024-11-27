// // hooks/useAuth.ts
// "use server"
// import { cookies } from "next/headers";
// import { useEffect, useState } from "react";


// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   return isAuthenticated;
// };
