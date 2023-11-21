import { useMemo } from 'react';
import * as THREE from 'three';

const useParticleGeometry = (
  count: number, 
  getSpawnPoint: () => THREE.Vector3,
  baseGeometry: THREE.BufferGeometry // Pass the base geometry for a single particle
) => {
  const particleGeometries = useMemo(() => {
    return Array.from({ length: count }, () => {
      const particleGeometry = baseGeometry.clone();
      const spawnPoint = getSpawnPoint();
      // Apply the spawn point position to the geometry
      particleGeometry.translate(spawnPoint.x, spawnPoint.y, spawnPoint.z);
      return particleGeometry;
    });
  }, [count, getSpawnPoint, baseGeometry]);

  return particleGeometries;
};

export default useParticleGeometry;
