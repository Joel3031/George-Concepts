export const siteConfig = {
  name: "George Concepts",
  brandName: "George Concepts Design Studio",
  tagline: "Designing Spaces. Building Dreams.",
  subTagline: "From Concept to Handover — Architecture, Interiors, Renovation, & Turnkey Residential Construction thoughtfully executed for modern living.",
  
  description: "George Concepts Design Studio brings architecture, interior design, home renovation, space planning, and turnkey construction together under one roof.",
  
  // Contact & Location Configuration (Easily customizable via env vars or config)
  contact: {
    phone: process.env.NEXT_PUBLIC_SITE_PHONE || "+91 98765 43210",
    email: process.env.NEXT_PUBLIC_SITE_EMAIL || "hello@georgeconcepts.com",
    whatsapp: process.env.NEXT_PUBLIC_SITE_WHATSAPP || "919876543210", // Digits with country code, no + or spaces
    whatsappWelcomeMsg: "Hello George Concepts! I would like to inquire about an architectural/interior project.",
    address: process.env.NEXT_PUBLIC_SITE_ADDRESS || "George Concepts Design Studio, Main Avenue, Kochi, Kerala",
    workingHours: "Monday – Saturday: 9:00 AM – 6:30 PM",
  },

  social: {
    instagram: "https://www.instagram.com/georgeconcepts/",
    facebook: "https://facebook.com/georgeconcepts",
    linkedin: "https://linkedin.com/company/georgeconcepts",
    pinterest: "https://pinterest.com/georgeconcepts",
  },

  // Service list for quick references & dropdown options
  services: [
    {
      id: "interior-design",
      title: "Interior Design",
      shortDesc: "Thoughtfully planned interiors combining functionality, comfort, and distinct architectural character.",
      fullDesc: "We create bespoke living environments tailored to your lifestyle. From material selection, custom joinery, lighting concepts, to curated furniture, we transform raw structures into warm, functional homes.",
      icon: "LayoutGrid",
    },
    {
      id: "turnkey-construction",
      title: "Turnkey Residential Projects",
      shortDesc: "Complete end-to-end execution from initial foundation work to final interior finishing and key handover.",
      fullDesc: "Experience seamless construction without the stress of managing multiple contractors. We manage site execution, structural building, interior fit-outs, and hand over a move-in ready sanctuary.",
      icon: "Home",
    },
    {
      id: "renovation",
      title: "Home Renovation & Restructuring",
      shortDesc: "Transforming existing structures with smart modern layouts, premium finishes, and structural upgrades.",
      fullDesc: "Breathe new life into aging residences. We redesign interior flow, update outdated plumbing and electrical systems, and replace worn surfaces with modern architectural finishes.",
      icon: "Hammer",
    },
    {
      id: "architectural-planning",
      title: "Architectural Planning",
      shortDesc: "Detailed floor plans, 3D elevations, structural designs, and regulatory compliance mapping.",
      fullDesc: "Every iconic project begins with a precise plan. We deliver comprehensive architectural drawings, site layout optimization, 3D visual walkthroughs, and building regulation documentation.",
      icon: "Compass",
    },
    {
      id: "architectural-consultation",
      title: "Architectural Consultation",
      shortDesc: "Expert advisory for design feasibility, material selection, budget planning, and project direction.",
      fullDesc: "Need expert feedback before starting your build? Our senior architects evaluate site constraints, material longevity, spatial efficiency, and cost optimizations.",
      icon: "MessageSquareCheck",
    },
    {
      id: "space-planning",
      title: "Interior Architecture & Space Planning",
      shortDesc: "Intelligent layout design optimizing natural light, airflow, storage, and movement hierarchy.",
      fullDesc: "We refine floor plans to eliminate dead spaces, maximize daylight penetration, and ensure smooth circulation for comfortable modern living.",
      icon: "Maximize2",
    },
  ],

  // Project Categories
  categories: [
    { id: "all", label: "All Projects" },
    { id: "Interior", label: "Interior Design" },
    { id: "Turnkey", label: "Turnkey Construction" },
    { id: "Renovation", label: "Renovation" },
    { id: "Planning", label: "Architectural Planning" },
  ],

  galleryCategories: [
    "All",
    "Interiors",
    "Exteriors",
    "Architecture",
    "Renovation",
    "Construction",
    "Details",
  ],

  // Trust Indicators
  trustStats: [
    { label: "End-to-End Handover", desc: "Single point of accountability from planning to keys" },
    { label: "Precision Planning", desc: "Detailed 3D visualizations and structural blueprints" },
    { label: "Premium Materials", desc: "Handpicked sustainable stone, wood, and metal finishes" },
    { label: "Client Collaboration", desc: "Transparent milestone updates throughout execution" },
  ],

  // Process Steps
  processSteps: [
    {
      step: "01",
      title: "Initial Consultation",
      desc: "We discuss your vision, spatial needs, budget expectations, site context, and timeline.",
    },
    {
      step: "02",
      title: "Architectural Planning",
      desc: "Creating floor plans, 3D structural concepts, orientation studies, and material palettes.",
    },
    {
      step: "03",
      title: "Interior & Detailed Design",
      desc: "Finalizing custom joinery, electrical layouts, lighting, texture boards, and technical drawings.",
    },
    {
      step: "04",
      title: "Site Execution",
      desc: "Mobilizing our dedicated engineering and craftsman team under strict quality supervision.",
    },
    {
      step: "05",
      title: "Refinement & Finishing",
      desc: "Installing fine fixtures, joinery, surface finishes, landscaping, and deep cleaning.",
    },
    {
      step: "06",
      title: "Key Handover",
      desc: "A comprehensive walk-through inspection and handing over your beautifully finished space.",
    },
  ],

  // What We Ensure
  commitments: [
    { title: "Clear Structural Planning", desc: "No guesswork. Every detail is mapped out before construction begins." },
    { title: "Functional & Aesthetic Balance", desc: "Spaces that look stunning in photos and feel effortlesly practical daily." },
    { title: "Material Quality Control", desc: "Strict sourcing standards for steel, timber, tiles, and fittings." },
    { title: "Client Communication", desc: "Regular progress photos, stage updates, and site visit coordinates." },
  ],
};
