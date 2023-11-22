import * as THREE from 'three';

type Particle = {
  velocity: THREE.Vector3;
  lifespan: number;
  matrix: THREE.Matrix4; // New property for matrix transformations
};

const useParticleGravity = (
  particlesRef: React.MutableRefObject<Particle[] | undefined>,
  gravity: THREE.Vector3,
) => {
  const applyGravity = (deltaTime: number) => {
    const particles = particlesRef.current;
    if (!particles) return;

    const gravityEffect = gravity.clone().multiplyScalar(deltaTime);
    particles.forEach(particle => {
      particle.velocity.add(gravityEffect);
    });
  };

  return applyGravity;
};

export default useParticleGravity;
