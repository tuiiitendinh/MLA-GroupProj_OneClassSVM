import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
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
            className="text-5xl font-bold mb-3 tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
        )}
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-2xl text-gray-400 font-light"
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
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="text-center space-y-6">
      <div className="w-40 h-40 bg-yellow-400 rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_0_80px_rgba(250,176,5,0.2)]">
        <Shield size={80} className="text-black" />
      </div>
      <h1 className="text-7xl font-black mb-6 tracking-tighter leading-none">
        One-Class <Highlight>SVM</Highlight>
      </h1>
      <p className="text-3xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed">
        The Guardian of the Norm: Detecting the <Highlight color="red">Invisible</Highlight> in a World of Patterns
      </p>
      <div className="pt-12 flex items-center justify-center gap-8 text-gray-500">
        <div className="flex items-center gap-4 animate-pulse">
          <Search size={24} />
          <span className="uppercase tracking-[0.4em] text-sm font-bold">Initializing Analysis</span>
        </div>
        <div className="w-px h-6 bg-gray-800" />
        <span className="text-sm font-mono text-gray-600 tracking-widest">v2.5.0-PRO</span>
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
      <div className="relative w-[450px] h-[450px] bg-black/20 rounded-full border border-white/5 flex items-center justify-center shadow-inner">
        <svg viewBox="-10 -10 20 20" className="w-full h-full">
          {points.map((p, i) => (
            <motion.circle
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.002 }}
              cx={p.x}
              cy={p.y}
              r={p.isAnomaly ? 0.3 : 0.1}
              fill={p.isAnomaly ? "#ff6b6b" : "#4dabf7"}
              className={p.isAnomaly ? "animate-pulse" : ""}
            />
          ))}
          {points[0] && (
            <motion.circle
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: 2, opacity: [0, 0.5, 0] }}
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
    <div className="flex gap-24 items-center">
      <div className="text-center">
        <p className="text-gray-500 mb-8 uppercase tracking-[0.3em] text-xs font-bold">Traditional ML</p>
        <div className="p-12 bg-white/5 rounded-[2rem] border border-white/10 w-80 h-80 flex flex-col items-center justify-center gap-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-400 rounded-full" />
            <div className="w-10 h-10 bg-red-400 rounded-full" />
          </div>
          <p className="text-2xl font-bold">Binary Classification</p>
          <p className="text-gray-500">Needs both labels</p>
        </div>
      </div>
      <motion.div animate={{ x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <ArrowRight size={64} className="text-yellow-400" />
      </motion.div>
      <div className="text-center">
        <p className="text-gray-500 mb-8 uppercase tracking-[0.3em] text-xs font-bold">One-Class SVM</p>
        <div className="p-12 bg-yellow-400/10 rounded-[2rem] border border-yellow-400/20 w-80 h-80 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 bg-blue-400 rounded-full shadow-[0_0_30px_rgba(77,171,247,0.4)]" />
          <p className="text-2xl font-bold">Novelty Detection</p>
          <p className="text-gray-500">Learns only the Norm</p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Scene6DefiningNormal = () => (
  <SlideContainer title="Defining the Norm" subtitle="Drawing the boundary of trust.">
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-80 h-80 border-2 border-yellow-400 rounded-full bg-yellow-400/5 shadow-[0_0_60px_rgba(250,176,5,0.15)]"
      />
      <div className="relative z-10 grid grid-cols-4 gap-6">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="w-6 h-6 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(77,171,247,0.3)]"
          />
        ))}
      </div>
      <motion.div 
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 220, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute flex flex-col items-center gap-3"
      >
        <div className="w-6 h-6 bg-red-400 rounded-full animate-bounce shadow-[0_0_15px_rgba(255,107,107,0.5)]" />
        <p className="text-red-400 font-mono text-lg font-bold">OUTLIER</p>
      </motion.div>
    </div>
  </SlideContainer>
);

