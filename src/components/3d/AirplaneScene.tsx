import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Trail, Cloud, Stars } from "@react-three/drei";
import * as THREE from "three";

function Airplane({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale} rotation={[0, -Math.PI / 6, 0]}>
        {/* Fuselage */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.18, 1.6, 8, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Nose cone */}
        <mesh position={[0, 0, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.18, 0.5, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.15} />
        </mesh>

        {/* Cockpit window */}
        <mesh position={[0, 0.1, -0.85]}>
          <sphereGeometry args={[0.12, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.3} roughness={0.1} transparent opacity={0.8} />
        </mesh>

        {/* Left wing */}
        <mesh position={[-0.9, -0.05, 0.1]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[1.5, 0.04, 0.45]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.25} />
        </mesh>

        {/* Right wing */}
        <mesh position={[0.9, -0.05, 0.1]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[1.5, 0.04, 0.45]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.25} />
        </mesh>

        {/* Left engine */}
        <mesh position={[-0.7, -0.15, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.3, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Right engine */}
        <mesh position={[0.7, -0.15, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.3, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Tail fin (vertical) */}
        <mesh position={[0, 0.35, 0.75]}>
          <boxGeometry args={[0.04, 0.5, 0.35]} />
          <meshStandardMaterial color="#1e40af" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Tail wings (horizontal) */}
        <mesh position={[0, 0.08, 0.8]}>
          <boxGeometry args={[0.7, 0.03, 0.25]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.25} />
        </mesh>

        {/* Accent stripe */}
        <mesh position={[0, 0.05, 0]}>
          <capsuleGeometry args={[0.185, 1.6, 8, 16]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.5} roughness={0.3} transparent opacity={0.3} />
        </mesh>

        {/* Wing tip lights */}
        <mesh position={[-1.65, -0.05, 0.1]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
        </mesh>
        <mesh position={[1.65, -0.05, 0.1]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}

function AnimatedClouds() {
  return (
    <>
      <Cloud position={[-3, 1.5, -4]} speed={0.2} opacity={0.4} scale={1.5} segments={10} />
      <Cloud position={[3.5, -0.5, -3]} speed={0.15} opacity={0.3} scale={1.2} segments={8} />
      <Cloud position={[-1, -1.5, -5]} speed={0.1} opacity={0.25} scale={2} segments={12} />
      <Cloud position={[2, 2, -6]} speed={0.18} opacity={0.2} scale={1.5} segments={8} />
    </>
  );
}

function ContrailParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ops = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 2] = i * 0.08 + 0.8;
      ops[i] = 1 - i / count;
    }
    return { positions: pos, opacities: ops };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.8) * 0.08;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function AirplaneScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: 220 }}>
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#38bdf8" />
        <pointLight position={[0, -2, 2]} intensity={0.3} color="#f59e0b" />
        
        <Airplane scale={0.9} />
        <ContrailParticles />
        <AnimatedClouds />
        <Stars radius={50} depth={30} count={200} factor={3} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
