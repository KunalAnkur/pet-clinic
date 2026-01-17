import { Layout } from "@/components/layout/Layout";
import { DoctorCard } from "@/components/cards/DoctorCard";
import { Users, Award, Heart } from "lucide-react";
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

export default async function Doctors() {
  const doctors = await getDoctors();
  
  // Separate internal doctors from external specialist
  const internalDoctors = doctors.filter((d: any) => !d.isExternal);
  const externalSpecialist = doctors.find((d: any) => d.isExternal);

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Meet Our Doctors
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Our team of experienced veterinarians is dedicated to providing the best 
            care for your beloved pets.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, value: `${internalDoctors.length}+`, label: "Experienced Doctors" },
              { icon: Award, value: `${internalDoctors.reduce((sum: number, d: any) => sum + d.experience, 0)}+`, label: "Years Combined Experience" },
              { icon: Heart, value: "10,000+", label: "Happy Pets Treated" },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 md:py-24 bg-muted paw-pattern">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            In-House Veterinarians
          </h2>
          
          {internalDoctors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {internalDoctors.map((doctor: any) => (
                  <DoctorCard key={doctor.id} {...doctor} />
                ))}
              </div>

              {/* External Specialist */}
              {externalSpecialist && (
                <div className="max-w-2xl mx-auto">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                    Visiting Specialist
                  </h2>
                  <div className="bg-card rounded-2xl shadow-card p-8 border-2 border-dashed border-primary/30">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="w-12 h-12 text-primary" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                          {externalSpecialist.name}
                        </h3>
                        <p className="text-primary font-medium mb-2">
                          {externalSpecialist.specialty}
                        </p>
                        <p className="text-muted-foreground text-sm mb-3">
                          {externalSpecialist.bio}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Availability:</span> On-call for complex surgeries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Why Choose Our Team?
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-4">
                At Pet Clinic Bokaro, our veterinarians combine years of expertise with a genuine 
                love for animals. Each doctor brings unique specializations, ensuring 
                comprehensive care for every pet that walks through our doors.
              </p>
              <p>
                From routine vaccinations to complex surgeries, our team is equipped 
                to handle all your pet's health needs with professionalism and compassion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
