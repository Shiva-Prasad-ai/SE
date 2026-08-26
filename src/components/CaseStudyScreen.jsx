import React from 'react';

export function CaseStudyScreen({ onRestartSeries }) {
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
        <div className="inline-block bg-[#f3ecdb] text-[#ff6f3d] px-3.5 py-1 rounded-full font-label-md text-[14px] font-semibold border border-[#e6dfcd]">
          Example Scenario: Incorrect Delivery Charges
        </div>
        <h1 className="font-display text-[36px] md:text-[52px] leading-[1.1] text-[#ff6f3d] font-bold">
          Software Maintenance in Action
        </h1>
        <p className="font-body-lg text-[18px] text-[#595147] leading-relaxed">
          A real-world walkthrough illustrating how a software engineering team executes all 6 maintenance phases to diagnose, patch, test, and release a fix for an incorrect delivery fee bug.
        </p>
      </header>

      {/* Perfectly Aligned 2-Column Grid with Direct Arrow Connectors */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-12 md:gap-x-16 max-w-5xl mx-auto relative">
        {examplePhases.map((phase) => (
          <div key={phase.num} className={`relative flex flex-col ${phase.gridClass}`}>
            {/* Phase Card */}
            <div className="bg-[#ffffff] rounded-2xl border border-[#dbd2c3] p-6 shadow-sm hover:border-[#ff6f3d] transition-all flex flex-col justify-between h-full space-y-4 relative z-10">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff6f3d] text-white flex items-center justify-center font-bold text-[16px] shadow-sm">
                      {phase.num}
                    </div>
                    <h2 className="font-headline-lg text-[20px] md:text-[22px] text-[#2b241f] font-bold">
                      {phase.title}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#f3ecdb] text-[#ff6f3d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">{phase.icon}</span>
                  </div>
                </div>

                <p className="font-body-md text-[14px] text-[#595147] leading-relaxed font-medium mb-3">
                  {phase.intro}
                </p>

                {phase.details && (
                  <div className="space-y-1.5 text-[13px] text-[#595147]">
                    {phase.details.map((d, i) => (
                      <p key={i}>{d}</p>
                    ))}
                  </div>
                )}

                {phase.examineTitle && (
                  <p className="font-label-md text-[12px] text-[#ff6f3d] font-bold mt-2 uppercase tracking-wider">
                    {phase.examineTitle}
                  </p>
                )}

                {phase.bullets && (
                  <ul className="space-y-1 mt-2 pl-1 text-[13px] text-[#2b241f]">
                    {phase.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#ff6f3d] font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {phase.numberedSteps && (
                  <ol className="space-y-1 mt-2 pl-1 text-[13px] text-[#2b241f]">
                    {phase.numberedSteps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-[#ff6f3d]">{i + 1}.</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {phase.detailsText && (
                  <p className="font-body-sm text-[13px] text-[#595147] mt-2 leading-relaxed">
                    {phase.detailsText}
                  </p>
                )}

                {phase.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {phase.tags.map((t, i) => (
                      <span key={i} className="bg-[#f3ecdb] text-[#ff6f3d] px-2.5 py-0.5 rounded-full text-[11px] font-label-md font-semibold border border-[#e6dfcd]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {phase.highlight && (
                  <div className="bg-[#ffece4] border-l-4 border-[#ff6f3d] p-2.5 rounded-r-lg mt-3 text-[12px] text-[#2b241f] italic font-medium">
                    {phase.highlight}
                  </div>
                )}

                {phase.discovery && (
                  <div className="bg-[#f3ecdb] p-2.5 rounded-lg mt-3 text-[12px] text-[#2b241f] border border-[#e6dfcd] font-medium">
                    {phase.discovery}
                  </div>
                )}

                {phase.conclusion && (
                  <p className="font-body-sm text-[12px] text-[#595147] mt-2 leading-relaxed italic">
                    {phase.conclusion}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#f3ecdb] flex items-center justify-between text-[11px] text-[#8071c9] font-medium">
                <span>Phase {phase.num} of 6</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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

      {/* Clean Thank You Completion Card */}
      <section className="bg-[#f3ecdb] rounded-2xl p-10 md:p-12 border border-[#e6dfcd] text-center space-y-6 max-w-3xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#ff6f3d] text-white flex items-center justify-center mx-auto shadow-md">
          <span className="material-symbols-outlined text-[36px]">auto_awesome</span>
        </div>
        <h3 className="font-display text-[36px] md:text-[44px] text-[#ff6f3d] font-bold tracking-tight">
          Thank You!
        </h3>
        <p className="font-headline-sm text-[18px] md:text-[20px] text-[#2b241f] font-semibold">
          You completed Module 1 of the Software Maintenance Series.
        </p>
        <div>
          <button
            onClick={onRestartSeries}
            className="bg-[#ff6f3d] text-white font-label-md px-8 py-3.5 rounded-xl hover:bg-[#e05524] transition-all font-medium inline-flex items-center gap-2 shadow-md cursor-pointer text-[15px]"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            <span>Restart Module Series</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default CaseStudyScreen;
