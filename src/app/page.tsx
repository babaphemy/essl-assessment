import { Suspense } from "react";
import AppointmentForm from "@/components/AppointmentForm";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col items-center justify-center min-w-[375px] max-w-[700px] mx-auto px-4 py-8">
      <h1 className="font-bold mb-8 text-xl lg:text-3xl ">
        Schedule an Appointment
      </h1>

      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <AppointmentForm />
        </Suspense>
      </div>
    </main>
  );
}
