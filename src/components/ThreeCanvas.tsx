import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ThemeColors } from '../types';
import { soundEngine } from '../lib/audio';
import { haptic } from '../lib/haptics';

interface ThreeCanvasProps {
  theme: ThemeColors;
  physicsMode?: boolean;
  onFpsUpdate?: (fps: number, latency: number, particles: number) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  theme,
  physicsMode = false,
  onFpsUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameId = useRef<number>(0);

  // Dynamic light refs for theme updates
  const keyLightRef = useRef<THREE.PointLight | null>(null);
  const fillLightRef = useRef<THREE.PointLight | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry | null>(null);

  // Physics particles
  const physicsSpheresRef = useRef<
    {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      radius: number;
      mass: number;
    }[]
  >([]);

  // Mouse / Pointer
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false });

  // Raycaster for 3D interaction
  const raycaster = useRef(new THREE.Raycaster());
  const mouseVec = useRef(new THREE.Vector2());

  // Performance monitoring
  const lastTimeRef = useRef(performance.now());
  const framesRef = useRef(0);
  const fpsTimerRef = useRef(performance.now());

  const [particleCount, setParticleCount] = useState(1800);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // 2. Renderer with WebGL2 / Antialias with graceful fallback
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL initialization failed in environment:', err);
    }

    // 3. Simulated Ray-Tracing Lighting (Key, Rim, Specular Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const primaryColor = new THREE.Color(theme.primary);
    const secondaryColor = new THREE.Color(theme.secondary);

    const keyLight = new THREE.PointLight(primaryColor, 3.5, 45, 1.2);
    keyLight.position.set(10, 12, 14);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.PointLight(secondaryColor, 2.8, 45, 1.2);
    fillLight.position.set(-12, -8, 10);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 20, -10);
    scene.add(rimLight);

    // 4. Central Holographic Neural Brain Structure
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    nodesGroupRef.current = rootGroup;

    // Holographic Core Sphere with high-specular wireframe
    const coreGeo = new THREE.IcosahedronGeometry(3.6, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Dual-hemisphere Neural Brain clusters
    const clusterCount = 110;
    const nodeSpheres: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];
    const nodeMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      emissive: secondaryColor,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });

    const nodeGeo = new THREE.SphereGeometry(0.12, 12, 12);

    for (let i = 0; i < clusterCount; i++) {
      // Shape brain lobes (left & right hemispheres)
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + Math.random() * 1.8;

      const x = r * Math.sin(phi) * Math.cos(theta) * 0.95 + hemisphere * 1.3;
      const y = r * Math.cos(phi) * 0.85;
      const z = r * Math.sin(phi) * Math.sin(theta) * 1.25;

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      rootGroup.add(nodeMesh);
      nodeSpheres.push(nodeMesh);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Synaptic connections (Line segments)
    const lineMat = new THREE.LineBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const edgePositions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 2.3 && Math.random() > 0.45) {
          edgePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          edgePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edgesMesh = new THREE.LineSegments(edgeGeo, lineMat);
    rootGroup.add(edgesMesh);

    // Orbital HUD Rings
    const ringGeo1 = new THREE.TorusGeometry(6.4, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(7.6, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    rootGroup.add(ring2);

    // 5. Advanced Particle System (Dust / Neural Synapse Cloud)
    const count = particleCount;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(count * 3);
    const velArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    const color1 = new THREE.Color(theme.primary);
    const color2 = new THREE.Color(theme.secondary);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] = (Math.random() - 0.5) * 36;
      posArray[i3 + 1] = (Math.random() - 0.5) * 24;
      posArray[i3 + 2] = (Math.random() - 0.5) * 26;

      velArray[i3] = (Math.random() - 0.5) * 0.015;
      velArray[i3 + 1] = (Math.random() - 0.5) * 0.015;
      velArray[i3 + 2] = (Math.random() - 0.5) * 0.015;

      const mixed = Math.random() > 0.5 ? color1 : color2;
      colorArray[i3] = mixed.r;
      colorArray[i3 + 1] = mixed.g;
      colorArray[i3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometryRef.current = particleGeo;

    // Circular particle texture using canvas
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.15)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Interactive Physics Orbs (Physics Simulation Mode)
    const physicsGroup = new THREE.Group();
    scene.add(physicsGroup);
    physicsSpheresRef.current = [];

    const pOrbsCount = 12;
    const sphereMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.1,
      metalness: 0.9,
      emissive: primaryColor,
      emissiveIntensity: 0.3,
    });

    for (let i = 0; i < pOrbsCount; i++) {
      const radius = 0.55 + Math.random() * 0.45;
      const geo = new THREE.SphereGeometry(radius, 20, 20);
      const mesh = new THREE.Mesh(geo, sphereMat.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      );
      physicsGroup.add(mesh);

      physicsSpheresRef.current.push({
        mesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        ),
        radius,
        mass: radius * 1.5,
      });
    }

    // 7. Mouse and Pointer Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      mouseVec.current.set(x, y);
    };

    const handlePointerDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      const rect = container.getBoundingClientRect();
      const panX = ((e.clientX - rect.left) / rect.width) * 2 - 1;

      // Trigger impulse shockwave
      soundEngine.playImpulse(panX);
      haptic.trigger('laser');

      // Scatter particles near cursor in 3D
      if (particlesGeometryRef.current) {
        const positions = particlesGeometryRef.current.attributes.position.array as Float32Array;
        const cx = panX * 10;
        const cy = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * 8;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const dx = positions[i3] - cx;
          const dy = positions[i3 + 1] - cy;
          const d2 = dx * dx + dy * dy;
          if (d2 < 25) {
            positions[i3] += dx * 0.4;
            positions[i3 + 1] += dy * 0.4;
          }
        }
        particlesGeometryRef.current.attributes.position.needsUpdate = true;
      }

      // Check click on 3D physics spheres
      raycaster.current.setFromCamera(mouseVec.current, camera);
      const intersects = raycaster.current.intersectObjects(
        physicsSpheresRef.current.map((p) => p.mesh)
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const found = physicsSpheresRef.current.find((p) => p.mesh === hit);
        if (found) {
          found.vel.add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.4,
              Math.random() * 0.35 + 0.1,
              (Math.random() - 0.5) * 0.4
            )
          );
          soundEngine.playBounce(panX, 1.5);
          haptic.trigger('bounce');
        }
      }
    };

    const handlePointerUp = () => {
      mouseRef.current.isDown = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // 8. Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = w / h;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 9. Animation & Physics Simulation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate neural brain core
      if (rootGroup) {
        rootGroup.rotation.y = elapsedTime * 0.12 + mouseRef.current.x * 0.6;
        rootGroup.rotation.x = mouseRef.current.y * 0.4 + Math.sin(elapsedTime * 0.3) * 0.08;
      }

      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;

      // Pulse core mesh
      if (coreMesh) {
        const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
        coreMesh.scale.set(scale, scale, scale);
      }

      // Orbit dynamic specular lights
      if (keyLightRef.current) {
        keyLightRef.current.position.x = Math.sin(elapsedTime * 0.8) * 14;
        keyLightRef.current.position.z = Math.cos(elapsedTime * 0.8) * 14;
      }
      if (fillLightRef.current) {
        fillLightRef.current.position.x = -Math.cos(elapsedTime * 0.6) * 12;
        fillLightRef.current.position.y = Math.sin(elapsedTime * 0.6) * 10;
      }

      // Animate background particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += velArray[i3];
        positions[i3 + 1] += velArray[i3 + 1];
        positions[i3 + 2] += velArray[i3 + 2];

        // Boundary wrap
        if (positions[i3] > 18) positions[i3] = -18;
        if (positions[i3] < -18) positions[i3] = 18;
        if (positions[i3 + 1] > 14) positions[i3 + 1] = -14;
        if (positions[i3 + 1] < -14) positions[i3 + 1] = 14;
        if (positions[i3 + 2] > 15) positions[i3 + 2] = -15;
        if (positions[i3 + 2] < -15) positions[i3 + 2] = 15;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Real-Time Physics Engine for Interactive Orbs
      const boundX = 10;
      const boundY = 7;
      const boundZ = 5;
      const gravity = physicsMode ? -0.0035 : -0.0005;

      const spheres = physicsSpheresRef.current;
      for (let i = 0; i < spheres.length; i++) {
        const orb = spheres[i];

        // Apply gravity & air drag
        orb.vel.y += gravity;
        orb.vel.multiplyScalar(0.992);

        // Apply position
        orb.mesh.position.add(orb.vel);

        // Wall collisions & restitution bounce
        let bounced = false;
        if (Math.abs(orb.mesh.position.x) > boundX - orb.radius) {
          orb.vel.x = -orb.vel.x * 0.85;
          orb.mesh.position.x = Math.sign(orb.mesh.position.x) * (boundX - orb.radius);
          bounced = true;
        }
        if (orb.mesh.position.y < -boundY + orb.radius) {
          orb.vel.y = -orb.vel.y * 0.82;
          orb.mesh.position.y = -boundY + orb.radius;
          bounced = true;
        }
        if (orb.mesh.position.y > boundY - orb.radius) {
          orb.vel.y = -orb.vel.y * 0.85;
          orb.mesh.position.y = boundY - orb.radius;
          bounced = true;
        }
        if (Math.abs(orb.mesh.position.z) > boundZ - orb.radius) {
          orb.vel.z = -orb.vel.z * 0.85;
          orb.mesh.position.z = Math.sign(orb.mesh.position.z) * (boundZ - orb.radius);
          bounced = true;
        }

        // Trigger spatial bounce audio if substantial velocity
        if (bounced && Math.abs(orb.vel.length()) > 0.04) {
          const pan = orb.mesh.position.x / boundX;
          soundEngine.playBounce(pan, orb.vel.length() * 10);
        }

        // Sphere-to-sphere collisions
        for (let j = i + 1; j < spheres.length; j++) {
          const orbB = spheres[j];
          const dist = orb.mesh.position.distanceTo(orbB.mesh.position);
          const minDist = orb.radius + orbB.radius;
          if (dist < minDist && dist > 0.001) {
            const normal = new THREE.Vector3()
              .subVectors(orb.mesh.position, orbB.mesh.position)
              .normalize();
            const relativeVelocity = new THREE.Vector3().subVectors(orb.vel, orbB.vel);
            const speed = relativeVelocity.dot(normal);

            if (speed < 0) {
              const impulse = (-1.8 * speed) / (orb.mass + orbB.mass);
              orb.vel.add(normal.clone().multiplyScalar(impulse * orbB.mass));
              orbB.vel.sub(normal.clone().multiplyScalar(impulse * orb.mass));

              if (Math.abs(speed) > 0.03) {
                const pan = orb.mesh.position.x / boundX;
                soundEngine.playBounce(pan, Math.abs(speed) * 8);
              }
            }
          }
        }
      }

      // Render scene
      if (renderer) {
        renderer.render(scene, camera);
      }

      // Performance measurement
      framesRef.current++;
      const now = performance.now();
      if (now - fpsTimerRef.current >= 600) {
        const currentFps = Math.round((framesRef.current * 1000) / (now - fpsTimerRef.current));
        const frameLatency = Math.round(now - lastTimeRef.current);
        framesRef.current = 0;
        fpsTimerRef.current = now;

        if (onFpsUpdate) {
          onFpsUpdate(currentFps, frameLatency, count);
        }
      }
      lastTimeRef.current = now;
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);

      // Clean up geometries and materials
      if (renderer) {
        renderer.dispose();
      }
      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      edgeGeo.dispose();
      lineMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
    };
  }, [particleCount, physicsMode]);

  // Update light and core colors when theme changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const pColor = new THREE.Color(theme.primary);
    const sColor = new THREE.Color(theme.secondary);

    if (keyLightRef.current) keyLightRef.current.color = pColor;
    if (fillLightRef.current) fillLightRef.current.color = sColor;

    if (coreMeshRef.current) {
      const mat = coreMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color = pColor;
      mat.emissive = pColor;
    }
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto select-none overflow-hidden bg-transparent"
    />
  );
};
