/* eslint-disable react-hooks/purity */
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Floating ambient particles ──────────────────────────────────────────────
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 60;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      if (Math.random() > 0.5) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.18; col[i * 3 + 2] = 0.42; // pink
      } else {
        col[i * 3] = 0; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 1;     // cyan
      }
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.025) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

// ─── Guts' Dragon Slayer — loaded from GLB ────────────────────────────────────
function GutsSword({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { scene } = useGLTF('/models/guts-sword.glb');
  const group     = useRef<THREE.Group>(null);
  const modelRef  = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Auto-scale to fit scene + apply neon material enhancement
  useEffect(() => {
    if (!modelRef.current) return;

    // 1. Fit to target size ────────────────────────────────────────────
    const box    = new THREE.Box3().setFromObject(scene);
    const size   = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale  = 4.5 / maxDim;           // fill ~4.5 world-units
    scene.scale.setScalar(scale);

    // 2. Re-centre after scaling ───────────────────────────────────────
    box.setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // 3. Improve material quality — keep original colors, just boost PBR ─
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.metalness         = Math.max(mat.metalness, 0.7);
          mat.roughness         = Math.min(mat.roughness, 0.4);
          // NO emissive override — preserve the model's original colours
          mat.needsUpdate       = true;
        }
        child.castShadow    = true;
        child.receiveShadow = true;
      });
    });
  }, [scene]);

  // Scroll-driven + idle float animation ────────────────────────────────
  useFrame(({ clock, viewport }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const s = Math.min(scrollRef.current / window.innerHeight, 1); // 0 → 1

    const floatY = Math.sin(t * 0.65) * 0.16;
    const idleRY = Math.sin(t * 0.35) * 0.25;    // bounded oscillation
    const idleRZ = Math.sin(t * 0.28) * 0.06;    // gentle Z sway

    // base orientation baked in so useFrame doesn't override the JSX rotation
    const baseRX =  0.1;
    const baseRY = -0.3;
    const baseRZ =  0.55 - Math.PI;   // ~-2.59 → blade upper-right, handle lower-left

    const tRX    = baseRX + s * Math.PI * 0.5;
    const tRY    = baseRY + idleRY + s * Math.PI * 0.5;
    const tRZ    = baseRZ + idleRZ;
    // viewport-relative so position stays consistent across screen sizes
    const tPX    = viewport.width * 0.18 - s * 1.5;
    const tPY    = -viewport.height * 0.45 + floatY;
    const tPZ    = -s * 5;
    const tScale = 1 - s * 0.38;

    group.current.position.y  = THREE.MathUtils.lerp(group.current.position.y,  tPY,     0.055);
    group.current.position.x  = THREE.MathUtils.lerp(group.current.position.x,  tPX,     0.04);
    group.current.position.z  = THREE.MathUtils.lerp(group.current.position.z,  tPZ,     0.04);
    group.current.rotation.x  = THREE.MathUtils.lerp(group.current.rotation.x,  tRX,     0.04);
    group.current.rotation.y  = THREE.MathUtils.lerp(group.current.rotation.y,  tRY,     0.04);
    group.current.rotation.z  = THREE.MathUtils.lerp(group.current.rotation.z,  tRZ,     0.04);
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, tScale, 0.04)
    );
  });

  return (
    // outer group — handles scroll / float
    <group ref={group} position={[viewport.width * 0.13, -viewport.height * 0.37, 0]} rotation={[0.1, -0.3, 0.55 - Math.PI]}>
      {/* inner ref — used for auto-scale / centre in useEffect */}
      <group ref={modelRef} rotation={[Math.PI, 0, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// ─── Animated orbiting light ──────────────────────────────────────────────────
function OrbitLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.set(
      Math.sin(t * 0.8) * 2.5,
      Math.cos(t * 0.6) * 2.0,
      1.5
    );
    ref.current.intensity = 2.2 + Math.sin(t * 1.8) * 0.6;
  });
  return <pointLight ref={ref} color="#00e5ff" distance={8} />;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({
  scrollRef,
  isDark,
}: {
  scrollRef: React.MutableRefObject<number>;
  isDark: boolean;
}) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 1.8} />
      {/* Key lights */}
      <pointLight position={[ 4,  5,  3]} intensity={isDark ? 3.5 : 6.0} color={isDark ? "#00e5ff" : "#ffffff"} />
      <pointLight position={[-3, -2,  2]} intensity={isDark ? 2.5 : 5.0} color={isDark ? "#ff2d6b" : "#ffffff"} />
      <pointLight position={[ 0,  7, -3]} intensity={isDark ? 1.5 : 4.0} color={isDark ? "#bd93f9" : "#ffffff"} />
      {/* Rim light from below for dramatic silhouette */}
      <pointLight position={[ 0, -4,  2]} intensity={isDark ? 1.2 : 3.0} color={isDark ? "#ff2d6b" : "#ffffff"} />

      <OrbitLight />

      <GutsSword scrollRef={scrollRef} />
      <Particles />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.85}
          luminanceSmoothing={0.6}
          intensity={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ─── Exported wrapper ─────────────────────────────────────────────────────────
interface Props { theme: string; }

export default function Katana3D({ theme }: Props) {
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        shadows
      >
        <Scene scrollRef={scrollRef} isDark={theme === 'dark'} />
      </Canvas>
    </div>
  );
}

// Preload so the model is ready before the canvas mounts
useGLTF.preload('/models/guts-sword.glb');
