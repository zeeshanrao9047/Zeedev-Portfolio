"use client";
import { useEffect, useRef, useState } from "react";

function Stat({ n, plus, label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(n);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const f = (t) => {
        const k = Math.min(1, (t - t0) / 1100);
        setVal(Math.round(n * k));
        if (k < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  return (
    <div className="stat" ref={ref}>
      <b>{val}{plus && val === n ? "+" : ""}</b>
      <span>{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      <Stat n={5} plus label="years building software" />
      <Stat n={9} label="projects shipped" />
      <Stat n={3} label="regions served: Gulf, Asia, global" />
      <Stat n={10} plus label="technologies in daily use" />
    </div>
  );
}
