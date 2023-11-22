// ThreeScene.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import ParticleSystem from '../particle-system/particle-system.component'; 

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Set the state
    setScene(scene);
    setRenderer(renderer);
    setCamera(camera);

    // Handle resizing
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef}>
      {scene && <ParticleSystem scene={scene} />}
    </div>
  );
};

export default ThreeScene;
