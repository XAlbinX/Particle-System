import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useParticleGravity from '../use-particle-gravity/useParticleGravity';

type LifespanRange = {
  min: number;
  max: number;
};

type Particle = {
  velocity: THREE.Vector3;
  lifespan: number;
  matrix: THREE.Matrix4;
};


const useInitializeParticles = (
  scene: THREE.Scene,
  particleMeshSize: THREE.Vector3,
  particleDirection: THREE.Vector3,
  particleSpeed: THREE.Vector3,
  particleLifespan: LifespanRange,
  baseGeometry: THREE.BufferGeometry,
  material: THREE.Material,
  particleCount: number,
  getSpawnPoint: () => THREE.Vector3,
  isGenerating: boolean,
  gravity: THREE.Vector3,
  isApplyingGravity: boolean,
) => {
  const initializedRef = useRef(false);
  const particlesRef = useRef<{ velocity: THREE.Vector3; lifespan: number; matrix: THREE.Matrix4 }[]>([]);
  const requestRef = useRef<number>();
  const applyGravity = useParticleGravity(particlesRef, gravity);

  const clock = new THREE.Clock();
  const tempVelocity = new THREE.Vector3();

  // Create a single InstancedMesh for all particles
  const instancedMeshRef = useRef<THREE.InstancedMesh>();
  useEffect(() => {
    const instancedMesh = new THREE.InstancedMesh(baseGeometry, material, particleCount);
    instancedMesh.visible = false;
    instancedMeshRef.current = instancedMesh;
    instancedMesh.scale.copy(particleMeshSize);
    scene.add(instancedMesh);

    return () => {
      scene.remove(instancedMesh);
      instancedMesh.geometry.dispose();
    };
  }, [scene, baseGeometry, material, particleCount,particleMeshSize]);

  const resetParticle = (index: number) => {
    const spawnPoint = getSpawnPoint();
    const lifespan = THREE.MathUtils.lerp(particleLifespan.min, particleLifespan.max, Math.random());
    tempVelocity.copy(particleDirection).multiply(particleSpeed);
    
    const matrix = new THREE.Matrix4().setPosition(spawnPoint);
    instancedMeshRef.current?.setMatrixAt(index, matrix);
    
    return {  velocity: tempVelocity.clone(), lifespan, matrix };
  }

  const updateParticle = (particle: Particle, index: number, deltaTime: number): Particle => {
    if (particle.lifespan <= 0) {
      return resetParticle(index);
    } else {
      const currentPosition = new THREE.Vector3();
      currentPosition.setFromMatrixPosition(particle.matrix);
      const deltaPosition = particle.velocity.clone().multiplyScalar(deltaTime);
      currentPosition.add(deltaPosition);
  
      particle.matrix.setPosition(currentPosition);
      instancedMeshRef.current?.setMatrixAt(index, particle.matrix);
  
      particle.lifespan -= deltaTime;
      return particle;
    }
  };
  
  // Start animation loop
  const animateParticles = () => {
    const deltaTime = clock.getDelta();
  
    if (!particlesRef.current.length || !instancedMeshRef.current) return;
  
    particlesRef.current = particlesRef.current.map((particle, index) => updateParticle(particle, index, deltaTime));
  
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  
    if (isApplyingGravity) {
      applyGravity(deltaTime);
    }
  
    requestRef.current = requestAnimationFrame(animateParticles);
  };
  
  

  useEffect(() => {
    if (isGenerating && !initializedRef.current) {
      initializedRef.current = true;
  
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current[i] = resetParticle(i);
      }
  
      if (instancedMeshRef.current) {
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        instancedMeshRef.current.visible = true; // Make the mesh visible
      }
  
      requestRef.current = requestAnimationFrame(animateParticles);
    }else if (!isGenerating && initializedRef.current) {
      // Cleanup and stop animation if isGenerating is turned off
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
      particlesRef.current = [];
      initializedRef.current = false;
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (instancedMeshRef.current) {
        instancedMeshRef.current.visible = false; // Make the mesh invisible
      }
      // Reset the reference to indicate that animation has stopped
      requestRef.current = undefined;
      // Reset the particles array and initialized flag
      particlesRef.current = [];
      initializedRef.current = false;
    };
  }, [isGenerating, animateParticles]);

  return particlesRef;
};

export default useInitializeParticles;

