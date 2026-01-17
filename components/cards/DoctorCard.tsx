"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Calendar, Clock, Award, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  id: number;
  name: string;
  photo: string | null;
  qualification: string;
  experience: number;
  specialty: string;
  timings: string[];
  availableDays: string[];
  bio: string | null;
  variant?: "default" | "compact";
}

export function DoctorCard({
  id,
  name,
  photo,
  qualification,
  experience,
  specialty,
  timings,
  availableDays,
  bio,
  variant = "default",
}: DoctorCardProps) {
  const isCompact = variant === "compact";
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={cn(
        "bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden group",
        isCompact ? "flex flex-row" : "flex flex-col"
      )}
    >
      {/* Photo */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-teal-light to-muted",
          isCompact ? "w-32 shrink-0" : "h-48 md:h-56"
        )}
      >
        {photo && !imageError ? (
          <>
            <Image
              src={photo}
              alt={name}
              fill
              className={cn(
                "object-contain transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 flex items-center justify-center">
              <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
          {experience}+ years
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-5 md:p-6 flex flex-col", isCompact ? "flex-1" : "")}>
        <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-1">
          {name}
        </h3>
        <p className="text-primary font-medium text-sm mb-2">{specialty}</p>
        <p className="text-muted-foreground text-xs mb-3">{qualification}</p>

        {!isCompact && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{bio}</p>
        )}

        {/* Availability */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              {availableDays.slice(0, 3).join(", ")}
              {availableDays.length > 3 && "..."}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              {timings[0]} - {timings[timings.length - 1]}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Button asChild variant="default" size={isCompact ? "sm" : "default"} className="w-full">
            <Link href={`/book?doctor=${id}`}>Book with {name.split(" ")[0]}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
