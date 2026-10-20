import React, { useState, useEffect } from 'react';
import ArchivalHeader from './components/layout/ArchivalHeader.jsx';
import ArchivalFooter from './components/layout/ArchivalFooter.jsx';
import ModelTestChamber from './components/hero/ModelTestChamber.jsx';
import JourneyMap from './components/journey/JourneyMap.jsx';
import DossierModal from './components/dossier/DossierModal.jsx';
import { getManifest } from './services/dossierService.js';
import { checkHealth } from './services/api.js';

export default function App() {
  const [manifest, setManifest] = useState([]);
  const [activeDossierId, setActiveDossierId] = useState(null);
  const [healthStatus, setHealthStatus] = useState({ ok: false, model: 'checking' });

  // Load manifest & health status
  useEffect(() => {
    let isMounted = true;
    async function init() {
      const [manifestData, healthData] = await Promise.all([
        getManifest(),
        checkHealth(),
      ]);
      if (isMounted) {
        setManifest(manifestData);
        setHealthStatus(healthData);
      }
    }
    init();

    const interval = setInterval(async () => {
      const h = await checkHealth();
      if (isMounted) setHealthStatus(h);
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Hash navigation handler
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/dossier/')) {
        const id = hash.replace('#/dossier/', '').trim();
        if (id) setActiveDossierId(id);
      } else {
        setActiveDossierId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenDossier = (expId) => {
    window.location.hash = `#/dossier/${expId}`;
  };

  const handleCloseDossier = () => {
    window.location.hash = '#/journey';
  };

  const handleJumpToModel = () => {
    const el = document.getElementById('model-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJumpToJourney = () => {
    const el = document.getElementById('journey-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-root lab-grid-overlay">
      <ArchivalHeader
        healthStatus={healthStatus}
        onJumpToModel={handleJumpToModel}
        onJumpToJourney={handleJumpToJourney}
      />

      <main>
        <ModelTestChamber onJumpToJourney={handleJumpToJourney} />
        <JourneyMap
          experiments={manifest}
          onOpenDossier={handleOpenDossier}
        />
      </main>

      {activeDossierId && (
        <DossierModal
          expId={activeDossierId}
          onClose={handleCloseDossier}
        />
      )}

      <ArchivalFooter />
    </div>
  );
}
