import Image, { StaticImageData } from "next/image";
import { fonts, colors } from "@/lib/styleConstants";

interface InfoSectionProps {
  title: string;
  description: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  reverse?: boolean;
}

export function InfoSection({
  title,
  description,
  image,
  imageAlt = "",
  reverse = false,
}: InfoSectionProps) {
  return (
    <section
      className={`flex flex-col md:flex-row md:items-center gap-8 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="md:flex-grow">
        <h2 className={`${fonts.heading} text-3xl text-[${colors.text}] mb-4`}>
          {title}
        </h2>
        <p className={`${fonts.body} text-[${colors.text}] leading-relaxed`}>
          {description}
        </p>
      </div>
      {image && (
        <div className="md:w-1/3 md:flex-shrink-0">
          <Image
            src={image}
            alt={imageAlt}
            width={169}
            height={300}
            className="w-full h-auto bg-[#474747] rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
