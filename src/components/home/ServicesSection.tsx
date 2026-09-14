import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "../ui/ServiceCard";

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F5]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="OUR CAPABILITIES"
          title="What We Do"
          subtitle="Comprehensive design, planning, renovation, and construction services structured to bring your vision to life seamlessly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              shortDesc={service.shortDesc}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
