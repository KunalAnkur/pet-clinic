import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services } from "@/data/clinicData";
import { Syringe, Stethoscope, Scissors, CheckCircle } from "lucide-react";

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Services
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Comprehensive veterinary care including vaccinations, treatments, and surgical procedures 
            for dogs, cats, and other pets.
          </p>
        </div>
      </section>

      {/* Vaccination Section */}
      <section id="vaccination" className="py-16 md:py-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
              <Syringe className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Vaccination Services
              </h2>
              <p className="text-muted-foreground">
                Protect your pets with essential immunizations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.vaccination.map((service) => (
              <ServiceCard key={service.id} {...service} category="vaccination" />
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> Vaccine prices are 
                subject to market rates. Anti-Rabies vaccination is provided free of cost as 
                per government guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Section */}
      <section id="treatment" className="py-16 md:py-20 bg-muted paw-pattern scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Treatment & Consultancy
              </h2>
              <p className="text-muted-foreground">
                Comprehensive health care and medical treatments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.treatment.map((service) => (
              <ServiceCard key={service.id} {...service} category="treatment" />
            ))}
          </div>
        </div>
      </section>

      {/* Surgery Section */}
      <section id="surgery" className="py-16 md:py-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-teal-dark flex items-center justify-center">
              <Scissors className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Surgery Services
              </h2>
              <p className="text-muted-foreground">
                Professional surgical procedures with expert care
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.surgery.map((service) => (
              <ServiceCard key={service.id} {...service} category="surgery" />
            ))}
          </div>

          <div className="mt-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> Complex surgeries 
                may require our external specialist. Surgery appointments are scheduled based 
                on the availability of our surgical team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* General Info */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you're unsure which service your pet needs, book a general consultation. 
              Our veterinarians will assess your pet's condition and recommend the appropriate treatment.
            </p>
            <p className="text-sm text-muted-foreground">
              For emergencies, please call us directly at{" "}
              <a href="tel:+919973752779" className="text-primary font-semibold hover:underline">
                +91 99737 52779
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
