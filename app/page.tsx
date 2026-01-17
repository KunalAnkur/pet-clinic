import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { DoctorCard } from "@/components/cards/DoctorCard";
import { 
  Syringe, 
  Stethoscope, 
  Scissors, 
  ArrowRight, 
  Heart,
  Shield,
  Clock,
  Users
} from "lucide-react";
import { clinicInfo } from "@/data/clinicData";
import heroImage from "@/assets/hero-image.jpg";
import { connectDatabase } from "@/lib/database";
import "@/models"; // Initialize models
import { Doctor } from "@/models/Doctor";

async function getDoctors() {
  try {
    await connectDatabase();
    const doctors = await (Doctor as any).findAll({
      order: [['id', 'ASC']],
    });

    // Parse JSON strings back to arrays
    const formattedDoctors = doctors.map((doctor: any) => {
      const doctorData = doctor.toJSON ? doctor.toJSON() : doctor;
      return {
        ...doctorData,
        timings: doctorData.timings ? JSON.parse(doctorData.timings) : [],
        availableDays: doctorData.availableDays ? JSON.parse(doctorData.availableDays) : [],
      };
    });

    return formattedDoctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export default async function Home() {
  const doctors = await getDoctors();

  // Show only first 3 doctors on homepage
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src={heroImage} 
              alt="Veterinary care" 
              className="object-cover"
              fill
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Heart className="w-4 h-4" />
              Trusted Pet Care in Bokaro
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
              Compassionate Care for Your{" "}
              <span className="text-accent">Furry Friends</span>
            </h1>
            
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed animate-slide-up">
              {clinicInfo.tagline}. Providing vaccination, disease treatment, and surgery 
              services under experienced veterinarians.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button asChild variant="hero" size="xl">
                <Link href="/book">
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Expert Care", desc: "Experienced veterinarians" },
              { icon: Clock, title: "Flexible Hours", desc: "Open 7 days a week" },
              { icon: Heart, title: "Compassionate", desc: "Gentle pet handling" },
              { icon: Users, title: "Trusted", desc: "Thousands of happy pets" },
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-muted paw-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive veterinary care for dogs, cats, and other pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Syringe,
                title: "Vaccination",
                desc: "Protect your pet with essential vaccines including free anti-rabies vaccination.",
                color: "bg-primary",
                link: "/services#vaccination",
              },
              {
                icon: Stethoscope,
                title: "Treatment",
                desc: "Comprehensive health check-ups, disease diagnosis, and treatment solutions.",
                color: "bg-accent",
                link: "/services#treatment",
              },
              {
                icon: Scissors,
                title: "Surgery",
                desc: "Professional surgical procedures including neutering and tumor removal.",
                color: "bg-teal-dark",
                link: "/services#surgery",
              },
            ].map((service, idx) => (
              <Link
                key={idx}
                href={service.link}
                className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.desc}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Doctors
            </h2>
            <p className="text-muted-foreground text-lg">
              Experienced veterinarians dedicated to your pet's health
            </p>
          </div>

          {featuredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDoctors.map((doctor: any) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/doctors">
                View All Doctors
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Book an Appointment?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Schedule a visit with our experienced veterinarians and give your pet the care they deserve.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link href="/book">
              Book Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
