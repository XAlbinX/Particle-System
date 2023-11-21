import * as THREE from 'three';

const useParticleGravity = (
  particlesRef: React.MutableRefObject<{ mesh: THREE.Mesh; velocity: THREE.Vector3; lifespan: number }[] | undefined>,
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
