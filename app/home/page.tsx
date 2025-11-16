"use client"

import Image from 'next/image'
import homeBkg from '../../public/homebkg.png'
import plan from '../../public/plan.png'
import date from '../../public/date.jpg'

export default function Home() {
  return (
    <main className="absolute top-0 left-0 right-0 min-h-screen bg-[#FBFBFB]">
      {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center">
            <Image
                src={homeBkg}
                alt="Hero background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-10" /> {/* Overlay for better text visibility */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 md:pl-0 text-white">
                <h1 className="font-['Instrument_Sans'] font-bold text-5xl md:text-6xl mb-4 pb-4">
                Fall in love <span className="text-[#FC7A4B] italic"><br />together</span>
                </h1>
                <p className="font-['Instrument_Sans'] text-lg md:text-xl w-3xs" >
                Feel the connection in the <span className="text-[#97AEEF] font-bold italic">moment</span> of being{" "}
                <span className="text-[#97AEEF] font-bold italic">together</span>.<br /> Plan the perfect date powered by Flutter.
                </p>
            </div>
        </section>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        {/* Plan Section */}
        <section className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:flex-grow">
            <h2 className="font-['Alice'] text-3xl text-[#474747] mb-4">Plan</h2>
            <p className="font-['Instrument_Sans'] text-[#474747] leading-relaxed">
              Tell us what works for you and things you know your date will love. Then well do the hard work and our
              Harmony algorithm will come up with tailored activities for you.
            </p>
          </div>
          <div className="md:w-1/3 md:flex-shrink-0">
            <Image
              src={plan}
              alt="Planning illustration"
              width={169}
              height={300}
              className="w-full h-auto bg-[#474747] rounded-lg"
            />
          </div>
        </section>

        {/* Venture Section */}
        <section className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:flex-grow">
            <h2 className="font-['Alice'] text-3xl text-[#474747] mb-4">Venture</h2>
            <p className="font-['Instrument_Sans'] text-[#474747] leading-relaxed">
              Follow our plan for the perfect date. From the schedule to the curated map, enjoy the moment while we do
              the heavylifting
            </p>
          </div>
          <div className="md:w-1/3 md:flex-shrink-0">
            <Image
              src={date}
              alt="Adventure illustration"
              width={169}
              height={300}
              className="w-full h-auto bg-[#474747] rounded-lg"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h2 className="font-['Alice'] text-4xl text-[#474747] mb-8">Are you ready?</h2>
          <button className="hover:font-bold bg-gradient-to-r from-[#E35151] to-[#FC7A4B] text-white text-xl font-['Instrument_Sans'] px-8 py-3 rounded-2xl hover:bg-opacity-90 transition-colors">
            I&apos;m Ready to Fall in Love
          </button>
        </section>
      </div>
    </main>
  )
}

