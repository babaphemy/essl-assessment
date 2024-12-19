import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="items-center py-20">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Appointment Scheduled!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We&apos;ve received your appointment request. You&apos;ll receive a
          confirmation email shortly with all the details.
        </p>
        <div className="mt-10">
          <Button asChild>
            <Link href="/schedule">Schedule Another Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
