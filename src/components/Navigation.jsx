import React, { useState } from 'react';

export function Navigation({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'intro', label: 'Introduction' },
    { id: 'types', label: 'Maintenance Types' },
    { id: 'phases', label: 'Maintenance Phases' },
    { id: 'examples', label: 'Example' },
    { id: 'resources', label: 'Reference' }
  ];

  return (
    <header className="w-full top-0 sticky z-50 bg-[#ffffff] border-b border-[#dbd2c3] shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 md:px-[48px] h-16">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('intro')}
            className="font-display text-[24px] leading-[1.3] font-bold text-[#ff6f3d] tracking-tight hover:opacity-85 transition-opacity cursor-pointer"
          >
            Antares
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-label-md text-[14px] leading-none tracking-[0.05em] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#ff6f3d] border-b-2 border-[#ff6f3d] font-bold pb-1'
                    : 'text-[#595147] hover:text-[#ff6f3d]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#2b241f] p-2 hover:bg-[#f3ecdb] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#dbd2c3] bg-[#ffffff] px-4 py-4 space-y-3 shadow-md animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-md font-label-md text-[14px] cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[#f3ecdb] text-[#ff6f3d] font-bold'
                  : 'text-[#595147] hover:bg-[#fcfaf7]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navigation;
