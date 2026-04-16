import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, Text as ThreeText } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { MathText, MathBlock, Highlight, EquationPart } from './Math';
import { 
  Shield, 
  Activity, 
  Cpu, 
  Lock, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RefreshCcw,
  Globe,
  Database,
  Search
} from 'lucide-react';

// --- Shared Components ---

const SlideContainer = ({ children, title, subtitle }: { children: React.ReactNode, title?: string, subtitle?: string }) => (
  <div className="relative w-full h-full flex flex-col grid-bg p-12 pt-20 overflow-hidden">
    {(title || subtitle) && (
      <div className="mb-12 max-w-5xl shrink-0">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-6xl font-bold mb-3 tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-3xl text-gray-400 font-light"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    )}
    <div className="flex-1 flex items-center justify-center w-full min-h-0 relative">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);

// --- Scenes ---

const Scene1Intro = () => (
  <SlideContainer>
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="text-center space-y-10">
      <div className="w-60 h-60 bg-yellow-400 rounded-full mx-auto mb-12 flex items-center justify-center shadow-[0_0_120px_rgba(250,176,5,0.3)]">
        <Shield size={120} className="text-black" />
      </div>
      <h1 className="text-8xl font-black mb-8 tracking-tighter leading-none">
        One-Class <Highlight>SVM</Highlight>
      </h1>
      <p className="text-3xl text-gray-400 font-light max-w-5xl mx-auto leading-relaxed whitespace-nowrap">
        The Guardian of the Norm: Detecting the <Highlight color="red">Invisible</Highlight> in a World of Patterns
      </p>
      <div className="pt-16 flex items-center justify-center gap-12 text-gray-500">
        <div className="flex items-center gap-6 animate-pulse">
          <Search size={32} />
          <span className="uppercase tracking-[0.5em] text-lg font-bold">Initializing Analysis</span>
        </div>
        <div className="w-px h-10 bg-gray-800" />
        <span className="text-lg font-mono text-gray-600 tracking-widest">v2.5.0-PRO</span>
      </div>
    </motion.div>
  </SlideContainer>
);

const Scene2Haystack = () => {
  const points = useMemo(() => Array.from({ length: 400 }).map((_, i) => ({
    x: (Math.random() - 0.5) * 18,
    y: (Math.random() - 0.5) * 18,
    isAnomaly: i === 0
  })), []);

  return (
    <SlideContainer title="The Needle in a Haystack" subtitle="Finding the 0.01% that matters.">
      <div className="relative w-[460px] h-[460px] bg-black/20 rounded-full border border-white/5 flex items-center justify-center shadow-inner">
        <svg viewBox="-10 -10 20 20" className="w-full h-full">
          {points.map((p, i) => (
            <motion.circle
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.002 }}
              cx={p.x}
              cy={p.y}
              r={p.isAnomaly ? 0.5 : 0.15}
              fill={p.isAnomaly ? "#ff6b6b" : "#4dabf7"}
              className={p.isAnomaly ? "animate-pulse" : ""}
            />
          ))}
          {points[0] && (
            <motion.circle
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: 3, opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              cx={points[0].x}
              cy={points[0].y}
              stroke="#ff6b6b"
              strokeWidth="0.1"
              fill="none"
            />
          )}
        </svg>
      </div>
    </SlideContainer>
  );
};

