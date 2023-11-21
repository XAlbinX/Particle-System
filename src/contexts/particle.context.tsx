// ParticleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as THREE from 'three';

type LifespanRange = {
  min: number;
  max: number;
};
interface ParticleContextState {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  particleMeshSize: THREE.Vector3;
  setParticleMeshSize: React.Dispatch<React.SetStateAction<THREE.Vector3>>;
  particleDimensions: THREE.Vector3;
  setParticleDimensions: React.Dispatch<React.SetStateAction<THREE.Vector3>>;
  particleSpeed: THREE.Vector3;
  setParticleSpeed: React.Dispatch<React.SetStateAction<THREE.Vector3>>;
  particleDirection: THREE.Vector3;
  setParticleDirection: React.Dispatch<React.SetStateAction<THREE.Vector3>>;
  particleCount: number;
  setParticleCount: React.Dispatch<React.SetStateAction<number>>;
  gravity: THREE.Vector3;
  particleLifespan: LifespanRange;
  setParticleLifespan: React.Dispatch<React.SetStateAction<LifespanRange>>;
  setGravity: React.Dispatch<React.SetStateAction<THREE.Vector3>>;
  isApplyingGravity: boolean;
  setisApplyingGravity: React.Dispatch<React.SetStateAction<boolean>>;
  spawnPosition: THREE.Vector3;
  setSpawnPosition: React.Dispatch<React.SetStateAction<THREE.Vector3>>;
  spawnShape: 'sphere' | 'cube' | 'point';
  setSpawnShape: React.Dispatch<React.SetStateAction<'sphere' | 'cube' | 'point'>>;
  spawnShapeSize: number;
  setSpawnShapeSize: React.Dispatch<React.SetStateAction<number>>;
  lifespanRange: { min: number; max: number };
  setLifespanRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

// Define the context
const ParticleContext = createContext<ParticleContextState | null>(null);

interface ParticleProviderProps {
  children: ReactNode;
}

// Define the context provider
export const ParticleContextProvider: React.FC<ParticleProviderProps> = ({ children }) => {
  // Define state variables and functions here
  const [isGenerating, setIsGenerating] = useState(false);
  const [particleMeshSize, setParticleMeshSize] = useState(new THREE.Vector3(1, 1, 0));
  const [particleCount, setParticleCount] = useState(100);
  const [gravity, setGravity] = useState(new THREE.Vector3(0, -9.81, 0));
  const [isApplyingGravity, setisApplyingGravity] = useState(false);
  const [spawnPosition, setSpawnPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [particleDimensions, setParticleDimensions] = useState(new THREE.Vector3(1, 1, 1));
  const [particleDirection, setParticleDirection] = useState(new THREE.Vector3(1, 0, 0));
  const [particleSpeed, setParticleSpeed] = useState(new THREE.Vector3(1, 1, 1));
  const [particleLifespan, setParticleLifespan] = useState<LifespanRange>({ min: 1, max: 5 });
  const [spawnShape, setSpawnShape] = useState<'sphere' | 'cube' | 'point'>('sphere');
  const [spawnShapeSize, setSpawnShapeSize] = useState(1); 
  const [lifespanRange, setLifespanRange] = useState({ min: 1, max: 5 });

  const value = {
    isGenerating,
    setIsGenerating,
    particleMeshSize,
    setParticleMeshSize,
    particleDimensions,
    setParticleDimensions,
    particleSpeed,
    setParticleSpeed,
    particleDirection,
    setParticleDirection,
    particleCount,
    setParticleCount,
    particleLifespan,
    setParticleLifespan,
    gravity,
    setGravity,
    isApplyingGravity,
    setisApplyingGravity,
    spawnPosition,
    setSpawnPosition,
    spawnShape,
    setSpawnShape,
    spawnShapeSize,
    setSpawnShapeSize,
    lifespanRange,
    setLifespanRange,
  };
  
  return (
    <ParticleContext.Provider value={value}>{children}</ParticleContext.Provider>
  );
};

// Custom hook to access the context
export const useParticleContext = () => {
  const context = useContext(ParticleContext);
  if (!context) {
    throw new Error('useParticleContext must be used within a ParticleContextProvider');
  }
  return context;
};
