import Link from "next/link";
import { CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="items-center flex justify-center py-20">
      <div className="text-center">
        <CalendarRange className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          Service Scheduling
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Schedule a call, site visit, or consultation with our expert team.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/schedule">Schedule Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
