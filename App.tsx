
import React, { useState } from 'react';
import HomeHub from './views/HomeHub';
import CitizenView from './views/CitizenView';
import PharmacyView from './views/PharmacyView';
import AuditorView from './views/AuditorView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'citizen' | 'pharmacy' | 'auditor'>('home');

  const renderView = () => {
    switch (currentView) {
      case 'citizen':
        return <CitizenView onBack={() => setCurrentView('home')} />;
      case 'pharmacy':
        return <PharmacyView onBack={() => setCurrentView('home')} />;
      case 'auditor':
        return <AuditorView onBack={() => setCurrentView('home')} />;
      default:
        return <HomeHub onSelectRole={setCurrentView} />;
    }
  };

  return (
    <div className="antialiased">
      {renderView()}
    </div>
  );
};

export default App;
