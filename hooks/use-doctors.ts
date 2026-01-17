import { useQuery } from "@tanstack/react-query";

export interface Doctor {
  id: number;
  name: string;
  photo: string | null;
  qualification: string;
  experience: number;
  specialty: string;
  phone: string;
  timings: string[];
  availableDays: string[];
  bio: string | null;
  isExternal: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useDoctors() {
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await fetch("/api/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useDoctor(id: number | null) {
  return useQuery<Doctor>({
    queryKey: ["doctor", id],
    queryFn: async () => {
      if (!id) throw new Error("Doctor ID is required");
      const response = await fetch(`/api/doctors/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
