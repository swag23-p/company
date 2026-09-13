import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  AlertTriangle, 
  Play, 
  Pause, 
  Eye, 
  Layers, 
  Globe as GlobeIcon, 
  Network
} from 'lucide-react';

export interface Supplier3DNode {
  id: string;
  name: string;
  tier: string;
  tierNum: number;
  role: string;
  location: string;
  coords: { lat: number; lng: number }; // for globe
  pos3D: [number, number, number]; // for network topology
  status: 'critical_anomaly' | 'downstream_risk' | 'monitored' | 'nominal' | 'target';
  confidence: number;
  leadTime: string;
  details: string;
  metrics: { label: string; val: string }[];
}

const NODES_DATA: Supplier3DNode[] = [
  {
    id: 'factory-a',
    name: 'Factory A (Specialty High-Tensile Smelter)',
    tier: 'Tier 4',
    tierNum: 4,
    role: 'Specialty Billets & Alloy Bar Smelting',
    location: 'Tangshan, Hebei (39.63° N, 118.18° E)',
    coords: { lat: 39.63, lng: 118.18 },
    pos3D: [-3.2, 2.8, 0],
    status: 'critical_anomaly',
    confidence: 94.2,
    leadTime: '18–35 days to final OEM impact',
    details: 'Power rationing in industrial zone; customs declarations dropped 41% below 90-day baseline; 3 bulk carriers at anchor.',
    metrics: [
      { label: 'Customs Volume', val: '-41% (90d dev)' },
      { label: 'Vessel AIS Dwell', val: '+12.4 days' },
      { label: 'Grid Outages', val: '3 events / 14d' }
    ]
  },
  {
    id: 'supplier-b',
    name: 'Supplier B (Precision Hot-Forging Co.)',
    tier: 'Tier 3',
    tierNum: 3,
    role: 'Forged Piston Blanks & Alloy Casting',
    location: 'Busan, South Korea (35.17° N, 129.07° E)',
    coords: { lat: 35.17, lng: 129.07 },
    pos3D: [-1.4, 1.4, 0.8],
    status: 'downstream_risk',
    confidence: 91.5,
    leadTime: '21 days raw stock buffer',
    details: 'Dependent on Factory A alloy billets. Buffer inventory depleting at 4.2% daily rate.',
    metrics: [
      { label: 'Inventory Buffer', val: '21 days remaining' },
      { label: 'Inbound Re-supply', val: 'Delayed (Port Tianjin)' },
      { label: 'Alternative Source', val: 'Unqualified' }
    ]
  },
  {
    id: 'supplier-c',
    name: 'Supplier C (Hydraulic Caliper Machining GmbH)',
    tier: 'Tier 2',
    tierNum: 2,
    role: 'Hydraulic Cylinder Sub-Assemblies',
    location: 'Hamburg / Bremen, Germany (53.55° N, 9.99° E)',
    coords: { lat: 53.55, lng: 9.99 },
    pos3D: [0.6, 0.2, -0.6],
    status: 'monitored',
    confidence: 89.8,
    leadTime: '14 days safety stock',
    details: 'Receives machined forgings via maritime feeder lane. No internal shortage declared yet.',
    metrics: [
      { label: 'Sub-assembly Buffer', val: '14 days' },
      { label: 'Vessel Transit Time', val: '28 days via Suez' },
      { label: 'Direct Alerts Sent', val: '0 (unaware)' }
    ]
  },
  {
    id: 'supplier-d',
    name: 'Supplier D (Braking Systems Tier-1 Integrator)',
    tier: 'Tier 1',
    tierNum: 1,
    role: 'Complete Brake Module Integration',
    location: 'Detroit Metro, USA (42.33° N, -83.04° W)',
    coords: { lat: 42.33, lng: -83.04 },
    pos3D: [2.2, -1.0, 0.4],
    status: 'nominal',
    confidence: 98.4,
    leadTime: '7 days JIT buffer',
    details: 'Direct contracted vendor. Vendor portal shows "Green / On Schedule" despite critical tier-4 disruption upstream.',
    metrics: [
      { label: 'Portal Status', val: 'Green (False confidence)' },
      { label: 'Delivery Cadence', val: 'Daily JIT' },
      { label: 'Contract Lead Time', val: '14 days' }
    ]
  },
  {
    id: 'automotive-oem',
    name: 'Automotive Final Assembly Plant',
    tier: 'Target',
    tierNum: 0,
    role: 'Vehicle Assembly & Quality Verification',
    location: 'Kentucky / Ohio, USA (38.25° N, -85.75° W)',
    coords: { lat: 38.25, lng: -85.75 },
    pos3D: [3.8, -2.2, 0],
    status: 'target',
    confidence: 99.9,
    leadTime: 'Target Impact Zone',
    details: 'Final assembly line. Estimated financial exposure from upstream line shutdown: $4.7B across vehicle platform.',
    metrics: [
      { label: 'Platform Output', val: '1,200 units/day' },
      { label: 'Downtime Cost', val: '$1.2M / hour' },
      { label: 'Total Value at Risk', val: '$4.7B' }
    ]
  }
];

