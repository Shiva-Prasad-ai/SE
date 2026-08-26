import React from 'react';

export function Footer({ setActiveTab }) {
  return (
    <footer className="w-full mt-16 bg-[#f3ecdb] border-t border-[#dbd2c3]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto px-4 md:px-[48px] py-8 items-center">
        {/* Left Column: Brand Name & Copyright */}
        <div className="flex flex-col space-y-1 text-left">
          <span className="font-headline-sm text-[22px] font-bold text-[#ff6f3d] tracking-tight">
            Antares
          </span>
          <span className="font-body-sm text-[13px] text-[#8071c9] font-medium">
            © 2026 Antares
          </span>
        </div>

        {/* Center Column: Navigation Links */}
        <div className="flex flex-col space-y-2 items-center text-center">
          <h4 className="font-label-md text-[13px] text-[#2b241f] font-bold uppercase tracking-wider mb-1">
            Navigation
          </h4>
          <button 
            onClick={() => setActiveTab && setActiveTab('intro')}
            className="font-body-sm text-[14px] text-[#595147] hover:underline hover:text-[#ff6f3d] transition-all cursor-pointer"
          >
            Introduction
          </button>
          <button 
            onClick={() => setActiveTab && setActiveTab('types')}
            className="font-body-sm text-[14px] text-[#595147] hover:underline hover:text-[#ff6f3d] transition-all cursor-pointer"
          >
            Maintenance Types
          </button>
          <button 
            onClick={() => setActiveTab && setActiveTab('phases')}
            className="font-body-sm text-[14px] text-[#595147] hover:underline hover:text-[#ff6f3d] transition-all cursor-pointer"
          >
            Maintenance Phases
          </button>
          <button 
            onClick={() => setActiveTab && setActiveTab('examples')}
            className="font-body-sm text-[14px] text-[#595147] hover:underline hover:text-[#ff6f3d] transition-all cursor-pointer"
          >
            Examples
          </button>
          <button 
            onClick={() => setActiveTab && setActiveTab('resources')}
            className="font-body-sm text-[14px] text-[#595147] hover:underline hover:text-[#ff6f3d] transition-all cursor-pointer"
          >
            Reference & Credits
          </button>
        </div>

        {/* Right Column: Empty for spacing balance */}
        <div className="hidden md:block" />
      </div>
    </footer>
  );
}

export default Footer;
