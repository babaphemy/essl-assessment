import SchedulingForm from "./scheduling-form";

export default function SchedulingContainer() {
  return (
    <div className="lg:px-24 px-2 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Schedule a Service
        </h1>
        <p className="text-muted-foreground mt-2">
          Book a call, visit, or consultation with our team.
        </p>
      </div>
      <SchedulingForm />
    </div>
  );
}
