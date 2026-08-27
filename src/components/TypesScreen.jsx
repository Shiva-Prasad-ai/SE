import React, { useState } from 'react';

export function TypesScreen({ onGoToCaseStudy }) {
  const [selectedType, setSelectedType] = useState(null);

  const typesData = [
    {
      id: 'corrective',
      title: 'Corrective',
      icon: 'bug_report',
      bgColor: 'bg-[#ffdad6]',
      textColor: 'text-[#93000a]',
      badgeText: 'Bug Fix & Fault Remediation',
      description: "The classic 'bug fix.' Corrective maintenance addresses errors and faults in the software that cause it to behave unexpectedly or incorrectly. It's about restoring normal operation.",
      scenario: 'Users report that the checkout button crashes the app on iOS 15. The team deploys a hotfix to resolve the null pointer exception causing the crash.',
      meaning: 'Fixing defects or errors',
      whyChanged: 'Something is not working correctly',
      colorClass: 'text-[#ba1a1a]'
    },
    {
      id: 'adaptive',
      title: 'Adaptive',
      icon: 'swap_horiz',
      bgColor: 'bg-[#ffece4]',
      textColor: 'text-[#ff6f3d]',
      badgeText: 'Environment & API Shifts',
      description: 'Adapting to change. This involves modifying the software to keep it compatible with changing environments, such as new operating systems, hardware, or third-party APIs.',
      scenario: "Migrating the application's database from MySQL 5.7 to MySQL 8.0, requiring updates to SQL queries and connection libraries to maintain compatibility.",
      meaning: 'Adapting software to environmental changes',
      whyChanged: 'Something outside the software has changed',
      colorClass: 'text-[#ff6f3d]'
    },
    {
      id: 'perfective',
      title: 'Perfective',
      icon: 'upgrade',
      bgColor: 'bg-[#e2dbfc]',
      textColor: 'text-[#8071c9]',
      badgeText: 'User Value & Speed',
      description: 'Perfective maintenance is the process of modifying existing software to improve its functionality, performance, usability, or efficiency according to user needs or newly identified improvements.',
      scenario: 'The application already has a product search feature that works correctly. However, users have to scroll through many results to find what they need. Developers improve the search functionality by adding: Filters and Sorting',
      meaning: 'Improving existing functionality, performance, or usability',
      whyChanged: 'The software works, but can be better',
      colorClass: 'text-[#8071c9]'
    },
    {
      id: 'preventive',
      title: 'Preventive',
      icon: 'shield',
      bgColor: 'bg-[#f3ecdb]',
      textColor: 'text-[#8c7b50]',
      badgeText: 'Code Hygiene & Debt Reduction',
      description: 'Preventive maintenance is the process of modifying software to improve its internal structure, maintainability, and reliability so that potential problems can be avoided in the future',
      scenario: 'Consider a banking application that has been maintained for several years. The application is currently working correctly, but developers notice that: The code contains a lot of duplicated logic. So they: Refactor the duplicated code.',
      meaning: 'Improving the software to avoid future problems',
      whyChanged: 'A potential problem may occur later',
      colorClass: 'text-[#8c7b50]'
    }
  ];

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-[48px] py-10 md:py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-block bg-[#f3ecdb] text-[#ff6f3d] px-3.5 py-1 rounded-full font-label-md text-[18px] font-semibold border border-[#e6dfcd]">
          Core Framework
        </div>
        <h1 className="font-display text-[40px] md:text-[52px] leading-[1.1] text-[#2b241f] font-bold">
          The 4 Pillars of Software Maintenance
        </h1>
        <p className="font-body-lg text-[22px] text-[#595147] leading-relaxed">
          Software maintenance is more than fixing bugs. It keeps software reliable, efficient, secure, and adaptable as technology and user needs change. Understanding its four types helps developers maintain software effectively.
        </p>
      </section>

      {/* Bento Grid: 4 Maintenance Types */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {typesData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedType(item.id === selectedType ? null : item.id)}
            className={`bg-[#ffffff] rounded-xl border p-6 shadow-sm hover:border-[#ff6f3d] transition-all cursor-pointer group flex flex-col justify-between ${
              selectedType === item.id ? 'ring-2 ring-[#ff6f3d] border-[#ff6f3d]' : 'border-[#dbd2c3]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg ${item.bgColor} ${item.textColor} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                  </div>
                  <h2 className="font-headline-lg text-[28px] md:text-[32px] text-[#2b241f] font-semibold">
                    {item.title}
                  </h2>
                </div>
                <span className="text-[16px] font-label-md bg-[#f3ecdb] text-[#595147] px-2.5 py-1 rounded-full font-medium">
                  {item.badgeText}
                </span>
              </div>

              <p className="font-body-md text-[20px] text-[#595147] mb-6 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="bg-[#f3ecdb] rounded-lg p-4 mt-auto border border-[#e6dfcd]">
              <h3 className="font-label-md text-[16px] text-[#ff6f3d] mb-1 uppercase tracking-wider font-bold">
                Example Scenario
              </h3>
              <p className="font-body-sm text-[18px] text-[#2b241f] leading-relaxed">
                {item.scenario}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 3-Column Summary Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-[28px] text-[#2b241f] font-bold">Maintenance Summary</h2>
          <button
            onClick={onGoToCaseStudy}
            className="text-[#ff6f3d] font-label-md text-[18px] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>See Maintenance Phases</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        <div className="overflow-x-auto bg-[#ffffff] rounded-xl border border-[#dbd2c3] shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#f3ecdb] border-b border-[#dbd2c3]">
                <th className="p-4 font-label-md text-[18px] text-[#2b241f] font-bold uppercase tracking-wider">Type</th>
                <th className="p-4 font-label-md text-[18px] text-[#2b241f] font-bold uppercase tracking-wider">What does it mean?</th>
                <th className="p-4 font-label-md text-[18px] text-[#2b241f] font-bold uppercase tracking-wider">Why is the software changed?</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-[18px] text-[#2b241f]">
              {typesData.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-[#dbd2c3] last:border-b-0 hover:bg-[#fcfaf7] transition-colors ${
                    selectedType === row.id ? 'bg-[#ffece4]' : ''
                  }`}
                >
                  <td className={`p-4 font-bold ${row.colorClass}`}>{row.title}</td>
                  <td className="p-4 text-[#595147] font-medium">{row.meaning}</td>
                  <td className="p-4 text-[#2b241f]">{row.whyChanged}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default TypesScreen;
