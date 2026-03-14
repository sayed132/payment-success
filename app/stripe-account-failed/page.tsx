import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function StripeAccountFailed() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <CardTitle className="text-2xl">Account Creation Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">There was an error creating your Stripe account. Please try again or contact support.</p>
          <Button variant="outline">Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
}