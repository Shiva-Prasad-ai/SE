import React from 'react';
import { sectionsData } from '../data/presentationData';

export function SystemStatusHUD({ activeSection, isPresenterMode }) {
  const currentSectionData = sectionsData[activeSection] || sectionsData[0];
  const hud = currentSectionData.hud || {
    status: "OPERATIONAL",
    statusCode: "normal",
    version: "1.0",
    modules: 12,
    dependencies: 8,
    warnings: 0
  };

  if (isPresenterMode) return null;

  const statusColor = 
    hud.statusCode === 'degraded' 
      ? 'text-rose-400 border-rose-500/40 bg-rose-950/80' 
      : hud.statusCode === 'adapting' 
        ? 'text-cyan-400 border-cyan-500/40 bg-cyan-950/80' 
        : hud.statusCode === 'upgraded' 
          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/80' 
          : 'text-[#f59e0b] border-[#f59e0b]/40 bg-[#0f172a]/90';

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-30 pointer-events-auto">
      <div className="glass-panel p-3 rounded-xl border-[#f59e0b]/30 shadow-xl bg-[#0f172a]/95 text-xs font-mono w-48 space-y-2">
        
        {/* HUD Status Bar */}
        <div className="border-b border-slate-800 pb-1.5 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SYSTEM HUD</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${statusColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            {hud.status}
          </span>
        </div>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <div>
            <div className="text-slate-500 font-bold">VERSION</div>
            <div className="text-white font-extrabold">{hud.version}</div>
          </div>
          <div>
            <div className="text-slate-500 font-bold">MODULES</div>
            <div className="text-slate-200 font-bold">{hud.modules}</div>
          </div>
          <div>
            <div className="text-slate-500 font-bold">DEPS</div>
            <div className="text-slate-200 font-bold">{hud.dependencies}</div>
          </div>
          <div>
            <div className="text-slate-500 font-bold">WARNINGS</div>
            <div className={`font-extrabold ${hud.warnings > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
              {hud.warnings}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
