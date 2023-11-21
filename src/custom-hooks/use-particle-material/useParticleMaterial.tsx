import { useMemo } from 'react';
import * as THREE from 'three';

const useParticleMaterial = (texturePath: string): THREE.Material => {
  const material = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath, undefined, undefined, (error) => {
      console.error('Texture loading error:', error);
    });
    

    // Create and return the mesh material with the texture
    return new THREE.MeshBasicMaterial({
      color: 0xFFA500,
      map: texture, 
      transparent: true, 
      alphaTest: 0.5, 
    });
  }, [texturePath]);

  return material;
};

export default useParticleMaterial;
