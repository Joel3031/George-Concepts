import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-[#0C3B2E] text-white hover:bg-[#07251D] shadow-md hover:shadow-lg focus:ring-[#0C3B2E]",
    secondary:
      "bg-[#5B8A3C] text-white hover:bg-[#4E7933] shadow-md hover:shadow-lg focus:ring-[#5B8A3C]",
    accent:
      "bg-[#76A035] text-white hover:bg-[#688E2D] shadow-md hover:shadow-lg focus:ring-[#76A035]",
    outline:
      "border-2 border-[#0C3B2E] text-[#0C3B2E] hover:bg-[#0C3B2E] hover:text-white focus:ring-[#0C3B2E]",
    ghost:
      "bg-transparent text-[#0C3B2E] hover:bg-[#E5E2D9]/40 focus:ring-[#0C3B2E]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-4 text-base tracking-wide font-semibold",
  };

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="ml-2 inline-flex items-center">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && <span className="ml-2 inline-flex items-center">{icon}</span>}
    </button>
  );
};
