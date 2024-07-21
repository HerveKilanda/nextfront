"use client"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function Manga() {
  const [alert, setAlert] = useState(false)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="justify-center" >
        {alert && (
          <Alert className="bg-blueivy mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alert</AlertTitle>
            <AlertDescription>
              Tu test les erreur dans ton application
            </AlertDescription>
          </Alert>
        )}
      </div>
      <p>Tu test ta page manga en mettant des erreur</p>
      <Button onClick={() => setAlert(true)}>Click-moi</Button>
    </div>
  );
}
