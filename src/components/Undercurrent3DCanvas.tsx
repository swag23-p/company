import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SUPPLY_CHAIN_NODES, TRADE_ROUTES } from "../supplyChainData";
import { SupplyChainNode } from "../types";

interface Undercurrent3DProps {
  selectedNode: SupplyChainNode;
  onSelectNode: (node: SupplyChainNode) => void;
  orbitSpeed: number;
  bufferStrain: number;
  viewMode: "globe" | "topology";
  wireframeMode: boolean;
}

// Convert Lat/Lng to 3D Cartesian on a sphere of radius R
function latLngToVector3(lat: number, lng: number, radius = 3.2): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate quadratic bezier curve points between two sphere points
function createCurvedArcPoints(v1: THREE.Vector3, v2: THREE.Vector3, altitude = 0.8, segments = 40): THREE.Vector3[] {
  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  const midLen = mid.length();
  // Elevate mid-point above the globe
  mid.normalize().multiplyScalar(midLen + altitude);
  const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
  return curve.getPoints(segments);
}

// Continental point cloud coordinates for Earth outline
function generateContinentalDots(count = 1200, radius = 3.19): Float32Array {
  const positions = new Float32Array(count * 3);
  const continentCenters = [
    { lat: 35, lng: 105, spread: 32 }, // East Asia
    { lat: 50, lng: 15, spread: 22 },  // Europe
    { lat: 40, lng: -98, spread: 28 }, // North America
    { lat: 10, lng: 105, spread: 18 }, // SE Asia
    { lat: 20, lng: 78, spread: 16 },  // India
    { lat: 25, lng: 45, spread: 18 },  // Middle East
    { lat: 58, lng: 60, spread: 35 },  // Eurasia
  ];

  let ptr = 0;
  for (let i = 0; i < count; i++) {
    const center = continentCenters[i % continentCenters.length];
    const lat = center.lat + (Math.random() - 0.5) * center.spread * 1.6;
    const lng = center.lng + (Math.random() - 0.5) * center.spread * 2.2;
    const v = latLngToVector3(lat, lng, radius);
    positions[ptr++] = v.x;
    positions[ptr++] = v.y;
    positions[ptr++] = v.z;
  }
  return positions;
}

