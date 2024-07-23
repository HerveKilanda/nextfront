import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Clé secrète utilisée pour vérifier le token, assurez-vous qu'elle correspond à la clé secrète de votre backend
const SECRET_KEY = process.env.SECRET_KEY;
console.log('Secret Key:', SECRET_KEY);

export async function middleware(request: NextRequest) {
  console.log("middleware run");

  // Récupération du chemin demandé
  const { pathname } = request.nextUrl;

  // Vérification si la route est une route admin
  const isAdminRoute = pathname.startsWith("/adminEmprunt");
  console.log(`Requested Path: ${pathname}`);
  console.log(`Is Admin Route: ${isAdminRoute}`);

  // Si c'est une route admin, on continue avec la vérification du token
  if (isAdminRoute) {
    // Récupération du token depuis les cookies
    const token = request.cookies.get("token")?.value || "";
    console.log(`Token: ${token}`);

    // Si aucun token n'est trouvé, redirection vers la page d'accueil
    if (!token) {
      console.log("No token found, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Vérifier le token en utilisant jose
      const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
      console.log(`Decoded Token: ${JSON.stringify(payload)}`);

      // Si l'utilisateur est un admin, on autorise l'accès à la route
      if (payload.role === "ADMIN") {
        console.log("User is admin, allowing access");
        return NextResponse.next();
      } else {
        // Si l'utilisateur n'est pas un admin, redirection vers la page d'accueil
        console.log("User is not admin, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // Gestion des erreurs de vérification du token
      console.error("Failed to verify token:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Pour toutes les autres routes, on continue sans intervention
  return NextResponse.next();
}

// Configuration des routes pour lesquelles le middleware sera appliqué
export const config = {
  matcher: "/adminEmprunt/:path*",
};
