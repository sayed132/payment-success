import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function StripeAccountSuccess() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <CardTitle className="text-2xl">Account Created Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Your Stripe account has been created successfully. You can now start accepting payments.</p>
          <Button>Go to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
}