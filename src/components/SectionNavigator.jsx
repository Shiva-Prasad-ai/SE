import React from 'react';
import { sectionsData } from '../data/presentationData';
import { X, Layers, CheckCircle2 } from 'lucide-react';

export function SectionNavigator({ isOpen, onClose, activeSection, onSelectSection }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 border-[#f59e0b]/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bg-[#0f172a]/95 text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f172a] border border-[#f59e0b]/50 flex items-center justify-center text-[#f59e0b]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Section Navigation Menu</h2>
              <p className="text-xs text-slate-400">Select any section to jump directly in the 3D timeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-6 overflow-y-auto pr-1 custom-scrollbar">
          {sectionsData.map((sec, idx) => {
            const isActive = idx === activeSection;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  onSelectSection(idx);
                  onClose();
                }}
                className={`flex flex-col justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 shadow-lg shadow-[#f59e0b]/20 scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:border-[#f59e0b]/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-slate-950 text-[#f59e0b]' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {sec.number}
                  </span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                </div>

                <div>
                  <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                    {sec.tag}
                  </div>
                  <div className="text-xs font-bold leading-tight group-hover:text-[#f59e0b] transition-colors line-clamp-2">
                    {sec.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Tip: Scroll vertically or press <b>Arrow Keys</b> to navigate</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#f59e0b] text-slate-950 font-bold hover:bg-[#d97706] transition-all cursor-pointer"
          >
            Close Menu
          </button>
        </div>

      </div>
    </div>
  );
}
