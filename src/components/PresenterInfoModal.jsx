import React, { useState } from 'react';
import { sectionsData } from '../data/presentationData';
import { X, User, Hash, GraduationCap, Users, Save, BookOpen, MessageSquare } from 'lucide-react';

export function PresenterInfoModal({ isOpen, onClose, studentData, onSave, activeSection }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'notes'
  const [formData, setFormData] = useState(studentData);

  if (!isOpen) return null;

  const currentSectionData = sectionsData[activeSection] || sectionsData[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 border-[#f59e0b]/40 shadow-2xl overflow-hidden bg-[#0f172a]/95 text-slate-100">
        
        {/* Modal Header & Tabs */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0f172a] border border-[#f59e0b]/50 flex items-center justify-center text-[#f59e0b]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Presenter Control Panel</h2>
              <p className="text-xs text-slate-400">Classroom Speaker Notes & Presenter Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 my-4 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'details'
                ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Presenter Details
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              activeTab === 'notes'
                ? 'bg-[#f59e0b] border-[#f59e0b] text-slate-950 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Speaker Notes (Slide {currentSectionData.number})
          </button>
        </div>

        {/* TAB 1: PRESENTERS DETAILS FORM */}
        {activeTab === 'details' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#f59e0b]" /> Student Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rakshitha M R"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#f59e0b]" /> USN / Roll No.
                </label>
                <input
                  type="text"
                  name="usn"
                  value={formData.usn}
                  onChange={handleChange}
                  placeholder="e.g. 1MS21CS001"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#f59e0b]" /> Class / Section
                </label>
                <input
                  type="text"
                  name="classSection"
                  value={formData.classSection}
                  onChange={handleChange}
                  placeholder="e.g. CSE - 6th Sem - Sec A"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#f59e0b]" /> Team Members (Optional)
              </label>
              <input
                type="text"
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                placeholder="e.g. Member 1, Member 2"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#f59e0b] text-slate-950 font-bold text-xs hover:bg-[#d97706] transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#f59e0b]/20"
              >
                <Save className="w-3.5 h-3.5" /> Save Details
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: SPEAKER NOTES FOR CURRENT SLIDE */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed space-y-2">
              <div className="text-[#f59e0b] font-bold uppercase flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Slide {currentSectionData.number} Speaker Script:
              </div>
              <p className="text-slate-200 text-sm leading-relaxed pt-1">
                "{currentSectionData.speakerNotes}"
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0f172a] border border-[#f59e0b]/30 text-xs text-slate-300">
              💡 <span className="font-bold text-[#f59e0b]">Presentation Tip:</span> Speaker notes are private to your presenter control panel and remain hidden when Present Mode is active.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#f59e0b] text-slate-950 font-bold text-xs hover:bg-[#d97706] transition-all cursor-pointer"
              >
                Back to Presentation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
