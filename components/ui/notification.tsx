import { Alert, AlertTitle, AlertDescription } from "./alert";

export default function Notification(){
    function Notification() {
        return (
          <div className="mb-3">
            {alert ? (
              // Si une alerte doit être affichée, affiche une alerte de succès
              <Alert className="bg-green-600 text-black">
                <AlertTitle>Félicitations !</AlertTitle>
                <AlertDescription>Inscription réussie.</AlertDescription>
              </Alert>
            ) : (
              // Sinon, affiche une alerte d'erreur
              <Alert className="bg-red-600 text-black">
                <AlertTitle>Erreur !</AlertTitle>
                <AlertDescription>Veuillez recommencez</AlertDescription>
              </Alert>
            )}
          </div>
        );
      }
}