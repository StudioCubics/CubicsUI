"use client";

import type { SetState } from "@cubicsui/types";
import { useState } from "react";

export type FormHelpersProps = {
  initialLoading?: boolean;
  initialError?: string | Error;
};

export function useFormHelpers(props: FormHelpersProps | undefined): {
  loading: boolean;
  error: string | Error | null;
  setLoading: SetState<boolean>;
  setError: (e: string | Error | null) => void;
} {
  const [loading, setLoading] = useState<boolean>(
    props?.initialLoading ?? false,
  );
  const [error, setErrorState] = useState<string | Error | null>(
    props?.initialError ?? null,
  );

  function setError(e: string | Error | null): void {
    if (e === null) setErrorState(null);
    if (typeof e === "string") setErrorState(e);
    if (e instanceof Error) setErrorState(e.message);
  }

  return {
    loading,
    error,
    setLoading,
    setError,
  };
}
