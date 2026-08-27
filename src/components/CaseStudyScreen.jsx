import React, { useState, useEffect } from 'react';

export function CaseStudyScreen({ onRestartSeries }) {
  const [activeModalPhase, setActiveModalPhase] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalPhase(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const examplePhases = [
    {
      num: '1',
      title: 'Problem Identification',
      icon: 'search',
      intro: 'The first step is to recognize and formally record the problem.',
      details: [
        'Customers report incorrect delivery charges through the support system.',
        'The support team creates a maintenance request:'
      ],
      highlight: '"Delivery charges are being calculated incorrectly for certain customer locations."',
      gridClass: 'md:col-start-1 md:row-start-1',
      arrowType: 'right'
    },
    {
      num: '2',
      title: 'Problem Assessment',
      icon: 'assessment',
      intro: 'Now developers investigate why the problem is occurring and determine its impact.',
      examineTitle: 'They examine:',
      bullets: [
        'The delivery-charge calculation logic',
        'Location/distance data',
        'Error logs'
      ],
      discovery: 'After investigation, they discover that the system is using an incorrect distance value returned by the location service for certain addresses.',
      gridClass: 'md:col-start-2 md:row-start-1',
      arrowType: 'down'
    },
    {
      num: '3',
      title: 'Designing',
      icon: 'design_services',
      intro: 'Now that the cause is understood, developers design a solution.',
      detailsText: 'They decide not to completely redesign the delivery system. Instead, they will:',
      bullets: [
        'Validate the distance received from the location service.',
        'Recalculate the distance when the returned value is invalid or inconsistent.',
        'Pass the corrected distance to the existing delivery-charge calculation module.'
      ],
      conclusion: 'They also determine how the new logic will interact with the existing system.',
      gridClass: 'md:col-start-2 md:row-start-2',
      arrowType: 'left'
    },
    {
      num: '4',
      title: 'Execution',
      icon: 'integration_instructions',
      intro: 'Now the developers implement the design.',
      examineTitle: 'They:',
      numberedSteps: [
        'Modify the location-processing module.',
        'Add distance validation.'
      ],
      gridClass: 'md:col-start-1 md:row-start-2',
      arrowType: 'down'
    },
    {
      num: '5',
      title: 'Testing',
      icon: 'bug_report',
      intro: 'The modified system now needs to be thoroughly tested.',
      detailsText: "Developers don't only test the original problem. They also check whether their modification has affected other parts of the application.",
      examineTitle: 'They test:',
      tags: ['Normal locations', 'Problematic locations', 'Different distances', 'Checkout', 'Payment'],
      gridClass: 'md:col-start-1 md:row-start-3',
      arrowType: 'right'
    },
    {
      num: '6',
      title: 'Acceptance Test',
      icon: 'fact_check',
      intro: 'The final step is to verify that the solution actually satisfies the business requirement.',
      detailsText: 'The development team may have confirmed that the code works technically, but the business or relevant users must confirm that the result is acceptable.',
      highlight: '"The delivery charges now match the organization\'s pricing rules."',
      conclusion: 'If the stakeholders are satisfied, the maintenance change is accepted. The updated version can then be released to production.',
      gridClass: 'md:col-start-2 md:row-start-3',
      arrowType: 'none'
    }
  ];

  return (
    <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-[48px] py-10 md:py-16 w-full space-y-16">
      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block bg-[#f3ecdb] text-[#ff6f3d] px-3.5 py-1 rounded-full font-label-md text-[18px] font-semibold border border-[#e6dfcd]">
          Example Scenario: Incorrect Delivery Charges
        </div>
        <h1 className="font-display text-[40px] md:text-[56px] leading-[1.1] text-[#ff6f3d] font-bold">
          Software Maintenance in Action
        </h1>
        <p className="font-body-lg text-[22px] text-[#595147] leading-relaxed">
          A real-world walkthrough illustrating how a software engineering team executes all 6 maintenance phases to diagnose, patch, test, and release a fix for an incorrect delivery fee bug.
        </p>
      </header>

      {/* Perfectly Aligned 2-Column Grid with Direct Arrow Connectors */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-12 md:gap-x-16 max-w-5xl mx-auto relative">
        {examplePhases.map((phase) => (
          <div key={phase.num} className={`relative flex flex-col ${phase.gridClass}`}>
            {/* Phase Card */}
            <div
              onClick={() => setActiveModalPhase(phase)}
              className="bg-[#ffffff] rounded-2xl border border-[#dbd2c3] p-6 shadow-sm hover:border-[#ff6f3d] hover:shadow-md transition-all flex flex-col justify-between h-full space-y-4 relative z-10 cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff6f3d] text-white flex items-center justify-center font-bold text-[20px] shadow-sm">
                      {phase.num}
                    </div>
                    <h2 className="font-headline-lg text-[24px] md:text-[26px] text-[#2b241f] font-bold">
                      {phase.title}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#f3ecdb] text-[#ff6f3d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px]">{phase.icon}</span>
                  </div>
                </div>

                <p className="font-body-md text-[18px] text-[#595147] leading-relaxed font-medium mb-3">
                  {phase.intro}
                </p>

                {phase.details && (
                  <div className="space-y-1.5 text-[17px] text-[#595147]">
                    {phase.details.map((d, i) => (
                      <p key={i}>{d}</p>
                    ))}
                  </div>
                )}

                {phase.examineTitle && (
                  <p className="font-label-md text-[16px] text-[#ff6f3d] font-bold mt-2 uppercase tracking-wider">
                    {phase.examineTitle}
                  </p>
                )}

                {phase.bullets && (
                  <ul className="space-y-1 mt-2 pl-1 text-[17px] text-[#2b241f]">
                    {phase.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#ff6f3d] font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {phase.numberedSteps && (
                  <ol className="space-y-1 mt-2 pl-1 text-[17px] text-[#2b241f]">
                    {phase.numberedSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-[#ff6f3d]">{i + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {phase.detailsText && (
                  <p className="font-body-sm text-[17px] text-[#595147] mt-2 leading-relaxed">
                    {phase.detailsText}
                  </p>
                )}

                {phase.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {phase.tags.map((t, i) => (
                      <span key={i} className="bg-[#f3ecdb] text-[#ff6f3d] px-2.5 py-0.5 rounded-full text-[15px] font-label-md font-semibold border border-[#e6dfcd]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {phase.highlight && (
                  <div className="bg-[#ffece4] border-l-4 border-[#ff6f3d] p-2.5 rounded-r-lg mt-3 text-[16px] text-[#2b241f] italic font-medium">
                    {phase.highlight}
                  </div>
                )}

                {phase.discovery && (
                  <div className="bg-[#f3ecdb] p-2.5 rounded-lg mt-3 text-[16px] text-[#2b241f] border border-[#e6dfcd] font-medium">
                    {phase.discovery}
                  </div>
                )}

                {phase.conclusion && (
                  <p className="font-body-sm text-[16px] text-[#595147] mt-2 leading-relaxed italic">
                    {phase.conclusion}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#f3ecdb] flex items-center justify-between text-[15px] text-[#8071c9] font-medium">
                <span>Phase {phase.num} of 6 • Click to Expand</span>
                <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">open_in_full</span>
              </div>
            </div>

            {/* Desktop Direct Arrow Connectors */}
            {phase.arrowType === 'right' && (
              <div className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#ff6f3d] text-white items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">east</span>
              </div>
            )}

            {phase.arrowType === 'down' && (
              <div className="hidden md:flex absolute left-1/2 -bottom-8 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[#ff6f3d] text-white items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">south</span>
              </div>
            )}

            {phase.arrowType === 'left' && (
              <div className="hidden md:flex absolute -left-10 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#ff6f3d] text-white items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">west</span>
              </div>
            )}

            {/* Mobile Down Arrow Connector */}
            {phase.num !== '6' && (
              <div className="md:hidden flex justify-center my-2 text-[#ff6f3d]">
                <span className="material-symbols-outlined text-[28px]">south</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Screen-Fitting Fullscreen Blurred Modal Overlay for Example Cards */}
      {activeModalPhase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#2b241f]/60 backdrop-blur-md transition-all duration-300 animate-fadeIn cursor-pointer"
          onClick={() => setActiveModalPhase(null)}
        >
          <div
            className="bg-[#ffffff] border border-[#dbd2c3] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative space-y-6 cursor-default transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Badge & Close Button */}
            <div className="flex items-center justify-between">
              <span className="bg-[#ffece4] text-[#ff6f3d] px-4 py-1.5 rounded-full font-label-md text-[16px] font-bold border border-[#ff6f3d]/20">
                Phase {activeModalPhase.num} of 6
              </span>
              <button
                onClick={() => setActiveModalPhase(null)}
                className="w-10 h-10 rounded-full bg-[#f3ecdb] hover:bg-[#e6dfcd] text-[#2b241f] flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close card"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Header: Icon & Title */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#ff6f3d] text-white flex items-center justify-center shadow-lg shrink-0">
                <span className="material-symbols-outlined text-[36px]">{activeModalPhase.icon}</span>
              </div>
              <div>
                <h2 className="font-display text-[28px] sm:text-[36px] font-bold text-[#2b241f] leading-tight">
                  {activeModalPhase.title}
                </h2>
                <span className="text-[16px] font-label-md text-[#8071c9] font-medium">
                  Real-World Example Breakdown
                </span>
              </div>
            </div>

            {/* Intro */}
            <p className="font-body-lg text-[20px] text-[#595147] leading-relaxed font-medium">
              {activeModalPhase.intro}
            </p>

            {/* Content Details */}
            <div className="space-y-4 bg-[#fcfaf7] border border-[#e6dfcd] rounded-xl p-6">
              {activeModalPhase.details && (
                <div className="space-y-2 text-[17px] text-[#595147]">
                  {activeModalPhase.details.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>
              )}

              {activeModalPhase.examineTitle && (
                <p className="font-label-md text-[16px] text-[#ff6f3d] font-bold uppercase tracking-wider">
                  {activeModalPhase.examineTitle}
                </p>
              )}

              {activeModalPhase.bullets && (
                <ul className="space-y-2 text-[17px] text-[#2b241f]">
                  {activeModalPhase.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#ff6f3d] font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeModalPhase.numberedSteps && (
                <ol className="space-y-2 text-[17px] text-[#2b241f]">
                  {activeModalPhase.numberedSteps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-[#ff6f3d]">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              )}

              {activeModalPhase.detailsText && (
                <p className="font-body-sm text-[17px] text-[#595147] leading-relaxed">
                  {activeModalPhase.detailsText}
                </p>
              )}

              {activeModalPhase.tags && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeModalPhase.tags.map((t, i) => (
                    <span key={i} className="bg-[#f3ecdb] text-[#ff6f3d] px-3 py-1 rounded-full text-[15px] font-label-md font-semibold border border-[#e6dfcd]">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {activeModalPhase.highlight && (
                <div className="bg-[#ffece4] border-l-4 border-[#ff6f3d] p-3 rounded-r-lg text-[16px] text-[#2b241f] italic font-medium">
                  {activeModalPhase.highlight}
                </div>
              )}

              {activeModalPhase.discovery && (
                <div className="bg-[#f3ecdb] p-3 rounded-lg text-[16px] text-[#2b241f] border border-[#e6dfcd] font-medium">
                  {activeModalPhase.discovery}
                </div>
              )}

              {activeModalPhase.conclusion && (
                <p className="font-body-sm text-[16px] text-[#595147] leading-relaxed italic pt-1">
                  {activeModalPhase.conclusion}
                </p>
              )}
            </div>

            {/* Footer hint */}
            <div className="text-center text-[14px] text-[#8a8073] pt-4 border-t border-[#f3ecdb]">
              Click outside card or press Esc to close
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CaseStudyScreen;

