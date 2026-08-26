import React, { useState, useEffect } from 'react';
import { sectionsData } from '../data/presentationData';
import { 
  Terminal, 
  ArrowRight, 
  UserCheck, 
  Edit, 
  BookOpen, 
  Activity, 
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export function UIOverlay({
  activeSection,
  onNavigate,
  isPresenterMode,
  studentData,
  openStudentModal
}) {
  const currentSection = sectionsData[activeSection] || sectionsData[0];
  const cards = currentSection.cards;

  // Active inline tab: 'definition' | 'process' | 'example' | null
  const [activeTab, setActiveTab] = useState('definition');

  // Explicitly reset to 'definition' on every slide change
  useEffect(() => {
    setActiveTab('definition');
  }, [activeSection]);

  if (isPresenterMode) return null;

  // SLIDE 01 SINGLE CARD SPECIAL DISPLAY
  if (cards?.singleCard) {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4 pointer-events-none">
        <div className="glass-panel p-6 sm:p-7 rounded-2xl border-[#f59e0b]/50 shadow-2xl bg-[#0f172a]/95 text-center space-y-4 pointer-events-auto animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              SLIDE 01 — INTRODUCTION
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-900 border border-[#f59e0b]/40 text-[#f59e0b] font-bold">
              1 / 10
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide leading-snug">
            {cards.singleCard.title}
          </h1>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal text-left">
            <span className="text-[#f59e0b] font-bold block mb-1">Definition:</span>
            "{cards.singleCard.text}"
          </div>

          <div className="pt-1 flex items-center justify-center gap-2 text-xs font-bold text-[#f59e0b]">
            <span>Scroll down to continue</span>
            <ArrowRight className="w-4 h-4 rotate-90 animate-bounce" />
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 pointer-events-none">
      
      {/* Centered Scrollable Container */}
      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 space-y-4 pointer-events-auto transition-all duration-500 custom-scrollbar text-center">
        
        {/* SLIDE HEADER CARD */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border-[#f59e0b]/50 shadow-2xl relative overflow-hidden bg-[#0f172a]/95 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              SLIDE {currentSection.number} — {currentSection.tag}
            </span>
            <span className="text-xs px-3 py-0.5 rounded-md bg-slate-900 border border-[#f59e0b]/40 text-[#f59e0b] font-bold">
              {activeSection + 1} / 10
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide leading-tight">
            {currentSection.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#f59e0b] font-semibold tracking-wider">
            {currentSection.subtitle}
          </p>

          {/* TAB BUTTONS */}
          <div className="flex items-center justify-center gap-2 pt-3.5 mt-2 border-t border-slate-800 flex-wrap">
            {cards?.definition && (
              <button
                onClick={() => setActiveTab('definition')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                  activeTab === 'definition'
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 shadow-md shadow-[#f59e0b]/20 scale-[1.02]'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-[#f59e0b]/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Definition
                {activeTab === 'definition' ? <ChevronDown className="w-3.5 h-3.5 ml-0.5" /> : <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-slate-400" />}
              </button>
            )}

            {cards?.process && (
              <button
                onClick={() => setActiveTab('process')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                  activeTab === 'process'
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 shadow-md shadow-[#f59e0b]/20 scale-[1.02]'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-[#f59e0b]/50'
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> Workflow
                {activeTab === 'process' ? <ChevronDown className="w-3.5 h-3.5 ml-0.5" /> : <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-slate-400" />}
              </button>
            )}

            {cards?.example && (
              <button
                onClick={() => setActiveTab('example')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border ${
                  activeTab === 'example'
                    ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 shadow-md shadow-[#f59e0b]/20 scale-[1.02]'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-[#f59e0b]/50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Scenario
                {activeTab === 'example' ? <ChevronDown className="w-3.5 h-3.5 ml-0.5" /> : <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-slate-400" />}
              </button>
            )}
          </div>
        </div>

        {/* DEFINITION CARD CONTENT DISPLAY */}
        {activeTab === 'definition' && cards?.definition && (
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-[#f59e0b]/50 shadow-2xl space-y-3 animate-fadeIn text-left bg-[#0f172a]/95">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2.5">
              <span className="flex items-center gap-2 text-[#f59e0b]">
                <BookOpen className="w-4 h-4 text-[#f59e0b]" />
                {cards.definition.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-[#f59e0b]/40 text-[#f59e0b]">
                {cards.definition.badge}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-[#f8fafc] leading-relaxed tracking-wide space-y-2">
              <div className="text-[#f59e0b] font-bold text-xs">Formal Definition:</div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed text-white font-normal">
                "{cards.definition.text}"
              </div>
            </div>
          </div>
        )}

        {/* PROCESS & WORKFLOW CARD CONTENT DISPLAY */}
        {activeTab === 'process' && cards?.process && (
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-[#f59e0b]/50 shadow-2xl space-y-3 animate-fadeIn text-left bg-[#0f172a]/95">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2.5">
              <span className="flex items-center gap-2 text-[#f59e0b]">
                <Activity className="w-4 h-4 text-[#f59e0b]" />
                {cards.process.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[#f59e0b]">
                {cards.process.badge}
              </span>
            </div>

            {/* Workflow steps */}
            {cards.process.steps && (
              <div className="space-y-2">
                <div className="text-xs text-[#f59e0b] font-bold tracking-wider">Process Flow Steps:</div>
                {cards.process.steps.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-[#f59e0b] text-slate-950">
                        {s.num}
                      </span>
                      <span className="font-bold text-white">{s.title}</span>
                    </div>
                    <span className="text-xs text-slate-300">{s.desc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Pillars */}
            {cards.process.pillars && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {cards.process.pillars.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="font-extrabold text-[#f59e0b] text-xs mb-0.5">{p.name}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{p.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Matrix */}
            {cards.process.matrix && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {cards.process.matrix.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-white text-xs">{m.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{m.focus}</div>
                    </div>
                    <span className="text-xs font-bold text-[#f59e0b]">{m.percent}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Challenges */}
            {cards.process.challenges && (
              <div className="space-y-1.5 pt-1">
                {cards.process.challenges.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REAL-WORLD SCENARIO CARD CONTENT DISPLAY */}
        {activeTab === 'example' && cards?.example && (
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-[#f59e0b]/50 shadow-2xl space-y-3 animate-fadeIn text-left bg-[#0f172a]/95">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2.5">
              <span className="flex items-center gap-2 text-[#f59e0b]">
                <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />
                {cards.example.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-[#f59e0b]/40 text-[#f59e0b]">
                {cards.example.badge}
              </span>
            </div>

            {cards.example.scenario && (
              <div className="text-xs sm:text-sm text-[#f8fafc] leading-relaxed space-y-1">
                <div className="text-[#f59e0b] font-bold text-xs">Scenario Example:</div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed text-white">
                  {cards.example.scenario}
                </div>
              </div>
            )}

            {cards.example.text && (
              <div className="text-xs sm:text-sm text-[#f8fafc] leading-relaxed space-y-1">
                <div className="text-[#f59e0b] font-bold text-xs">Key Insight:</div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed text-white">
                  {cards.example.text}
                </div>
              </div>
            )}

            {/* Triggers */}
            {cards.example.triggers && (
              <div className="flex flex-wrap gap-2 pt-1">
                {cards.example.triggers.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-[#f59e0b] font-bold">
                    ⚡ {t}
                  </span>
                ))}
              </div>
            )}

            {/* Code Snippet */}
            {cards.example.codeSnippet && (
              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-[#f59e0b]" /> Hotfix Code Diff:
                </div>
                <pre className="text-xs bg-slate-950 p-3.5 rounded-xl overflow-x-auto text-slate-200 leading-relaxed border border-slate-800">
                  {cards.example.codeSnippet}
                </pre>
              </div>
            )}

            {/* Changes */}
            {cards.example.changes && (
              <div className="space-y-2 pt-1">
                {cards.example.changes.map((ch, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-500 line-through">{ch.old}</div>
                    <div className="flex items-center gap-1.5 text-[#f59e0b] font-bold">
                      <ArrowRight className="w-3.5 h-3.5 text-[#f59e0b]" /> {ch.new}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Metrics */}
            {cards.example.metrics && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {cards.example.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="text-slate-400 font-bold">{m.metric}</div>
                    <div className="text-[#f59e0b] font-extrabold text-sm mt-0.5">{m.after}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 10 PRESENTER CARD */}
        {activeSection === 9 && (
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-[#f59e0b]/50 shadow-2xl space-y-3 animate-fadeIn text-left bg-[#0f172a]/95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-white tracking-wider">
                <UserCheck className="w-4 h-4 text-[#f59e0b]" />
                CLASSROOM PRESENTER CARD
              </div>
              <button
                onClick={openStudentModal}
                className="px-2.5 py-1 rounded-lg bg-[#f59e0b] text-slate-950 hover:bg-[#d97706] text-xs font-bold flex items-center gap-1 border border-[#f59e0b] cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-400 font-bold uppercase text-xs">NAME</div>
                <div className="text-white font-extrabold text-sm mt-0.5">{studentData.name}</div>
              </div>
              <div>
                <div className="text-slate-400 font-bold uppercase text-xs">USN / ROLL</div>
                <div className="text-[#f59e0b] font-extrabold text-sm mt-0.5">{studentData.usn}</div>
              </div>
              <div>
                <div className="text-slate-400 font-bold uppercase text-xs">CLASS</div>
                <div className="text-slate-300 font-semibold mt-0.5">{studentData.classSection}</div>
              </div>
              <div>
                <div className="text-slate-400 font-bold uppercase text-xs">TEAM</div>
                <div className="text-slate-300 font-semibold mt-0.5">{studentData.teamMembers}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
