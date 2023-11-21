// App.tsx
import React from 'react';
import { ParticleContextProvider } from './contexts/particle.context';
import ThreeScene from './components/three-scene/three-scene.component';
import ControlPanel from './components/control-panel/control-panel.component';

const App: React.FC = () => {
  return (
    <ParticleContextProvider>
      <ThreeScene />
      <ControlPanel />
    </ParticleContextProvider>
  );
};

export default App;