const Scene7Flexibility = ({ nu, setNu }: { nu: number, setNu: (v: number) => void }) => (
  <SlideContainer title="The Flexibility Balance" subtitle="Tuning the strictness of the Guardian.">
    <div className="flex gap-24 items-center w-full">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center shrink-0">
        <motion.div 
          animate={{ scale: 0.6 + nu * 2, opacity: 1 }}
          className="absolute w-80 h-80 border-2 border-yellow-400 rounded-full bg-yellow-400/5 shadow-[0_0_40px_rgba(250,176,5,0.1)]"
        />
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-6 h-6 bg-blue-400 rounded-full opacity-60" />)}
        </div>
      </div>
      <div className="flex-1 max-w-xl space-y-12">
        <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-xl">
          <h4 className="text-3xl font-bold mb-8 flex items-center gap-4">
            <RefreshCcw size={32} className="text-yellow-400" />
            Parameter: <Highlight>Nu (ν)</Highlight>
          </h4>
          <input 
            type="range" min="0.01" max="0.5" step="0.01" value={nu} 
            onChange={(e) => setNu(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 mb-8"
          />
          <p className="text-2xl text-gray-400 leading-relaxed min-h-[8rem]">
            {nu < 0.1 ? "Strict: Encloses almost all points. High risk of missing subtle anomalies." : 
             nu > 0.3 ? "Relaxed: Allows more outliers. High risk of false alarms." : 
             "Balanced: A compromise between precision and recall."}
          </p>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Scene8KernelIntuition = () => (
  <SlideContainer title="The Kernel Bridge" subtitle="Seeing patterns in higher dimensions.">
    <div className="max-w-5xl space-y-16">
      <p className="text-3xl text-gray-300 leading-relaxed text-center">
        Sometimes, data is tangled in 2D. We use a <Highlight>Kernel Function</Highlight> to project it into a space where it becomes separable.
      </p>
      <div className="grid grid-cols-2 gap-16">
        {/* Input Space 2D */}
        <div className="p-12 bg-white/5 rounded-[2.5rem] border border-white/10 text-center shadow-xl overflow-hidden">
          <p className="text-xs text-gray-500 mb-8 uppercase tracking-[0.3em] font-bold">Input Space (2D Oxy)</p>
          <div className="relative w-64 h-64 mx-auto border border-gray-800 rounded-lg flex items-center justify-center">
            {/* Axes Animation */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute w-full h-px bg-gray-700 origin-center" 
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute h-full w-px bg-gray-700 origin-center" 
            />
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute top-0 right-2 text-[10px] text-gray-600">y</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-2 right-0 text-[10px] text-gray-600">x</motion.div>
            
            {/* Point Animation: Single point -> Position */}
            <motion.div 
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                x: [0, 0, 40],
                y: [0, 0, -30]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                times: [0, 0.2, 0.5],
                repeatDelay: 1
              }}
              className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(77,171,247,0.6)] z-10"
            />
            
            {/* Projection Lines Animation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.7], repeatDelay: 1 }}
              className="absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(40px, -30px)' }}
            >
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="absolute h-[30px] w-px bg-blue-400/30 border-l border-dashed border-blue-400/50 origin-top" 
                style={{ top: 0 }} 
              />
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="absolute w-[40px] h-px bg-blue-400/30 border-t border-dashed border-blue-400/50 origin-right" 
                style={{ left: -40 }} 
              />
            </motion.div>
          </div>
        </div>

        {/* Feature Space 3D */}
        <div className="p-12 bg-yellow-400/5 rounded-[2.5rem] border border-yellow-400/20 text-center shadow-xl overflow-hidden">
          <p className="text-xs text-gray-500 mb-8 uppercase tracking-[0.3em] font-bold">Feature Space (3D Oxyz)</p>
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center perspective-[1000px]">
            <motion.div 
              className="relative w-full h-full preserve-3d"
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Axes */}
              <div className="absolute w-full h-px bg-yellow-400/20 top-1/2" />
              <div className="absolute h-full w-px bg-yellow-400/20 left-1/2" />
              <div className="absolute w-full h-px bg-yellow-400/20 top-1/2 rotate-x-90" />
              
              {/* Line to Plane Animation */}
              <motion.div 
                initial={{ scaleX: 1, scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: [0, 0, 1, 1],
                  opacity: [0, 0.5, 0.8, 0.8],
                  rotateX: [0, 0, 45, 45]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  times: [0, 0.2, 0.6, 1],
                  repeatDelay: 1
                }}
                className="absolute w-40 h-40 bg-yellow-400/20 border border-yellow-400/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(250,176,5,0.2)]"
              />
              
              {/* Point in 3D: Animating from origin to 3D position */}
              <motion.div 
                initial={{ z: 0, x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  z: [0, 0, 50, 50],
                  opacity: [0, 1, 1, 1],
                  y: [0, 0, -20, -20],
                  x: [0, 0, 20, 20]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  times: [0, 0.3, 0.7, 1],
                  repeatDelay: 1
                }}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(250,176,5,0.8)]"
              />
            </motion.div>
          </div>
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
    <div className="w-full h-full bg-black relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[12, 12, 12]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <gridHelper args={[30, 30, 0x333333, 0x111111]} />
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
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      <div className="absolute top-16 left-16 max-w-xl pointer-events-none">
        <h2 className="text-5xl font-bold mb-4">The RBF Mountain</h2>
        <p className="text-2xl text-gray-400 font-light">
          The <Highlight>Radial Basis Function</Highlight> creates a "mountain" of similarity. 
          Normal points sit at the peak; anomalies fall into the valleys.
        </p>
      </div>
    </div>
  );
};

