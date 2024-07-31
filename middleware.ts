import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Clé secrète utilisée pour vérifier le token, assurez-vous qu'elle correspond à la clé secrète de votre backend
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("La variable d'environnement 'SECRET_KEY' est manquante. Veuillez la configurer.");
}

export async function middleware(request: NextRequest) {
  console.log("middleware run");

  // Récupération du chemin demandé
  const { pathname } = request.nextUrl;

  const isProtectedRoute = ["/manga", "/manga/[mangaId]", "/emprunt", "/adminEmprunt"].some((path) =>
    pathname.startsWith(path)
  );
  console.log(`Is Protected Route: ${isProtectedRoute}`);
  console.log(`Requested Path: ${pathname}`);

  // Si la route est protégée, on procède à la vérification du token
  if (isProtectedRoute) {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      console.log("Le token n'a pas été trouvé, on redirige vers la page de connexion");
      return NextResponse.redirect(new URL("/connexion", request.url));
    }

    try {
      // Vérifier le token en utilisant jose
      const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
      console.log(`Decoded Token: ${JSON.stringify(payload)}`);

      // Si l'utilisateur est un admin et qu'il accède à une route admin, on autorise l'accès
      if (pathname.startsWith("/adminEmprunt") && payload.role !== "ADMIN") {
        console.log("L'utilisateur n'est pas un admin, on redirige vers la page d'accueil");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // L'utilisateur est authentifié, on autorise l'accès
      console.log("L'utilisateur est authentifié, on autorise l'accès");
      return NextResponse.next();
    } catch (error) {
      // Gestion des erreurs de vérification du token
      console.error("Erreur de vérification du token:", error);
      return NextResponse.redirect(new URL("/connexion", request.url));
    }
  }

  // Pour toutes les autres routes, on continue sans intervention
  return NextResponse.next();
}

// Configuration des routes pour lesquelles le middleware sera appliqué
export const config = {
  matcher: [  "/manga", "/manga/:path*", "/emprunt",  "/emprunt/:path*", "/adminEmprunt/:path*"],
};
