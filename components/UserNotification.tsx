/* eslint-disable react/no-unescaped-entities */
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function UserNotification() {
  return (
    <>
      <div className="mb-3">
        {alert ? (
          <Alert className="bg-green-600 text-black">
            <AlertTitle>Félicitations !</AlertTitle>
            <AlertDescription>Inscription réussie.</AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-600 text-black">
            <AlertTitle>Erreur !</AlertTitle>
            <AlertDescription>Échec de l'inscription.</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
