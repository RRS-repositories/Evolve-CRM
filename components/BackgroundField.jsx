"use client";

import { useEffect, useRef } from "react";

/* The growing "organism" behind the page, ported from the demo.
 *
 * A branching tree of nodes is seeded once; how many are drawn is driven by
 * scroll depth, so the structure appears to grow as you read. The page
 * background also warms through five stops over the same scroll.
 *
 * Honours prefers-reduced-motion: the field is drawn once at a fixed depth and
 * only redrawn on scroll, with no drift, no pulse and no animation loop. */
export default function BackgroundField() {
  const canvasRef = useRef(null);
  const depthRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const depth = depthRef.current;
    if (!canvas || !depth) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let W = 0;
    let H = 0;
    let scrollP = 0;
    let raf = 0;

    const STOPS = [
      [246, 251, 248],
      [240, 248, 243],
      [233, 244, 238],
      [226, 240, 233],
      [219, 237, 228],
    ];

    function updateScroll() {
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollP = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const t = scrollP * (STOPS.length - 1);
      const i = Math.min(STOPS.length - 2, Math.floor(t));
      const f = t - i;
      const mix = STOPS[i].map((v, k) => Math.round(v + (STOPS[i + 1][k] - v) * f));
      depth.style.background = `rgb(${mix[0]},${mix[1]},${mix[2]})`;
    }

    function resize() {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = innerWidth;
      H = innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const MAXN = 110;
    const nodes = [];
    (function seed() {
      nodes.push({ x: 0.76, y: 0.38, r: 4.5, parent: -1, ang: Math.random() * 6.283, depth: 0, ph: Math.random() * 6.283 });
      let a = 0;
      while (nodes.length < MAXN && a < MAXN * 30) {
        a++;
        const p = nodes[Math.floor(Math.random() * nodes.length)];
        if (p.depth > 9) continue;
        const ang = p.ang + (Math.random() - 0.5) * 2.2;
        const dist = 0.045 + Math.random() * 0.06;
        const nx = p.x + Math.cos(ang) * dist * (innerHeight / innerWidth);
        const ny = p.y + Math.sin(ang) * dist;
        if (nx < 0.05 || nx > 0.98 || ny < 0.04 || ny > 0.96) continue;
        nodes.push({ x: nx, y: ny, r: 1.4 + Math.random() * 2.8, parent: nodes.indexOf(p), ang, depth: p.depth + 1, ph: Math.random() * 6.283 });
      }
    })();

    let mx = -1;
    let my = -1;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointer = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const t0 = performance.now();
    function frame(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      const visible = Math.max(3, Math.floor(6 + scrollP * (MAXN - 6)));
      const drift = reduced ? 0 : 1;
      const pos = [];
      for (let i = 0; i < visible; i++) {
        const n = nodes[i];
        let x = n.x * W + Math.sin(t * 0.5 + n.ph) * 8 * drift;
        let y = n.y * H + Math.cos(t * 0.42 + n.ph * 1.3) * 8 * drift;
        if (mx >= 0) {
          const dx = x - mx;
          const dy = y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 32400) {
            const d = Math.sqrt(d2) || 1;
            const f = ((180 - d) / 180) * 20;
            x += (dx / d) * f;
            y += (dy / d) * f;
          }
        }
        pos.push([x, y]);
      }
      ctx.lineWidth = 1;
      for (let i = 1; i < visible; i++) {
        const n = nodes[i];
        if (n.parent < 0 || n.parent >= visible) continue;
        const [x1, y1] = pos[n.parent];
        const [x2, y2] = pos[i];
        const midx = (x1 + x2) / 2 + Math.sin(t * 0.6 + i) * 5 * drift;
        const midy = (y1 + y2) / 2 + Math.cos(t * 0.6 + i) * 5 * drift;
        ctx.strokeStyle = `rgba(11,143,102,${0.06 + 0.09 * (1 - n.depth / 10)})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midx, midy, x2, y2);
        ctx.stroke();
      }
      for (let i = 0; i < visible; i++) {
        const n = nodes[i];
        const [x, y] = pos[i];
        const pulse = reduced ? 1 : 0.75 + 0.25 * Math.sin(t * 1.4 + n.ph);
        const col = i % 17 === 0 && i > 0 ? "224,92,72" : "11,143,102";
        const g = ctx.createRadialGradient(x, y, 0, x, y, n.r * 6);
        g.addColorStop(0, `rgba(${col},${0.14 * pulse})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, n.r * 6, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgba(${col},${0.55 * pulse})`;
        ctx.beginPath();
        ctx.arc(x, y, n.r * (i === 0 ? 1.4 : 1), 0, 6.283);
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    }

    const onScroll = () => {
      updateScroll();
      if (reduced) frame(performance.now());
    };

    resize();
    updateScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", resize);
    if (finePointer) addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) {
      scrollP = 0.5;
      frame(performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      <div id="depth" ref={depthRef} />
      <canvas id="organism" ref={canvasRef} aria-hidden="true" />
      <div id="grain" aria-hidden="true" />
    </>
  );
}
