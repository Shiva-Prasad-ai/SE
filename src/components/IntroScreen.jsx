import React, { useState } from 'react';
import VolumetricParticleSphere from './VolumetricParticleSphere';

export function IntroScreen({ onGoToTypes }) {
  const [maintenanceState] = useState('NORMAL');

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="hero-pattern relative overflow-hidden py-6 md:py-10 border-b border-[#dbd2c3]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[48px] relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Title & Description */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <h1 className="font-display text-[40px] sm:text-[48px] md:text-[56px] leading-[1.1] text-[#ff6f3d] tracking-tight font-bold">
              Software <br /> Maintenance
            </h1>

            <p className="font-body-lg text-[17px] sm:text-[18px] text-[#595147] max-w-2xl leading-relaxed">
              The process of modifying a software system after delivery to correct faults, improve performance, or adapt it to a changed environment. It's not just fixing bugs; it's about extending the life and value of your digital assets.
            </p>
          </div>

          {/* Right Column: 3D Volumetric Particle Software System */}
          <div className="md:col-span-5 relative w-full">
            <VolumetricParticleSphere maintenanceState={maintenanceState} />
          </div>
        </div>
      </section>

      {/* Why Maintenance Matters Section with Hyperlink */}
      <section className="py-12 md:py-20 bg-[#ffffff]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[48px]">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="font-headline-lg text-[32px] text-[#ff6f3d] font-bold">Why Maintenance Matters</h2>
            <p className="font-body-md text-[16px] text-[#595147] leading-relaxed">
              Software is not static. Without ongoing maintenance, it can become less reliable, less secure and increasingly incompatible with changing technologies and requirements.
            </p>

            <div className="pt-2">
              <button
                onClick={onGoToTypes}
                className="inline-flex items-center gap-2 text-[#ff6f3d] hover:text-[#e05524] font-headline-sm text-[20px] font-bold transition-all hover:underline cursor-pointer group"
              >
                <span>Maintenance Types</span>
                <span className="material-symbols-outlined text-[24px] transform group-hover:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IntroScreen;
