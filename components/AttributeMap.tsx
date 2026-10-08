"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MapNode = {
  id: string;
  label: string;
  detail: string;
  ring: 1 | 2 | 3;
  slot: number;
  count: number;
  group: string;
};

const NODES: MapNode[] = [
  { id: "cb", label: "Cell biology", detail: "Cellular and molecular mechanisms as the home ground of the work.", ring: 1, slot: 0, count: 4, group: "Discipline" },
  { id: "ag", label: "Aging", detail: "How time is written into cells — senescence, decline, and the chance of repair.", ring: 1, slot: 1, count: 4, group: "Discipline" },
  { id: "mb", label: "Mechanobiology", detail: "Force, stiffness, and traction as signals that steer fate and function.", ring: 1, slot: 2, count: 4, group: "Discipline" },
  { id: "nd", label: "Neurodegeneration", detail: "When mechanical and chemical history become lasting injury in the brain.", ring: 1, slot: 3, count: 4, group: "Discipline" },
  { id: "sen", label: "Senescence", detail: "Aging and cellular senescence, and age-related cognitive decline.", ring: 2, slot: 0, count: 5, group: "Inquiry" },
  { id: "mech", label: "Force & fate", detail: "How substrate stiffness and force regulate stem cells and hippocampal tissue.", ring: 2, slot: 1, count: 5, group: "Inquiry" },
  { id: "tn", label: "Translation", detail: "Biomarkers and interventions that restore synaptic, metabolic, and nuclear integrity.", ring: 2, slot: 2, count: 5, group: "Inquiry" },
  { id: "rej", label: "Rejuvenation", detail: "Ultrasound, nuclear YAP1, and methods to restore senescent cells and tissues.", ring: 2, slot: 3, count: 5, group: "Inquiry" },
  { id: "hist", label: "Biology of history", detail: "Mechanical memory: how cells remember past events as a history in living material.", ring: 2, slot: 4, count: 5, group: "Inquiry" },
  { id: "p1", label: "Seek clarity", detail: "Ask better questions. Focus on what matters.", ring: 3, slot: 0, count: 8, group: "Compass" },
  { id: "p2", label: "Stay honest", detail: "Honest self-reflection is the foundation of growth.", ring: 3, slot: 1, count: 8, group: "Compass" },
  { id: "p3", label: "Give it time", detail: "Meaningful work and lasting understanding take patience.", ring: 3, slot: 2, count: 8, group: "Compass" },
  { id: "beh", label: "Behaviour", detail: "Human and social behaviour, and the psychology of how people adapt and relate.", ring: 3, slot: 3, count: 8, group: "Person" },
  { id: "wrt", label: "Writing", detail: "Writing as a method to test ideas and make complex work legible.", ring: 3, slot: 4, count: 8, group: "Person" },
  { id: "agt", label: "Agentic engineering", detail: "Currently learning: AI-native building, agent workflows, debugging, and MVPs.", ring: 3, slot: 5, count: 8, group: "Learning" },
  { id: "blg", label: "Notebook", detail: "A personal blog for thoughts on biology, health, aging, longevity, and behaviour.", ring: 3, slot: 6, count: 8, group: "Voice" },
  { id: "rec", label: "The record", detail: "Papers, patents, chapters, 195 citations — the public trail of the work.", ring: 3, slot: 7, count: 8, group: "Record" },
];

const SPEEDS = { 1: 8.5, 2: -5.5, 3: 3.2 };
const RADII = { 1: 118, 2: 188, 3: 268 };
const CX = 360;
const CY = 360;

export function AttributeMap() {
  const [t, setT] = useState(0);
  const [active, setActive] = useState("hist");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    query.addEventListener("change", sync);
    const raf = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(raf);
      query.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = visible && !hovered && !focused && !reduced;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setT((v) => v + dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const positions = useMemo(() => {
    return NODES.map((node) => {
      const base = (node.slot / node.count) * Math.PI * 2 - Math.PI / 2;
      const angle = base + (t * SPEEDS[node.ring] * Math.PI) / 180;
      const r = RADII[node.ring];
      return {
        ...node,
        x: CX + Math.cos(angle) * r,
        y: CY + Math.sin(angle) * r,
      };
    });
  }, [t]);

  const current = positions.find((n) => n.id === active) ?? positions[0];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div ref={frame} className="lg:col-span-8">
        <svg
          viewBox="0 0 720 720"
          className="mx-auto w-full max-w-[720px]"
          role="group"
          aria-label="Dynamic map of research, principles, and practice"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <defs>
            <radialGradient id="nucleus" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e4c48a" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#c9a56a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#070708" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx={CX} cy={CY} r="310" fill="url(#nucleus)" />
          {[RADII[1], RADII[2], RADII[3]].map((r) => (
            <circle
              key={r}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="rgba(201,165,106,0.22)"
              strokeWidth="0.8"
              strokeDasharray="3 7"
            />
          ))}

          {positions.map((n) => (
            <line
              key={`l-${n.id}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke={n.id === active ? "rgba(201,165,106,0.55)" : "rgba(232,224,208,0.06)"}
              strokeWidth={n.id === active ? 1.2 : 0.6}
            />
          ))}

          <g filter="url(#glow)">
            <circle cx={CX} cy={CY} r="46" fill="#101114" stroke="#c9a56a" strokeWidth="1.2" />
            <circle
              cx={CX}
              cy={CY}
              r="22"
              fill="#c9a56a"
              opacity={0.35 + 0.15 * Math.sin(t * 2)}
            />
          </g>
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            fill="#efe8dc"
            fontSize="13"
            letterSpacing="4"
            fontFamily="ui-sans-serif, system-ui"
          >
            SKK
          </text>
          <text
            x={CX}
            y={CY + 14}
            textAnchor="middle"
            fill="#c9a56a"
            fontSize="8"
            letterSpacing="2.4"
            fontFamily="ui-sans-serif, system-ui"
          >
            MEMORY
          </text>

          {positions.map((n) => {
            const on = n.id === active;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={on ? 8.5 : 5.5}
                  fill={on ? "#c9a56a" : "#070708"}
                  stroke={on ? "#e4c48a" : "rgba(201,165,106,0.7)"}
                  strokeWidth={on ? 2 : 1}
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(n.id)}
                  onClick={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(n.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={on}
                  aria-label={`${n.group}: ${n.label}`}
                />
                <text
                  x={n.x}
                  y={n.y + (n.y > CY ? 22 : -14)}
                  textAnchor="middle"
                  fill={on ? "#efe8dc" : "#b7b0a3"}
                  fontSize={on ? 12 : 10}
                  fontFamily="ui-sans-serif, system-ui"
                  className="pointer-events-none"
                  style={{ fontWeight: on ? 500 : 400 }}
                  aria-hidden
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="lg:col-span-4" aria-live="polite">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
          {current.group}
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight">
          {current.label}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--ivory-dim)]">
          {current.detail}
        </p>
        <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
          Hover or tab to a node · motion pauses on contact
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Discipline", "Inquiry", "Compass", "Person", "Learning", "Voice", "Record"].map(
            (g) => (
              <span
                key={g}
                className={`border px-2 py-1 text-[10px] uppercase tracking-[0.16em] ${
                  current.group === g
                    ? "border-[var(--gold)] text-[var(--gold)]"
                    : "border-[var(--line)] text-[var(--mute)]"
                }`}
              >
                {g}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
