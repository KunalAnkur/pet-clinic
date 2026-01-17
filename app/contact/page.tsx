import { Layout } from "@/components/layout/Layout";
import { clinicInfo } from "@/data/clinicData";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Contact & Location
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Visit us at our clinic in Bokaro or reach out via phone or email
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">{clinicInfo.address}</p>
                    <Button 
                      asChild 
                      variant="link" 
                      className="p-0 h-auto mt-2 text-primary"
                    >
                      <a 
                        href="https://maps.google.com/?q=Bokaro+Steel+City" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a 
                      href={`tel:${clinicInfo.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {clinicInfo.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available during clinic hours
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a 
                      href={`mailto:${clinicInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {clinicInfo.email}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Working Hours</h3>
                    <div className="space-y-1 text-muted-foreground text-sm">
                      <div className="flex justify-between gap-4">
                        <span>Monday - Friday</span>
                        <span className="font-medium text-foreground">
                          {clinicInfo.workingHours.weekdays}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Saturday</span>
                        <span className="font-medium text-foreground">
                          {clinicInfo.workingHours.saturday}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Sunday</span>
                        <span className="font-medium text-foreground">
                          {clinicInfo.workingHours.sunday}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Find Us
              </h2>
              
              <div className="bg-card rounded-2xl shadow-card overflow-hidden h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58652.04449660789!2d86.1047!3d23.6693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f423f34569c8c3%3A0x6b8d9c0f2e3e8a52!2sBokaro%20Steel%20City%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div>
              <h3 className="font-heading text-xl font-bold text-accent-foreground">
                Emergency? Don't Wait!
              </h3>
              <p className="text-accent-foreground/80">
                Call us immediately for urgent pet care
              </p>
            </div>
            <Button asChild variant="heroOutline" size="lg" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
              <a href={`tel:${clinicInfo.phone}`}>
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
