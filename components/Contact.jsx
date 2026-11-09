"use client";
import { useState } from "react";
import { contact } from "@/lib/data";

function CopyRow({ value }) {
  const [label, setLabel] = useState("Copy");
  async function copy() {
    try { await navigator.clipboard.writeText(value); setLabel("Copied"); }
    catch { setLabel("Select text"); }
    setTimeout(() => setLabel("Copy"), 1800);
  }
  return (
    <div><code>{value}</code><button onClick={copy}>{label}</button></div>
  );
}

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact">
        <div>
          <div className="eyebrow">Contact</div>
          <h2>Have a project in mind?</h2>
          <p>I&apos;m open to full-stack, cloud and AI automation work. Reach out and I&apos;ll reply.</p>
        </div>
        <div className="reach">
          <CopyRow value={contact.email} />
          <CopyRow value={contact.phone} />
          <div>
            <code>linkedin.com/in/rao-zeeshan-ahmad-8286521a0</code>
            <a className="mini" href={contact.linkedin} target="_blank" rel="noopener noreferrer">Open</a>
          </div>
        </div>
      </div>
    </section>
  );
}
