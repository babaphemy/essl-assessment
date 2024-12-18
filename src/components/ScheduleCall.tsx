"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { authSchema } from "@/schema/auth";
export default function ScheduleCall({ close }: { close: () => void }) {
  const form = useForm<z.infer<typeof authSchema>>();

  const { mutate, isPending } = useMutation<any, any, any>({
    mutationFn: async () => {
      // connect to db
    },
    onSuccess: (data, variables) => {
      // handle success
    },
    onError: (err) => {
      // handle error
    },
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    mutate({ ...values });
  }
  return (
    <div className="w-full h-full inset-0 fixed z-30 bg-black/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] max-w-2xl m-auto absolute inset-0 h-fit"
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex  flex-col bg-white rounded-md p-4"
        >
          <div className="flex items-center justify-between w-full">
            <h3 className="font-semibold text-lg ">Schedule Call</h3>
            <button onClick={close}>close</button>
          </div>
          <div className="flex flex-col items-start gap-y-1 justify-start">
            <label>Name</label>
            <input
              {...form.register("name")}
              type="text"
              className="w-full h-11 outline-none rounded-md"
            />
            {form.formState.errors.name && (
              <p>{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-y-1 justify-start">
            <label>Email</label>
            <input
              {...form.register("email")}
              type="text"
              className="w-full h-11 outline-none rounded-md"
            />
            {form.formState.errors.email && (
              <p>{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-y-1 justify-start">
            <label>Message</label>
            <textarea
              {...form.register("message")}
              className="w-full h-96 resize-none outline-none rounded-md"
            ></textarea>
            {form.formState.errors.message && (
              <p>{form.formState.errors.message.message}</p>
            )}
          </div>

          <button
          disabled={isPending}
            className="w-full h-12 rounded-md bg-blue-700"
            type="submit"
          ></button>
        </form>
      </div>
    </div>
  );
}
