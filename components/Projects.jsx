"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";

export default function Projects() {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const hover = useRef(false);

  const step = () => {
    const t = trackRef.current;
    return t && t.children[0] ? t.children[0].getBoundingClientRect().width + 20 : 360;
  };
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function go(i) {
    const n = projects.length;
    const next = (i + n) % n;
    idxRef.current = next;
    setIdx(next);
    trackRef.current?.scrollTo({ left: next * step(), behavior: reduced() ? "auto" : "smooth" });
  }

  function onScroll() {
    const i = Math.max(0, Math.min(projects.length - 1, Math.round(trackRef.current.scrollLeft / step())));
    if (i !== idxRef.current) { idxRef.current = i; setIdx(i); }
  }

  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => { if (!hover.current) go(idxRef.current + 1); }, 4200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="projects">
      <div className="slider-bar">
        <div className="sec-head">
          <div className="eyebrow">Selected work</div>
          <h2>Projects I&apos;ve built and shipped</h2>
        </div>
        <div className="arrows">
          <button className="arrow" aria-label="Previous project" onClick={() => go(idxRef.current - 1)}>&larr;</button>
          <button className="arrow" aria-label="Next project" onClick={() => go(idxRef.current + 1)}>&rarr;</button>
        </div>
      </div>
      <div
        className="track"
        ref={trackRef}
        tabIndex={0}
        aria-label="Project slider"
        onScroll={onScroll}
        onMouseEnter={() => (hover.current = true)}
        onMouseLeave={() => (hover.current = false)}
        onTouchStart={() => (hover.current = true)}
      >
        {projects.map((p) => (
          <article className="card" key={p.name}>
            <div className="thumb" style={{ background: `linear-gradient(135deg,${p.colors[0]},${p.colors[1]})` }}>
              <span>{p.name}</span>
            </div>
            <div className="body">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="chips">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              <a className="go" href={p.url} target="_blank" rel="noopener noreferrer">
                {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="pager">
        {projects.map((p, i) => <i key={p.name} className={i === idx ? "on" : ""} />)}
      </div>
    </section>
  );
}
