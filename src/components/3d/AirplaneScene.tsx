import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ─── stylized low-poly airplane ─── */
function Airplane() {
  const group = useRef<THREE.Group>(null);
  const propeller = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      // gentle banking arc
      group.current.position.y = Math.sin(t * 0.6) * 0.25;
      group.current.position.x = Math.sin(t * 0.3) * 0.4;
      group.current.rotation.z = Math.sin(t * 0.6) * 0.12;
      group.current.rotation.x = Math.cos(t * 0.3) * 0.06;
    }
    if (propeller.current) {
      propeller.current.rotation.z += 0.45;
    }
  });

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f8fafc", metalness: 0.85, roughness: 0.12 }), []);
  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1e40af", metalness: 0.6, roughness: 0.25 }), []);
  const coralMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff6b6b", metalness: 0.5, roughness: 0.3 }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#60a5fa", metalness: 0.1, roughness: 0.05, transmission: 0.6, thickness: 0.3, clearcoat: 1 }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#334155", metalness: 0.7, roughness: 0.3 }), []);
  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f59e0b", metalness: 0.8, roughness: 0.2 }), []);

  return (
    <group ref={group} rotation={[0.1, -0.5, 0]} position={[0, 0, 0]} scale={1.15}>
      {/* Fuselage - tapered body */}
      <mesh material={bodyMat}>
        <capsuleGeometry args={[0.22, 2.0, 12, 24]} />
      </mesh>

      {/* Coral stripe along fuselage */}
      <mesh position={[0, 0.08, 0]} material={coralMat}>
        <boxGeometry args={[0.46, 0.03, 1.8]} />
      </mesh>

      {/* Blue stripe below */}
      <mesh position={[0, -0.04, 0]} material={accentMat}>
        <boxGeometry args={[0.46, 0.015, 1.6]} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, -1.25]} rotation={[Math.PI / 2, 0, 0]} material={darkMat}>
        <coneGeometry args={[0.22, 0.6, 24]} />
      </mesh>

      {/* Propeller hub */}
      <mesh position={[0, 0, -1.56]} material={goldMat}>
        <sphereGeometry args={[0.06, 12, 12]} />
      </mesh>

      {/* Propeller blades */}
      <mesh ref={propeller} position={[0, 0, -1.6]}>
        <group>
          <mesh material={darkMat}>
            <boxGeometry args={[0.6, 0.06, 0.015]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={darkMat}>
            <boxGeometry args={[0.6, 0.06, 0.015]} />
          </mesh>
        </group>
      </mesh>

      {/* Cockpit windshield */}
      <mesh position={[0, 0.16, -0.75]} rotation={[-0.3, 0, 0]} material={glassMat}>
        <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
      </mesh>

      {/* Left wing - swept */}
      <mesh position={[-1.05, -0.02, 0.05]} rotation={[0, 0.08, -0.04]} material={bodyMat}>
        <boxGeometry args={[1.7, 0.045, 0.5]} />
      </mesh>
      {/* Left winglet */}
      <mesh position={[-1.88, 0.12, 0.05]} rotation={[0, 0, 0.5]} material={accentMat}>
        <boxGeometry args={[0.15, 0.25, 0.08]} />
      </mesh>

      {/* Right wing - swept */}
      <mesh position={[1.05, -0.02, 0.05]} rotation={[0, -0.08, 0.04]} material={bodyMat}>
        <boxGeometry args={[1.7, 0.045, 0.5]} />
      </mesh>
      {/* Right winglet */}
      <mesh position={[1.88, 0.12, 0.05]} rotation={[0, 0, -0.5]} material={accentMat}>
        <boxGeometry args={[0.15, 0.25, 0.08]} />
      </mesh>

      {/* Left engine nacelle */}
      <mesh position={[-0.65, -0.18, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={darkMat}>
        <cylinderGeometry args={[0.09, 0.11, 0.35, 16]} />
      </mesh>
      <mesh position={[-0.65, -0.18, -0.12]} material={goldMat}>
        <torusGeometry args={[0.08, 0.015, 8, 16]} />
      </mesh>

      {/* Right engine nacelle */}
      <mesh position={[0.65, -0.18, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={darkMat}>
        <cylinderGeometry args={[0.09, 0.11, 0.35, 16]} />
      </mesh>
      <mesh position={[0.65, -0.18, -0.12]} material={goldMat}>
        <torusGeometry args={[0.08, 0.015, 8, 16]} />
      </mesh>

      {/* Vertical tail fin */}
      <mesh position={[0, 0.42, 0.85]} material={accentMat}>
        <boxGeometry args={[0.04, 0.6, 0.4]} />
      </mesh>
      {/* Tail fin accent top */}
      <mesh position={[0, 0.68, 0.9]} material={coralMat}>
        <boxGeometry args={[0.045, 0.1, 0.2]} />
      </mesh>

      {/* Horizontal stabilizers */}
      <mesh position={[0, 0.12, 0.85]} material={bodyMat}>
        <boxGeometry args={[0.8, 0.03, 0.25]} />
      </mesh>

      {/* Navigation lights */}
      <mesh position={[-1.9, -0.02, 0.05]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} />
      </mesh>
      <mesh position={[1.9, -0.02, 0.05]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0, 0.72, 0.9]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={4} />
      </mesh>
    </group>
  );
}

/* ─── contrail / exhaust trail ─── */
function Contrails() {
  const leftTrail = useRef<THREE.Points>(null);
  const rightTrail = useRef<THREE.Points>(null);
  const count = 120;

  const createTrail = useCallback((offsetX: number) => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const spread = (i / count) * 0.15;
      pos[i * 3] = offsetX + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = i * 0.06 + 0.9;
      sizes[i] = (1 - i / count) * 0.04;
    }
    return { positions: pos, sizes };
  }, []);

  const leftData = useMemo(() => createTrail(-0.55), [createTrail]);
  const rightData = useMemo(() => createTrail(0.55), [createTrail]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    [leftTrail, rightTrail].forEach((ref) => {
      if (ref.current) {
        ref.current.position.y = Math.sin(t * 0.6) * 0.25;
        ref.current.position.x = Math.sin(t * 0.3) * 0.4;
      }
    });
  });

  return (
    <>
      <points ref={leftTrail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={leftData.positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={rightTrail}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={rightData.positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}

/* ─── floating cloud puffs ─── */
function CloudPuff({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  const offsets = useMemo(() => Array.from({ length: 5 }, () => [
    (Math.random() - 0.5) * 0.6,
    (Math.random() - 0.5) * 0.3,
    (Math.random() - 0.5) * 0.4,
    0.15 + Math.random() * 0.2,
  ] as [number, number, number, number]), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * speed * 0.2) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {offsets.map((o, i) => (
        <mesh key={i} position={[o[0], o[1], o[2]]}>
          <sphereGeometry args={[o[3], 12, 12]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.25} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── floating particles for depth ─── */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f59e0b" size={0.04} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── globe wireframe ─── */
function GlobeWireframe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.08;
      ref.current.rotation.x = 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, -0.4, -2]} scale={2.2}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color="#1e40af" wireframe transparent opacity={0.08} depthWrite={false} />
    </mesh>
  );
}

/* ─── main scene ─── */
export default function AirplaneScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: 280 }}>
      <Canvas
        camera={{ position: [0, 0.8, 4.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#60a5fa" />
        <pointLight position={[0, -3, 2]} intensity={0.4} color="#f59e0b" />
        <pointLight position={[2, 2, 3]} intensity={0.3} color="#ff6b6b" />

        {/* Scene elements */}
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <Airplane />
          <Contrails />
        </Float>

        <GlobeWireframe />

        <CloudPuff position={[-3.5, 1.8, -3]} scale={1.4} speed={0.8} />
        <CloudPuff position={[3, -0.8, -2.5]} scale={1} speed={1.2} />
        <CloudPuff position={[-1.5, -1.8, -4]} scale={1.8} speed={0.6} />
        <CloudPuff position={[2.5, 2.2, -5]} scale={1.2} speed={1} />

        <FloatingParticles />
        <Stars radius={40} depth={25} count={300} factor={2.5} saturation={0.2} fade speed={0.8} />
      </Canvas>
    </div>
  );
}
