import { Metadata } from "next";
import SchedulingContainer from "@/components/scheduling/scheduling-container";

export const metadata: Metadata = {
  title: "Schedule a Service",
  description: "Schedule a call, visit, or consultation with our team.",
};

export default function SchedulePage() {
  return <SchedulingContainer />;
}