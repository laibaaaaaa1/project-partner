import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─── Commercial Jet Airliner (Boeing-style) ─── */
function CommercialJet() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.5) * 0.2;
      group.current.position.x = Math.sin(t * 0.25) * 0.35;
      group.current.rotation.z = Math.sin(t * 0.5) * 0.06;
      group.current.rotation.x = Math.cos(t * 0.25) * 0.03;
    }
  });

  const white = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f1f5f9", metalness: 0.75, roughness: 0.15 }), []);
  const belly = useMemo(() => new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.7, roughness: 0.2 }), []);
  const blue = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e40af", metalness: 0.6, roughness: 0.25 }), []);
  const coral = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff6b6b", metalness: 0.5, roughness: 0.3 }), []);
  const glass = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#93c5fd", metalness: 0.1, roughness: 0.05, transmission: 0.5, thickness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 }), []);
  const engine = useMemo(() => new THREE.MeshStandardMaterial({ color: "#475569", metalness: 0.85, roughness: 0.15 }), []);
  const intake = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e293b", metalness: 0.9, roughness: 0.1 }), []);
  const gold = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f59e0b", metalness: 0.8, roughness: 0.2 }), []);

  return (
    <group ref={group} rotation={[0.08, -0.4, 0]} scale={0.85}>
      {/* ── FUSELAGE ── long cylindrical body */}
      <mesh material={white} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.28, 3.2, 16, 32]} />
      </mesh>

      {/* Belly (darker underside) */}
      <mesh position={[0, -0.15, 0]} material={belly}>
        <capsuleGeometry args={[0.24, 3.0, 8, 16]} />
      </mesh>

      {/* Blue livery stripe */}
      <mesh position={[0, 0.12, 0]} material={blue}>
        <boxGeometry args={[0.58, 0.025, 3.0]} />
      </mesh>

      {/* Coral accent stripe */}
      <mesh position={[0, 0.06, 0]} material={coral}>
        <boxGeometry args={[0.58, 0.015, 2.8]} />
      </mesh>

      {/* Window row (small dots along fuselage) */}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={i} position={[0, 0.2, -1.2 + i * 0.15]} material={glass}>
          <boxGeometry args={[0.3, 0.025, 0.04]} />
        </mesh>
      ))}

      {/* ── NOSE ── smooth rounded front */}
      <mesh position={[0, 0, -1.9]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.28, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Nose radome (darker tip) */}
      <mesh position={[0, 0, -2.1]} rotation={[Math.PI / 2, 0, 0]} material={belly}>
        <coneGeometry args={[0.18, 0.35, 24]} />
      </mesh>

      {/* ── COCKPIT WINDOWS ── */}
      <mesh position={[0.02, 0.15, -1.85]} rotation={[-0.25, 0, 0]} material={glass}>
        <boxGeometry args={[0.22, 0.08, 0.15]} />
      </mesh>
      <mesh position={[0.02, 0.12, -1.78]} rotation={[-0.15, 0, 0]} material={glass}>
        <boxGeometry args={[0.26, 0.06, 0.1]} />
      </mesh>

      {/* ── WINGS ── swept back, tapered */}
      {/* Left wing */}
      <group position={[-0.1, -0.08, 0.1]}>
        <mesh rotation={[0, 0.15, -0.03]} position={[-1.2, 0, 0.15]} material={white}>
          <boxGeometry args={[2.2, 0.05, 0.6]} />
        </mesh>
        {/* Wing tip */}
        <mesh position={[-2.28, 0.08, 0.2]} rotation={[0, 0, 0.4]} material={blue}>
          <boxGeometry args={[0.12, 0.22, 0.06]} />
        </mesh>
      </group>

      {/* Right wing */}
      <group position={[0.1, -0.08, 0.1]}>
        <mesh rotation={[0, -0.15, 0.03]} position={[1.2, 0, 0.15]} material={white}>
          <boxGeometry args={[2.2, 0.05, 0.6]} />
        </mesh>
        {/* Wing tip */}
        <mesh position={[2.28, 0.08, 0.2]} rotation={[0, 0, -0.4]} material={blue}>
          <boxGeometry args={[0.12, 0.22, 0.06]} />
        </mesh>
      </group>

      {/* ── JET ENGINES ── under-wing nacelles */}
      {/* Left engine */}
      <group position={[-0.85, -0.3, 0.2]}>
        {/* Pylon (attaches engine to wing) */}
        <mesh position={[0, 0.1, 0]} material={white}>
          <boxGeometry args={[0.04, 0.15, 0.25]} />
        </mesh>
        {/* Engine body */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={engine}>
          <cylinderGeometry args={[0.13, 0.15, 0.55, 20]} />
        </mesh>
        {/* Intake ring */}
        <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]} material={gold}>
          <torusGeometry args={[0.135, 0.015, 8, 20]} />
        </mesh>
        {/* Intake dark interior */}
        <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]} material={intake}>
          <circleGeometry args={[0.12, 20]} />
        </mesh>
        {/* Fan blades hint */}
        <mesh position={[0, 0, -0.27]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.11, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        {/* Exhaust */}
        <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]} material={intake}>
          <torusGeometry args={[0.1, 0.012, 8, 16]} />
        </mesh>
      </group>

      {/* Right engine */}
      <group position={[0.85, -0.3, 0.2]}>
        <mesh position={[0, 0.1, 0]} material={white}>
          <boxGeometry args={[0.04, 0.15, 0.25]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={engine}>
          <cylinderGeometry args={[0.13, 0.15, 0.55, 20]} />
        </mesh>
        <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]} material={gold}>
          <torusGeometry args={[0.135, 0.015, 8, 20]} />
        </mesh>
        <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]} material={intake}>
          <circleGeometry args={[0.12, 20]} />
        </mesh>
        <mesh position={[0, 0, -0.27]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.11, 20]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]} material={intake}>
          <torusGeometry args={[0.1, 0.012, 8, 16]} />
        </mesh>
      </group>

      {/* ── TAIL SECTION ── */}
      {/* Tail cone - tapers the fuselage */}
      <mesh position={[0, 0.05, 1.75]} rotation={[-Math.PI / 2, 0, 0]} material={white}>
        <coneGeometry args={[0.25, 0.6, 24]} />
      </mesh>

      {/* Vertical stabilizer (tail fin) */}
      <mesh position={[0, 0.55, 1.5]} material={blue}>
        <boxGeometry args={[0.04, 0.75, 0.5]} />
      </mesh>
      {/* Tail fin top accent */}
      <mesh position={[0, 0.88, 1.55]} material={coral}>
        <boxGeometry args={[0.045, 0.12, 0.3]} />
      </mesh>
      {/* Rudder line */}
      <mesh position={[0.025, 0.55, 1.65]} material={white}>
        <boxGeometry args={[0.005, 0.65, 0.15]} />
      </mesh>

      {/* Horizontal stabilizers */}
      <mesh position={[-0.45, 0.15, 1.55]} rotation={[0, 0.05, -0.02]} material={white}>
        <boxGeometry args={[0.7, 0.03, 0.25]} />
      </mesh>
      <mesh position={[0.45, 0.15, 1.55]} rotation={[0, -0.05, 0.02]} material={white}>
        <boxGeometry args={[0.7, 0.03, 0.25]} />
      </mesh>

      {/* ── APU exhaust (back) ── */}
      <mesh position={[0, 0.03, 2.05]} material={intake}>
        <cylinderGeometry args={[0.03, 0.04, 0.08, 8]} />
      </mesh>

      {/* ── LANDING GEAR (retracted bumps) ── */}
      <mesh position={[0, -0.28, -0.8]} material={belly}>
        <boxGeometry args={[0.12, 0.06, 0.2]} />
      </mesh>
      <mesh position={[-0.15, -0.28, 0.2]} material={belly}>
        <boxGeometry args={[0.08, 0.05, 0.15]} />
      </mesh>
      <mesh position={[0.15, -0.28, 0.2]} material={belly}>
        <boxGeometry args={[0.08, 0.05, 0.15]} />
      </mesh>

      {/* ── NAVIGATION LIGHTS ── */}
      <mesh position={[-2.38, -0.06, 0.25]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={4} />
      </mesh>
      <mesh position={[2.38, -0.06, 0.25]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={4} />
      </mesh>
      {/* Tail beacon */}
      <mesh position={[0, 0.94, 1.55]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
      </mesh>
      {/* Belly strobe */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

/* ─── contrails from engines ─── */
function Contrails() {
  const leftTrail = useRef<THREE.Points>(null);
  const rightTrail = useRef<THREE.Points>(null);
  const count = 150;

  const createTrail = useCallback((offsetX: number) => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const spread = (i / count) * 0.12;
      pos[i * 3] = offsetX + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = -0.25 + (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = i * 0.055 + 1.2;
    }
    return pos;
  }, []);

  const leftPos = useMemo(() => createTrail(-0.72), [createTrail]);
  const rightPos = useMemo(() => createTrail(0.72), [createTrail]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    [leftTrail, rightTrail].forEach((ref) => {
      if (ref.current) {
        ref.current.position.y = Math.sin(t * 0.5) * 0.2;
        ref.current.position.x = Math.sin(t * 0.25) * 0.35;
      }
    });
  });

  return (
    <>
      <points ref={leftTrail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={leftPos} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#e2e8f0" size={0.02} transparent opacity={0.3} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={rightTrail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={rightPos} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#e2e8f0" size={0.02} transparent opacity={0.3} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}

/* ─── cloud puffs ─── */
function CloudPuff({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  const offsets = useMemo(() => Array.from({ length: 6 }, () => [
    (Math.random() - 0.5) * 0.7,
    (Math.random() - 0.5) * 0.3,
    (Math.random() - 0.5) * 0.5,
    0.12 + Math.random() * 0.22,
  ] as [number, number, number, number]), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * speed * 0.15) * 0.4;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {offsets.map((o, i) => (
        <mesh key={i} position={[o[0], o[1], o[2]]}>
          <sphereGeometry args={[o[3], 10, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── globe wireframe ─── */
function GlobeWireframe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.06;
      ref.current.rotation.x = 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, -0.6, -3]} scale={2.5}>
      <sphereGeometry args={[1, 28, 28]} />
      <meshStandardMaterial color="#1e40af" wireframe transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

/* ─── golden particles ─── */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 50;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f59e0b" size={0.035} transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── main scene ─── */
export default function AirplaneScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: 280 }}>
      <Canvas
        camera={{ position: [1.5, 1.2, 5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 10, 5]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#93c5fd" />
        <pointLight position={[0, -3, 2]} intensity={0.35} color="#f59e0b" />

        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
          <CommercialJet />
          <Contrails />
        </Float>

        <GlobeWireframe />
        <CloudPuff position={[-3.5, 1.5, -2.5]} scale={1.5} speed={0.7} />
        <CloudPuff position={[3.2, -0.6, -2]} scale={1.1} speed={1} />
        <CloudPuff position={[-1.2, -2, -4]} scale={1.8} speed={0.5} />
        <CloudPuff position={[2.8, 2.5, -5]} scale={1.3} speed={0.9} />
        <FloatingParticles />
        <Stars radius={45} depth={30} count={250} factor={2.5} saturation={0.1} fade speed={0.6} />
      </Canvas>
    </div>
  );
}