const CONNECTIONS = [
  { from: 'factory-a', to: 'supplier-b', leadTime: '6–10d shipping', risk: 'critical' },
  { from: 'supplier-b', to: 'supplier-c', leadTime: '24–28d maritime', risk: 'high' },
  { from: 'supplier-c', to: 'supplier-d', leadTime: '10–14d transatlantic', risk: 'medium' },
  { from: 'supplier-d', to: 'automotive-oem', leadTime: '1–2d domestic rail/truck', risk: 'direct' },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Function to create curved 3D arc between two globe coordinates
function createSplineArc(p1: THREE.Vector3, p2: THREE.Vector3, maxHeightRatio = 0.3) {
  const distance = p1.distanceTo(p2);
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize();
  mid.multiplyScalar(midLength + distance * maxHeightRatio);

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  const points = curve.getPoints(50);
  return { curve, points };
}

interface ThreeSupplyChainViewerProps {
  onOpenPilotModal?: () => void;
  onOpenDossier?: () => void;
  initialMode?: 'globe' | 'topology';
  isEmbedded?: boolean;
}

export function ThreeSupplyChainViewer({
  onOpenPilotModal,
  onOpenDossier,
  initialMode = 'globe',
  isEmbedded = false
}: ThreeSupplyChainViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'globe' | 'topology'>(initialMode);
  const [selectedNode, setSelectedNode] = useState<Supplier3DNode>(NODES_DATA[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [tierFilter, setTierFilter] = useState<number | 'all'>('all');

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const pulseRingsRef = useRef<THREE.Mesh[]>([]);
  const packetParticlesRef = useRef<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number; speed: number }[]>([]);
  const clickableMeshesRef = useRef<{ mesh: THREE.Mesh; node: Supplier3DNode }[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Setup Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xF7F7F4); // Match clean light panel gray palette

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, 11);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root interactive group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3A5A73, 0.5);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    // Build scene depending on viewMode
    build3DScene(viewMode);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation if enabled and not dragging
      if (autoRotate && !isDraggingRef.current && rootGroupRef.current) {
        rootGroupRef.current.rotation.y += delta * 0.15;
      }

      // Animate pulsing alert rings (for upstream anomaly Factory A)
      pulseRingsRef.current.forEach((ring, idx) => {
        const scale = 1 + ((elapsedTime * 1.5 + idx * 0.4) % 1.6);
        ring.scale.set(scale, scale, scale);
        const material = ring.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = Math.max(0, 0.7 - (scale - 1) * 0.5);
        }
      });

      // Animate moving data packets along trade connectors
      packetParticlesRef.current.forEach((item) => {
        item.t = (item.t + item.speed * delta) % 1;
        const pt = item.curve.getPoint(item.t);
        item.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Mouse drag interaction for rotating scene
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !rootGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rootGroupRef.current.rotation.y += deltaX * 0.005;
      rootGroupRef.current.rotation.x += deltaY * 0.005;
      // Clamp vertical tilt
      rootGroupRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rootGroupRef.current.rotation.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomFactor = e.deltaY * 0.005;
      cameraRef.current.position.z = Math.max(6, Math.min(18, cameraRef.current.position.z + zoomFactor));
    };

    // Click to select node via Raycaster
    const onCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        clickableMeshesRef.current.map((item) => item.mesh),
        false
      );

      if (intersects.length > 0) {
        const hit = clickableMeshesRef.current.find((item) => item.mesh === intersects[0].object);
        if (hit) {
          setSelectedNode(hit.node);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('click', onCanvasClick);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('click', onCanvasClick);
      renderer.dispose();
    };
  }, [viewMode]);

  // Scene construction for Globe vs Topology
  const build3DScene = useCallback((mode: 'globe' | 'topology') => {
    const rootGroup = rootGroupRef.current;
    if (!rootGroup) return;

    // Clear previous objects
    while (rootGroup.children.length > 0) {
      const obj = rootGroup.children[0];
      rootGroup.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }

    pulseRingsRef.current = [];
    packetParticlesRef.current = [];
    clickableMeshesRef.current = [];

    // Colors matching visual palette
    const colInk = 0x161B22;
    const colSteel = 0x3A5A73;
    const colAmber = 0xC97F2A;
    const colBrick = 0xA63A2E;
    const colPanel = 0xE2E4E8;

    if (mode === 'globe') {
      // 1. GLOBE MODE
      const globeRadius = 3.6;

      // Inner sphere (Clean off-white / light slate)
      const sphereGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.9,
        metalness: 0.1,
      });
      const globeSphere = new THREE.Mesh(sphereGeo, sphereMat);
      rootGroup.add(globeSphere);

      // Globe Grid / Graticule lines
      const graticuleLines = new THREE.Group();
      // Latitude rings
      for (let lat = -60; lat <= 60; lat += 20) {
        const ringRadius = globeRadius * Math.cos((lat * Math.PI) / 180);
        const y = globeRadius * Math.sin((lat * Math.PI) / 180);
        const ringGeo = new THREE.RingGeometry(ringRadius - 0.005, ringRadius + 0.005, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: colPanel, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        graticuleLines.add(ring);
      }
      // Longitude rings
      for (let lng = 0; lng < 180; lng += 30) {
        const circleGeo = new THREE.RingGeometry(globeRadius - 0.005, globeRadius + 0.005, 64);
        const circleMat = new THREE.MeshBasicMaterial({ color: colPanel, side: THREE.DoubleSide });
        const circle = new THREE.Mesh(circleGeo, circleMat);
        circle.rotation.y = (lng * Math.PI) / 180;
        graticuleLines.add(circle);
      }
      rootGroup.add(graticuleLines);

      // Continent approximation nodes / land dots
      const landDotGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
      const landDotMat = new THREE.MeshBasicMaterial({ color: colSteel, opacity: 0.35, transparent: true });
      const landGroup = new THREE.Group();

      // Procedural trade grid representing continental ports
      const sampleLandCoords = [
        // East Asia
        { lat: 31, lng: 121 }, { lat: 39, lng: 116 }, { lat: 35, lng: 129 }, { lat: 22, lng: 114 }, { lat: 35, lng: 139 },
        // Europe
        { lat: 51, lng: 0 }, { lat: 53, lng: 9 }, { lat: 48, lng: 2 }, { lat: 45, lng: 9 }, { lat: 37, lng: 23 },
        // North America
        { lat: 40, lng: -74 }, { lat: 34, lng: -118 }, { lat: 42, lng: -83 }, { lat: 38, lng: -85 }, { lat: 29, lng: -95 },
        // Trade straits
        { lat: 1, lng: 104 }, { lat: 27, lng: 56 }, { lat: 30, lng: 32 }, { lat: 9, lng: -79 }
      ];

      sampleLandCoords.forEach((pt) => {
        const v = latLngToVector3(pt.lat, pt.lng, globeRadius + 0.02);
        const dot = new THREE.Mesh(landDotGeo, landDotMat);
        dot.position.copy(v);
        dot.lookAt(0, 0, 0);
        landGroup.add(dot);
      });
      rootGroup.add(landGroup);

      // Place Supplier Nodes on Globe
      const nodePositions: { [id: string]: THREE.Vector3 } = {};

      NODES_DATA.forEach((node) => {
        const pos = latLngToVector3(node.coords.lat, node.coords.lng, globeRadius + 0.08);
        nodePositions[node.id] = pos;

        // Node Pin / Cylinder
        const isAnomaly = node.status === 'critical_anomaly';
        const isTarget = node.status === 'target';

        const markerColor = isAnomaly ? colAmber : isTarget ? colInk : colSteel;
        const markerGeo = new THREE.SphereGeometry(isAnomaly ? 0.16 : 0.12, 16, 16);
        const markerMat = new THREE.MeshStandardMaterial({
          color: markerColor,
          roughness: 0.3,
          metalness: 0.2,
          emissive: isAnomaly ? colAmber : 0x000000,
          emissiveIntensity: isAnomaly ? 0.4 : 0,
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(pos);
        rootGroup.add(marker);

        // Clickable register
        clickableMeshesRef.current.push({ mesh: marker, node });

        // Upstream anomaly pulsing beacon rings on Factory A
        if (isAnomaly) {
          for (let i = 0; i < 2; i++) {
            const ringGeo = new THREE.RingGeometry(0.18, 0.28, 24);
            const ringMat = new THREE.MeshBasicMaterial({
              color: colAmber,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.6,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.copy(pos);
            ring.lookAt(pos.clone().multiplyScalar(2));
            rootGroup.add(ring);
            pulseRingsRef.current.push(ring);
          }
        }
      });

      // Trade Arcs connecting Nodes on Globe
      CONNECTIONS.forEach((conn) => {
        const p1 = nodePositions[conn.from];
        const p2 = nodePositions[conn.to];
        if (!p1 || !p2) return;

        const { curve, points } = createSplineArc(p1, p2, 0.25);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const isCrit = conn.risk === 'critical';
        const lineMat = new THREE.LineBasicMaterial({
          color: isCrit ? colAmber : colSteel,
          linewidth: isCrit ? 2 : 1,
          transparent: true,
          opacity: isCrit ? 0.95 : 0.65,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        rootGroup.add(line);

        // Moving 3D packet particle along arc
        const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({
          color: isCrit ? colAmber : colSteel,
        });
        const packet = new THREE.Mesh(packetGeo, packetMat);
        rootGroup.add(packet);
        packetParticlesRef.current.push({
          mesh: packet,
          curve,
          t: Math.random(),
          speed: isCrit ? 0.35 : 0.22,
        });
      });

      // Position camera angle to frame upstream Asia -> Europe -> US flow nicely
      rootGroup.rotation.y = -1.2;
      rootGroup.rotation.x = 0.3;

    } else {
      // 2. NETWORK TOPOLOGY SPATIAL GRAPH MODE
      // Floor grid for technical depth
      const gridHelper = new THREE.GridHelper(10, 20, colSteel, colPanel);
      gridHelper.position.y = -3.2;
      rootGroup.add(gridHelper);

      const nodePositions: { [id: string]: THREE.Vector3 } = {};

      NODES_DATA.forEach((node) => {
        const v = new THREE.Vector3(...node.pos3D);
        nodePositions[node.id] = v;

        const isAnomaly = node.status === 'critical_anomaly';
        const isTarget = node.status === 'target';
        const nodeColor = isAnomaly ? colAmber : isTarget ? colInk : colSteel;

        // Base 3D pedestal
        const pedGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.12, 16);
        const pedMat = new THREE.MeshStandardMaterial({
          color: colPanel,
          roughness: 0.5,
        });
        const pedestal = new THREE.Mesh(pedGeo, pedMat);
        pedestal.position.set(v.x, v.y - 0.2, v.z);
        rootGroup.add(pedestal);

        // Main node geometry (Hexagonal Prism / Box / Sphere)
        const markerGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.3, 6);
        const markerMat = new THREE.MeshStandardMaterial({
          color: nodeColor,
          metalness: 0.3,
          roughness: 0.4,
          emissive: isAnomaly ? colAmber : 0x000000,
          emissiveIntensity: isAnomaly ? 0.5 : 0,
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        marker.position.copy(v);
        rootGroup.add(marker);

        clickableMeshesRef.current.push({ mesh: marker, node });

        // Upstream anomaly pulse rings on Factory A
        if (isAnomaly) {
          for (let i = 0; i < 2; i++) {
            const ringGeo = new THREE.RingGeometry(0.35, 0.5, 32);
            const ringMat = new THREE.MeshBasicMaterial({
              color: colAmber,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.7,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.set(v.x, v.y + 0.15, v.z);
            ring.rotation.x = Math.PI / 2;
            rootGroup.add(ring);
            pulseRingsRef.current.push(ring);
          }
        }
      });

      // Spatial Connectors
      CONNECTIONS.forEach((conn) => {
        const p1 = nodePositions[conn.from];
        const p2 = nodePositions[conn.to];
        if (!p1 || !p2) return;

        // Quadratic curve bridging levels in 3D
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        mid.y += 0.4;
        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const points = curve.getPoints(40);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        const isCrit = conn.risk === 'critical';
        const lineMat = new THREE.LineBasicMaterial({
          color: isCrit ? colAmber : colSteel,
          transparent: true,
          opacity: isCrit ? 1.0 : 0.6,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        rootGroup.add(line);

        // Particle packet
        const packetGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({
          color: isCrit ? colAmber : colSteel,
        });
        const packet = new THREE.Mesh(packetGeo, packetMat);
        rootGroup.add(packet);
        packetParticlesRef.current.push({
          mesh: packet,
          curve,
          t: Math.random(),
          speed: isCrit ? 0.4 : 0.25,
        });
      });

      rootGroup.rotation.y = 0.4;
      rootGroup.rotation.x = 0.2;
    }
  }, []);

  // Filter nodes according to tier filter
  const filteredNodes = tierFilter === 'all' 
    ? NODES_DATA 
    : NODES_DATA.filter((n) => n.tierNum === tierFilter);

  // Zoom controls
  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(6, cameraRef.current.position.z - 1.5);
  };

  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.min(18, cameraRef.current.position.z + 1.5);
  };

  const handleResetCamera = () => {
    if (!cameraRef.current || !rootGroupRef.current) return;
    cameraRef.current.position.set(0, 0, 11);
    rootGroupRef.current.rotation.set(
      viewMode === 'globe' ? 0.3 : 0.2,
      viewMode === 'globe' ? -1.2 : 0.4,
      0
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      id="three-supply-chain-app-container"
      className={`relative w-full overflow-hidden border border-[#E2E4E8] bg-[#F7F7F4] rounded-[4px] shadow-xs ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : isEmbedded ? 'h-[580px]' : 'h-[640px]'
      }`}
    >
      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        id="three-canvas-viewport"
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Bar: Mode Selector & Live Status Header */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Mode Switcher Tabs */}
        <div className="pointer-events-auto flex items-center gap-1 rounded-[3px] border border-[#E2E4E8] bg-white/95 p-1 backdrop-blur-md">
          <button
            type="button"
            id="switch-3d-globe-btn"
            onClick={() => setViewMode('globe')}
            className={`flex items-center gap-1.5 rounded-[2px] px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
              viewMode === 'globe'
                ? 'bg-[#161B22] text-white'
                : 'text-[#161B22] hover:bg-[#F7F7F4]'
            }`}
          >
            <GlobeIcon className="h-3.5 w-3.5" />
            3D Global Vessel Route Map
          </button>
          <button
            type="button"
            id="switch-3d-topology-btn"
            onClick={() => setViewMode('topology')}
            className={`flex items-center gap-1.5 rounded-[2px] px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
              viewMode === 'topology'
                ? 'bg-[#161B22] text-white'
                : 'text-[#161B22] hover:bg-[#F7F7F4]'
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            3D Upstream Topology Graph
          </button>
        </div>

        {/* Top Right Live Telemetry Badge & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-[3px] border border-[#E2E4E8] bg-white/95 px-2.5 py-1.5 font-mono text-[11px] backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C97F2A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C97F2A]"></span>
            </span>
            <span className="text-[#3A5A73]">3D TELEMETRY ENGINE:</span>
            <span className="font-semibold text-[#161B22]">ONLINE</span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            id="toggle-3d-fullscreen-btn"
            className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[#E2E4E8] bg-white/95 text-[#161B22] hover:bg-[#F7F7F4] backdrop-blur-md cursor-pointer"
            title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
            aria-label={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating 3D Navigation Controls Toolbar (Left bottom) */}
      <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 pointer-events-auto z-10">
        <div className="flex items-center gap-1 rounded-[3px] border border-[#E2E4E8] bg-white/95 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={handleZoomIn}
            id="three-zoom-in-btn"
            className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#161B22] hover:bg-[#F7F7F4] cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            id="three-zoom-out-btn"
            className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#161B22] hover:bg-[#F7F7F4] cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleResetCamera}
            id="three-reset-view-btn"
            className="flex h-7 w-7 items-center justify-center rounded-[2px] text-[#161B22] hover:bg-[#F7F7F4] cursor-pointer"
            title="Reset Perspective"
            aria-label="Reset Perspective"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            id="three-toggle-rotate-btn"
            className={`flex h-7 px-2 items-center gap-1 rounded-[2px] text-xs font-mono transition-colors cursor-pointer ${
              autoRotate ? 'bg-[#161B22] text-white' : 'text-[#161B22] hover:bg-[#F7F7F4]'
            }`}
            title="Toggle 3D Orbit Rotation"
          >
            {autoRotate ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>Orbit</span>
          </button>
        </div>

        {/* Tier Node Selector Quick Switcher */}
        <div className="hidden sm:flex items-center gap-1 rounded-[3px] border border-[#E2E4E8] bg-white/95 p-1 font-mono text-[11px] backdrop-blur-md">
          <span className="px-1.5 text-[#3A5A73]">Focus:</span>
          {NODES_DATA.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node)}
              className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                selectedNode.id === node.id
                  ? 'bg-[#161B22] text-white'
                  : 'text-[#161B22] hover:bg-[#F7F7F4]'
              }`}
            >
              {node.tier}
            </button>
          ))}
        </div>
      </div>

      {/* Floating 3D Node Inspector Card (Right side panel) */}
      <div className="absolute bottom-3 right-3 w-80 max-w-[calc(100vw-24px)] rounded-[4px] border border-[#E2E4E8] bg-white/95 p-4 shadow-md backdrop-blur-md pointer-events-auto z-10 font-sans text-xs">
        <div className="flex items-start justify-between gap-2 border-b border-[#E2E4E8] pb-2.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-semibold text-[#C97F2A] uppercase">
                {selectedNode.tier}
              </span>
              {selectedNode.status === 'critical_anomaly' && (
                <span className="inline-flex items-center gap-1 font-mono text-[9px] text-white bg-[#A63A2E] px-1.5 py-0.2 rounded-[2px]">
                  <AlertTriangle className="h-2.5 w-2.5" />
                  ANOMALY ORIGIN
                </span>
              )}
            </div>
            <h4 className="mt-1 font-semibold text-sm text-[#161B22] leading-tight">
              {selectedNode.name}
            </h4>
          </div>
          <div className="font-mono text-[11px] text-right">
            <span className="text-[#3A5A73] block text-[9px]">CONFIDENCE</span>
            <span className="font-bold text-[#161B22] bg-[#F7F7F4] border border-[#E2E4E8] px-1 rounded-[2px]">
              {selectedNode.confidence}%
            </span>
          </div>
        </div>

        <div className="mt-2.5 space-y-1 font-mono text-[11px] text-[#3A5A73]">
          <div>Location: <span className="text-[#161B22]">{selectedNode.location}</span></div>
          <div>Role: <span className="text-[#161B22]">{selectedNode.role}</span></div>
          <div>Lead window: <span className="text-[#C97F2A] font-semibold">{selectedNode.leadTime}</span></div>
        </div>

        <p className="mt-2.5 text-xs text-[#161B22]/85 bg-[#F7F7F4] p-2 rounded-[3px] border border-[#E2E4E8] leading-relaxed">
          {selectedNode.details}
        </p>

        {/* Metric Badges */}
        <div className="mt-2.5 grid grid-cols-3 gap-1 text-center font-mono text-[9px]">
          {selectedNode.metrics.map((m, i) => (
            <div key={i} className="bg-[#F7F7F4] p-1 rounded-[2px] border border-[#E2E4E8]">
              <span className="block text-[#3A5A73]">{m.label}</span>
              <span className="font-semibold text-[#161B22]">{m.val}</span>
            </div>
          ))}
        </div>

        {/* Action Link inside 3D Inspector */}
        <div className="mt-3 pt-2.5 border-t border-[#E2E4E8] flex items-center justify-between">
          <button
            type="button"
            onClick={onOpenDossier}
            className="font-mono text-[11px] text-[#3A5A73] hover:text-[#161B22] underline cursor-pointer"
          >
            Inspect evidence dossier
          </button>
          {onOpenPilotModal && (
            <button
              type="button"
              onClick={onOpenPilotModal}
              className="rounded-[3px] bg-[#161B22] px-2.5 py-1 text-[11px] font-mono font-medium text-white hover:bg-[#3A5A73] cursor-pointer"
            >
              Monitor in Pilot
            </button>
          )}
        </div>
      </div>

      {/* Interaction Hint (Fades out or bottom center) */}
      <div className="absolute top-16 left-3 hidden md:block font-mono text-[10px] text-[#3A5A73] bg-white/80 px-2 py-1 rounded-[2px] border border-[#E2E4E8] pointer-events-none backdrop-blur-xs">
        Click &amp; drag to rotate in 3D • Scroll to zoom • Click nodes to inspect
      </div>
    </div>
  );
}
