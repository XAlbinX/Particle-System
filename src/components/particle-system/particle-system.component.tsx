// ParticleSystem.tsx
import useParticleGeometry from '../../custom-hooks/use-particle-geometry/useParticleGeometry';
import useParticleMaterial from '../../custom-hooks/use-particle-material/useParticleMaterial';
import useInitializeParticles from '../../custom-hooks/use-initialize-particles/useInitializeParticles';
import particleTextureImage from '../../assets/particle1.png';
import { useParticleContext } from '../../contexts/particle.context';
import * as THREE from 'three';
import useParticleSpawnArea from '../../custom-hooks/use-particle-spawn-area/useParticleSpawnArea';
import { useMemo } from 'react';

const ParticleSystem: React.FC<{ scene: THREE.Scene }> = ({ scene }) => {
  const {
    isGenerating,
    particleMeshSize,
    particleDimensions,
    particleDirection,
    particleSpeed,
    particleCount,
    particleLifespan,
    spawnPosition,
    spawnShape,
    spawnShapeSize,
    gravity,
    isApplyingGravity,
    // ... other properties from context
  } = useParticleContext();

  const getSpawnPoint = useParticleSpawnArea(spawnShape, spawnShapeSize,spawnPosition); // Use the custom hook
  const geometry = useMemo(() => new THREE.BoxGeometry(particleDimensions.x,particleDimensions.y,particleDimensions.z),
                                                      [particleDimensions.x, particleDimensions.y, particleDimensions.z]);
  const material = useParticleMaterial(particleTextureImage);
  const particlesRef = useInitializeParticles(
    scene,
    particleMeshSize,
    particleDirection,
    particleSpeed,
    particleLifespan,
    geometry,
    material, 
    particleCount,
    getSpawnPoint,
    isGenerating,
    gravity,
    isApplyingGravity,
    spawnShape,
    spawnShapeSize,
    spawnPosition);

  return null;
};

export default ParticleSystem;