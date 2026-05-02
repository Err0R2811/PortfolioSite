import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefs } from "@/context/PrefsContext";

// Vadodara, Gujarat
const VADODARA = { lat: 22.31, lon: 73.18 };

// Convert lat/lon (degrees) to a point on a unit sphere of given radius.
const latLonToVec3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};

// Build a dotted sphere: sample a Fibonacci grid, keep dots that fall on land
// using a simple equirectangular landmask canvas painted from coastline data.
// To keep payload tiny and dependency-free we use a procedural land test:
// dots whose lat/lon fall inside one of a handful of continent bounding boxes.
// Good enough for an ambient, abstract globe — not a cartographic map.
const LAND_BOXES: [number, number, number, number][] = [
  // [latMin, latMax, lonMin, lonMax]
  [10, 72, -10, 60],     // Europe + W. Asia + N. Africa stub
  [-35, 35, -18, 52],    // Africa
  [5, 55, 60, 145],      // Asia
  [-45, -10, 110, 155],  // Australia
  [10, 72, -170, -52],   // North America
  [-55, 12, -82, -34],   // South America
];
const isLandish = (lat: number, lon: number) =>
  LAND_BOXES.some(([la, lb, oa, ob]) => lat >= la && lat <= lb && lon >= oa && lon <= ob);

const DotSphere = ({ radius, count }: { radius: number; count: number }) => {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(z, x) * (180 / Math.PI);
      if (!isLandish(lat, lon)) continue;
      positions.push(x * radius, y * radius, z * radius);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [radius, count]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.018}
        color="#a78bfa"
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
};

const Marker = ({ radius }: { radius: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(VADODARA.lat, VADODARA.lon, radius * 1.005), [radius]);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      const s = 1 + (Math.sin(t * 1.5) * 0.5 + 0.5) * 1.4;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 - (s - 1) / 2.8;
    }
  });

  // Orient ring tangent to sphere surface at marker position.
  const quat = useMemo(() => {
    const up = new THREE.Vector3(0, 0, 1);
    const dir = pos.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(up, dir);
  }, [pos]);

  return (
    <group position={pos} quaternion={quat}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.055, 0.075, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Scene = ({ paused }: { paused: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const radius = 1.6;

  // Initial orientation: face India (~22°N, 78°E) toward camera.
  useMemo(() => {
    if (group.current) return;
  }, []);

  useFrame((_, delta) => {
    if (!group.current || paused) return;
    group.current.rotation.y += delta * 0.08;
  });

  return (
    <group
      ref={group}
      // Rotate so India sits roughly center-front initially.
      rotation={[0, -((VADODARA.lon + 180) * Math.PI) / 180 + Math.PI, -0.25]}
    >
      {/* Faint base sphere for depth */}
      <mesh>
        <sphereGeometry args={[radius * 0.995, 64, 64]} />
        <meshBasicMaterial color="#0b0b14" />
      </mesh>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[radius * 1.04, 64, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <DotSphere radius={radius} count={6500} />
      <Marker radius={radius} />
    </group>
  );
};

export const Globe = () => {
  const { reducedMotion, particles } = usePrefs();
  // Honor user prefs — if motion or particles are off, render a static globe (no rotation).
  const paused = reducedMotion || !particles;

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, hsl(var(--primary) / 0.18), transparent 60%)",
        }}
        aria-hidden
      />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <Scene paused={paused} />
      </Canvas>
      <div
        className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-muted-foreground/80"
        aria-hidden
      >
        VADODARA · 22.31°N 73.18°E
      </div>
    </div>
  );
};
