import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import useParticleGravity from '../use-particle-gravity/useParticleGravity';

type LifespanRange = {
  min: number;
  max: number;
};

const useInitializeParticles = (
  scene: THREE.Scene,
  particleMeshSize: THREE.Vector3,
  particleDirection: THREE.Vector3,
  particleSpeed : THREE.Vector3,
  particleLifespan : LifespanRange,
  baseGeometry: THREE.BufferGeometry, 
  material: THREE.Material,
  particleCount: number,
  getSpawnPoint: () => THREE.Vector3,
  isGenerating: boolean,
  gravity: THREE.Vector3,
  isApplyingGravity: boolean,
  spawnShape : 'sphere' | 'cube' | 'point',
  spawnShapeSize: number,
  spawnPosition : THREE.Vector3,
) => {
  const initializedRef = useRef(false);
  const particlesRef = useRef<{ mesh: THREE.Mesh; velocity: THREE.Vector3; lifespan: number }[]>([]);
  const requestRef = useRef<number>();
  const applyGravity = useParticleGravity(particlesRef, gravity);

  const clock = new THREE.Clock();
  const tempVelocity = new THREE.Vector3();
  

  const initializeParticlePool = useCallback(() => {
    for (let i = 0; i < particleCount; i++) {
      let particle;
      if (i < particlesRef.current.length) {
        // Particle already exists, just reset it
        particle = particlesRef.current[i];
        resetParticle(particle);
      } else {
        // Create new particle and add to the pool
        const particleMesh = new THREE.Mesh(baseGeometry, material);
        particleMesh.scale.set(particleMeshSize.x, particleMeshSize.y, particleMeshSize.z);
        tempVelocity.set(0,0,0);
        particle = { mesh: particleMesh, velocity: tempVelocity.clone(), lifespan: 0 };
        particlesRef.current.push(particle);
        scene.add(particleMesh);
      }
      resetParticle(particle);
    }
  }, [particleCount, baseGeometry, material, particleMeshSize]);

  // Reset particle to its initial state
  const resetParticle = (particle: { mesh: any; velocity: any; lifespan: any; }) => {
    const spawnPoint = getSpawnPoint();
    particle.mesh.position.set(spawnPoint.x, spawnPoint.y, spawnPoint.z);
    particle.mesh.visible = false;
    particle.lifespan = Math.random() * (particleLifespan.max - particleLifespan.min) + particleLifespan.min;
    particle.velocity.set(0, 0, 0); 
  };

  useEffect(() => {
    if (!isGenerating || initializedRef.current) {
      return;
    }

    initializedRef.current = true;
    
    initializeParticlePool();

    // Start animating particles 
    const animateParticles = () => {
      const deltaTime = clock.getDelta();
      if (!particlesRef.current) return;

      particlesRef.current.forEach(particle => {
        if (particle.lifespan <= 0) {
          // Reset particle
          resetParticle(particle);
          tempVelocity.set(particleDirection.x * particleSpeed.x,
                           particleDirection.y * particleSpeed.y,
                           particleDirection.z * particleSpeed.z);
          particle.velocity = tempVelocity.clone()
          if (!particle.mesh.visible) {
            particle.mesh.visible = true;
          }                     
        } else {
          // Move particle
          if (particle.mesh.visible) {
            particle.mesh.position.x += particle.velocity.x * deltaTime;
            particle.mesh.position.y += particle.velocity.y * deltaTime;
            particle.mesh.position.z += particle.velocity.z * deltaTime;
          }  
          particle.lifespan -= deltaTime;
        }
      });
      if (isApplyingGravity) {
        applyGravity(deltaTime);
      }

      requestRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      particlesRef.current.forEach(particle => {
        scene.remove(particle.mesh);
        particle.mesh.geometry.dispose();
      });
      // Reset the particles array
      particlesRef.current = [];
      initializedRef.current = false;
    };
  }, [isGenerating, scene, particleMeshSize,particleDirection,particleSpeed,
     baseGeometry, material, particleCount,particleLifespan, isApplyingGravity,spawnShape,spawnShapeSize,spawnPosition]);

  return particlesRef;
};

export default useInitializeParticles;
