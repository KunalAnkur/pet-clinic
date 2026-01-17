"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceCategories } from "@/data/clinicData";
import {
  Syringe,
  Stethoscope,
  Scissors,
  Check,
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  User,
  PawPrint,
  CheckCircle,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, getDay } from "date-fns";

type ServiceCategory = "vaccination" | "treatment" | "surgery";

interface BookingData {
  service: ServiceCategory | "";
  doctorId: number | null;
  date: Date | undefined;
  timeSlot: string;
  ownerName: string;
  phone: string;
  petType: string;
  breed: string;
  age: string;
  notes: string;
}

const steps = [
  { id: 1, title: "Service", icon: Stethoscope },
  { id: 2, title: "Doctor", icon: User },
  { id: 3, title: "Date", icon: CalendarIcon },
  { id: 4, title: "Time", icon: Clock },
  { id: 5, title: "Details", icon: PawPrint },
  { id: 6, title: "Confirm", icon: Check },
];

const serviceIcons: Record<ServiceCategory, typeof Syringe> = {
  vaccination: Syringe,
  treatment: Stethoscope,
  surgery: Scissors,
};

interface Doctor {
  id: number;
  name: string;
  photo: string | null;
  qualification: string;
  experience: number;
  specialty: string;
  phone: string | null;
  timings: string[];
  availableDays: string[];
  bio: string | null;
  isExternal: boolean;
}

interface BookClientProps {
  doctors: Doctor[];
}

