"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import Nav from "@/components/Nav/Nav";
import { useFormik } from "formik";
import { ServiceRequestSchema } from "@/validations/serviceRequest.validation";
import { v4 as v4uuid } from "uuid";
import { toast } from "react-hot-toast";

export type ServiceStatus = "pending" | "completed" | "canceled";

type InitialValues = {
  name: string;
  email: string;
  time: string;
  service_type: string;
};

export default function Home() {
  const initialValues: InitialValues = {
    name: "",
    email: "",
    time: "",
    service_type: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ServiceRequestSchema,
    onSubmit: (values: InitialValues, { resetForm }) => {
      const savedData = localStorage.getItem("serviceRequest");

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        parsedData.push({ ...values, status: "pending", id: v4uuid() });

        localStorage.setItem("serviceRequest", JSON.stringify(parsedData));
      } else {
        localStorage.setItem(
          "serviceRequest",
          JSON.stringify([{ ...values, status: "pending", id: v4uuid() }])
        );
      }
      toast.success("Service request created successfully");
      resetForm();
    },
  });

  return (
    <main>
      <Nav />
      <section className="flex items-center justify-center h-[calc(100vh_-_90px)] w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div>
          <h1 className="text-[32px] leading-7 font-semibold text-black text-center mb-4">
            Request service
          </h1>
          <form
            className="flex flex-col gap-4 w-full md:w-[300px]"
            onSubmit={formik.handleSubmit}
          >
            <Input
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name ? formik.errors.name : ""}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email ? formik.errors.email : ""}
            />
            <Input
              label="What time works for you"
              name="time"
              value={formik.values.time}
              type="datetime-local"
              onChange={formik.handleChange}
              error={formik.touched.time ? formik.errors.time : ""}
            />
            <Select
              label="Type of service"
              name="service_type"
              onChange={formik.handleChange}
              options={[
                {
                  label: "Cleaning",
                  value: "cleaning",
                },
                {
                  label: "Cooking",
                  value: "cooking",
                },
              ]}
              error={
                formik.touched.service_type ? formik.errors.service_type : ""
              }
            />
            <Button text="Submit" type="submit" />
          </form>
        </div>
      </section>
    </main>
  );
}
