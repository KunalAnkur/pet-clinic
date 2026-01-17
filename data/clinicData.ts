// Static clinic data for the veterinary website

export const clinicInfo = {
  name: "Pet Clinic Bokaro",
  tagline: "Compassionate Care for Your Furry Friends",
  address: "Chas block, Chas, Bokaro Steel City, Jharkhand 827013",
  phone: "+91 99737 52779",
  email: "petclinicchasbokaro@gmail.com",
  workingHours: {
    weekdays: "9:00 AM - 3:00 PM",
    saturday: "3:00 AM - 3:00 PM",
    sunday: "Closed"
  }
};

export const doctors = [
  {
    id: 1,
    name: "Dr. Ashok Kumar",
    photo: "/doctors/doctor1.jpg",
    qualification: "BVSc & AH",
    experience: 12,
    specialty: "Internal Medicine & Vaccination",
    timings: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    bio: "Specializes in preventive care and complex medical cases with over a decade of experience."
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    photo: "/doctors/doctor2.jpg",
    qualification: "BVSc & AH, PhD (Veterinary Surgery)",
    experience: 15,
    specialty: "Orthopedic & Soft Tissue Surgery",
    timings: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "4:00 PM", "4:30 PM", "5:00 PM"],
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    bio: "Expert in surgical procedures with a gentle approach to patient care."
  },
  {
    id: 3,
    name: "Dr. Priya Mehta",
    photo: "/doctors/doctor3.jpg",
    qualification: "BVSc & AH, MVSc (Dermatology)",
    experience: 8,
    specialty: "Dermatology & General Practice",
    timings: ["11:00 AM", "11:30 AM", "12:00 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"],
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    bio: "Focused on skin conditions and allergies with compassionate pet handling."
  }
];

export const externalSurgeon = {
  id: 4,
  name: "External Specialist",
  photo: "/doctors/specialist.jpg",
  qualification: "Visiting Surgeon",
  experience: 20,
  specialty: "Advanced Surgical Procedures",
  timings: ["On-Call"],
  availableDays: ["By Appointment"],
  bio: "Available for complex surgeries and specialized procedures upon request."
};

export const services = {
  vaccination: [
    {
      id: "v1",
      title: "Anti Rabies Vaccination",
      description: "Essential protection against rabies. Recommended annually for all dogs and cats.",
      price: "Free",
      isFree: true
    },
    {
      id: "v2",
      title: "DHPPI 7-in-1 Vaccine",
      description: "Protects against Distemper, Hepatitis, Parvovirus, Parainfluenza and more.",
      price: "As per market rate",
      isFree: false
    },
    {
      id: "v3",
      title: "DHPPI 9-in-1 Vaccine",
      description: "Comprehensive protection including Leptospirosis coverage.",
      price: "As per market rate",
      isFree: false
    },
    {
      id: "v4",
      title: "All-in-One Dog/Cat Vaccine",
      description: "Complete vaccination package tailored for your pet's specific needs.",
      price: "As per market rate",
      isFree: false
    },
    {
      id: "v5",
      title: "Feline Core Vaccine",
      description: "Essential vaccines for cats including FVRCP protection.",
      price: "As per market rate",
      isFree: false
    }
  ],
  treatment: [
    {
      id: "t1",
      title: "General Consultation",
      description: "Comprehensive health assessment and diagnosis for your pet.",
      price: "Free",
      isFree: true
    },
    {
      id: "t2",
      title: "Health Check-up",
      description: "Complete physical examination including vital signs monitoring.",
      price: "₹500",
      isFree: true
    },
    {
      id: "t3",
      title: "Disease Treatment",
      description: "Diagnosis and treatment for all general diseases and infections.",
      price: "Free",
      isFree: true
    },
    {
      id: "t4",
      title: "Deworming",
      description: "Internal parasite treatment for dogs and cats of all ages.",
      price: "Free",
      isFree: true
    }
  ],
  surgery: [
    {
      id: "s1",
      title: "Neutering / Spaying",
      description: "Safe and professional sterilization surgery with post-op care.",
      price: "Free",
      isFree: true,
      note: "Based on pet size"
    },
    {
      id: "s2",
      title: "Castration",
      description: "Male pet sterilization performed by experienced surgeons.",
      price: "Free",
      isFree: true,
      note: "Based on pet size"
    },
    {
      id: "s3",
      title: "Tumor Removal",
      description: "Surgical removal of tumors with biopsy option available.",
      price: "Consultation required",
      isFree: true,
      note: "External specialist may be required"
    }
  ]
};

export const serviceCategories = [
  { id: "vaccination", label: "Vaccination", icon: "Syringe" },
  { id: "treatment", label: "Treatment", icon: "Stethoscope" },
  { id: "surgery", label: "Surgery", icon: "Scissors" }
];
