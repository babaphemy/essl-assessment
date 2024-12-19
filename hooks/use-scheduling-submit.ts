"use client";

import { useState } from "react";
import type { SchedulingFormData } from "@/types";

interface UseSchedulingSubmitProps {
  onSuccess: () => void;
  onError: () => void;
  setIsLoading: (loading: boolean) => void;
}

export function useSchedulingSubmit({
  onSuccess,
  onError,
  setIsLoading,
}: UseSchedulingSubmitProps) {
  const onSubmit = async (data: SchedulingFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch (error) {
      onError();
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit };
}