const Scene3Impact = () => (
  <SlideContainer title="The Cost of Failure" subtitle="Why we can't afford to miss.">
    <div className="grid grid-cols-3 gap-16 w-full">
      {[
        { icon: TrendingUp, title: "Financial Loss", desc: "Fraudulent transactions cost the global economy over $30B annually.", color: "red" },
        { icon: Activity, title: "Safety Risks", desc: "A single undetected engine fault can lead to catastrophic failure.", color: "yellow" },
        { icon: Lock, title: "Security Breaches", desc: "Zero-day attacks bypass traditional rules, hiding in normal traffic.", color: "blue" }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-sm flex flex-col h-full"
        >
          <item.icon size={56} className={`mb-8 text-${item.color}-400`} />
          <h3 className="text-4xl font-bold mb-6">{item.title}</h3>
          <p className="text-2xl text-gray-400 leading-relaxed flex-1">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </SlideContainer>
);

const Scene4AccuracyTrap = () => (
  <SlideContainer title="The Accuracy Trap" subtitle="When 99.9% is a failure.">
    <div className="max-w-5xl text-center space-y-16">
      <MathBlock className="text-5xl">
        Accuracy = <span className="text-green-400">9,999 Correct</span> / <span className="text-white">10,000 Total</span> = <span className="text-yellow-400">99.99%</span>
      </MathBlock>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="p-16 bg-red-400/10 border border-red-400/20 rounded-[3rem] shadow-2xl"
      >
        <p className="text-5xl font-bold text-red-400 mb-8">But the 1 anomaly was missed.</p>
        <p className="text-3xl text-gray-400 leading-relaxed">
          In anomaly detection, <Highlight color="red">Recall</Highlight> is more important than raw Accuracy.
          Missing a single fraud can cost more than 10,000 correct approvals.
        </p>
      </motion.div>
    </div>
  </SlideContainer>
);

const Scene5PerspectiveShift = () => (
  <SlideContainer title="A Shift in Perspective" subtitle="From 'Who is bad?' to 'What is normal?'.">
    <div className="flex gap-32 items-center">
      <div className="text-center">
        <p className="text-gray-500 mb-10 uppercase tracking-[0.3em] text-sm font-bold">Traditional ML</p>
        <div className="p-16 bg-white/5 rounded-[3rem] border border-white/10 w-[450px] h-[450px] flex flex-col items-center justify-center gap-10">
          <div className="flex gap-6">
            <div className="w-16 h-16 bg-blue-400 rounded-full" />
            <div className="w-16 h-16 bg-red-400 rounded-full" />
          </div>
          <p className="text-4xl font-bold">Binary Classification</p>
          <p className="text-2xl text-gray-500">Needs both labels</p>
        </div>
      </div>
      <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <ArrowRight size={80} className="text-yellow-400" />
      </motion.div>
      <div className="text-center">
        <p className="text-gray-500 mb-10 uppercase tracking-[0.3em] text-sm font-bold">One-Class SVM</p>
        <div className="p-16 bg-yellow-400/10 rounded-[3rem] border border-yellow-400/20 w-[450px] h-[450px] flex flex-col items-center justify-center gap-10">
          <div className="w-24 h-24 bg-blue-400 rounded-full shadow-[0_0_50px_rgba(77,171,247,0.5)]" />
          <p className="text-4xl font-bold">Novelty Detection</p>
          <p className="text-2xl text-gray-500">Learns only the Norm</p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Scene6DefiningNormal = () => (
  <SlideContainer title="Defining the Norm" subtitle="Drawing the boundary of trust.">
    <div className="relative w-[460px] h-[460px] flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-[300px] h-[300px] border-4 border-yellow-400 rounded-full bg-yellow-400/5 shadow-[0_0_100px_rgba(250,176,5,0.2)]"
      />
      <div className="relative z-10 grid grid-cols-4 gap-10">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="w-10 h-10 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(77,171,247,0.4)]"
          />
        ))}
      </div>
      <motion.div 
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 320, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute flex flex-col items-center gap-6"
      >
        <div className="w-10 h-10 bg-red-400 rounded-full animate-bounce shadow-[0_0_25px_rgba(255,107,107,0.6)]" />
        <p className="text-red-400 font-mono text-2xl font-bold">OUTLIER</p>
      </motion.div>
    </div>
  </SlideContainer>
);

const Scene7Flexibility = ({ nu, setNu }: { nu: number, setNu: (v: number) => void }) => {
  // Generate scattered points once, fixed positions
  const points = useMemo(() => {
    const pts = [];
    // Dense normal cluster near center (will be inside at most nu values)
    for (let i = 0; i < 24; i++) {
      const r = 15 + Math.random() * 105;
      const theta = Math.random() * Math.PI * 2;
      pts.push({ x: Math.cos(theta) * r, y: Math.sin(theta) * r });
    }
    // Borderline points (may switch color as nu changes)
    for (let i = 0; i < 8; i++) {
      const r = 108 + Math.random() * 38;
      const theta = Math.random() * Math.PI * 2;
      pts.push({ x: Math.cos(theta) * r, y: Math.sin(theta) * r });
    }
    // Outliers far from center (usually red)
    for (let i = 0; i < 8; i++) {
      const r = 158 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      pts.push({ x: Math.cos(theta) * r, y: Math.sin(theta) * r });
    }
    return pts;
  }, []);

  // Circle base is w-[280px] → radius = 140px; visual radius = 140 * scale
  const circleRadius = 140 * (0.35 + nu * 1.3);

  return (
    <SlideContainer title="The Flexibility Balance" subtitle="Tuning the strictness of the Guardian.">
      <div className="flex gap-32 items-center w-full">
        <div className="relative w-[480px] h-[480px] flex items-center justify-center shrink-0">
          <motion.div 
            animate={{ scale: 0.35 + nu * 1.3, opacity: 1 }}
            className="absolute w-[280px] h-[280px] border-4 border-yellow-400 rounded-full bg-yellow-400/5 shadow-[0_0_80px_rgba(250,176,5,0.15)]"
          />
          {points.map((p, i) => {
            const dist = Math.sqrt(p.x * p.x + p.y * p.y);
            const isInside = dist <= circleRadius;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full shadow-sm"
                style={{ width: 13, height: 13, left: `calc(50% + ${p.x}px - 6.5px)`, top: `calc(50% + ${p.y}px - 6.5px)` }}
                animate={{ backgroundColor: isInside ? '#4dabf7' : '#ff6b6b', boxShadow: isInside ? '0 0 8px rgba(77,171,247,0.6)' : '0 0 8px rgba(255,107,107,0.6)' }}
                transition={{ duration: 0.4 }}
              />
            );
          })}
        </div>
        <div className="flex-1 max-w-2xl space-y-16">
          <div className="p-16 bg-white/5 rounded-[3rem] border border-white/10 shadow-xl">
            <h4 className="text-5xl font-bold mb-12 flex items-center gap-6 whitespace-nowrap">
              <RefreshCcw size={48} className="text-yellow-400" />
              Parameter: <span className="whitespace-nowrap"><Highlight>Nu (ν)</Highlight></span>
            </h4>
            <input 
              type="range" min="0.01" max="0.5" step="0.01" value={nu} 
              onChange={(e) => setNu(parseFloat(e.target.value))}
              className="w-full h-4 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 mb-12"
            />
            <p className="text-3xl text-gray-400 leading-relaxed min-h-[10rem]">
              {nu < 0.1 ? "Strict: Encloses almost all points. High risk of missing subtle anomalies." : 
               nu > 0.3 ? "Relaxed: Allows more outliers. High risk of false alarms." : 
               "Balanced: A compromise between precision and recall."}
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};


