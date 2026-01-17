import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  isFree: boolean;
  note?: string;
  category: "vaccination" | "treatment" | "surgery";
}

export function ServiceCard({
  id,
  title,
  description,
  price,
  isFree,
  note,
  category,
}: ServiceCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 p-5 md:p-6 flex flex-col group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-heading font-semibold text-foreground text-lg pr-2">
          {title}
        </h3>
        {isFree ? (
          <span className="shrink-0 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
            FREE
          </span>
        ) : (
          <span className="shrink-0 text-accent font-semibold text-sm">
            {price}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
        {description}
      </p>

      {/* Note */}
      {note && (
        <p className="text-xs text-muted-foreground/80 italic mb-4 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
          {note}
        </p>
      )}

      {/* CTA */}
      <Button
        asChild
        variant="outline"
        size="sm"
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
      >
        <Link href={`/book?service=${category}&item=${id}`}>
          Book Appointment
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
