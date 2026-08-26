import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import IntroScreen from './components/IntroScreen';
import PhasesScreen from './components/PhasesScreen';
import TypesScreen from './components/TypesScreen';
import CaseStudyScreen from './components/CaseStudyScreen';
import ResourcesScreen from './components/ResourcesScreen';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export function App() {
  const [activeTab, setActiveTab] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf7] text-[#2b241f] relative">
      {/* Global Primary Mouse Follower Hover Effect */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Active Screen */}
      <div className="flex-grow">
        {activeTab === 'intro' && (
          <IntroScreen onGoToTypes={() => setActiveTab('types')} />
        )}

        {activeTab === 'types' && (
          <TypesScreen
            onGoToCaseStudy={() => setActiveTab('phases')}
          />
        )}

        {activeTab === 'phases' && (
          <PhasesScreen
            onGoToCaseStudy={() => setActiveTab('examples')}
          />
        )}

        {activeTab === 'examples' && (
          <CaseStudyScreen
            onRestartSeries={() => setActiveTab('intro')}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesScreen
            onRestartSeries={() => setActiveTab('intro')}
          />
        )}
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
