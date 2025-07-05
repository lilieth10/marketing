import React from 'react';
import { Header } from '@/components/landing/Header/Header';
import { Hero } from '@/components/landing/Hero/Hero';
import { Gallery } from '@/components/landing/Gallery/Gallery';
import { Technology } from '@/components/landing/Technology/Technology';
import { Roles } from '@/components/landing/Roles/Roles';
import { Features } from '@/components/landing/Features/Features';
import { ThreeSteps } from '@/components/landing/ThreeSteps/ThreeSteps';
import { CTA } from '@/components/landing/CTA/CTA';
import { Footer } from '@/components/landing/Footer/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Gallery />
      <Technology />
      <Roles />
      <Features />
      <ThreeSteps />
      <CTA />
      <Footer />
    </div>
  );
}