const Kernel3DView = () => {
  const points = useMemo(() => {
    return Array.from({ length: 100 }).map(() => {
      const r = Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      // Parabolic projection
      const z = (x * x + y * y) * 0.5;
      return [x, y, z];
    });
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 5, 8]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <gridHelper args={[10, 10, 0x444444, 0x222222]} />
        {points.map((p, i) => (
          <mesh key={i} position={p as any}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#fab005" emissive="#fab005" emissiveIntensity={0.5} />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

const Scene8KernelIntuition = () => (
  <SlideContainer title="The Kernel Bridge" subtitle="Seeing patterns in higher dimensions.">
    <div className="max-w-6xl space-y-12">
      <p className="text-3xl text-gray-300 leading-relaxed text-center">
        Sometimes, data is tangled in 2D. We use a <Highlight>Kernel Function</Highlight> to project it into a space where it becomes separable.
      </p>
      <div className="grid grid-cols-2 gap-12">
        {/* Input Space 2D */}
        <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-center shadow-xl overflow-hidden flex flex-col">
          <p className="text-xs text-gray-500 mb-6 uppercase tracking-[0.3em] font-bold">Input Space (2D Oxy)</p>
          <div className="relative w-full aspect-square max-w-[300px] mx-auto border border-gray-800 rounded-lg flex items-center justify-center bg-black/20">
            <div className="absolute w-full h-px bg-gray-800" />
            <div className="absolute h-full w-px bg-gray-800" />
            {/* Tangled points */}
            {[...Array(40)].map((_, i) => {
              const r = Math.random() * 4;
              const theta = Math.random() * Math.PI * 2;
              const x = Math.cos(theta) * r * 20;
              const y = Math.sin(theta) * r * 20;
              return (
                <div 
                  key={i} 
                  className="absolute w-2 h-2 rounded-full"
                  style={{ 
                    left: `calc(50% + ${x}px)`, 
                    top: `calc(50% + ${y}px)`,
                    backgroundColor: r < 2 ? '#4dabf7' : '#ff6b6b'
                  }}
                />
              );
            })}
            <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full scale-50" />
          </div>
          <p className="mt-6 text-gray-500 text-sm italic">Non-separable in 2D</p>
        </div>

        {/* Feature Space 3D */}
        <div className="p-10 bg-yellow-400/5 rounded-[2.5rem] border border-yellow-400/20 text-center shadow-xl overflow-hidden flex flex-col">
          <p className="text-xs text-gray-500 mb-6 uppercase tracking-[0.3em] font-bold">Feature Space (3D Oxyz)</p>
          <div className="relative w-full aspect-square max-w-[300px] mx-auto rounded-lg overflow-hidden bg-black/40 border border-white/5">
            <Kernel3DView />
          </div>
          <p className="mt-6 text-yellow-400/70 text-sm italic">Linearly separable in 3D</p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Scene9RBFMountain = () => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 300; i++) {
      const r = Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = Math.exp(-(x * x + y * y) / 4) * 4;
      p.push([x, y, z]);
    }
    return p;
  }, []);

  return (
    <SlideContainer title="The RBF Mountain" subtitle="Mapping similarity to height.">
      <div className="flex w-full h-full gap-12 items-center">
        <div className="flex-1 space-y-8">
          <p className="text-4xl text-gray-400 font-light leading-relaxed">
            The <Highlight>Radial Basis Function</Highlight> creates a "mountain" of similarity. 
            Normal points sit at the peak; anomalies fall into the valleys.
          </p>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-xl text-gray-500 font-mono">
              Height(x) = exp(-γ ||x - c||²)
            </p>
          </div>
        </div>
        <div className="w-[450px] h-[440px] bg-black/40 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
          <Canvas>
            <PerspectiveCamera makeDefault position={[8, 8, 8]} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <gridHelper args={[20, 20, 0x333333, 0x111111]} />
            {points.map((p, i) => (
              <mesh key={i} position={p as any}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial 
                  color={p[2] > 1.2 ? "#4dabf7" : "#ff6b6b"} 
                  emissive={p[2] > 1.2 ? "#1c7ed6" : "#c92a2a"}
                  emissiveIntensity={0.5}
                />
              </mesh>
            ))}
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        </div>
      </div>
    </SlideContainer>
  );
};

const CameraHandler = ({ mode, isUserControlling }: { mode: 'flat' | 'hyper', isUserControlling: boolean }) => {
  const { camera, controls } = useThree();

  useFrame(() => {
    if (isUserControlling) return;
    const targetPos = mode === 'flat' ? new THREE.Vector3(0, 14, 0.1) : new THREE.Vector3(12, 4, 12);
    camera.position.lerp(targetPos, 0.05);
    // Keep OrbitControls' internal state in sync so it doesn't jump when user starts dragging
    if (controls) {
      (controls as any).target.set(0, 1.5, 0);
      (controls as any).update();
    } else {
      camera.lookAt(0, 1.5, 0);
      camera.updateProjectionMatrix();
    }
  });
  return null;
};

const SlicingIllustration = () => {
  const [mode, setMode] = useState<'flat' | 'hyper'>('flat');
  const [isUserControlling, setIsUserControlling] = useState(false);
  
  const intervalRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);

  const startAutoToggle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setMode(prev => prev === 'flat' ? 'hyper' : 'flat');
    }, 4000);
  };

  useEffect(() => {
    startAutoToggle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleInteraction = () => {
    setIsUserControlling(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsUserControlling(false);
      setMode(prev => prev === 'flat' ? 'hyper' : 'flat');
      startAutoToggle();
    }, 5000);
  };

  // Gaussian bell: z = exp(-r²/4)*4 → peak at center (top), falloff at edges
  // threshold = 1.5 → boundary radius r = sqrt(-4*ln(1.5/4)) ≈ 1.98
  const THRESHOLD = 1.5;
  const RING_RADIUS = 1.98;

  const points = useMemo(() => {
    return Array.from({ length: 200 }).map(() => {
      const r = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = Math.exp(-(x * x + y * y) / 4) * 4; // Gaussian bell, peak=4 at center
      return { x, y, z, r };
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
    <div 
      className="relative w-[880px] h-[380px] bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl mx-auto cursor-move"
      onPointerDown={handleInteraction}
      onPointerMove={handleInteraction}
      onWheel={handleInteraction}
    >
      <Canvas shadows camera={{ position: [10, 8, 10], fov: 45 }}>
        <CameraHandler mode={mode} isUserControlling={isUserControlling} />
        <OrbitControls makeDefault enableZoom={true} enablePan={false} target={[0, 1.5, 0]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow />
        <pointLight position={[-10, 8, -10]} intensity={0.5} />
        
        <gridHelper args={[20, 20, 0x333333, 0x111111]} position={[0, -0.05, 0]} />

        {/* The Slicing Hyperplane — at threshold height */}
        <mesh position={[0, THRESHOLD, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[13, 13]} />
          <meshStandardMaterial 
            color="#fab005" 
            transparent 
            opacity={0.55} 
            side={THREE.DoubleSide}
            emissive="#fab005"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Bright grid on the hyperplane for clarity */}
        <gridHelper args={[13, 13, 0xfab005, 0xfab005]} position={[0, THRESHOLD + 0.01, 0]} material-opacity={0.35} material-transparent />

        {/* Points — blue = above threshold (normal/peak), red = below (anomaly/edge) */}
        {points.map((p, i) => (
          <mesh key={i} position={[p.x, p.z, p.y]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial 
              color={p.z > THRESHOLD ? "#4dabf7" : "#ff6b6b"} 
              emissive={p.z > THRESHOLD ? "#1c7ed6" : "#c92a2a"}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}

        {/* 2D Boundary Circle — positioned AT the threshold height so it's the actual cut line */}
        {mode === 'flat' && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, THRESHOLD, 0]}>
            <ringGeometry args={[RING_RADIUS - 0.06, RING_RADIUS + 0.06, 80]} />
            <meshBasicMaterial color="#fab005" transparent opacity={1} />
          </mesh>
        )}
      </Canvas>
    </div>

    {/* Label placed OUTSIDE the canvas so it doesn't overlap the visualization */}
    <div className="flex flex-col items-center gap-1 mt-2">
      <div className="px-6 py-1.5 bg-yellow-400/20 border border-yellow-400/40 rounded-full backdrop-blur-md">
        <p className="text-yellow-400 font-mono text-sm font-bold uppercase tracking-[0.3em]">
          {mode === 'flat' ? 'Input Space (2D View)' : 'Feature Space (3D View)'}
        </p>
      </div>
      <p className="text-gray-500 text-xs font-mono">
        {mode === 'flat' ? 'Non-linear boundary in 2D' : 'Linear hyperplane slicing the 3D projection'}
      </p>
    </div>
    </div>
  );
};

const Scene10Slicing = () => (
  <SlideContainer title="Slicing the Norm" subtitle="The Hyperplane as a threshold.">
    <div className="w-full flex flex-col items-center gap-5">
      <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur-sm w-full max-w-4xl">
        <p className="text-2xl text-gray-300 leading-relaxed mb-4 text-center font-bold">
          In this high-dimensional space, we don't draw a circle. We draw a <span className="whitespace-nowrap"><Highlight>Flat Plane</Highlight></span>.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_rgba(250,176,5,0.6)]" />
          <p className="text-yellow-400 font-mono font-black text-xl tracking-widest">DECISION BOUNDARY</p>
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_rgba(250,176,5,0.6)]" />
        </div>
      </div>

      <SlicingIllustration />

      <p className="text-lg text-gray-500 text-center italic font-light">"Anything that doesn't reach this height is an anomaly."</p>
    </div>
  </SlideContainer>
);

const Scene11AppBanking = () => (
  <SlideContainer title="Application: Banking" subtitle="Real-time Fraud Prevention.">
    <div className="flex gap-24 items-center w-full">
      <div className="flex-1 space-y-10">
        <div className="flex items-center gap-6 text-blue-400">
          <Database size={48} />
          <h4 className="text-4xl font-bold">Transaction Stream</h4>
        </div>
        <p className="text-2xl text-gray-400 leading-relaxed">
          The model learns your spending patterns: location, amount, time, and frequency. 
          When a transaction deviates from this <Highlight color="blue">Personal Norm</Highlight>, it's flagged instantly.
        </p>
        <ul className="space-y-6">
          <li className="flex items-center gap-4 text-green-400/80 text-xl"><CheckCircle2 size={28} /> Low Latency (&lt;50ms)</li>
          <li className="flex items-center gap-4 text-green-400/80 text-xl"><CheckCircle2 size={28} /> Adaptive Learning</li>
        </ul>
      </div>
      <div className="w-96 h-[500px] bg-white/5 rounded-[3rem] border border-white/10 p-12 flex flex-col justify-between shadow-2xl">
        <div className="space-y-6">
          <div className="w-full h-6 bg-gray-800 rounded-full animate-pulse" />
          <div className="w-2/3 h-6 bg-gray-800 rounded-full animate-pulse" />
          <div className="w-full h-6 bg-gray-800 rounded-full animate-pulse opacity-50" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="p-8 bg-red-400/20 border border-red-400/40 rounded-3xl text-center"
        >
          <AlertTriangle className="mx-auto text-red-400 mb-4" size={40} />
          <p className="text-red-400 font-bold text-2xl">FRAUD DETECTED</p>
        </motion.div>
      </div>
    </div>
  </SlideContainer>
);

const Scene12AppIndustry = () => (
  <SlideContainer title="Application: Industry 4.0" subtitle="Predictive Maintenance.">
    <div className="flex gap-24 items-center w-full">
      <div className="w-[500px] h-80 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0 shadow-2xl">
        <Cpu size={180} className="text-yellow-400/20" />
        <motion.div 
          animate={{ x: [-200, 600] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute top-0 left-0 w-32 h-full bg-yellow-400/10 skew-x-12"
        />
      </div>
      <div className="flex-1 space-y-10">
        <div className="flex items-center gap-6 text-yellow-400">
          <Zap size={48} />
          <h4 className="text-4xl font-bold">Machine Health</h4>
        </div>
        <p className="text-3xl text-gray-400 leading-relaxed">
          Sensors monitor vibration, temperature, and sound. One-Class SVM detects the <Highlight>Subtle Deviations</Highlight> that precede a breakdown, saving millions in downtime.
        </p>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-yellow-400/10 rounded-full border border-yellow-400/20 text-yellow-400 text-sm font-bold tracking-widest uppercase">Vibration</div>
          <div className="px-6 py-3 bg-yellow-400/10 rounded-full border border-yellow-400/20 text-yellow-400 text-sm font-bold tracking-widest uppercase">Thermal</div>
          <div className="px-6 py-3 bg-yellow-400/10 rounded-full border border-yellow-400/20 text-yellow-400 text-sm font-bold tracking-widest uppercase">Acoustic</div>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Scene13AppSecurity = () => (
  <SlideContainer title="Application: Cybersecurity" subtitle="Zero-Day Threat Detection.">
    <div className="grid grid-cols-2 gap-16 w-full">
      <div className="p-12 bg-blue-400/5 rounded-[3rem] border border-blue-400/20 shadow-xl">
        <Globe size={56} className="text-blue-400 mb-10" />
        <h4 className="text-4xl font-bold mb-6">Network Traffic</h4>
        <p className="text-2xl text-gray-400 leading-relaxed">Traditional firewalls use rules. One-Class SVM uses <Highlight color="blue">Behavior</Highlight>. It catches attackers who act "weirdly" but follow the rules.</p>
      </div>
      <div className="p-12 bg-red-400/5 rounded-[3rem] border border-red-400/20 shadow-xl">
        <Lock size={56} className="text-red-400 mb-10" />
        <h4 className="text-4xl font-bold mb-6">Zero-Day Attacks</h4>
        <p className="text-2xl text-gray-400 leading-relaxed">Since it doesn't need to know what a virus looks like, it can detect <Highlight color="red">Brand New Threats</Highlight> that have never been seen before.</p>
      </div>
    </div>
  </SlideContainer>
);

const Scene14HumanFactor = () => (
  <SlideContainer title="The Human Factor" subtitle="Balancing Security and Convenience.">
    <div className="max-w-5xl space-y-16">
      <div className="grid grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-red-400">
            <AlertTriangle size={32} />
            <h4 className="text-3xl font-bold uppercase tracking-widest">False Positives</h4>
          </div>
          <div className="p-10 bg-red-400/5 rounded-[2.5rem] border border-red-400/20 shadow-xl">
            <p className="text-2xl text-gray-300 leading-relaxed">Blocking a legitimate customer. Result: <Highlight color="red">Frustration</Highlight> and lost trust.</p>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-yellow-400">
            <Shield size={32} />
            <h4 className="text-3xl font-bold uppercase tracking-widest">False Negatives</h4>
          </div>
          <div className="p-10 bg-yellow-400/5 rounded-[2.5rem] border border-yellow-400/20 shadow-xl">
            <p className="text-2xl text-gray-300 leading-relaxed">Missing a real threat. Result: <Highlight>Financial Loss</Highlight> or danger.</p>
          </div>
        </div>
      </div>
      <p className="text-3xl text-center text-gray-500 italic font-light">"The goal isn't perfection, but optimal risk management."</p>
    </div>
  </SlideContainer>
);

const Scene15InteractiveLab = ({ nu, setNu, gamma, setGamma }: any) => {
  const [hoveredParam, setHoveredParam] = useState<string | null>(null);

  // Generate a fixed set of points for the lab
  const { normalPoints, anomalyPoints } = useMemo(() => {
    const normal = Array.from({ length: 150 }).map(() => ({
      x: (Math.random() - 0.5) * 8 + (Math.random() > 0.5 ? 2 : -2),
      y: (Math.random() - 0.5) * 8,
    }));
    const anomalies = Array.from({ length: 15 }).map(() => ({
      x: (Math.random() - 0.5) * 18,
      y: (Math.random() - 0.5) * 18,
    })).filter(p => Math.abs(p.x) > 5 || Math.abs(p.y) > 5);
    return { normalPoints: normal, anomalyPoints: anomalies };
  }, []);

  // Simulate OCSVM decision function: f(x) = sum(exp(-gamma * dist^2)) - rho
  // We'll use a grid to render the boundary
  const gridSize = 40;
  const grid = useMemo(() => {
    const g = [];
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        g.push({
          gx: (i / gridSize) * 20 - 10,
          gy: (j / gridSize) * 20 - 10,
        });
      }
    }
    return g;
  }, []);

  // Calculate decision values for the grid
  const decisionGrid = useMemo(() => {
    return grid.map(p => {
      let val = 0;
      // Use a subset of points as "support vectors" for performance
      const step = 5;
      for (let i = 0; i < normalPoints.length; i += step) {
        const np = normalPoints[i];
        const d2 = Math.pow(p.gx - np.x, 2) + Math.pow(p.gy - np.y, 2);
        val += Math.exp(-gamma * d2);
      }
      return val;
    });
  }, [gamma, normalPoints]);

  // Determine rho (threshold) based on nu
  const rho = useMemo(() => {
    const values = normalPoints.map(p => {
      let val = 0;
      const step = 5;
      for (let i = 0; i < normalPoints.length; i += step) {
        const np = normalPoints[i];
        const d2 = Math.pow(p.x - np.x, 2) + Math.pow(p.y - np.y, 2);
        val += Math.exp(-gamma * d2);
      }
      return val;
    }).sort((a, b) => a - b);
    const index = Math.floor(nu * values.length);
    return values[index] || 0;
  }, [nu, gamma, normalPoints]);

  // Count actual outliers in the current view
  const outlierCount = useMemo(() => {
    let count = 0;
    [...normalPoints, ...anomalyPoints].forEach(p => {
      let val = 0;
      const step = 5;
      for (let i = 0; i < normalPoints.length; i += step) {
        const np = normalPoints[i];
        const d2 = Math.pow(p.x - np.x, 2) + Math.pow(p.y - np.y, 2);
        val += Math.exp(-gamma * d2);
      }
      if (val < rho) count++;
    });
    return count;
  }, [rho, gamma, normalPoints, anomalyPoints]);

  return (
    <SlideContainer title="Interactive Lab: The Guardian's Logic" subtitle="Visualize how math shapes the boundary of trust.">
      <div className="flex gap-8 items-center w-full h-full pb-4">
        {/* Left column: Visualization + Stats */}
        <div className="flex flex-col gap-2 shrink-0">
        <div className="relative w-[480px] h-[480px] bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
          <svg viewBox="-10 -10 20 20" className="w-full h-full">
            {/* Decision Surface */}
            <g opacity="0.4">
              {grid.map((p, i) => {
                const val = decisionGrid[i];
                const isInside = val >= rho;
                if (!isInside) return null;
                
                // Check if it's a boundary cell
                const isBoundary = grid.some((gp, gi) => {
                  if (Math.abs(gp.gx - p.gx) <= 0.51 && Math.abs(gp.gy - p.gy) <= 0.51) {
                    return decisionGrid[gi] < rho;
                  }
                  return false;
                });

                return (
                  <rect
                    key={i}
                    x={p.gx - 0.25}
                    y={p.gy - 0.25}
                    width="0.5"
                    height="0.5"
                    fill="#fab005"
                    opacity={isBoundary ? 0.9 : Math.min(0.3, (val - rho) * 2)}
                    stroke={isBoundary ? "#fab005" : "none"}
                    strokeWidth={isBoundary ? "0.1" : "0"}
                  />
                );
              })}
            </g>
            
            {/* Boundary Glow/Border - Enhanced for visibility */}
            <g>
              {grid.map((p, i) => {
                const val = decisionGrid[i];
                const isInside = val >= rho;
                if (!isInside) return null;
                
                const isBoundary = grid.some((gp, gi) => {
                  if (Math.abs(gp.gx - p.gx) <= 0.51 && Math.abs(gp.gy - p.gy) <= 0.51) {
                    return decisionGrid[gi] < rho;
                  }
                  return false;
                });

                if (!isBoundary) return null;

                return (
                  <g key={`b-group-${i}`}>
                    <motion.rect
                      x={p.gx - 0.25}
                      y={p.gy - 0.25}
                      width="0.5"
                      height="0.5"
                      fill="none"
                      stroke="#fab005"
                      strokeWidth="0.15"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Extra highlight dots at threshold */}
                    {Math.abs(val - rho) < 0.05 && (
                      <circle
                        cx={p.gx}
                        cy={p.gy}
                        r={0.15}
                        fill="#fab005"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </g>
            
            {/* Data Points */}
            {normalPoints.map((p, i) => {
              let val = 0;
              const step = 5;
              for (let j = 0; j < normalPoints.length; j += step) {
                const np = normalPoints[j];
                const d2 = Math.pow(p.x - np.x, 2) + Math.pow(p.y - np.y, 2);
                val += Math.exp(-gamma * d2);
              }
              const isOutlier = val < rho;

              return (
                <g key={`n-${i}`}>
                  {hoveredParam === 'gamma' && i % 10 === 0 && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={1 / Math.sqrt(gamma)}
                      fill="none"
                      stroke="#4dabf7"
                      strokeWidth="0.05"
                      strokeDasharray="0.2 0.2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                    />
                  )}
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r={0.12}
                    fill={isOutlier ? "#ff6b6b" : "#4dabf7"}
                    initial={false}
                    animate={{ 
                      fill: isOutlier ? "#ff6b6b" : "#4dabf7", 
                      r: isOutlier ? 0.18 : 0.12,
                      opacity: hoveredParam === 'nu' && isOutlier ? 1 : 0.8
                    }}
                  />
                </g>
              );
            })}

            {anomalyPoints.map((p, i) => (
              <motion.circle
                key={`a-${i}`}
                cx={p.x}
                cy={p.y}
                r={0.25}
                fill="#ff6b6b"
                className="animate-pulse"
              />
            ))}
          </svg>
        </div>

        {/* Stats Legend — compact horizontal bar OUTSIDE the canvas */}
        <div className="flex items-center gap-5 font-mono text-xs bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 w-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-gray-500 uppercase tracking-wider">Points</span>
            <span className="text-white font-bold">{normalPoints.length + anomalyPoints.length}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-400 uppercase tracking-wider">Outliers</span>
            <span className="text-red-400 font-bold">{outlierCount}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-yellow-400 uppercase tracking-wider">ρ</span>
            <span className="text-yellow-400 font-bold">{rho.toFixed(4)}</span>
          </div>
        </div>
        </div>

        {/* Controls & Math Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">The Decision Equation</h4>
            <div className="math-font text-3xl text-center py-3 whitespace-nowrap">
              f(x) = sgn( 
              <EquationPart active={hoveredParam === 'gamma'} label="Kernel Width">
                Σ αᵢ K<sub className="text-sm">γ</sub>(x, xᵢ)
              </EquationPart>
              - 
              <EquationPart active={hoveredParam === 'nu'} label="Threshold">
                ρ
              </EquationPart>
              )
            </div>
            <div className="mt-4 text-base text-gray-400 leading-relaxed min-h-[4rem]">
              {hoveredParam === 'nu' ? (
                <p>The parameter <Highlight>ν (Nu)</Highlight> directly determines the value of <Highlight>ρ (Rho)</Highlight>. It sets the "height" of the slice through our similarity mountain.</p>
              ) : hoveredParam === 'gamma' ? (
                <p>The parameter <Highlight color="blue">γ (Gamma)</Highlight> defines the shape of the kernel <Highlight color="blue">K</Highlight>. High gamma makes the mountain peaks sharper and more isolated.</p>
              ) : (
                <p>Hover over the parameters below to see how they influence the mathematical model and the visualization.</p>
              )}
            </div>
          </div>

          <div className="space-y-4 px-2">
            <div 
              className="space-y-4"
              onMouseEnter={() => setHoveredParam('nu')}
              onMouseLeave={() => setHoveredParam(null)}
            >
              <div className="flex justify-between items-end">
                <label className="block text-sm font-bold text-yellow-400 uppercase tracking-widest">Strictness (ν)</label>
                <span className="text-2xl font-mono">{nu.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.01" max="0.5" step="0.01" value={nu} 
                onChange={e => setNu(parseFloat(e.target.value))} 
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400" 
              />
            </div>

            <div 
              className="space-y-4"
              onMouseEnter={() => setHoveredParam('gamma')}
              onMouseLeave={() => setHoveredParam(null)}
            >
              <div className="flex justify-between items-end">
                <label className="block text-sm font-bold text-blue-400 uppercase tracking-widest">Flexibility (γ)</label>
                <span className="text-2xl font-mono">{gamma.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.05" max="1.5" step="0.05" value={gamma} 
                onChange={e => setGamma(parseFloat(e.target.value))} 
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-400" 
              />
            </div>
          </div>

          <div className="p-6 bg-blue-400/5 rounded-3xl border border-blue-400/10 flex items-start gap-6">
            <Activity className="text-blue-400 shrink-0 mt-1" size={24} />
            <p className="text-lg text-gray-400 italic leading-relaxed">
              Notice how <Highlight color="blue">Gamma</Highlight> changes the "reach" of each point, while <Highlight>Nu</Highlight> shifts the entire boundary in or out.
            </p>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
};

const Scene16Summary = () => (
  <SlideContainer title="Summary of Impact" subtitle="A safer, more efficient world.">
    <div className="grid grid-cols-2 gap-12 w-full">
      {[
        { title: "Efficiency", desc: "Automating the search for errors in massive datasets.", icon: Zap },
        { title: "Safety", desc: "Predicting failures before they happen in critical systems.", icon: Shield },
        { title: "Trust", desc: "Protecting users from fraud without intrusive monitoring.", icon: Lock },
        { title: "Innovation", desc: "Enabling AI to learn from the 'Norm' without labels.", icon: Globe }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 flex gap-8 items-start h-full"
        >
          <item.icon className="text-yellow-400 shrink-0" size={48} />
          <div>
            <h4 className="text-3xl font-bold mb-4">{item.title}</h4>
            <p className="text-xl text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SlideContainer>
);

const Scene17Final = () => (
  <SlideContainer>
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="text-center space-y-16"
    >
      <h1 className="text-[10rem] font-black mb-8 tracking-tighter leading-none">
        Thank <Highlight>You</Highlight>
      </h1>
      <p className="text-5xl text-gray-400 font-light max-w-5xl mx-auto leading-relaxed">
        The Guardian of the Norm is now in your hands.
      </p>
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-yellow-400 flex flex-col items-center gap-8 pt-24"
      >
        <div className="w-1.5 h-32 bg-gradient-to-b from-yellow-400 to-transparent" />
        <span className="uppercase tracking-[0.6em] text-lg font-bold">End of Presentation</span>
      </motion.div>
    </motion.div>
  </SlideContainer>
);

// --- Main Presentation Component ---

export const Presentation = () => {
  const [step, setStep] = useState(0);
  const [nu, setNu] = useState(0.1);
  const [gamma, setGamma] = useState(0.5);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const totalSteps = 17;

  const next = () => {
    if (step === totalSteps - 2) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fab005', '#4dabf7', '#ff6b6b']
      });
    }
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowRight') next();
      if (e.code === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const targetWidth = 1440;
        const targetHeight = 810;
        const scaleX = clientWidth / targetWidth;
        const scaleY = clientHeight / targetHeight;
        setScale(Math.min(scaleX, scaleY));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderScene = () => {
    switch (step) {
      case 0: return <Scene1Intro />;
      case 1: return <Scene2Haystack />;
      case 2: return <Scene3Impact />;
      case 3: return <Scene4AccuracyTrap />;
      case 4: return <Scene5PerspectiveShift />;
      case 5: return <Scene6DefiningNormal />;
      case 6: return <Scene7Flexibility nu={nu} setNu={setNu} />;
      case 7: return <Scene8KernelIntuition />;
      case 8: return <Scene9RBFMountain />;
      case 9: return <Scene10Slicing />;
      case 10: return <Scene11AppBanking />;
      case 11: return <Scene12AppIndustry />;
      case 12: return <Scene13AppSecurity />;
      case 13: return <Scene14HumanFactor />;
      case 14: return <Scene15InteractiveLab nu={nu} setNu={setNu} gamma={gamma} setGamma={setGamma} />;
      case 15: return <Scene16Summary />;
      case 16: return <Scene17Final />;
      default: return null;
    }
  };

  return (
    <div className="w-full h-screen bg-[#0c0c0c] text-white overflow-hidden flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 relative overflow-hidden" ref={containerRef}>
        <div 
          className="absolute top-1/2 left-1/2"
          style={{ 
            width: 1440, 
            height: 810, 
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full"
            >
              {renderScene()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-8 flex justify-between items-center bg-black/40 backdrop-blur-md border-t border-white/5 relative z-50">
        <div className="flex items-center gap-6">
          <div className="text-gray-500 font-mono text-sm tracking-widest">
            SCENE {String(step + 1).padStart(2, '0')} / {totalSteps}
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="text-xs text-gray-600 uppercase tracking-[0.2em]">
            {step === 0 ? "Introduction" : step < 6 ? "Context" : step < 10 ? "Theory" : step < 14 ? "Applications" : "Conclusion"}
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={prev}
            disabled={step === 0}
            className="p-3 rounded-full border border-white/10 hover:bg-white/5 disabled:opacity-30 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={next}
            className="px-8 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,176,5,0.2)] flex items-center gap-2 group"
          >
            {step === totalSteps - 1 ? 'Restart' : 'Next Scene'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
