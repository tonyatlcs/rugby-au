"use client";

import {
  ModalManagerContext,
  type ModalContextProps,
} from "@/providers/Modal/ModalManagerContext";
import { useContext } from "react";

export const useModalManager = (): ModalContextProps => {
  const context = useContext(ModalManagerContext);
  if (!context) {
    throw new Error(
      "useModalManager must be used within a ModalManagerProvider",
    );
  }
  return context;
};
