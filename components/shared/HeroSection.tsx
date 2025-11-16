import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface HeroSectionProps {
  backgroundImage: StaticImageData;
  backgroundAlt: string;
  overlayOpacity?: number;
  children: ReactNode;
}

export function HeroSection({
  backgroundImage,
  backgroundAlt,
  overlayOpacity = 0.1,
  children,
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen flex items-center">
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:pl-0 text-white">
        {children}
      </div>
    </section>
  );
}
