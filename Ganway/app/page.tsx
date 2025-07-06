import Header from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Technology } from "@/components/landing/Technology"
import DataResultsSection from "@/components/landing/DataResults"
import { Roles } from "@/components/landing/Roles"
import { Features } from "@/components/landing/Features"
import ProcessSection from "@/components/landing/Process"
import CTASection from "@/components/landing/CTA"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Technology />
      <DataResultsSection />
      <Roles />
      <Features />
      <ProcessSection />
      <CTASection />
      <Footer />
    </div>
  )
}
