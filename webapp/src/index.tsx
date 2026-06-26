import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './' }))

// Main portfolio page
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Muhammad Saim Ayan | ML Engineer Portfolio</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-primary: #02050a;
      --bg-secondary: #060b12;
      --bg-card: #07111b;
      --bg-card-hover: #0c1724;
      --accent-blue: #22d3ee;
      --accent-cyan: #34d399;
      --accent-purple: #7c3aed;
      --accent-green: #4ade80;
      --accent-orange: #f59e0b;
      --text-primary: #f3f7f2;
      --text-secondary: #8fb3a4;
      --text-muted: #5c6b68;
      --border: #142132;
      --border-glow: rgba(74, 222, 128, 0.2);
      --gradient-1: linear-gradient(135deg, #4ade80, #22d3ee);
      --gradient-2: linear-gradient(135deg, #22d3ee, #0f766e);
      --gradient-3: linear-gradient(135deg, #4ade80, #10b981);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Fira Code', monospace;
      background: var(--bg-primary);
      color: var(--text-primary);
      overflow-x: hidden;
    }

    /* Terminal-inspired background */
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background:
        linear-gradient(rgba(74, 222, 128, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 211, 238, 0.035) 1px, transparent 1px);
      background-size: 34px 34px;
      opacity: 0.4;
      pointer-events: none;
      z-index: 0;
    }
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: repeating-linear-gradient(
        180deg,
        rgba(255,255,255,0.018) 0,
        rgba(255,255,255,0.018) 1px,
        transparent 1px,
        transparent 4px
      );
      opacity: 0.12;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-primary); }
    ::-webkit-scrollbar-thumb { background: var(--accent-blue); border-radius: 3px; }

    /* ── NAVBAR ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 1000;
      backdrop-filter: blur(20px);
      background: rgba(2,5,10,0.92);
      border-bottom: 1px solid rgba(74, 222, 128, 0.16);
      padding: 0 2rem;
      height: 65px;
      display: flex; align-items: center; justify-content: space-between;
      transition: all 0.3s ease;
    }
    nav.scrolled { box-shadow: 0 4px 30px rgba(59,130,246,0.1); }

    .nav-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none;
    }
    .nav-logo-icon {
      width: 38px; height: 38px;
      background: var(--gradient-1);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 800; color: white;
      box-shadow: 0 0 20px rgba(74, 222, 128, 0.24);
    }
    .nav-logo-text {
      font-size: 1rem; font-weight: 700; color: var(--text-primary);
    }
    .nav-logo-text span { color: var(--accent-blue); }

    .nav-links {
      display: flex; align-items: center; gap: 2rem;
      list-style: none;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-secondary);
      font-size: 0.875rem; font-weight: 500;
      transition: color 0.2s;
      position: relative;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: -4px; left: 0;
      width: 0; height: 2px;
      background: var(--gradient-1);
      border-radius: 1px;
      transition: width 0.3s;
    }
    .nav-links a:hover { color: var(--text-primary); }
    .nav-links a:hover::after { width: 100%; }

    .nav-cta {
      background: var(--gradient-1);
      color: white !important;
      padding: 8px 20px;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(74, 222, 128, 0.18);
      transition: all 0.3s !important;
    }
    .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.5) !important; }
    .nav-cta::after { display: none !important; }

    .nav-hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; }
    .nav-hamburger span { width: 24px; height: 2px; background: var(--text-primary); border-radius: 2px; transition: 0.3s; }

    /* ── HERO ── */
    #hero {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 6rem 2rem 4rem;
      position: relative; overflow: hidden;
    }

    .hero-bg-grid {
      position: absolute; inset: 0;
      background-image: 
        linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px);
      background-size: 50px 50px;
      mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
    }

    .hero-content {
      max-width: 900px; width: 100%;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 4rem; align-items: center;
      position: relative; z-index: 1;
    }

    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.3);
      padding: 6px 14px; border-radius: 100px;
      font-size: 0.8rem; font-weight: 500; color: var(--accent-blue);
      margin-bottom: 1.5rem;
      animation: fadeInUp 0.6s ease both;
    }
    .hero-badge .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent-green);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    .hero-name {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 900; line-height: 1.1;
      margin-bottom: 0.5rem;
      animation: fadeInUp 0.6s 0.1s ease both;
    }
    .hero-name .highlight {
      background: var(--gradient-1);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-title {
      font-size: 1.2rem; font-weight: 600;
      color: var(--accent-cyan);
      font-family: 'Fira Code', monospace;
      margin-bottom: 1.2rem;
      animation: fadeInUp 0.6s 0.2s ease both;
    }
    .hero-title .cursor {
      display: inline-block; width: 2px; height: 1.1em;
      background: var(--accent-cyan);
      animation: blink 1s infinite; vertical-align: middle;
      margin-left: 2px;
    }
    @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }

    .hero-desc {
      color: var(--text-secondary);
      font-size: 1rem; line-height: 1.7;
      margin-bottom: 1rem;
      animation: fadeInUp 0.6s 0.3s ease both;
    }

    .hero-highlights {
      display: flex; flex-wrap: wrap; gap: 0.75rem;
      margin-bottom: 1.2rem;
      animation: fadeInUp 0.6s 0.35s ease both;
    }
    .hero-pill {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.6rem 0.95rem; border-radius: 999px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      color: var(--text-secondary);
      font-size: 0.84rem; font-weight: 600;
    }
    .hero-pill i { color: var(--accent-cyan); }

    .terminal-console {
      margin: 1rem 0 1.2rem;
      border: 1px solid rgba(74, 222, 128, 0.16);
      border-radius: 14px;
      background: rgba(2, 5, 10, 0.9);
      overflow: hidden;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
      animation: fadeInUp 0.6s 0.45s ease both;
    }
    .terminal-header {
      display: flex; align-items: center; gap: 0.45rem;
      padding: 0.7rem 0.9rem;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(74, 222, 128, 0.12);
    }
    .terminal-dot {
      width: 0.7rem; height: 0.7rem; border-radius: 50%;
      display: inline-block;
    }
    .terminal-dot.red { background: #ff5f56; }
    .terminal-dot.yellow { background: #ffbd2e; }
    .terminal-dot.green { background: #27c93f; }
    .terminal-body { padding: 0.9rem 1rem; }
    .terminal-line {
      color: var(--text-secondary);
      font-size: 0.84rem; line-height: 1.6;
      margin-bottom: 0.25rem;
      font-family: 'Fira Code', monospace;
    }
    .terminal-line .prompt { color: var(--accent-cyan); margin-right: 0.4rem; }

    .hero-metrics {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.9rem; margin-top: 1rem;
      animation: fadeInUp 0.6s 0.4s ease both;
    }
    .metric-card {
      background: rgba(17,24,39,0.7);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px; padding: 0.9rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.18);
    }
    .metric-card strong {
      display: block; font-size: 1.15rem; color: var(--text-primary);
      margin-bottom: 0.2rem;
    }
    .metric-card span {
      color: var(--text-muted); font-size: 0.77rem;
      line-height: 1.4;
    }

    .hero-btns {
      display: flex; gap: 1rem; flex-wrap: wrap;
      animation: fadeInUp 0.6s 0.45s ease both;
      margin-top: 1.4rem;
    }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--gradient-1);
      color: white; text-decoration: none;
      padding: 12px 24px; border-radius: 10px;
      font-weight: 600; font-size: 0.9rem;
      box-shadow: 0 4px 20px rgba(74, 222, 128, 0.16);
      transition: all 0.3s;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(34, 211, 238, 0.28); }

    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent;
      color: var(--text-primary); text-decoration: none;
      padding: 12px 24px; border-radius: 10px;
      font-weight: 600; font-size: 0.9rem;
      border: 1px solid var(--border);
      transition: all 0.3s;
    }
    .btn-secondary:hover { border-color: var(--accent-blue); color: var(--accent-blue); transform: translateY(-2px); }

    .hero-social {
      display: flex; gap: 1rem; margin-top: 1.5rem;
      animation: fadeInUp 0.6s 0.5s ease both;
    }
    .social-icon {
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid var(--border);
      border-radius: 8px; color: var(--text-secondary);
      text-decoration: none; font-size: 1rem;
      transition: all 0.3s;
    }
    .social-icon:hover { border-color: var(--accent-blue); color: var(--accent-blue); transform: translateY(-2px); background: rgba(59,130,246,0.1); }

    /* Hero Visual */
    .hero-visual {
      display: flex; justify-content: center; align-items: center;
      animation: fadeInRight 0.8s 0.2s ease both;
    }

    .hero-avatar-wrap {
      position: relative; width: 280px; height: 280px;
    }

    .avatar-ring {
      position: absolute; inset: -12px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; mask-composite: exclude;
      animation: spin 6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .avatar-main {
      width: 280px; height: 280px;
      background: linear-gradient(145deg, #02050a, #07111b);
      border: 1px solid rgba(74, 222, 128, 0.24);
      border-radius: 50%;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      font-size: 78px;
      box-shadow: 0 0 60px rgba(34, 211, 238, 0.16);
      position: relative; overflow: hidden;
      color: var(--accent-cyan);
      font-family: 'Fira Code', monospace;
      text-shadow: 0 0 16px rgba(74, 222, 128, 0.25);
    }
    .avatar-main::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%);
    }

    .floating-card {
      position: absolute;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 10px 14px;
      display: flex; align-items: center; gap: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      white-space: nowrap;
      animation: float 3s ease-in-out infinite;
    }
    .floating-card.card-1 { top: 10px; right: -40px; animation-delay: 0s; }
    .floating-card.card-2 { bottom: 30px; left: -50px; animation-delay: 1s; }
    .floating-card.card-3 { top: 50%; right: -60px; transform: translateY(-50%); animation-delay: 0.5s; }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .floating-card.card-3 {
      animation: float3 3s ease-in-out infinite;
      animation-delay: 0.5s;
    }
    @keyframes float3 {
      0%,100% { transform: translateY(-50%) translateY(0); }
      50% { transform: translateY(-50%) translateY(-8px); }
    }
    .fc-icon { font-size: 1.2rem; }
    .fc-text { font-size: 0.75rem; }
    .fc-text strong { display: block; color: var(--text-primary); font-weight: 600; }
    .fc-text span { color: var(--text-muted); font-size: 0.7rem; }

    /* ── SECTIONS COMMON ── */
    section { padding: 5rem 2rem; position: relative; z-index: 1; scroll-margin-top: 90px; }

    .section-header {
      text-align: center; margin-bottom: 3.5rem;
    }
    .section-tag {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(74, 222, 128, 0.08);
      border: 1px solid rgba(74, 222, 128, 0.18);
      padding: 5px 14px; border-radius: 100px;
      font-size: 0.78rem; font-weight: 600;
      color: var(--accent-cyan); letter-spacing: 0.05em;
      text-transform: uppercase; margin-bottom: 1rem;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
    }
    .section-title {
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 800; line-height: 1.2;
    }
    .section-title span {
      background: var(--gradient-1);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .section-subtitle {
      color: var(--text-secondary); max-width: 550px;
      margin: 0.8rem auto 0; font-size: 1rem; line-height: 1.6;
    }

    .container { max-width: 1100px; margin: 0 auto; }

    .section-divider {
      width: 56px; height: 3px; border-radius: 999px;
      background: var(--gradient-1); margin: 0.8rem auto 0;
    }

    .focus-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.2rem;
    }
    .focus-card {
      background: linear-gradient(145deg, rgba(7,17,27,0.95), rgba(2,5,10,0.95));
      border: 1px solid rgba(74, 222, 128, 0.14);
      border-radius: 18px; padding: 1.5rem;
      box-shadow: 0 12px 35px rgba(0,0,0,0.22);
      transition: transform 0.3s ease, border-color 0.3s ease;
      position: relative; overflow: hidden;
    }
    .focus-card::before {
      content: '$';
      position: absolute; top: 10px; right: 14px;
      color: rgba(74, 222, 128, 0.2); font-size: 1rem; font-weight: 700;
    }
    .focus-card:hover {
      transform: translateY(-4px);
      border-color: rgba(59,130,246,0.5);
    }
    .focus-icon {
      width: 46px; height: 46px; border-radius: 12px;
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 1rem;
      background: rgba(59,130,246,0.14); color: var(--accent-blue);
      font-size: 1.1rem;
    }
    .focus-title {
      font-size: 1rem; font-weight: 700; margin-bottom: 0.55rem;
      color: var(--text-primary);
    }
    .focus-copy {
      color: var(--text-secondary); font-size: 0.9rem; line-height: 1.65;
    }

    /* ── ABOUT ── */
    #about { background: var(--bg-secondary); }
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 4rem; align-items: center;
    }
    .about-text p {
      color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.2rem;
    }
    .about-stats {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 1rem; margin-top: 1.5rem;
    }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 1.2rem;
      text-align: center;
      transition: all 0.3s;
    }
    .stat-card:hover { border-color: var(--accent-blue); transform: translateY(-2px); }
    .stat-number {
      font-size: 2rem; font-weight: 800;
      background: var(--gradient-1);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }

    .about-info-list { list-style: none; }
    .about-info-list li {
      display: flex; align-items: center; gap: 12px;
      padding: 0.9rem 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.9rem;
    }
    .about-info-list li:last-child { border-bottom: none; }
    .info-icon {
      width: 36px; height: 36px;
      background: rgba(59,130,246,0.1);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: var(--accent-blue); font-size: 0.9rem; flex-shrink: 0;
    }
    .info-label { color: var(--text-muted); font-size: 0.78rem; }
    .info-value { color: var(--text-primary); font-weight: 500; }

    /* ── SKILLS ── */
    #skills {}
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .skill-category {
      background: linear-gradient(145deg, rgba(7,17,27,0.95), rgba(2,5,10,0.95));
      border: 1px solid rgba(74, 222, 128, 0.14);
      border-radius: 16px; padding: 1.8rem;
      transition: all 0.3s;
      position: relative; overflow: hidden;
    }
    .skill-category::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
    }
    .skill-category.cat-1::before { background: var(--gradient-1); }
    .skill-category.cat-2::before { background: var(--gradient-2); }
    .skill-category.cat-3::before { background: var(--gradient-3); }
    .skill-category.cat-4::before { background: linear-gradient(135deg, #f59e0b, #ef4444); }
    .skill-category.cat-5::before { background: linear-gradient(135deg, #8b5cf6, #ec4899); }

    .skill-category:hover { border-color: var(--accent-blue); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(59,130,246,0.1); }

    .skill-cat-header {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 1.2rem;
    }
    .skill-cat-icon {
      width: 44px; height: 44px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem;
    }
    .cat-1 .skill-cat-icon { background: rgba(59,130,246,0.15); color: var(--accent-blue); }
    .cat-2 .skill-cat-icon { background: rgba(6,182,212,0.15); color: var(--accent-cyan); }
    .cat-3 .skill-cat-icon { background: rgba(16,185,129,0.15); color: var(--accent-green); }
    .cat-4 .skill-cat-icon { background: rgba(245,158,11,0.15); color: var(--accent-orange); }
    .cat-5 .skill-cat-icon { background: rgba(139,92,246,0.15); color: var(--accent-purple); }

    .skill-cat-title { font-size: 0.95rem; font-weight: 700; }

    .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-tag {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border);
      border-radius: 6px; padding: 5px 12px;
      font-size: 0.8rem; font-weight: 500; color: var(--text-secondary);
      font-family: 'Fira Code', monospace;
      transition: all 0.2s;
    }
    .skill-tag:hover { border-color: var(--accent-blue); color: var(--accent-blue); background: rgba(59,130,246,0.1); }

    /* Skill bars for primary skills */
    .skill-bar-wrap { margin-top: 2.5rem; }
    .skill-bar-wrap h3 {
      font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem;
      color: var(--text-secondary);
    }
    .skill-bar-item { margin-bottom: 1.2rem; }
    .skill-bar-header { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem; }
    .skill-bar-name { color: var(--text-primary); font-weight: 500; }
    .skill-bar-pct { color: var(--accent-blue); font-weight: 600; font-family: 'Fira Code', monospace; }
    .skill-bar-bg { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
    .skill-bar-fill { height: 100%; border-radius: 3px; background: var(--gradient-1); transition: width 1.5s ease; width: 0; }

    /* ── PROJECTS ── */
    #projects { background: var(--bg-secondary); }
    .projects-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.5rem;
    }
    .project-card {
      background: linear-gradient(145deg, rgba(7,17,27,0.95), rgba(2,5,10,0.95));
      border: 1px solid rgba(74, 222, 128, 0.14);
      border-radius: 16px; padding: 2rem;
      transition: all 0.3s;
      display: flex; flex-direction: column;
      position: relative; overflow: hidden;
    }
    .project-card::after {
      content: 'run project';
      position: absolute; top: 1rem; right: 1rem;
      font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(74, 222, 128, 0.35);
      font-family: 'Fira Code', monospace;
    }
    .project-card::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 0% 0%, rgba(59,130,246,0.08), transparent 60%);
      opacity: 0; transition: opacity 0.3s;
    }
    .project-card:hover::before { opacity: 1; }
    .project-card:hover { border-color: rgba(59,130,246,0.5); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(59,130,246,0.1); }

    .project-icon {
      width: 56px; height: 56px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem; margin-bottom: 1.2rem;
    }

    .project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem; }

    .project-title { font-size: 1.1rem; font-weight: 700; }
    .project-badge {
      font-size: 0.7rem; font-weight: 600;
      padding: 3px 10px; border-radius: 100px;
      background: rgba(16,185,129,0.15); color: var(--accent-green);
      border: 1px solid rgba(16,185,129,0.3);
    }

    .project-desc {
      color: var(--text-secondary);
      font-size: 0.875rem; line-height: 1.7;
      margin-bottom: 1.5rem; flex-grow: 1;
    }

    .project-features { list-style: none; margin-bottom: 1.5rem; }
    .project-features li {
      display: flex; align-items: flex-start; gap: 8px;
      font-size: 0.83rem; color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }
    .project-features li::before { content: '▸'; color: var(--accent-blue); flex-shrink: 0; }

    .project-tech { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem; }
    .tech-tag {
      background: rgba(59,130,246,0.1);
      color: var(--accent-blue);
      border: 1px solid rgba(59,130,246,0.2);
      border-radius: 6px; padding: 3px 10px;
      font-size: 0.75rem; font-weight: 500;
      font-family: 'Fira Code', monospace;
    }

    .project-links { display: flex; gap: 8px; }
    .project-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: 8px;
      font-size: 0.8rem; font-weight: 600; text-decoration: none;
      transition: all 0.2s;
    }
    .project-link.primary { background: var(--gradient-1); color: white; }
    .project-link.secondary { background: var(--bg-card-hover); color: var(--text-secondary); border: 1px solid var(--border); }
    .project-link:hover { transform: translateY(-1px); opacity: 0.9; }

    /* ── EXPERIENCE ── */
    #experience {}
    .exp-container { max-width: 800px; margin: 0 auto; }
    .exp-item {
      display: flex; gap: 1.5rem;
      margin-bottom: 2rem; position: relative;
    }
    .exp-timeline {
      display: flex; flex-direction: column; align-items: center;
      flex-shrink: 0; width: 40px;
    }
    .exp-dot {
      width: 16px; height: 16px;
      background: var(--gradient-1);
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(59,130,246,0.2);
      flex-shrink: 0;
    }
    .exp-line {
      flex-grow: 1; width: 2px;
      background: linear-gradient(to bottom, var(--accent-blue), transparent);
      margin-top: 6px;
    }
    .exp-card {
      background: linear-gradient(145deg, rgba(7,17,27,0.95), rgba(2,5,10,0.95));
      border: 1px solid rgba(74, 222, 128, 0.14);
      border-radius: 16px; padding: 1.8rem;
      flex-grow: 1;
      transition: all 0.3s;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
    }
    .exp-card:hover { border-color: var(--accent-blue); transform: translateX(4px); }
    .exp-role { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.3rem; }
    .exp-company { color: var(--accent-blue); font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem; }
    .exp-date { color: var(--text-muted); font-size: 0.8rem; font-family: 'Fira Code', monospace; margin-bottom: 1rem; }
    .exp-desc { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.7; }
    .exp-desc li { margin-bottom: 0.4rem; list-style: none; display: flex; gap: 8px; }
    .exp-desc li::before { content: '→'; color: var(--accent-cyan); flex-shrink: 0; }

    /* ── EDUCATION ── */
    #education { background: var(--bg-secondary); }
    .edu-card {
      max-width: 700px; margin: 0 auto;
      background: linear-gradient(145deg, rgba(7,17,27,0.95), rgba(2,5,10,0.95));
      border: 1px solid rgba(74, 222, 128, 0.14);
      border-radius: 20px; padding: 2.5rem;
      display: flex; gap: 2rem; align-items: flex-start;
      position: relative; overflow: hidden;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
    }
    .edu-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: var(--gradient-1);
    }
    .edu-icon {
      width: 70px; height: 70px;
      background: var(--gradient-1);
      border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; flex-shrink: 0;
      box-shadow: 0 8px 24px rgba(59,130,246,0.3);
    }
    .edu-degree { font-size: 1.2rem; font-weight: 800; margin-bottom: 0.3rem; }
    .edu-school { color: var(--accent-blue); font-weight: 600; margin-bottom: 0.3rem; }
    .edu-location { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.8rem; }
    .edu-year {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(16,185,129,0.1);
      color: var(--accent-green);
      border: 1px solid rgba(16,185,129,0.3);
      padding: 4px 12px; border-radius: 100px;
      font-size: 0.8rem; font-weight: 600;
    }
    .edu-courses { margin-top: 1rem; }
    .edu-courses h4 { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.6rem; }
    .edu-courses-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .edu-course {
      background: rgba(255,255,255,0.05); border: 1px solid var(--border);
      border-radius: 6px; padding: 4px 10px;
      font-size: 0.78rem; color: var(--text-secondary);
    }

    /* ── CONTACT ── */
    #contact {}
    .contact-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 3rem; align-items: start;
    }
    .contact-info h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; }
    .contact-info p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem; }
    .contact-items { display: flex; flex-direction: column; gap: 1rem; }
    .contact-item {
      display: flex; align-items: center; gap: 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 1rem 1.2rem;
      text-decoration: none; color: inherit;
      transition: all 0.3s;
    }
    .contact-item:hover { border-color: var(--accent-blue); transform: translateX(4px); }
    .contact-item-icon {
      width: 42px; height: 42px;
      background: rgba(59,130,246,0.1);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; color: var(--accent-blue); flex-shrink: 0;
    }
    .contact-item-label { font-size: 0.75rem; color: var(--text-muted); }
    .contact-item-value { font-size: 0.9rem; font-weight: 500; color: var(--text-primary); }

    .contact-form {
      background: linear-gradient(145deg, rgba(7,17,27,0.95), rgba(2,5,10,0.95));
      border: 1px solid rgba(74, 222, 128, 0.14);
      border-radius: 20px; padding: 2rem;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
    }
    .contact-form h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1.2rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 500; margin-bottom: 6px; color: var(--text-secondary); }
    .form-group input, .form-group textarea {
      width: 100%;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--text-primary);
      font-size: 0.9rem; font-family: 'Inter', sans-serif;
      transition: all 0.2s; outline: none;
    }
    .form-group input:focus, .form-group textarea:focus {
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
    }
    .form-group textarea { resize: vertical; min-height: 100px; }
    .form-submit {
      width: 100%;
      background: var(--gradient-1);
      border: none; color: white;
      padding: 12px; border-radius: 10px;
      font-size: 0.9rem; font-weight: 600;
      cursor: pointer; transition: all 0.3s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .form-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(59,130,246,0.4); }

    /* ── FOOTER ── */
    footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border);
      padding: 2.5rem 2rem;
      text-align: center;
    }
    .footer-content { max-width: 1100px; margin: 0 auto; }
    .footer-logo { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .footer-logo span { background: var(--gradient-1); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .footer-text { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem; }
    .footer-links { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
    .footer-link {
      color: var(--text-muted); text-decoration: none;
      font-size: 0.85rem; transition: color 0.2s;
    }
    .footer-link:hover { color: var(--accent-blue); }
    .footer-divider { width: 40px; height: 2px; background: var(--gradient-1); margin: 1.5rem auto; border-radius: 1px; }

    /* ── ANIMATIONS ── */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .reveal {
      opacity: 0; transform: translateY(30px);
      transition: all 0.7s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-links.open {
        display: flex; flex-direction: column;
        position: fixed; top: 65px; left: 0; right: 0; bottom: 0;
        background: rgba(10,14,26,0.97);
        backdrop-filter: blur(20px);
        padding: 2rem; gap: 1.5rem; z-index: 999;
        align-items: center; justify-content: center;
      }
      .nav-links.open a { font-size: 1.2rem; }
      .nav-hamburger { display: flex; }

      .hero-content { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
      .hero-btns { justify-content: center; }
      .hero-social { justify-content: center; }
      .hero-visual { order: -1; }
      .hero-avatar-wrap { width: 200px; height: 200px; }
      .avatar-main { width: 200px; height: 200px; font-size: 60px; }
      .floating-card.card-1, .floating-card.card-3 { display: none; }
      .floating-card.card-2 { left: -20px; }

      .about-grid { grid-template-columns: 1fr; gap: 2rem; }
      .contact-grid { grid-template-columns: 1fr; }
      .edu-card { flex-direction: column; }
      .projects-grid { grid-template-columns: 1fr; }
    }

    /* Particle canvas */
    #particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.4; }
  </style>
</head>
<body>
  <canvas id="particles"></canvas>

  <!-- NAVBAR -->
  <nav id="navbar">
    <a href="#hero" class="nav-logo">
      <div class="nav-logo-icon">S</div>
      <span class="nav-logo-text">Saim<span>.ml</span></span>
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="#focus">Focus</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#contact" class="nav-cta">Contact Me</a></li>
    </ul>
    <div class="nav-hamburger" id="hamburger" onclick="toggleNav()">
      <span></span><span></span><span></span>
    </div>
  </nav>

  <!-- HERO -->
  <section id="hero">
    <div class="hero-bg-grid"></div>
    <div class="hero-content">
      <div class="hero-left">
        <div class="hero-badge">
          <span class="dot"></span>
          [system] available_for_opportunities
        </div>
        <h1 class="hero-name">Muhammad<br><span class="highlight">Saim Ayan</span></h1>
        <p class="hero-title">
          <span id="typewriter">$ python portfolio.py</span><span class="cursor"></span>
        </p>
        <p class="hero-desc">
          I build practical machine learning solutions that turn messy data into clear decisions, reliable models,
          and product-ready insights.
        </p>
        <div class="hero-highlights">
          <div class="hero-pill"><i class="fas fa-brain"></i> Predictive Modeling</div>
          <div class="hero-pill"><i class="fas fa-chart-line"></i> Data Storytelling</div>
          <div class="hero-pill"><i class="fas fa-cogs"></i> End-to-End ML Workflow</div>
        </div>
        <div class="terminal-console">
          <div class="terminal-header">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
          </div>
          <div class="terminal-body">
            <div class="terminal-line"><span class="prompt">$</span> loading profile ...</div>
            <div class="terminal-line"><span class="prompt">$</span> skills = ['Python', 'ML', 'SQL']</div>
            <div class="terminal-line"><span class="prompt">$</span> status = 'Open to opportunities'</div>
          </div>
        </div>
        <div class="hero-metrics">
          
          <div class="metric-card">
            <strong>Python</strong>
            <span>primary language for analysis and model building</span>
          </div>
          <div class="metric-card">
            <strong>Impact</strong>
            <span>focused on practical, explainable results</span>
          </div>
        </div>
        <div class="hero-btns">
          <a href="#projects" class="btn-primary">
            <i class="fas fa-rocket"></i> View Projects
          </a>
          <a href="#contact" class="btn-secondary">
            <i class="fas fa-paper-plane"></i> Get In Touch
          </a>
        </div>
        <div class="hero-social">
          <a href="https://linkedin.com/in/saimayan" target="_blank" class="social-icon" title="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/saim9211" target="_blank" class="social-icon" title="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="mailto:saimayan2003@gmail.com" class="social-icon" title="Email">
            <i class="fas fa-envelope"></i>
          </a>
          <a href="tel:+923037555679" class="social-icon" title="Phone">
            <i class="fas fa-phone"></i>
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-avatar-wrap">
          <div class="avatar-ring"></div>
          <div class="avatar-main">&gt;_</div>
          <div class="floating-card card-1" style="font-family:'Fira Code',monospace;">
            <span class="fc-icon">⚙️</span>
            <div class="fc-text">
              <strong>model.train()</strong>
              <span>active pipeline</span>
            </div>
          </div>
          <div class="floating-card card-2" style="font-family:'Fira Code',monospace;">
            <span class="fc-icon">📈</span>
            <div class="fc-text">
              <strong>metrics.log()</strong>
              <span>performance tracking</span>
            </div>
          </div>
          <div class="floating-card card-3" style="font-family:'Fira Code',monospace;">
            <span class="fc-icon">🧪</span>
            <div class="fc-text">
              <strong>test.run()</strong>
              <span>validation mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOCUS -->
  <section id="focus">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-bolt"></i> Focus Areas</div>
        <h2 class="section-title">What I <span>Bring</span></h2>
        <p class="section-subtitle">A focused blend of machine learning, data insight, and clear communication.</p>
        <div class="section-divider"></div>
      </div>
      <div class="focus-grid">
        <div class="focus-card reveal">
          <div class="focus-icon"><i class="fas fa-database"></i></div>
          <div class="focus-title">Data Preparation</div>
          <div class="focus-copy">I turn raw, noisy data into reliable training sets through thoughtful cleaning, analysis, and feature engineering.</div>
        </div>
        <div class="focus-card reveal">
          <div class="focus-icon"><i class="fas fa-brain"></i></div>
          <div class="focus-title">Model Development</div>
          <div class="focus-copy">I build predictive models with strong evaluation, comparison, and clear interpretation for real-world problems.</div>
        </div>
        <div class="focus-card reveal">
          <div class="focus-icon"><i class="fas fa-lightbulb"></i></div>
          <div class="focus-title">Insightful Delivery</div>
          <div class="focus-copy">I present findings with simple visuals and concise reasoning so technical work becomes decision-ready.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-user"></i> About Me</div>
        <h2 class="section-title">Who I <span>Am</span></h2>
        <p class="section-subtitle">Fresh Graduate focused on ML, data science, and practical AI solutions.</p>
      </div>
      <div class="about-grid">
        <div class="about-text reveal">
          <p>
            I'm <strong>Muhammad Saim Ayan</strong>, a Computer Science graduate building thoughtful ML systems that solve real problems with clarity and measurable value.
          </p>
          <p>
            My work sits at the intersection of Python, statistics, and applied machine learning, with a strong emphasis on explainability, clean experimentation, and polished presentation.
          </p>
          <div class="about-stats">
            <div class="stat-card">
              <div class="stat-number">5+</div>
              <div class="stat-label">ML Libraries</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">2026</div>
              <div class="stat-label">Graduation Year</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">1+</div>
              <div class="stat-label">Projects Built</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">∞</div>
              <div class="stat-label">Learning Drive</div>
            </div>
          </div>
        </div>
        <div class="reveal">
          <ul class="about-info-list">
            <li>
              <div class="info-icon"><i class="fas fa-user-circle"></i></div>
              <div>
                <div class="info-label">Full Name</div>
                <div class="info-value">Muhammad Saim Ayan</div>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div>
                <div class="info-label">Location</div>
                <div class="info-value">Burewala, Pakistan</div>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <div class="info-label">Email</div>
                <div class="info-value">saimayan2003@gmail.com</div>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fas fa-phone"></i></div>
              <div>
                <div class="info-label">Phone</div>
                <div class="info-value">+92 303 7555679</div>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fab fa-linkedin"></i></div>
              <div>
                <div class="info-label">LinkedIn</div>
                <div class="info-value">linkedin.com/in/saimayan</div>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fab fa-github"></i></div>
              <div>
                <div class="info-label">GitHub</div>
                <div class="info-value">github.com/saim9211</div>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fas fa-briefcase"></i></div>
              <div>
                <div class="info-label">Status</div>
                <div class="info-value" style="color: var(--accent-green)">● Available for Opportunities</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <section id="skills">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-code"></i> Technical Skills</div>
        <h2 class="section-title">My <span>Expertise</span></h2>
        <p class="section-subtitle">A comprehensive toolkit built for data-driven ML solutions</p>
      </div>

      <div class="skills-grid">
        <div class="skill-category cat-1 reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i class="fas fa-code"></i></div>
            <div class="skill-cat-title">Programming Languages</div>
          </div>
          <div class="skill-tags">
            <span class="skill-tag">Python</span>
            <span class="skill-tag">SQL</span>
          </div>
        </div>

        <div class="skill-category cat-2 reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i class="fas fa-chart-bar"></i></div>
            <div class="skill-cat-title">Data Analysis</div>
          </div>
          <div class="skill-tags">
            <span class="skill-tag">Data Preprocessing</span>
            <span class="skill-tag">Data Visualization</span>
            <span class="skill-tag">Exploratory Data Analysis</span>
            <span class="skill-tag">Data Cleaning</span>
          </div>
        </div>

        <div class="skill-category cat-3 reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i class="fas fa-brain"></i></div>
            <div class="skill-cat-title">Machine Learning</div>
          </div>
          <div class="skill-tags">
            <span class="skill-tag">Model Training</span>
            <span class="skill-tag">Feature Engineering</span>
            <span class="skill-tag">Model Evaluation</span>
            <span class="skill-tag">Predictive Modeling</span>
          </div>
        </div>

        <div class="skill-category cat-4 reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i class="fas fa-layer-group"></i></div>
            <div class="skill-cat-title">Libraries & Frameworks</div>
          </div>
          <div class="skill-tags">
            <span class="skill-tag">Pandas</span>
            <span class="skill-tag">NumPy</span>
            <span class="skill-tag">Matplotlib</span>
            <span class="skill-tag">Seaborn</span>
            <span class="skill-tag">Scikit-Learn</span>
          </div>
        </div>

        <div class="skill-category cat-5 reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i class="fas fa-tools"></i></div>
            <div class="skill-cat-title">Tools & Platforms</div>
          </div>
          <div class="skill-tags">
            <span class="skill-tag">Jupyter Notebook</span>
            <span class="skill-tag">Git</span>
            <span class="skill-tag">GitHub</span>
            <span class="skill-tag">VS Code</span>
            <span class="skill-tag">Google Colab</span>
          </div>
        </div>

        <div class="skill-category cat-1 reveal">
          <div class="skill-cat-header">
            <div class="skill-cat-icon"><i class="fas fa-users"></i></div>
            <div class="skill-cat-title">Soft Skills</div>
          </div>
          <div class="skill-tags">
            <span class="skill-tag">Problem Solving</span>
            <span class="skill-tag">Team Collaboration</span>
            <span class="skill-tag">Leadership</span>
            <span class="skill-tag">Report Writing</span>
          </div>
        </div>
      </div>

      

  <!-- PROJECTS -->
  <section id="projects">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-rocket"></i> Projects</div>
        <h2 class="section-title">What I've <span>Built</span></h2>
        <p class="section-subtitle">Real-world ML projects solving real problems</p>
      </div>
      <div class="projects-grid">
        <!-- Project 1 -->
        <div class="project-card reveal">
          <div class="project-icon" style="background: rgba(59,130,246,0.15);">🤖</div>
          <div class="project-header">
            <h3 class="project-title">FaceWell AI Suite</h3>
            <span class="project-badge">✓ Completed</span>
          </div>
          <p class="project-desc">
            A real time AI application for image analysis and personalized health insights. 
            Features intelligent face detection, automated image preprocessing pipelines, 
            and a secure admin dashboard with automated reporting capabilities.
          </p>
          <ul class="project-features">
            <li>Real-time face detection and image analysis</li>
            <li>Advanced image preprocessing pipelines</li>
            <li>Feature extraction for personalized insights</li>
            <li>Secure admin dashboard with user verification</li>
            <li>Automated reporting system</li>
          </ul>
          <div class="project-tech">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Computer Vision</span>
            <span class="tech-tag">Face Detection</span>
            <span class="tech-tag">Image Processing</span>
            <span class="tech-tag">ML Pipeline</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/saim9211" target="_blank" class="project-link primary">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card reveal">
          <div class="project-icon" style="background: rgba(16,185,129,0.15);">📊</div>
          <div class="project-header">
            <h3 class="project-title">Data Analysis & Visualization</h3>
            <span class="project-badge">✓ Completed</span>
          </div>
          <p class="project-desc">
            Comprehensive data analysis project using Python and Pandas that uncovered 
            actionable business insights. Implemented end-to-end pipeline from raw data 
            cleaning to interactive visualization dashboards.
          </p>
          <ul class="project-features">
            <li>Dataset cleaning and preprocessing with Pandas</li>
            <li>Exploratory Data Analysis (EDA) workflows</li>
            <li>Interactive visualizations with Matplotlib & Seaborn</li>
            <li>Statistical analysis and pattern discovery</li>
            <li>Actionable insights reporting</li>
          </ul>
          <div class="project-tech">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Pandas</span>
            <span class="tech-tag">NumPy</span>
            <span class="tech-tag">Matplotlib</span>
            <span class="tech-tag">Seaborn</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/saim9211" target="_blank" class="project-link primary">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="project-card reveal">
          <div class="project-icon" style="background: rgba(139,92,246,0.15);">🎯</div>
          <div class="project-header">
            <h3 class="project-title">Predictive ML Model</h3>
            <span class="project-badge">✓ Completed</span>
          </div>
          <p class="project-desc">
            Built and deployed a predictive machine learning model using Scikit-Learn. 
            Implemented complete ML pipeline including feature engineering, model selection, 
            training, hyperparameter tuning, and performance evaluation.
          </p>
          <ul class="project-features">
            <li>Feature engineering and selection strategies</li>
            <li>Model training with multiple algorithms</li>
            <li>Hyperparameter optimization</li>
            <li>Comprehensive model evaluation metrics</li>
            <li>Clean, reproducible ML codebase</li>
          </ul>
          <div class="project-tech">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Scikit-Learn</span>
            <span class="tech-tag">Feature Engineering</span>
            <span class="tech-tag">Model Evaluation</span>
            <span class="tech-tag">Jupyter</span>
          </div>
          <div class="project-links">
            <a href="https://github.com/saim9211" target="_blank" class="project-link primary">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section id="experience">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-briefcase"></i> Experience</div>
        <h2 class="section-title">My <span>Journey</span></h2>
        <p class="section-subtitle">Hands-on experience with real-world data and ML challenges</p>
      </div>
      <div class="exp-container">

        <div class="exp-item reveal">
          <div class="exp-timeline">
            <div class="exp-dot"></div>
            <div class="exp-line"></div>
          </div>
          <div class="exp-card">
            <div class="exp-role">Data Analysis Projects</div>
            <div class="exp-company">Python & Pandas | Independent Projects</div>
            <div class="exp-date">📅 2023 – Present</div>
            <ul class="exp-desc">
              <li>Conducted end-to-end data analysis on real-world datasets using Python and Pandas</li>
              <li>Built preprocessing pipelines covering data cleaning, transformation, and feature extraction</li>
              <li>Generated actionable business insights through statistical analysis and EDA</li>
              <li>Created compelling visualizations with Matplotlib and Seaborn to communicate findings</li>
            </ul>
          </div>
        </div>

        <div class="exp-item reveal">
          <div class="exp-timeline">
            <div class="exp-dot"></div>
            <div class="exp-line"></div>
          </div>
          <div class="exp-card">
            <div class="exp-role">Database Management & SQL</div>
            <div class="exp-company">SQL | Academic & Personal Projects</div>
            <div class="exp-date">📅 2023 – Present</div>
            <ul class="exp-desc">
              <li>Wrote complex SQL queries for data extraction, filtering, and aggregation</li>
              <li>Managed relational database schemas and optimized query performance</li>
              <li>Combined SQL with Python for end-to-end data pipeline workflows</li>
            </ul>
          </div>
        </div>

        <div class="exp-item reveal">
          <div class="exp-timeline">
            <div class="exp-dot"></div>
            <div class="exp-line"></div>
          </div>
          <div class="exp-card">
            <div class="exp-role">Version Control & Collaboration</div>
            <div class="exp-company">Git & GitHub | Open Source Contributions</div>
            <div class="exp-date">📅 2023 – Present</div>
            <ul class="exp-desc">
              <li>Utilized Git and GitHub for source control and collaborative development</li>
              <li>Managed branches, pull requests, and code reviews in team environments</li>
              <li>Contributed to open-source projects and maintained personal repositories</li>
            </ul>
          </div>
        </div>

        <div class="exp-item reveal">
          <div class="exp-timeline">
            <div class="exp-dot"></div>
          </div>
          <div class="exp-card">
            <div class="exp-role">Hackathons & Competitive Coding</div>
            <div class="exp-company">Team Challenges | Tech Competitions</div>
            <div class="exp-date">📅 2023 – Present</div>
            <ul class="exp-desc">
              <li>Participated in hackathons and team coding challenges</li>
              <li>Collaborated under pressure to deliver working prototypes</li>
              <li>Applied ML and data skills to solve competitive problem statements</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- EDUCATION -->
  <section id="education">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-graduation-cap"></i> Education</div>
        <h2 class="section-title">Academic <span>Background</span></h2>
        <p class="section-subtitle">Building a strong foundation in Computer Science & AI</p>
      </div>
      <div class="edu-card reveal">
        <div class="edu-icon">🎓</div>
        <div>
          <div class="edu-degree">Bachelor of Science in Computer Science</div>
          <div class="edu-school">COMSATS University Islamabad, Sahiwal Campus</div>
          <div class="edu-location"><i class="fas fa-map-marker-alt"></i> Sahiwal, Pakistan</div>
          <div class="edu-year"><i class="fas fa-calendar-alt"></i> Expected Graduation: 2026</div>
          <div class="edu-courses">
            <h4>Relevant Coursework</h4>
            <div class="edu-courses-list">
              <span class="edu-course">Machine Learning</span>
              <span class="edu-course">Data Structures</span>
              <span class="edu-course">Algorithms</span>
              <span class="edu-course">Database Systems</span>
              <span class="edu-course">Statistics</span>
              <span class="edu-course">Artificial Intelligence</span>
              <span class="edu-course">Data Science</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="container">
      <div class="section-header">
        <div class="section-tag"><i class="fas fa-paper-plane"></i> Contact</div>
        <h2 class="section-title">Let's <span>Connect</span></h2>
        <p class="section-subtitle">Ready to collaborate or discuss opportunities? Reach out!</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info reveal">
          <h3>Get In Touch</h3>
          <p>
            I'm actively seeking junior ML engineer roles, data science internships, and 
            collaboration opportunities. Whether you have a project, job opportunity, or just 
            want to talk data  I'd love to hear from you!
          </p>
          <div class="contact-items">
            <a href="mailto:saimayan2003@gmail.com" class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <div class="contact-item-label">Email</div>
                <div class="contact-item-value">saimayan2003@gmail.com</div>
              </div>
            </a>
            <a href="tel:+923037555679" class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-phone"></i></div>
              <div>
                <div class="contact-item-label">Phone</div>
                <div class="contact-item-value">+92 303 7555679</div>
              </div>
            </a>
            <a href="https://linkedin.com/in/saimayan" target="_blank" class="contact-item">
              <div class="contact-item-icon"><i class="fab fa-linkedin-in"></i></div>
              <div>
                <div class="contact-item-label">LinkedIn</div>
                <div class="contact-item-value">linkedin.com/in/saimayan</div>
              </div>
            </a>
            <a href="https://github.com/saim9211" target="_blank" class="contact-item">
              <div class="contact-item-icon"><i class="fab fa-github"></i></div>
              <div>
                <div class="contact-item-label">GitHub</div>
                <div class="contact-item-value">github.com/saim9211</div>
              </div>
            </a>
            <div class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div>
                <div class="contact-item-label">Location</div>
                <div class="contact-item-value">Burewala, Pakistan</div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form reveal">
          <h3>📬 Send a Message</h3>
          <form onsubmit="handleSubmit(event)">
            <div class="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="John Doe" required id="fname" />
            </div>
            <div class="form-group">
              <label>Your Email</label>
              <input type="email" placeholder="john@example.com" required id="femail" />
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Job Opportunity / Collaboration..." required id="fsubject" />
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea placeholder="Tell me about the opportunity..." required id="fmessage"></textarea>
            </div>
            <button type="submit" class="form-submit" id="submitBtn">
              <i class="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-content">
      <div class="footer-logo">Muhammad <span>Saim Ayan</span></div>
      <p class="footer-text">Junior ML Engineer · Data Analyst · Python Developer</p>
      <div class="footer-divider"></div>
      <div class="footer-links">
        <a href="#hero" class="footer-link">Home</a>
        <a href="#about" class="footer-link">About</a>
        <a href="#skills" class="footer-link">Skills</a>
        <a href="#projects" class="footer-link">Projects</a>
        <a href="#contact" class="footer-link">Contact</a>
        <a href="https://github.com/saim9211" target="_blank" class="footer-link">GitHub</a>
        <a href="https://linkedin.com/in/saimayan" target="_blank" class="footer-link">LinkedIn</a>
      </div>
      <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 1.5rem;">
        © 2024 Muhammad Saim Ayan. Built with ❤️ and lots of data.
      </p>
    </div>
  </footer>

  <script>
    // ── PARTICLES ──
    (function() {
      const canvas = document.getElementById('particles');
      const ctx = canvas.getContext('2d');
      let particles = [];
      let W, H;

      function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      class Particle {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * W;
          this.y = Math.random() * H;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = (Math.random() - 0.5) * 0.3;
          this.speedY = (Math.random() - 0.5) * 0.3;
          this.opacity = Math.random() * 0.5 + 0.1;
          const colors = ['#3b82f6','#8b5cf6','#06b6d4','#10b981'];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
          this.x += this.speedX; this.y += this.speedY;
          if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      for (let i = 0; i < 80; i++) particles.push(new Particle());

      function animate() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i+1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
              ctx.save();
              ctx.globalAlpha = (1 - dist/120) * 0.15;
              ctx.strokeStyle = '#3b82f6';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
        requestAnimationFrame(animate);
      }
      animate();
    })();

    // ── TYPEWRITER ──
    (function() {
      const texts = ['Junior ML Engineer', 'Data Analyst', 'Python Developer', 'AI Enthusiast'];
      let idx = 0, charIdx = 0, deleting = false;
      const el = document.getElementById('typewriter');

      function type() {
        const current = texts[idx];
        if (deleting) {
          el.textContent = current.slice(0, charIdx--);
          if (charIdx < 0) { deleting = false; idx = (idx+1) % texts.length; setTimeout(type, 500); return; }
        } else {
          el.textContent = current.slice(0, charIdx++);
          if (charIdx > current.length) { deleting = true; setTimeout(type, 2000); return; }
        }
        setTimeout(type, deleting ? 60 : 100);
      }
      setTimeout(type, 1000);
    })();

    // ── NAVBAR SCROLL ──
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── MOBILE NAV ──
    function toggleNav() {
      document.getElementById('navLinks').classList.toggle('open');
    }
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Animate skill bars when visible
          e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Trigger bars if already in view on load
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) bar.style.width = bar.dataset.width + '%';
      });
    }, 300);

    // ── CONTACT FORM ──
    function handleSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const name = document.getElementById('fname').value;
      const email = document.getElementById('femail').value;
      const subject = document.getElementById('fsubject').value;
      const message = document.getElementById('fmessage').value;
      
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Compose mailto link
      const mailto = \`mailto:saimayan2003@gmail.com?subject=\${encodeURIComponent(subject + ' - from ' + name)}&body=\${encodeURIComponent('From: ' + name + '\\nEmail: ' + email + '\\n\\n' + message)}\`;
      
      setTimeout(() => {
        window.location.href = mailto;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Ready!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 800);
    }

    // ── ACTIVE NAV LINK ──
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      sections.forEach(section => {
        const sTop = section.offsetTop - 100;
        const sH = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (link) {
          if (scrollY >= sTop && scrollY < sTop + sH) {
            link.style.color = 'var(--accent-blue)';
          } else {
            link.style.color = '';
          }
        }
      });
    });
  </script>
</body>
</html>`)
})

export default app
