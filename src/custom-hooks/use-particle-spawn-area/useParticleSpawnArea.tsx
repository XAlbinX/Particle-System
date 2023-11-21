import * as THREE from 'three';
import { useCallback } from 'react';

type SpawnShape = 'sphere' | 'cube' | 'point';

const useParticleSpawnArea = (shape: SpawnShape, size: number,offset: THREE.Vector3) => {
  const getRandomPointInSphere = useCallback((radius: number) => {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);
    const x = r * sinPhi * cosTheta;
    const y = r * sinPhi * sinTheta;
    const z = r * cosPhi;
    return new THREE.Vector3(x, y, z);
  }, []);

  const getRandomPointInCube = useCallback((cubeSize: number) => {
    const halfSize = cubeSize / 2;
    const x = Math.random() * cubeSize - halfSize;
    const y = Math.random() * cubeSize - halfSize;
    const z = Math.random() * cubeSize - halfSize;
    return new THREE.Vector3(x, y, z);
  }, []);

  const getSpawnPoint = useCallback(() => {
    let point;
    switch (shape) {
      case 'sphere':
        point = getRandomPointInSphere(size);
        break;
      case 'cube':
        point = getRandomPointInCube(size);
        break;
      case 'point':
        point = new THREE.Vector3(0, 0, 0);
        break;
      default:
        point = new THREE.Vector3(0, 0, 0); // Default to point
    }
    return point.add(offset); // Add the offset to the point
  }, [shape, size, offset, getRandomPointInSphere, getRandomPointInCube]);

  return getSpawnPoint;
};

export default useParticleSpawnArea;