const Scene10Slicing = () => (
  <SlideContainer title="Slicing the Norm" subtitle="The Hyperplane as a threshold.">
    <div className="max-w-4xl space-y-8">
      <div className="p-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
        <p className="text-2xl text-gray-300 leading-relaxed mb-8">
          In this high-dimensional space, we don't draw a circle. We draw a <Highlight>Flat Plane</Highlight>.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_rgba(250,176,5,0.5)]" />
          <p className="text-yellow-400 font-mono font-bold">DECISION BOUNDARY</p>
          <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_rgba(250,176,5,0.5)]" />
        </div>
      </div>
      <p className="text-xl text-gray-500 text-center italic">"Anything that doesn't reach this height is an anomaly."</p>
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
      <div className="flex gap-10 items-center w-full max-w-7xl h-full pb-10">
        {/* Visualization Area */}
        <div className="relative w-[500px] h-[500px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden shadow-2xl shrink-0">
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
                    opacity={isBoundary ? 0.8 : Math.min(0.3, (val - rho) * 2)}
                    stroke={isBoundary ? "#fab005" : "none"}
                    strokeWidth={isBoundary ? "0.08" : "0"}
                  />
                );
              })}
            </g>
            
            {/* Boundary Glow/Border */}
            <g>
              {grid.map((p, i) => {
                const val = decisionGrid[i];
                // Process cells exactly at the threshold
                if (Math.abs(val - rho) > 0.04) return null;
                
                return (
                  <circle
                    key={`b-${i}`}
                    cx={p.gx}
                    cy={p.gy}
                    r={0.15}
                    fill="#fab005"
                    className="animate-pulse"
                    style={{ filter: 'blur(0.1px)' }}
                  />
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

          {/* Stats Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 font-mono text-[10px] space-y-1">
            <div className="flex justify-between gap-6">
              <span className="text-gray-500 uppercase">Total Points</span>
              <span>{normalPoints.length + anomalyPoints.length}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-red-400 uppercase">Outliers</span>
              <span className="text-red-400 font-bold">{outlierCount}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-yellow-400 uppercase">Threshold (ρ)</span>
              <span>{rho.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Controls & Math Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">The Decision Equation</h4>
            <div className="math-font text-2xl text-center py-2">
              f(x) = sgn( 
              <EquationPart active={hoveredParam === 'gamma'} label="Kernel Width">
                Σ αᵢ K<sub className="text-xs">γ</sub>(x, xᵢ)
              </EquationPart>
              - 
              <EquationPart active={hoveredParam === 'nu'} label="Threshold">
                ρ
              </EquationPart>
              )
            </div>
            <div className="mt-4 text-xs text-gray-400 leading-relaxed min-h-[3rem]">
              {hoveredParam === 'nu' ? (
                <p>The parameter <Highlight>ν (Nu)</Highlight> directly determines the value of <Highlight>ρ (Rho)</Highlight>. It sets the "height" of the slice through our similarity mountain.</p>
              ) : hoveredParam === 'gamma' ? (
                <p>The parameter <Highlight color="blue">γ (Gamma)</Highlight> defines the shape of the kernel <Highlight color="blue">K</Highlight>. High gamma makes the mountain peaks sharper and more isolated.</p>
              ) : (
                <p>Hover over the parameters below to see how they influence the mathematical model and the visualization.</p>
              )}
            </div>
          </div>

          <div className="space-y-8 px-2">
            <div 
              className="space-y-3"
              onMouseEnter={() => setHoveredParam('nu')}
              onMouseLeave={() => setHoveredParam(null)}
            >
              <div className="flex justify-between items-end">
                <label className="block text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Strictness (ν)</label>
                <span className="text-xl font-mono">{nu.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.01" max="0.5" step="0.01" value={nu} 
                onChange={e => setNu(parseFloat(e.target.value))} 
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400" 
              />
            </div>

            <div 
              className="space-y-3"
              onMouseEnter={() => setHoveredParam('gamma')}
              onMouseLeave={() => setHoveredParam(null)}
            >
              <div className="flex justify-between items-end">
                <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest">Flexibility (γ)</label>
                <span className="text-xl font-mono">{gamma.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.05" max="1.5" step="0.05" value={gamma} 
                onChange={e => setGamma(parseFloat(e.target.value))} 
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-400" 
              />
            </div>
          </div>

          <div className="p-5 bg-blue-400/5 rounded-2xl border border-blue-400/10 flex items-start gap-4">
            <Activity className="text-blue-400 shrink-0 mt-1" size={16} />
            <p className="text-xs text-gray-400 italic leading-relaxed">
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

      <div className="flex-1 relative">
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
