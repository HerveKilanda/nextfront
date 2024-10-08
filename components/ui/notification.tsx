// notification.tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function Notification({ alert }) {
  return (
    <div className="mb-3">
      {alert ? (
        <Alert className="bg-green-600 text-black">
          <AlertTitle>Félicitations !</AlertTitle>
          <AlertDescription>Inscription réussie.</AlertDescription>
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
