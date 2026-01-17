import Link from "next/link";
import { PawPrint, Phone, Mail, MapPin, Clock } from "lucide-react";
import { clinicInfo } from "@/data/clinicData";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">Pet Clinic Bokaro</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              A trusted veterinary care center in Bokaro offering vaccination, 
              disease treatment, and surgery services under experienced doctors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/doctors", label: "Our Doctors" },
                { href: "/services", label: "Services" },
                { href: "/book", label: "Book Appointment" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Vaccination",
                "Health Check-up",
                "Disease Treatment",
                "Surgery",
                "Emergency Care",
              ].map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/70 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  {clinicInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a 
                  href={`tel:${clinicInfo.phone}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  {clinicInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a 
                  href={`mailto:${clinicInfo.email}`}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  {clinicInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-primary-foreground/70 text-sm">
                  <p>Mon-Fri: {clinicInfo.workingHours.weekdays}</p>
                  <p>Sat: {clinicInfo.workingHours.saturday}</p>
                  <p>Sun: {clinicInfo.workingHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Pet Clinic Bokaro. All rights reserved.
            </p>
            <p className="text-primary-foreground/50 text-sm flex items-center gap-1">
              Made with <span className="text-accent">❤</span> for your furry friends
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
