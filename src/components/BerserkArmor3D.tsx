/* eslint-disable react-hooks/purity */
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const isLowEnd = isMobile || window.devicePixelRatio <= 1;

// ─── Floating particles — orange/pink to match the armour's eye glow ─────────
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = isMobile ? 20 : 50;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      if (Math.random() > 0.45) {
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.18;
        col[i * 3 + 2] = 0.42; // pink
      } else {
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.35;
        col[i * 3 + 2] = 0; // ember orange
      }
    }
    return [pos, col];
  }, [COUNT]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.022;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.018) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

// ─── The armour model ─────────────────────────────────────────────────────────
function BerserkArmorModel({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  const { scene, animations } = useGLTF("/models/berserk_armor.glb");
  const group = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { actions, names } = useAnimations(animations, group);

  // Play all embedded animations from the GLB (looped)
  useEffect(() => {
    if (names.length === 0) return;
    names.forEach((name) => actions[name]?.reset().fadeIn(0.5).play());
    return () => { names.forEach((name) => actions[name]?.fadeOut(0.3)); };
  }, [actions, names]);

  useEffect(() => {
    if (!modelRef.current) return;

    // Scale by Y (body height) not maxDim — the sword skews maxDim, making the body tiny
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    scene.scale.setScalar(4.0 / size.y);

    // Re-centre after scaling
    box.setFromObject(scene);
    scene.position.sub(box.getCenter(new THREE.Vector3()));

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          // Lift the near-black base colour so lights can actually bounce off it
          mat.color.multiplyScalar(2.0);
          // Reduce metalness so diffuse lighting contributes more
          mat.metalness = Math.min(mat.metalness, 0.4);
          // Amplify any existing eye-glow emissive
          if (mat.emissiveIntensity > 0) {
            mat.emissiveIntensity = Math.max(mat.emissiveIntensity * 5, 4);
          }
          mat.needsUpdate = true;
        }
        child.castShadow = !isMobile;
        child.receiveShadow = !isMobile;
      });
    });
  }, [scene]);

  // Idle breathe + scroll-driven retreat
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const s = Math.min(scrollRef.current / window.innerHeight, 1);

    // Subtle breathe — heavier character, smaller amplitude than the sword
    const floatY = Math.sin(t * 0.45) * 0.07;
    // Slow pan to show armour details
    const idleRY = Math.sin(t * 0.28) * 0.1;

    // Base orientation: slight Y turn so the figure shows a 3/4 front-right view
    // matching the screenshot pose. Adjust baseRY if model faces the wrong direction.
    const baseRX = 0.05;
    const baseRY = Math.PI / 2 + 0.3; // -PI/2 showed back → +PI/2 faces camera
    const baseRZ = 0;

    const tRX = baseRX;
    const tRY = baseRY + idleRY + s * Math.PI * 0.35;
    const tPX = viewport.width * 0.15 - s * 1.2;
    const tPY = floatY - s * 0.4;
    const tPZ = -s * 4;
    const tScale = 1 - s * 0.28;

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      tPX,
      0.05,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      tPY,
      0.055,
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      tPZ,
      0.04,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      tRX,
      0.04,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      tRY,
      0.04,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      baseRZ,
      0.04,
    );
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, tScale, 0.04),
    );
  });

  return (
    // Outer group — handles scroll + float animation
    <group
      ref={group}
      position={[viewport.width * 0.15, 0, 0]}
      rotation={[0.05, Math.PI / 2 + 0.3, 0]}
    >
      {/* Inner ref — used for auto-scale / centre in useEffect */}
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// ─── Orbiting orange light to sell the eye-slit glow ─────────────────────────
function EyeOrbitLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.set(
      Math.sin(t * 0.6) * 1.0,
      Math.cos(t * 0.45) * 0.6 + 0.5,
      2.2,
    );
    ref.current.intensity = 2.5 + Math.sin(t * 1.6) * 0.8;
  });
  return <pointLight ref={ref} color="#ff6600" distance={6} />;
}

// ─── Scene ─────────────────────────────────────────────────────────────────────
function Scene({
  scrollRef,
  isDark,
}: {
  scrollRef: React.MutableRefObject<number>;
  isDark: boolean;
}) {
  return (
    <>
      {/* High ambient so the near-black armour has a visible base to build on */}
      <ambientLight intensity={isDark ? 1.2 : 2.0} />

      {/* Direct front fill */}
      <pointLight
        position={[0, 1, 6]}
        intensity={isDark ? 6 : 8}
        color="#ffffff"
      />
      {/* Key light — warm, upper-right */}
      <pointLight
        position={[4, 5, 3]}
        intensity={isDark ? 5 : 7}
        color={isDark ? "#ffe8cc" : "#ffffff"}
      />
      {/* Pink rim from left */}
      <pointLight
        position={[-5, 2, 1]}
        intensity={isDark ? 4 : 5}
        color={isDark ? "#ff2d6b" : "#ffffff"}
      />
      {/* Cyan fill from right */}
      <pointLight
        position={[5, -1, 2]}
        intensity={isDark ? 3 : 4}
        color={isDark ? "#00e5ff" : "#ffffff"}
      />
      {/* Back-rim pair */}
      <pointLight
        position={[1, 2, -4]}
        intensity={isDark ? 6 : 4}
        color={isDark ? "#ff2d6b" : "#ffffff"}
      />
      <pointLight
        position={[-1, 0, -4]}
        intensity={isDark ? 5 : 3}
        color={isDark ? "#00e5ff" : "#ffffff"}
      />
      {/* Purple ground-rim */}
      <pointLight
        position={[0, -4, 2]}
        intensity={isDark ? 2 : 3}
        color={isDark ? "#bd93f9" : "#ffffff"}
      />

      {/* Orange orbiting light — mimics the Berserker eye glow */}
      <EyeOrbitLight />

      <BerserkArmorModel scrollRef={scrollRef} />
      <Particles />

      {!isLowEnd && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.72}
            luminanceSmoothing={0.6}
            intensity={1.1}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

// ─── Exported wrapper ──────────────────────────────────────────────────────────
interface Props {
  theme: string;
}

export default function BerserkArmor3D({ theme }: Props) {
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52 }}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: "transparent" }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        shadows={!isMobile}
      >
        <Scene scrollRef={scrollRef} isDark={theme === "dark"} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/berserk_armor.glb");
