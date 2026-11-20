"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { logoSrc } from "@/lib/constants/brand";
import { markIntroDone, resetIntro } from "@/lib/introGate";
import { prefersReducedMotion } from "@/lib/motion";

/* ---------------------------------------------------------------
   Configuración
   --------------------------------------------------------------- */
const PARTICLE_COUNT = 32000;
/** Lado del isotipo en unidades del mundo (el canvas mide ~3.15u de alto) */
const LOGO_SIZE = 2.6;
/** Resolución del muestreo del SVG */
const SAMPLE_SIZE = 480;
const DEPTH = 0.06;

/* Interacción con el cursor: vuelven rápido (~0.65s) con un rebote leve (~8%) */
const HOVER_RADIUS = 0.45;
const HOVER_FORCE = 0.015;
const SPRING = 0.018;
const DAMPING = 0.85;

const IDLE_AMPLITUDE = 0.007;
const IDLE_SPEED = 0.9;

const POINT_SIZE = 0.018;
const FALLBACK_COLOR = "#a89f88";

/* Intro: parten dispersas y viajan a su lugar con easing (sin física) */
const INTRO_DURATION = 2.1;
const INTRO_MAX_DELAY = 0.6;
/** Duración total de la intro (2.7s) */
const INTRO_TOTAL = INTRO_DURATION + INTRO_MAX_DELAY;
/** El header y el hero arrancan este tiempo antes de que termine la intro */
const INTRO_SIGNAL_LEAD = 0.25;
const INTRO_SCATTER = 1.35;
const INTRO_SCATTER_DEPTH = 1.2;
const INTRO_FADE = 1.2;

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

type Pointer = { x: number; y: number; active: boolean };

type ParticleData = {
  positions: Float32Array;
  origins: Float32Array;
  starts: Float32Array;
  delays: Float32Array;
  phases: Float32Array;
};

/* ---------------------------------------------------------------
   Muestreo: dibuja el SVG oficial en un canvas y toma puntos
   sólo donde hay trazo → las partículas replican el logo exacto.
   --------------------------------------------------------------- */
async function sampleIsotype(count: number, animated: boolean): Promise<ParticleData> {
  const img = new Image();
  img.src = logoSrc("isotipo", "color");
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SAMPLE_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D no disponible");
  ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

  const filled: number[] = [];
  for (let i = 0; i < SAMPLE_SIZE * SAMPLE_SIZE; i++) {
    if (data[i * 4 + 3] > 128) filled.push(i);
  }

  const positions = new Float32Array(count * 3);
  const origins = new Float32Array(count * 3);
  const starts = new Float32Array(count * 3);
  const delays = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const pixel = filled[Math.floor(Math.random() * filled.length)];
    const px = (pixel % SAMPLE_SIZE) + Math.random();
    const py = Math.floor(pixel / SAMPLE_SIZE) + Math.random();
    const ix = i * 3;

    origins[ix] = (px / SAMPLE_SIZE - 0.5) * LOGO_SIZE;
    origins[ix + 1] = -(py / SAMPLE_SIZE - 0.5) * LOGO_SIZE;
    origins[ix + 2] = (Math.random() - 0.5) * DEPTH;

    // Punto de partida "desordenado": nube amplia alrededor del centro
    const angle = Math.random() * Math.PI * 2;
    const radius = INTRO_SCATTER * Math.sqrt(Math.random());
    starts[ix] = Math.cos(angle) * radius;
    starts[ix + 1] = Math.sin(angle) * radius;
    starts[ix + 2] = (Math.random() - 0.5) * INTRO_SCATTER_DEPTH;

    const from = animated ? starts : origins;
    positions[ix] = from[ix];
    positions[ix + 1] = from[ix + 1];
    positions[ix + 2] = from[ix + 2];

    delays[i] = Math.random() * INTRO_MAX_DELAY;
    phases[i] = Math.random() * Math.PI * 2;
  }

  return { positions, origins, starts, delays, phases };
}

/* ---------------------------------------------------------------
   Partículas: intro con easing → luego física (resorte, cursor, fricción)
   --------------------------------------------------------------- */
type ParticlesProps = {
  data: ParticleData;
  pointer: RefObject<Pointer>;
  color: string;
  animated: boolean;
  onIntroEnd: () => void;
};

