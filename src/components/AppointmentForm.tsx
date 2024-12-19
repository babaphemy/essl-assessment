"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentRequest } from "@/types";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormSchema } from "@/lib/form-schema";

type FormValues = z.infer<typeof FormSchema>;

export default function AppointmentForm() {
  const [optimisticData, setOptimisticData] =
    useState<AppointmentRequest | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toISOString().split("T")[1],
      serviceType: "call",
      email: "",
      phone: "",
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
    onMutate: (data) => {
      setOptimisticData(data);
    },
    onSuccess: () => {
      form.reset();
      setOptimisticData(null);
      toast({
        title: "Success!",
        description: "Your appointment has been scheduled.",
      });
    },
    onError: (error) => {
      setOptimisticData(null);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="visit">Clinic Visit</SelectItem>
                    <SelectItem value="service">Other Services</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can provide any additional information about your
                appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {mutation.isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to schedule appointment. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full md:w-auto"
        >
          {mutation.isPending ? "Scheduling..." : "Schedule Appointment"}
        </Button>

        {optimisticData && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <p>Processing your appointment request...</p>
          </div>
        )}
      </form>
    </Form>
  );
}
