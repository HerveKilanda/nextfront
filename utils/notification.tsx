import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function Notification({ alert }) {
  
    <div className="mb-3">
      {alert ? (
        <Alert className="bg-green-600 text-black">
          <AlertTitle>Félicitations !</AlertTitle>
          <AlertDescription>Modification réussie</AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-red-600 text-black">
          <AlertTitle>Erreur !</AlertTitle>
          <AlertDescription>Échec lors de la modification</AlertDescription>
        </Alert>
      )}
    </div>
  
}
