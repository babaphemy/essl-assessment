"use client";
import React, { useEffect, useState } from "react";
import { FetchStages } from "@/utils/fetchEnum";
import Nav from "@/components/Nav/Nav";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import { ServiceStatus } from "../page";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

type ServiceRequest = {
  email: string;
  id: string;
  name: string;
  service_type: string;
  status: ServiceStatus;
  time: string;
};

const { LOADING, DATA, ERROR, NO_DATA } = FetchStages;
const page = () => {
  const router = useRouter();

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [fetchStage, setFetchStage] = useState<FetchStages>(LOADING);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [showConfirmationModal, toggleConfirmationModal] = useState(false);

  const getServiceRequests = () => {
    try {
      const savedData = localStorage.getItem("serviceRequest");

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setServiceRequests(parsedData);
        setFetchStage(DATA);
      } else {
        setFetchStage(NO_DATA);
      }
    } catch (error) {
      setFetchStage(ERROR);
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      getServiceRequests();
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const setData = (data: ServiceRequest[]) => {
    return localStorage.setItem("serviceRequest", JSON.stringify(data));
  };

  const handleCancel = (id: string) => {
    const updatedData: ServiceRequest[] = serviceRequests?.map((service) =>
      service?.id === id ? { ...service, status: "canceled" } : service
    );

    setData(updatedData);
    setServiceRequests(updatedData);
  };

  const handleComplete = (id: string) => {
    const updatedData: ServiceRequest[] = serviceRequests?.map((service) =>
      service?.id === id ? { ...service, status: "completed" } : service
    );

    setData(updatedData);
    setServiceRequests(updatedData);
  };

  const handleDelete = (id: string) => {
    setSelectedServiceId(id);
    toggleConfirmationModal(true);
  };

  const handleDeleteConfirmation = () => {
    const updatedData: ServiceRequest[] = serviceRequests?.filter(
      (service) => service?.id !== selectedServiceId
    );

    setData(updatedData);
    setServiceRequests(updatedData);
    setSelectedServiceId("");
    toggleConfirmationModal(false);
  };

  const renderBasedOnFetchStage = () => {
    switch (fetchStage) {
      case LOADING:
        return <p className="text-[18px] text-center">Loading...</p>;
      case DATA:
        return (
          <div className="flex flex-wrap md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {serviceRequests?.map((service, i) => (
              <ServiceCard
                key={i}
                status={service?.status}
                title={service?.service_type}
                time={service?.time}
                handleCancel={() => handleCancel(service?.id)}
                handleComplete={() => handleComplete(service?.id)}
                handleDelete={() => handleDelete(service?.id)}
              />
            ))}
          </div>
        );
      case NO_DATA:
        return (
          <p className="text-[18px] text-center text-red-500">
            Empty data,{" "}
            <span
              className="text-black cursor-pointer"
              onClick={() => router.push("/")}
            >
              Schedule a service
            </span>
          </p>
        );
      case ERROR:
        return (
          <p className="text-[18px] text-center text-red-500">
            An Error Occurred,{" "}
            <span
              className="text-black cursor-pointer"
              onClick={getServiceRequests}
            >
              Kindly Try Again
            </span>
          </p>
        );
    }
  };

  return (
    <main>
      <Nav />
      <section className="flex flex-col gap-5 justify-center px-5 mt-4">
        <h1 className="text-[32px] leading-7 font-semibold text-black text-center mb-4">
          Service Requests
        </h1>
        <section>{renderBasedOnFetchStage()}</section>
      </section>
      {showConfirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to delete this service request?"
          handleCancel={() => toggleConfirmationModal(false)}
          handleProceed={handleDeleteConfirmation}
        />
      )}
    </main>
  );
};

export default page;
