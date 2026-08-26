import React from 'react';
import { sectionsData } from '../data/presentationData';

export function LifecycleTimeline({ activeSection, isPresenterMode }) {
  const currentSectionData = sectionsData[activeSection] || sectionsData[0];
  const activeStage = currentSectionData.lifecycleStage || "BUILD";

  if (isPresenterMode) return null;

  const stages = [
    { name: "BUILD", label: "Build" },
    { name: "DEPLOY", label: "Deploy" },
    { name: "USE", label: "Use" },
    { name: "MAINTAIN", label: "Maintain" },
    { name: "EVOLVE", label: "Evolve" }
  ];

  const currentStageIndex = stages.findIndex(s => s.name === activeStage);

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="glass-panel px-4 py-2 rounded-2xl border-[#f59e0b]/30 shadow-xl bg-[#0f172a]/95 flex items-center gap-3 text-xs font-mono">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">LIFECYCLE:</span>
        
        <div className="flex items-center gap-2">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <React.Fragment key={stage.name}>
                <div className={`flex items-center gap-1 font-bold transition-all px-2 py-0.5 rounded-md ${
                  isCurrent 
                    ? 'bg-[#f59e0b] text-slate-950 shadow-md shadow-[#f59e0b]/20 scale-105' 
                    : isCompleted 
                      ? 'text-[#f59e0b]' 
                      : 'text-slate-500'
                }`}>
                  <span>{isCompleted ? '✓' : isCurrent ? '●' : '○'}</span>
                  <span>{stage.label}</span>
                </div>
                {idx < stages.length - 1 && (
                  <span className="text-slate-700 text-[10px]">—</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
