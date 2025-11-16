"use client"

import Link from 'next/link'
import homeBkg from './images/image.png'
import { HeroSection } from '@/components/shared/HeroSection'
import { InfoSection } from '@/components/shared/InfoSection'
import { fonts, colors } from '@/lib/styleConstants'

export default function Home() {
  return (
    <main className="absolute top-0 left-0 right-0 min-h-screen bg-[#FBFBFB]">
      <HeroSection backgroundImage={homeBkg} backgroundAlt="Hero background">
        <h1 className={`${fonts.body} font-bold text-5xl md:text-6xl mb-4 pb-4`}>
          Fall in love <span className="text-[#FC7A4B] italic"><br />together</span>
        </h1>
        <p className={`${fonts.body} text-lg md:text-xl w-3xs`}>
          Feel the connection in the <span className="text-[#97AEEF] font-bold italic">moment</span> of being{" "}
          <span className="text-[#97AEEF] font-bold italic">together</span>.<br /> Plan the perfect date powered by XX.
        </p>
      </HeroSection>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-20">
        <InfoSection
          title="Plan"
          description="Tell us what works for you and things you know your date will love. Then well do the hard work and our Harmony algorithm will come up with tailored activities for you."
          image="/placeholder.svg?height=300&width=169"
          imageAlt="Planning illustration"
        />

        <InfoSection
          title="Pick"
          description="Choose your favourite options from a list of diverse options that we know matches your vibe."
          image="/placeholder.svg?height=300&width=169"
          imageAlt="Selection illustration"
        />

        <InfoSection
          title="Venture"
          description="Follow our plan for the perfect date. From the schedule to the curated map, enjoy the moment while we do the heavylifting"
          image="/placeholder.svg?height=300&width=169"
          imageAlt="Adventure illustration"
        />

        <section className="text-center py-12">
          <h2 className={`${fonts.heading} text-4xl text-[${colors.text}] mb-8`}>Are you ready?</h2>
          <Link href="/plan" passHref>
            <button className={`hover:font-bold bg-gradient-to-r from-[#E35151] to-[#FC7A4B] text-white text-xl ${fonts.body} px-8 py-3 rounded-2xl hover:bg-opacity-90 transition-colors`}>
              I&apos;m Ready to Fall in Love
            </button>
          </Link>
        </section>
      </div>
    </main>
  )
}