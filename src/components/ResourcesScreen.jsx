import React from 'react';

export function ResourcesScreen() {
  return (
    <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-[48px] py-10 md:py-16 w-full space-y-12">
      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-block bg-[#f3ecdb] text-[#ff6f3d] px-3.5 py-1 rounded-full font-label-md text-[14px] font-semibold border border-[#e6dfcd]">
          Project Credits & Documentation
        </div>
        <h1 className="font-display text-[36px] md:text-[48px] leading-[1.1] text-[#2b241f] font-bold">
          Reference & Credits
        </h1>
        <p className="font-body-lg text-[17px] text-[#595147] leading-relaxed">
          Source references and design foundations powering the Antares Software Maintenance series.
        </p>
      </header>

      {/* Reference Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Card 1: Design Reference */}
        <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#dbd2c3] shadow-sm space-y-4 hover:border-[#ff6f3d] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#f3ecdb] text-[#ff6f3d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">palette</span>
              </div>
              <div>
                <span className="font-label-md text-[12px] text-[#8071c9] uppercase tracking-wider font-bold">Visual System</span>
                <h2 className="font-headline-sm text-[20px] text-[#2b241f] font-bold">Design</h2>
              </div>
            </div>
            <p className="font-headline-sm text-[18px] text-[#ff6f3d] font-semibold mt-3">
              Google Stitch and Antigravity
            </p>
            <p className="font-body-sm text-[14px] text-[#595147] leading-relaxed mt-2">
              UI architecture, Material 3 design tokens, typography system, and responsive component layouts derived from Google Stitch design specifications.
            </p>
          </div>
          <div className="pt-3 border-t border-[#f3ecdb] text-[12px] text-[#8a8073] font-mono">
            Source: Stitch MCP & Antigravity IDE
          </div>
        </div>

        {/* Card 2: Information Reference */}
        <div className="bg-[#ffffff] p-6 rounded-2xl border border-[#dbd2c3] shadow-sm space-y-4 hover:border-[#ff6f3d] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#f3ecdb] text-[#ff6f3d] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              </div>
              <div>
                <span className="font-label-md text-[12px] text-[#8071c9] uppercase tracking-wider font-bold">Content Foundation</span>
                <h2 className="font-headline-sm text-[20px] text-[#2b241f] font-bold">Information</h2>
              </div>
            </div>
            <p className="font-headline-sm text-[18px] text-[#ff6f3d] font-semibold mt-3">
              Open source enhanced with AI
            </p>
            <p className="font-body-sm text-[14px] text-[#595147] leading-relaxed mt-2">
              Software engineering standards (IEEE 1219, ISO/IEC 14764) and open-source maintenance documentation refined and structured with AI intelligence.
            </p>
          </div>
          <div className="pt-3 border-t border-[#f3ecdb] text-[12px] text-[#8a8073] font-mono">
            Source: Open Source Standards & LLM Curation
          </div>
        </div>
      </section>

      {/* Perfectly Fitted Inline-Flex Thank You Badge */}
      <div className="flex justify-center w-full pt-4">
        <div className="inline-flex items-center gap-4 bg-[#f3ecdb] px-8 py-4 rounded-2xl border border-[#e6dfcd] shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#ff6f3d] text-white flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
          </div>
          <span className="font-display text-[28px] md:text-[32px] font-bold tracking-tight text-[#ff6f3d] whitespace-nowrap leading-none">
            Thank You!
          </span>
        </div>
      </div>
    </main>
  );
}

export default ResourcesScreen;
