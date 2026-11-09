import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { skills, experience, contact } from "@/lib/data";

export default function Home() {
  return (
    <div className="wrap">
      <nav>
        <a className="logo" href="#top">zeeshan<b>.dev</b></a>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <Hero />

      <section id="about">
        <div className="about">
          <div>
            <div className="sec-head">
              <div className="eyebrow">About me</div>
              <h2>I build web products and ship them to production.</h2>
            </div>
            <p>I&apos;m a <strong>full-stack developer with 5+ years of experience</strong>. I turn client requirements into working software, from React and Next.js front ends to Node.js, Express and Laravel back ends.</p>
            <p>I deploy on <strong>AWS</strong> with EC2, IAM roles and Systems Manager, package apps with <strong>Docker</strong>, and automate delivery with <strong>Git CI/CD</strong> and OIDC. Data lives in PostgreSQL and MySQL.</p>
            <p>I also bring <strong>AI into real workflows</strong> with Claude Code and LLM APIs, and connect services with n8n and AWS Lambda so repetitive work runs by itself.</p>
          </div>
          <Stats />
        </div>

        <div className="skills">
          {skills.map((s) => (
            <div className="skill" key={s.title}>
              <h3>{s.title}</h3>
              <div className="chips">{s.items.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <div className="sec-head">
          <div className="eyebrow">Experience</div>
          <h2>5+ years, from first deploy to automated pipelines.</h2>
        </div>
        <div className="exp">
          {experience.map((e) => (
            <div className="exp-item" key={e.title}><h3>{e.title}</h3><p>{e.text}</p></div>
          ))}
        </div>
      </section>

      <Projects />
      <Contact />
      <footer>© {new Date().getFullYear()} Zeeshan Ahmad · {contact.location}</footer>
    </div>
  );
}