// Moving AIS vessel cargo packet on arc
function VesselCargoPacket({
  curvePoints,
  color,
  speed = 0.5,
  offset = 0
}: {
  curvePoints: THREE.Vector3[];
  color: string;
  speed?: number;
  offset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(curvePoints), [curvePoints]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = (clock.getElapsedTime() * speed * 0.15 + offset) % 1;
    const pos = curve.getPointAt(t);
    meshRef.current.position.copy(pos);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Interactive Multi-Tier Supplier Node in 3D
function Tier3DNode({
  node,
  isSelected,
  onSelect,
  viewMode,
  bufferStrain,
  index
}: {
  node: SupplyChainNode;
  isSelected: boolean;
  onSelect: () => void;
  viewMode: "globe" | "topology";
  bufferStrain: number;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Globe position vs Topology exploded position
  const globePos = useMemo(() => latLngToVector3(node.lat, node.lng, 3.25), [node]);
  const topologyPos = useMemo(() => {
    // Exploded linear chain layout
    const x = (index - 2) * 2.2;
    const y = Math.sin(index * 0.8) * 0.5;
    const z = 0;
    return new THREE.Vector3(x, y, z);
  }, [index]);

  const targetPos = viewMode === "globe" ? globePos : topologyPos;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smooth lerp towards mode position
    groupRef.current.position.lerp(targetPos, delta * 4);

    // Dynamic pulse ring for anomaly or strain
    if (ringRef.current) {
      const pulseSpeed = node.tier === "T4" ? 3.5 * (1 + bufferStrain) : 2.0;
      const s = 1 + (Math.sin(Date.now() * 0.003 * pulseSpeed) * 0.5 + 0.5) * (node.tier === "T4" ? 0.9 : 0.4);
      ringRef.current.scale.set(s, s, s);
    }
  });

  const baseColor = node.colorHex;

  return (
    <group ref={groupRef}>
      {/* Clickable bounding sphere */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[isSelected ? 0.24 : hovered ? 0.2 : 0.16, 24, 24]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={isSelected ? 1.4 : hovered ? 1.0 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Glowing Shockwave / Pulse Ring for T4 Anomaly */}
      {node.tier === "T4" && (
        <mesh ref={ringRef}>
          <ringGeometry args={[0.26, 0.36, 32]} />
          <meshBasicMaterial
            color="#EF4444"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Target OEM Reticle Ring */}
      {node.tier === "TARGET" && (
        <mesh ref={ringRef}>
          <ringGeometry args={[0.28, 0.34, 32]} />
          <meshBasicMaterial
            color="#A855F7"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Vertical Pin / Light Stem (for Globe View) */}
      {viewMode === "globe" && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  0, 0, 0,
                  globePos.x * 0.12, globePos.y * 0.12, globePos.z * 0.12
                ]),
                3
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={baseColor} transparent opacity={0.6} />
        </line>
      )}
    </group>
  );
}

// 3D Scene Root
function SceneContents({
  selectedNode,
  onSelectNode,
  orbitSpeed,
  bufferStrain,
  viewMode,
  wireframeMode,
}: Undercurrent3DProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const topologyGroupRef = useRef<THREE.Group>(null);

  // Background stars/particles
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(850 * 3);
    for (let i = 0; i < 850 * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 45;
      arr[i + 1] = (Math.random() - 0.5) * 45;
      arr[i + 2] = (Math.random() - 0.5) * 45;
    }
    return arr;
  }, []);

  // Continental outline dots
  const continentalDots = useMemo(() => generateContinentalDots(1100, 3.2), []);

  // Precompute shipping arc geometries between nodes
  const shippingArcs = useMemo(() => {
    const nodeMap = new Map<string, SupplyChainNode>();
    SUPPLY_CHAIN_NODES.forEach((n) => nodeMap.set(n.id, n));

    return TRADE_ROUTES.map((route) => {
      const from = nodeMap.get(route.fromNodeId);
      const to = nodeMap.get(route.toNodeId);
      if (!from || !to) return null;

      const v1 = latLngToVector3(from.lat, from.lng, 3.25);
      const v2 = latLngToVector3(to.lat, to.lng, 3.25);
      const points = createCurvedArcPoints(v1, v2, 0.45, 36);

      const positions = new Float32Array(points.length * 3);
      points.forEach((p, idx) => {
        positions[idx * 3] = p.x;
        positions[idx * 3 + 1] = p.y;
        positions[idx * 3 + 2] = p.z;
      });

      return {
        route,
        points,
        positions,
        color: route.colorHex,
      };
    }).filter(Boolean);
  }, []);

  // Frame loop rotation & gentle pointer damping
  useFrame(({ clock, pointer }) => {
    if (globeGroupRef.current) {
      if (viewMode === "globe") {
        // Continuous slow rotation + subtle mouse influence
        globeGroupRef.current.rotation.y = clock.getElapsedTime() * 0.08 * orbitSpeed + pointer.x * 0.25;
        globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          globeGroupRef.current.rotation.x,
          0.2 + pointer.y * -0.15,
          0.04
        );
      } else {
        // Slower tilt in topology mode
        globeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          globeGroupRef.current.rotation.y,
          pointer.x * 0.15,
          0.05
        );
        globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          globeGroupRef.current.rotation.x,
          pointer.y * -0.1,
          0.05
        );
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 15]} intensity={1.2} color="#E0F2FE" />
      <directionalLight position={[-10, -8, -10]} intensity={0.5} color="#1E293B" />
      <pointLight position={[0, 4, 6]} intensity={0.8} color="#00F0FF" />

      {/* Telemetry Particles Field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#38BDF8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main Digital Twin Globe Group */}
      <group ref={globeGroupRef} position={[0, -0.2, 0]}>
        {viewMode === "globe" && (
          <>
            {/* Earth Wireframe Core Sphere */}
            <mesh>
              <sphereGeometry args={[3.18, 36, 36]} />
              <meshStandardMaterial
                color="#0A1120"
                roughness={0.85}
                metalness={0.2}
                wireframe={wireframeMode}
              />
            </mesh>

            {/* Glowing Latitudinal & Longitudinal Wireframe Rings */}
            <mesh>
              <sphereGeometry args={[3.2, 24, 24]} />
              <meshBasicMaterial
                color="#0EA5E9"
                wireframe
                transparent
                opacity={wireframeMode ? 0.5 : 0.12}
              />
            </mesh>

            {/* Atmosphere Halo Shell */}
            <mesh>
              <sphereGeometry args={[3.38, 32, 32]} />
              <meshBasicMaterial
                color="#0284C7"
                transparent
                opacity={0.06}
                side={THREE.BackSide}
              />
            </mesh>

            {/* Equatorial Orbit Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[3.55, 3.58, 64]} />
              <meshBasicMaterial color="#00F0FF" transparent opacity={0.18} side={THREE.DoubleSide} />
            </mesh>

            {/* Continental Outline Dots Matrix */}
            <points>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[continentalDots, 3]}
                />
              </bufferGeometry>
              <pointsMaterial
                size={0.035}
                color="#38BDF8"
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
              />
            </points>

            {/* Geodesic Maritime Shipping Arcs */}
            {shippingArcs.map((arc, idx) => {
              if (!arc) return null;
              return (
                <group key={arc.route.id || idx}>
                  <line>
                    <bufferGeometry>
                      <bufferAttribute
                        attach="attributes-position"
                        args={[arc.positions, 3]}
                      />
                    </bufferGeometry>
                    <lineBasicMaterial
                      color={arc.color}
                      linewidth={2}
                      transparent
                      opacity={0.65}
                    />
                  </line>

                  {/* Animated Vessel Cargo Packet */}
                  <VesselCargoPacket
                    curvePoints={arc.points}
                    color={arc.color}
                    speed={arc.route.status === "DEFICIT" ? 0.3 : 0.7}
                    offset={idx * 0.25}
                  />
                </group>
              );
            })}
          </>
        )}

        {/* In Topology Mode: Render horizontal pipeline flow guides */}
        {viewMode === "topology" && (
          <group ref={topologyGroupRef}>
            {/* Central connecting pipeline beam */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-5, 0, 0, 5, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00F0FF" transparent opacity={0.4} linewidth={3} />
            </line>

            {/* Tier Stage Markers */}
            {SUPPLY_CHAIN_NODES.map((_, i) => {
              const x = (i - 2) * 2.2;
              return (
                <mesh key={`grid-${i}`} position={[x, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.4, 0.45, 32]} />
                  <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} side={THREE.DoubleSide} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Tier Nodes in 3D */}
        {SUPPLY_CHAIN_NODES.map((node, idx) => (
          <Tier3DNode
            key={node.id}
            node={node}
            isSelected={selectedNode.id === node.id}
            onSelect={() => onSelectNode(node)}
            viewMode={viewMode}
            bufferStrain={bufferStrain}
            index={idx}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.8}
      />
    </>
  );
}

export function Undercurrent3DCanvas({
  selectedNode,
  onSelectNode,
  orbitSpeed = 1,
  bufferStrain = 0.5,
  viewMode = "globe",
  wireframeMode = false
}: Undercurrent3DProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto overflow-hidden bg-[#05070B]">
      <Canvas
        camera={{ position: [0, 0.5, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneContents
          selectedNode={selectedNode}
          onSelectNode={onSelectNode}
          orbitSpeed={orbitSpeed}
          bufferStrain={bufferStrain}
          viewMode={viewMode}
          wireframeMode={wireframeMode}
        />
      </Canvas>

      {/* Cybernetic Radial Vignette & Grid Lines Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,7,11,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}