function Particles({ data, pointer, color, animated, onIntroEnd }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { origins, starts, delays, phases } = data;
  const count = phases.length;
  // Estado por frame: vive en refs, no en props
  const velocitiesRef = useRef<Float32Array | null>(null);
  const introDoneRef = useRef(!animated);
  const introStartRef = useRef<number | null>(null);
  const introSignaledRef = useRef(!animated);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const pos = attr.array as Float32Array;

    // ---- Intro: del desorden al isotipo ----
    if (!introDoneRef.current) {
      introStartRef.current ??= state.clock.elapsedTime;
      const elapsed = state.clock.elapsedTime - introStartRef.current;
      let done = true;

      for (let i = 0; i < count; i++) {
        const progress = Math.min(Math.max((elapsed - delays[i]) / INTRO_DURATION, 0), 1);
        if (progress < 1) done = false;
        const e = easeInOutCubic(progress);
        const ix = i * 3;
        pos[ix] = starts[ix] + (origins[ix] - starts[ix]) * e;
        pos[ix + 1] = starts[ix + 1] + (origins[ix + 1] - starts[ix + 1]) * e;
        pos[ix + 2] = starts[ix + 2] + (origins[ix + 2] - starts[ix + 2]) * e;
      }

      if (materialRef.current) {
        materialRef.current.opacity = Math.min(elapsed / INTRO_FADE, 1);
      }
      attr.needsUpdate = true;

      // Aviso anticipado: el resto de la intro se superpone con el final
      if (!introSignaledRef.current && elapsed >= INTRO_TOTAL - INTRO_SIGNAL_LEAD) {
        introSignaledRef.current = true;
        onIntroEnd();
      }
      if (done) {
        introDoneRef.current = true;
        if (!introSignaledRef.current) {
          introSignaledRef.current = true;
          onIntroEnd();
        }
      }
      return;
    }

    // ---- Física ----
    velocitiesRef.current ??= new Float32Array(count * 3);
    const velocities = velocitiesRef.current;
    const t = state.clock.elapsedTime * IDLE_SPEED;
    // Normaliza a 60fps para que la física sea igual en pantallas de 120Hz
    const step = Math.min(delta * 60, 2);

    const { x: nx, y: ny, active } = pointer.current;
    const wx = (nx * state.viewport.width) / 2;
    const wy = (ny * state.viewport.height) / 2;
    const r2 = HOVER_RADIUS * HOVER_RADIUS;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      let tx = origins[ix];
      let ty = origins[iy];
      if (animated) {
        const ph = phases[i];
        tx += Math.sin(t + ph) * IDLE_AMPLITUDE;
        ty += Math.cos(t * 0.8 + ph) * IDLE_AMPLITUDE;
      }

      let ax = (tx - pos[ix]) * SPRING;
      let ay = (ty - pos[iy]) * SPRING;
      const az = (origins[iz] - pos[iz]) * SPRING;

      if (active) {
        const dx = pos[ix] - wx;
        const dy = pos[iy] - wy;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2 && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          const force = (1 - d / HOVER_RADIUS) * HOVER_FORCE;
          ax += (dx / d) * force;
          ay += (dy / d) * force;
        }
      }

      velocities[ix] = (velocities[ix] + ax * step) * DAMPING;
      velocities[iy] = (velocities[iy] + ay * step) * DAMPING;
      velocities[iz] = (velocities[iz] + az * step) * DAMPING;

      pos[ix] += velocities[ix] * step;
      pos[iy] += velocities[iy] * step;
      pos[iz] += velocities[iz] * step;
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={color}
        size={POINT_SIZE}
        sizeAttenuation
        transparent
        opacity={animated ? 0 : 1}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------------------------------------------------------
   Componente público
   --------------------------------------------------------------- */
type ParticleIsotypeProps = {
  className?: string;
};

export function ParticleIsotype({ className = "" }: ParticleIsotypeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });
  const [data, setData] = useState<ParticleData | null>(null);
  const [inView, setInView] = useState(true);
  const animated = useMemo(() => !prefersReducedMotion(), []);
  const color = useMemo(() => {
    if (typeof window === "undefined") return FALLBACK_COLOR;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--brand-taupe")
      .trim();
    return value || FALLBACK_COLOR;
  }, []);

  // Al salir del home la señal se rearma para la próxima visita
  useEffect(() => resetIntro, []);

  // Muestreo del SVG
  useEffect(() => {
    let cancelled = false;
    sampleIsotype(PARTICLE_COUNT, animated)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        if (!animated) markIntroDone();
      })
      .catch(() => {
        // Sin isotipo no bloqueamos el resto de la intro
        markIntroDone();
      });
    return () => {
      cancelled = true;
    };
  }, [animated]);

  // Cursor relativo al contenedor (coordenadas normalizadas -1..1)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointercancel", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  // Pausa el render fuera de pantalla. Si la página carga con el hero
  // fuera de vista, la intro no se reproduce: liberamos al resto.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting) markIntroDone();
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} aria-hidden="true" className={className}>
      {data ? (
        <Canvas
          frameloop={inView ? "always" : "never"}
          camera={{ position: [0, 0, 5], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="size-full!"
        >
          <Particles
            data={data}
            pointer={pointer}
            color={color}
            animated={animated}
            onIntroEnd={markIntroDone}
          />
        </Canvas>
      ) : null}
    </div>
  );
}

export default ParticleIsotype;
