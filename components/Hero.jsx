"use client";
import { useEffect, useRef, useState } from "react";

const LINES = [
  "Full-stack developer from Lahore / Islamabad with 5+ years of experience. I build with React, Next.js, Node.js and Laravel.",
  "I ship on AWS with Docker, Git CI/CD, OIDC and SSM, and add AI with Claude Code and n8n automations.",
];

export default function Hero() {
  const [phase, setPhase] = useState("idle"); // idle | walking | typing
  const [arrived, setArrived] = useState(false);
  const [reset, setReset] = useState(false);
  const [text, setText] = useState("");
  const timers = useRef([]);
  const run = useRef(0);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  function typeLines(id) {
    let li = 0, ci = 0;
    const tick = () => {
      if (id !== run.current) return;
      const s = LINES[li];
      if (ci < s.length) {
        ci += 1;
        setText((li ? LINES[0] + " " : "") + s.slice(0, ci));
        later(tick, 32);
      } else if (li < LINES.length - 1) {
        li += 1; ci = 0; later(tick, 500);
      }
    };
    tick();
  }

  function play() {
    clearAll();
    run.current += 1;
    const id = run.current;
    setText(""); setPhase("idle"); setArrived(false); setReset(true);
    later(() => {
      if (id !== run.current) return;
      setReset(false); setArrived(true); setPhase("walking");
    }, 60);
    later(() => {
      if (id !== run.current) return;
      setPhase("typing"); typeLines(id);
    }, 4800);
  }

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setArrived(true); setPhase("typing"); setText(LINES.join(" "));
    } else {
      later(play, 300);
    }
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typing = phase === "typing";

  return (
    <header className="hero" id="top">
      <div className="blob b1" /><div className="blob b2" />
      <div className="hero-top">
        <div>
          <div className="eyebrow hello">Lahore / Islamabad · 5+ years</div>
          <h1>Hi, I&apos;m <span>Zeeshan Ahmad</span></h1>
          <div className="role">Full-stack developer · React · Next.js · Node.js · Laravel · AWS</div>
          <div className="cta">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
        </div>
        <div className="bio-card">
          <div className="bar"><i /><i /><i /></div>
          <p><span>{text}</span><span className="caret" /></p>
        </div>
      </div>

      <div className={`stage ${typing ? "typing" : ""}`} title="Click the developer to replay">
        <div className="ground" /><div className="dots" />
        <div className="desk">
          <div className="coffee" />
          <div className="laptop">
            <div className="screen">
              <div className="codeline cl1" /><div className="codeline cl2" /><div className="codeline cl3" />
              <div className="codeline cl4" /><div className="codeline cl5" />
            </div>
            <div className="base" />
          </div>
          <div className="top" /><div className="leg l1" /><div className="leg l2" />
        </div>

        <div
          className={`avatar ${arrived ? "arrived" : ""} ${reset ? "reset" : ""} ${phase === "walking" ? "walking" : ""} ${typing ? "typing" : ""}`}
          role="img"
          aria-label="Animated cartoon of Zeeshan walking to a desk and typing"
          onClick={play}
        >
          <div className="shadow" />
          <svg viewBox="0 0 120 220">
            <g className="limb legL"><rect x="44" y="132" width="16" height="64" rx="7" fill="#2b2a4a" /><rect x="40" y="190" width="24" height="12" rx="6" fill="#ff7a59" /></g>
            <g className="limb legR"><rect x="62" y="132" width="16" height="64" rx="7" fill="#35345a" /><rect x="58" y="190" width="24" height="12" rx="6" fill="#ff7a59" /></g>
            <g className="body-g">
              <g className="limb armL"><rect x="28" y="72" width="13" height="52" rx="6.5" fill="#6f5fe6" /><circle cx="34.5" cy="126" r="7" fill="#e8b48f" /></g>
              <rect x="36" y="66" width="48" height="72" rx="16" fill="#8b7bff" />
              <rect x="52" y="80" width="16" height="22" rx="4" fill="#6f5fe6" />
              <g className="limb armR"><rect x="79" y="72" width="13" height="52" rx="6.5" fill="#7a6af0" /><circle cx="85.5" cy="126" r="7" fill="#e8b48f" /></g>
              <rect x="53" y="52" width="14" height="16" rx="5" fill="#d9a07c" />
              <circle cx="60" cy="38" r="25" fill="#e8b48f" />
              <path d="M34 36c-2-24 18-31 30-29 17 2 27 14 22 31-4-10-12-14-24-14-12 0-22 4-28 12z" fill="#2a1b2e" />
              <g className="blink"><circle cx="50" cy="41" r="3" fill="#2a1b2e" /><circle cx="70" cy="41" r="3" fill="#2a1b2e" /></g>
              <g fill="none" stroke="#2a1b2e" strokeWidth="2.2"><circle cx="50" cy="41" r="8.5" /><circle cx="70" cy="41" r="8.5" /><path d="M58.5 41h3" /></g>
              <path d="M52 53q8 7 16 0" fill="none" stroke="#2a1b2e" strokeWidth="2.4" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </header>
  );
}
