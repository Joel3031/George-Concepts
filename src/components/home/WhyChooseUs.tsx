import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldAlert, Sparkles, Layers, Eye, Users } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#76A035]" />,
      title: "Thoughtful Design Thinking",
      desc: "Every wall, opening, and material choice is engineered for spatial harmony and everyday comfort.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#76A035]" />,
      title: "End-to-End Execution",
      desc: "Single point of accountability from site preparation to carpentry, electricals, and final key handover.",
    },
    {
      icon: <Users className="w-5 h-5 text-[#76A035]" />,
      title: "Personalized Approach",
      desc: "We design around your specific lifestyle preferences, family needs, and site conditions.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#76A035]" />,
      title: "Quality-Focused Standards",
      desc: "Strict material specifications and site quality audits for long-term structural durability.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-[#76A035]" />,
      title: "Transparent Process",
      desc: "Detailed milestone schedules and clear financial planning without hidden costs or surprises.",
    },
    {
      icon: <Eye className="w-5 h-5 text-[#76A035]" />,
      title: "Obsessive Attention to Detail",
      desc: "Precision in joinery, seamless tile alignment, lighting moods, and crisp architectural lines.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-t border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <SectionHeading
              badge="WHY GEORGE CONCEPTS"
              title="Built Around Ideas. Shaped By Design."
              subtitle="We bring architectural design thinking and turnkey site execution together to create spaces that are aesthetically stunning, effortlessly functional, and built to last."
              align="left"
              className="mb-6 sm:mb-8"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
              {points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] hover:border-[#76A035]/50 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2">
                    {pt.icon}
                    <h3 className="text-sm sm:text-base font-bold text-[#0C3B2E]">{pt.title}</h3>
                  </div>
                  <p className="text-xs text-[#636E6A] leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Column (5 Cols) */}
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E5E2D9]">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
              alt="George Concepts Bespoke Kitchen and Interior Joinery in Thrissur"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C3B2E]/70 via-transparent to-transparent p-4 sm:p-8 flex items-end">
              <div className="text-white">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#A2D157] mb-1">
                  Design Philosophy
                </p>
                <p className="text-sm sm:text-base font-medium italic">
                  &ldquo;A home should reflect the individuals who live inside it while standing the test of time.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