export function BookClient({ doctors }: BookClientProps) {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    doctorId: null,
    date: undefined,
    timeSlot: "",
    ownerName: "",
    phone: "",
    petType: "",
    breed: "",
    age: "",
    notes: "",
  });

  // Pre-fill from URL params
  useEffect(() => {
    const doctorParam = searchParams.get("doctor");
    const serviceParam = searchParams.get("service") as ServiceCategory;
    
    if (doctorParam) {
      setBookingData(prev => ({ ...prev, doctorId: parseInt(doctorParam) }));
    }
    if (serviceParam && ["vaccination", "treatment", "surgery"].includes(serviceParam)) {
      setBookingData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  // Separate internal doctors from external specialist
  const internalDoctors = doctors.filter(d => !d.isExternal);
  const externalSpecialist = doctors.find(d => d.isExternal);

  const selectedDoctor = bookingData.doctorId 
    ? doctors.find(d => d.id === bookingData.doctorId)
    : null;

  const availableDoctors = bookingData.service === "surgery" 
    ? [...internalDoctors.filter(d => d.specialty.toLowerCase().includes("surgery")), ...(externalSpecialist ? [externalSpecialist] : [])]
    : internalDoctors;

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!bookingData.service;
      case 2: return !!bookingData.doctorId;
      case 3: return !!bookingData.date;
      case 4: return !!bookingData.timeSlot;
      case 5: return bookingData.ownerName && bookingData.phone && bookingData.petType;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleConfirm = async () => {
    if (!bookingData.date || !bookingData.doctorId) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: bookingData.service,
          doctorId: bookingData.doctorId,
          date: bookingData.date.toISOString(),
          timeSlot: bookingData.timeSlot,
          ownerName: bookingData.ownerName,
          phone: bookingData.phone,
          petType: bookingData.petType,
          breed: bookingData.breed || undefined,
          age: bookingData.age || undefined,
          notes: bookingData.notes || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create booking");
      }

      const booking = await response.json();
      setBookingId(booking.bookingId);
      setBookingComplete(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(error instanceof Error ? error.message : "Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center py-16 bg-muted paw-pattern">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto bg-card rounded-2xl shadow-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Appointment Requested!
              </h1>
              
              <p className="text-muted-foreground mb-6">
                Your appointment request has been submitted successfully.
              </p>

              <div className="bg-muted rounded-xl p-4 mb-6 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-bold text-primary">#{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium text-foreground capitalize">{bookingData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor</span>
                    <span className="font-medium text-foreground">{selectedDoctor?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">
                      {bookingData.date && format(bookingData.date, "PPP")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">{bookingData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pet</span>
                    <span className="font-medium text-foreground">
                      {bookingData.petType} {bookingData.breed && `(${bookingData.breed})`}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Our clinic will contact you at <strong>{bookingData.phone}</strong> to confirm your slot.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild variant="default" className="flex-1">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Book an Appointment
          </h1>
          <p className="text-primary-foreground/80">
            Schedule a visit with our experienced veterinarians
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-6 bg-card border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1 max-w-[120px]">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0",
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-1 hidden sm:block text-center",
                    currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2 sm:mx-4 max-w-[80px]",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 md:py-16 bg-muted paw-pattern min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
              {/* Step 1: Select Service */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                    Select Service Type
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {serviceCategories.map((cat) => {
                      const Icon = serviceIcons[cat.id as ServiceCategory];
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setBookingData(prev => ({ ...prev, service: cat.id as ServiceCategory }))}
                          className={cn(
                            "p-6 rounded-xl border-2 transition-all text-center hover:shadow-card",
                            bookingData.service === cat.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center",
                            bookingData.service === cat.id ? "bg-primary" : "bg-muted"
                          )}>
                            <Icon className={cn(
                              "w-7 h-7",
                              bookingData.service === cat.id ? "text-primary-foreground" : "text-muted-foreground"
                            )} />
                          </div>
                          <span className={cn(
                            "font-semibold",
                            bookingData.service === cat.id ? "text-primary" : "text-foreground"
                          )}>
                            {cat.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Select Doctor */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                    Select Doctor
                  </h2>
                  {availableDoctors.length > 0 ? (
                    <div className="space-y-4">
                      {availableDoctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => setBookingData(prev => ({ ...prev, doctorId: doctor.id }))}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 hover:shadow-card",
                            bookingData.doctorId === doctor.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-7 h-7 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                            <p className="text-sm text-primary">{doctor.specialty}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {doctor.timings.length > 1 
                                ? `${doctor.timings[0]} - ${doctor.timings[doctor.timings.length - 1]}`
                                : doctor.timings[0]
                              }
                            </p>
                          </div>
                          {bookingData.doctorId === doctor.id && (
                            <Check className="w-5 h-5 text-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No doctors available for this service.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Select Date */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                    Select Date
                  </h2>
                  <div className="flex justify-center">
                    <div className="rounded-xl border border-border bg-card">
                      <Calendar
                        mode="single"
                        selected={bookingData.date}
                        onSelect={(date) => setBookingData(prev => ({ ...prev, date }))}
                        disabled={(date) => {
                          // Disable past dates
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (date < today) return true;
                          
                          // Disable dates more than 30 days in the future
                          const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                          if (date > maxDate) return true;
                          
                          // If doctor is selected, only enable days matching availableDays
                          if (selectedDoctor && selectedDoctor.availableDays.length > 0) {
                            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                            const dayOfWeek = dayNames[getDay(date)];
                            return !selectedDoctor.availableDays.includes(dayOfWeek);
                          }
                          
                          return false;
                        }}
                        className="pointer-events-auto"
                      />
                    </div>
                  </div>
                  {bookingData.date && (
                    <p className="text-center mt-4 text-primary font-medium">
                      Selected: {format(bookingData.date, "PPPP")}
                    </p>
                  )}
                </div>
              )}

              {/* Step 4: Select Time */}
              {currentStep === 4 && (
                <div className="animate-fade-in">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                    Select Time Slot
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Available slots for {selectedDoctor?.name}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {selectedDoctor?.timings.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingData(prev => ({ ...prev, timeSlot: time }))}
                        className={cn(
                          "p-3 rounded-lg border-2 transition-all text-center font-medium",
                          bookingData.timeSlot === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50 text-foreground"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Pet & Owner Details */}
              {currentStep === 5 && (
                <div className="animate-fade-in">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                    Pet & Owner Details
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ownerName">Owner Name *</Label>
                        <Input
                          id="ownerName"
                          value={bookingData.ownerName}
                          onChange={(e) => setBookingData(prev => ({ ...prev, ownerName: e.target.value }))}
                          placeholder="Enter your name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="petType">Pet Type *</Label>
                      <Select
                        value={bookingData.petType}
                        onValueChange={(value) => setBookingData(prev => ({ ...prev, petType: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select pet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dog">Dog</SelectItem>
                          <SelectItem value="Cat">Cat</SelectItem>
                          <SelectItem value="Bird">Bird</SelectItem>
                          <SelectItem value="Rabbit">Rabbit</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="breed">Breed (Optional)</Label>
                        <Input
                          id="breed"
                          value={bookingData.breed}
                          onChange={(e) => setBookingData(prev => ({ ...prev, breed: e.target.value }))}
                          placeholder="e.g., Labrador, Persian"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="age">Age (Optional)</Label>
                        <Input
                          id="age"
                          value={bookingData.age}
                          onChange={(e) => setBookingData(prev => ({ ...prev, age: e.target.value }))}
                          placeholder="e.g., 2 years"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={bookingData.notes}
                        onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Any specific concerns or symptoms..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Summary */}
              {currentStep === 6 && (
                <div className="animate-fade-in">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                    Confirm Booking
                  </h2>
                  <div className="bg-muted rounded-xl p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Service</span>
                        <p className="font-semibold text-foreground capitalize">{bookingData.service}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Doctor</span>
                        <p className="font-semibold text-foreground">{selectedDoctor?.name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date</span>
                        <p className="font-semibold text-foreground">
                          {bookingData.date && format(bookingData.date, "PPP")}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time</span>
                        <p className="font-semibold text-foreground">{bookingData.timeSlot}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold text-foreground mb-2">Owner & Pet Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name</span>
                          <p className="font-semibold text-foreground">{bookingData.ownerName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone</span>
                          <p className="font-semibold text-foreground">{bookingData.phone}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pet</span>
                          <p className="font-semibold text-foreground">
                            {bookingData.petType} {bookingData.breed && `(${bookingData.breed})`}
                          </p>
                        </div>
                        {bookingData.age && (
                          <div>
                            <span className="text-muted-foreground">Age</span>
                            <p className="font-semibold text-foreground">{bookingData.age}</p>
                          </div>
                        )}
                      </div>
                      {bookingData.notes && (
                        <div className="mt-3">
                          <span className="text-muted-foreground text-sm">Notes</span>
                          <p className="text-sm text-foreground">{bookingData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    By confirming, you agree that our clinic will contact you to finalize the appointment.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 6 ? (
                  <Button 
                    onClick={handleNext} 
                    disabled={!canProceed()}
                    variant="default"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleConfirm}
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
