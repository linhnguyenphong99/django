"use client";

import React from "react";
import { ToastProvider as NewToastProvider, useToast as newUseToast } from "@/components/common/toast";

// Re-export the new implementation
export const ToastProvider = NewToastProvider;
export const useToast = newUseToast;