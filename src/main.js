// Kynqel Tech — Interactive Controls & Motion System

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initTalentFlow();
  initExplodedArchitectureMockup();
  initLiveTelemetryTicker();
  initAnimatedMetricCounters();
  initDiagonalCardStreamScroll();
  initBentoSpotlight();
  initDemoModal();
  initCurrentPageActive();
  initEditorialStaggerHero();
  initHeroParallaxLayers();
  initRollingTextButtons();
  initFeatureBento();
  initFeatureExpandBento();
  initStickyFooterReveal();
});

// 1. Sticky Nav with Glassmorphism
function initStickyNav() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 2. Interactive Talent Pipeline Flow
const talentStages = {
  'Identify': {
    meta: 'Stage 01 / Intake',
    title: 'Precision Sourcing & Campus Partnerships',
    desc: 'Targeted evaluation across top 1% STEM universities. Algorithmic candidate discovery vetting 50,000+ candidates for foundational analytical aptitude.',
    metric: 'Top 1.2% Acceptance'
  },
  'Evaluate': {
    meta: 'Stage 02 / Assessment',
    title: 'Algorithmic Problem-Solving & Architecture Benchmarks',
    desc: 'Rigorous 36-hour asynchronous technical labs assessing real-world systems engineering, concurrency patterns, and data structure resilience.',
    metric: '94.8% Assessment Precision'
  },
  'Select': {
    meta: 'Stage 03 / Cohort Selection',
    title: 'Panel Evaluation & Cognitive Fit',
    desc: 'Comprehensive architectural interviews led by principal enterprise architects and engineering directors.',
    metric: '1:42 Final Ratio'
  },
  'Train': {
    meta: 'Stage 04 / Enterprise Immersion',
    title: '16-Week Enterprise Accelerator',
    desc: 'Full-time immersion into production distributed systems, LLM orchestration, model safety, and cloud-native architecture.',
    metric: '600+ Lab Hours'
  },
  'Certify': {
    meta: 'Stage 05 / Industry Verification',
    title: 'Hyperscaler & Security Certification',
    desc: 'Mandatory tier-1 certifications covering enterprise cloud infrastructure, SOC2 compliance, and production ML pipelines.',
    metric: '100% Dual-Certified'
  },
  'Assess': {
    meta: 'Stage 06 / Capstone Validation',
    title: 'Enterprise Simulation & Live Capstone',
    desc: 'Real-world enterprise sandbox deployments under rigorous SLA conditions, simulating production outages and high-throughput workloads.',
    metric: '99.9% Sandbox Uptime'
  },
  'Convert': {
    meta: 'Stage 07 / Talent Conversion',
    title: 'Full-Time Enterprise Onboarding',
    desc: 'Direct conversion into dedicated engineering squads paired with senior technical mentors.',
    metric: '98% Retention Rate'
  },
  'Deploy': {
    meta: 'Stage 08 / Production Squads',
    title: 'Autonomous Client Delivery Squads',
    desc: 'Instant deployment into Fortune 500 digital initiatives with proven zero ramp-up time.',
    metric: '< 5 Days to Deployment'
  }
};

function initTalentFlow() {
  const steps = document.querySelectorAll('.flow .step');
  const titleEl = document.getElementById('flow-stage-title');
  const descEl = document.getElementById('flow-stage-desc');
  const metaEl = document.getElementById('flow-stage-meta');
  const metricEl = document.getElementById('flow-stage-metric');

  if (!steps.length || !titleEl) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const stepName = step.innerText.trim();
      const stageData = talentStages[stepName];
      if (!stageData) return;

      steps.forEach(s => {
        s.classList.remove('active');
        if (s !== step && s.innerText.trim() === 'Deploy') {
          s.classList.remove('step-hl');
          s.style.background = 'var(--gesso-canvas)';
          s.style.color = 'var(--gesso-fg-muted)';
        }
      });

      step.classList.add('active');

      // Update Inspector Panel with smooth fade
      const container = document.getElementById('flow-stage-details');
      if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(4px)';
        setTimeout(() => {
          if (titleEl) titleEl.textContent = stageData.title;
          if (descEl) descEl.textContent = stageData.desc;
          if (metaEl) metaEl.textContent = stageData.meta;
          if (metricEl) metricEl.textContent = stageData.metric;
          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        }, 120);
      }
    });
  });
}



// 4. Modal Dialog & Toast System
function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const openTriggers = document.querySelectorAll('[data-open-demo-modal], a[href="#contact"]');
  const closeTriggers = document.querySelectorAll('[data-close-demo-modal]');
  const form = document.getElementById('demo-form');

  if (!modal) return;

  const openModal = (e) => {
    // If user clicked link on an inner page like contact.html, allow normal navigation if needed
    if (e && e.target && e.target.getAttribute('href') === 'contact.html') {
      return;
    }
    if (e) e.preventDefault();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openTriggers.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeTriggers.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Thank you. A Kynqel enterprise advisor will contact you within 2 hours.');
      form.reset();
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('kynqel-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'kynqel-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:#149343">●</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// 5. Active route indicator
function initCurrentPageActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === '#')) {
      link.classList.add('active');
    }
  });
}

// 6. Interactive 3D Exploded Software Engineering Architecture Mockup
function initExplodedArchitectureMockup() {
  const chassis = document.getElementById('hero-software-chassis');
  const stack = document.getElementById('software-stack');
  const glare = document.getElementById('hero-glare');
  const hoverStatusText = document.querySelector('.hover-status-text');
  const planes = document.querySelectorAll('.software-plane');

  if (!chassis || !stack) return;

  // Touch and Keyboard toggle support
  chassis.addEventListener('click', (e) => {
    // If on a touch device without hover capability
    if (window.matchMedia('(hover: none)').matches) {
      const isExploded = chassis.classList.toggle('is-exploded');
      if (hoverStatusText) {
        hoverStatusText.textContent = isExploded ? 'Exploded 3D' : 'Tap to Explode';
      }
    }
  });

  planes.forEach(plane => {
    plane.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isExploded = chassis.classList.toggle('is-exploded');
        if (hoverStatusText) {
          hoverStatusText.textContent = isExploded ? 'Exploded 3D Active' : 'Hover to Explode';
        }
      }
    });
  });

  // Smooth Interactive Tilt Physics (with Spring Interpolation)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) {
    return;
  }

  let bounds = chassis.getBoundingClientRect();
  const updateBounds = () => {
    bounds = chassis.getBoundingClientRect();
  };
  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds, { passive: true });

  const BASE_ROT_X = 24;
  const BASE_ROT_Y = -18;
  const BASE_ROT_Z = 1;

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let rafId = null;
  let isHovered = false;

  function renderTilt() {
    currentRotX += (targetRotX - currentRotX) * 0.12;
    currentRotY += (targetRotY - currentRotY) * 0.12;

    const rx = (BASE_ROT_X + currentRotX).toFixed(2);
    const ry = (BASE_ROT_Y + currentRotY).toFixed(2);
    stack.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${BASE_ROT_Z}deg)`;

    if (Math.abs(targetRotX - currentRotX) > 0.01 || Math.abs(targetRotY - currentRotY) > 0.01 || isHovered) {
      rafId = requestAnimationFrame(renderTilt);
    } else {
      // Snapped back completely to exact resting rotation
      stack.style.transform = `rotateX(${BASE_ROT_X}deg) rotateY(${BASE_ROT_Y}deg) rotateZ(${BASE_ROT_Z}deg)`;
      rafId = null;
    }
  }

  chassis.addEventListener('mouseenter', () => {
    isHovered = true;
    if (hoverStatusText) {
      hoverStatusText.textContent = 'Exploded 3D Active';
    }
  });

  chassis.addEventListener('mousemove', (e) => {
    isHovered = true;
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

    targetRotX = -yPct * 7; // Max ±7 deg tilt
    targetRotY = xPct * 8;  // Max ±8 deg tilt

    if (glare) {
      chassis.style.setProperty('--glare-x', `${(mouseX / bounds.width * 100).toFixed(1)}%`);
      chassis.style.setProperty('--glare-y', `${(mouseY / bounds.height * 100).toFixed(1)}%`);
    }

    if (!rafId) {
      rafId = requestAnimationFrame(renderTilt);
    }
  });

  chassis.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    if (hoverStatusText) {
      hoverStatusText.textContent = 'Hover to Explode';
    }
    if (!rafId) {
      rafId = requestAnimationFrame(renderTilt);
    }
  });
}

// 8. Live Telemetry Ticker & Expandable Drawer
function initLiveTelemetryTicker() {
  const latencyEl = document.getElementById('telemetry-latency-val');
  const pill = document.getElementById('hero-telemetry-pill');
  if (!pill) return;

  // Latency micro-oscillation (11.8ms - 12.3ms)
  if (latencyEl) {
    const latencies = ['11.9ms', '12.1ms', '11.8ms', '12.2ms', '12.0ms', '11.7ms'];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % latencies.length;
      latencyEl.textContent = latencies[idx];
      latencyEl.style.color = '#149343';
      setTimeout(() => {
        latencyEl.style.color = 'var(--gesso-fg)';
      }, 600);
    }, 2400);
  }

  // Drawer Toggle
  pill.addEventListener('click', () => {
    const isExpanded = pill.classList.toggle('is-expanded');
    pill.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });

  pill.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isExpanded = pill.classList.toggle('is-expanded');
      pill.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }
  });
}

// 9. Animated Metric Counters
function initAnimatedMetricCounters() {
  const metricItems = document.querySelectorAll('.metric-val[data-counter]');
  if (!metricItems.length) return;

  let animated = false;

  const animateCounters = () => {
    metricItems.forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;

      const duration = 1400; // ms
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const ease = 1 - (1 - progress) * (1 - progress);
        const current = target * ease;

        const formatted = isDecimal ? current.toFixed(1) : Math.floor(current);
        el.innerHTML = `${prefix}${formatted}<span>${suffix}</span>`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.innerHTML = `${prefix}${target}<span>${suffix}</span>`;
        }
      };

      requestAnimationFrame(update);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const metricsRow = document.querySelector('.metrics-row');
  if (metricsRow) {
    observer.observe(metricsRow);
  }
}

// 10. Diagonal Solutions Card Stream Continuous News Ticker & Scroll Parallax
function initDiagonalCardStreamScroll() {
  const track = document.getElementById('solutions-stream-track');
  const section = document.getElementById('solutions');
  const viewport = document.getElementById('solutions-stream-viewport');
  const inners = document.querySelectorAll('.solutions-col-inner');
  if (!track || !section) return;

  // Smooth scroll tracking
  let targetScrollY = window.scrollY;
  let currentScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  function renderStream() {
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;

    const rect = section.getBoundingClientRect();
    const winH = window.innerHeight;

    // Check if section is anywhere near viewport
    if (rect.bottom > -200 && rect.top < winH + 200) {
      // Subtle scroll parallax on the angled track while columns tick continuously like news headlines
      const scrollProgress = (winH - rect.top) / (winH + rect.height);
      const translateY = (scrollProgress - 0.5) * 70;
      track.style.transform = `rotate(-18deg) scale(1.08) translate3d(0, ${translateY.toFixed(1)}px, 0)`;
    }

    requestAnimationFrame(renderStream);
  }

  requestAnimationFrame(renderStream);
}

// 11. Bento Grid & Pillars Dynamic Glass Spotlight & Micro-Tilt
function initBentoSpotlight() {
  const cards = document.querySelectorAll('.kynqel-bento-card, .pillar-bento-card');
  if (!cards.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) {
    return;
  }

  cards.forEach(card => {
    let bounds = card.getBoundingClientRect();
    const updateBounds = () => {
      bounds = card.getBoundingClientRect();
    };

    window.addEventListener('resize', updateBounds, { passive: true });
    window.addEventListener('scroll', updateBounds, { passive: true });

    card.addEventListener('mouseenter', () => {
      updateBounds();
    });

    card.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);

      // Gentle micro-tilt physics (max ±2.5 deg)
      const xPct = (mouseX / bounds.width - 0.5) * 2;
      const yPct = (mouseY / bounds.height - 0.5) * 2;
      const rotX = -yPct * 2.2;
      const rotY = xPct * 2.5;

      const isPillar = card.classList.contains('pillar-bento-card');
      const translateY = isPillar ? -6 : -8;
      const scale = isPillar ? 1.01 : 1.008;

      card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(${translateY}px) scale(${scale})`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// 12. Editorial Stagger Hero (Masked Line-by-Line Entrance)
function initEditorialStaggerHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  requestAnimationFrame(() => {
    setTimeout(() => {
      hero.classList.add('hero-stagger-ready');
    }, 60);
  });
}

// 13. Hero Parallax Layers (Headline & Insight Cards above slower Product Analytics Window)
function initHeroParallaxLayers() {
  const hero = document.querySelector('.hero');
  const foreground = document.querySelector('.hero-parallax-foreground');
  const midground = document.querySelector('.hero-parallax-midground');
  const insightTop = document.querySelector('.insight-top-card');
  const insightBottom = document.querySelector('.insight-bottom-card');

  if (!hero || !foreground || !midground) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  let scrollY = window.scrollY;
  let mouseX = 0;
  let mouseY = 0;

  function updateParallax() {
    const heroRect = hero.getBoundingClientRect();
    const winH = window.innerHeight;

    if (heroRect.bottom > 0 && heroRect.top < winH) {
      const fgScrollY = -scrollY * 0.16;
      const mgScrollY = scrollY * 0.10;
      const inScrollY = -scrollY * 0.24;

      const fgX = mouseX * 10;
      const fgY = mouseY * 8;
      const mgX = -mouseX * 12;
      const mgY = -mouseY * 9;
      const inX = mouseX * 18;
      const inY = mouseY * 14;

      foreground.style.transform = `translate3d(${fgX.toFixed(1)}px, ${(fgScrollY + fgY).toFixed(1)}px, 0)`;
      midground.style.transform = `translate3d(${mgX.toFixed(1)}px, ${(mgScrollY + mgY).toFixed(1)}px, 0)`;

      if (insightTop) {
        insightTop.style.transform = `translate3d(${inX.toFixed(1)}px, ${(inScrollY + inY).toFixed(1)}px, 0)`;
      }
      if (insightBottom) {
        insightBottom.style.transform = `translate3d(${(-inX * 0.8).toFixed(1)}px, ${(inScrollY - inY * 0.8).toFixed(1)}px, 0)`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// 14. Button: Rolling Text (Hover & Keyboard Focus-Visible duplicate label roll)
function initRollingTextButtons() {
  const buttons = document.querySelectorAll('.btn-rolling, .btn-island-primary, .btn-brand');

  buttons.forEach(btn => {
    if (!btn.querySelector('.btn-rolling-track')) {
      const textSpan = btn.querySelector('.btn-text');
      const text = textSpan ? textSpan.textContent.trim() : (btn.querySelector('span') ? btn.querySelector('span').textContent.trim() : btn.textContent.trim());
      if (!text) return;

      const rollingWrapper = document.createElement('span');
      rollingWrapper.className = 'btn-rolling-label';
      rollingWrapper.innerHTML = `
        <span class="btn-rolling-track">
          <span class="btn-rolling-text btn-rolling-front">${text}</span>
          <span class="btn-rolling-text btn-rolling-back" aria-hidden="true">${text}</span>
        </span>
      `;

      if (textSpan && textSpan.parentNode === btn) {
        btn.replaceChild(rollingWrapper, textSpan);
      } else if (!btn.querySelector('.btn-icon-chamber') && !btn.querySelector('svg')) {
        btn.innerHTML = '';
        btn.appendChild(rollingWrapper);
      }
    }

    btn.addEventListener('focus', () => {
      btn.classList.add('is-focused');
    });
    btn.addEventListener('blur', () => {
      btn.classList.remove('is-focused');
    });
  });
}

// 15. Feature Bento (Staggered Scroll-Triggered Reveals & Considered Micro-Interactions)
function initFeatureBento() {
  const cards = document.querySelectorAll('.feat-bento-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  cards.forEach((card, index) => {
    card.style.setProperty('--bento-idx', index);
    observer.observe(card);

    let bounds = card.getBoundingClientRect();
    const updateBounds = () => { bounds = card.getBoundingClientRect(); };

    window.addEventListener('resize', updateBounds, { passive: true });
    window.addEventListener('scroll', updateBounds, { passive: true });

    card.addEventListener('mouseenter', updateBounds);
    card.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const xPct = (mouseX / bounds.width - 0.5) * 2;
        const yPct = (mouseY / bounds.height - 0.5) * 2;
        const rotX = -yPct * 2.4;
        const rotY = xPct * 2.8;

        card.style.transform = `perspective(850px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale(1.008)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('is-revealed')) {
        card.style.transform = '';
      }
    });
  });
}

// 16. Feature Expand Bento (Shared-Element Layout Animation & Detail Dialog)
const featureDetails = {
  'swarms': {
    eyebrow: 'Cognition // Distributed Mesh',
    badge: '64 Agents Active',
    title: 'Autonomous Multi-Agent Cognitive Swarms',
    desc: 'High-concurrency neural agent swarms collaborating over peer-to-peer event fabrics with deterministic sub-12ms consensus and self-healing anomaly resolution.',
    metrics: [
      { val: '64 Pods', lbl: 'Active Swarm Agents' },
      { val: '11.8ms', lbl: 'P99 Latency SLA' },
      { val: '4.8 TB/s', lbl: 'Event Mesh Throughput' }
    ],
    blueprint: `[CLUSTER TOPOLOGY: MULTI-AGENT NEURAL SWARM]
├── Leader Node (Raft Consensus v2.4)
│   ├── gRPC Streaming Bus [4.8 TB/s Anycast]
│   └── Dynamic Task Dispatcher -> [P99 11.8ms]
├── Worker Nodes (64 Specialized Pods)
│   ├── Node 01-16: Vector HNSW Semantic Rerankers
│   ├── Node 17-32: FP8 Tensor Logic Synthesizers
│   └── Node 33-64: Autonomous Self-Healing Validators
└── Cryptographic Enclave [SOC-2 Type II Sealed]`
  },
  'silicon': {
    eyebrow: 'Hardware // Acceleration',
    badge: '-68% VRAM',
    title: 'FP8 Tensor Silicon Acceleration',
    desc: 'Bespoke custom FP8 tensor quantizations executing on dedicated hyperscaler matrix silicon with zero accuracy loss and massive cost reduction.',
    metrics: [
      { val: '-68%', lbl: 'Memory Footprint Reduction' },
      { val: '8.2ms', lbl: 'Mean Token Generation' },
      { val: '4.2k tok/s', lbl: 'Throughput Per Silicon Node' }
    ],
    blueprint: `[SILICON ACCELERATION & FP8 COMPUTE ARCHITECTURE]
├── Custom Kernel Dispatch (Triton / CUDA Hardware Shims)
├── Dynamic INT4/FP8 Mixed Precision Quantization Matrix
├── Zero Perplexity Degradation: Tested on 100M Enterprise Tokens
└── Power-to-Inference Efficiency: 3.4x Performance / Watt`
  },
  'vector': {
    eyebrow: 'Storage // Vector Fabric',
    badge: '10M+ Embeddings',
    title: 'Deterministic Vector Memory Fabric',
    desc: 'High-dimensional vector indexing using HNSW graph topologies, ensuring sub-4ms nearest-neighbor recall across petabyte-scale enterprise document corpuses.',
    metrics: [
      { val: '10M+', lbl: 'Dense Vector Embeddings' },
      { val: '3.8ms', lbl: 'Cosine Similarity Recall' },
      { val: '48,000', lbl: 'Max QPS Under Load' }
    ],
    blueprint: `[VECTOR MEMORY FABRIC: DISTRIBUTED HNSW GRAPH]
├── Sharded Vector Memory (16-Way Partitioning)
├── Cosine Distance Accelerator with Hardware SIMD AVX-512
├── Zero Memory Drift: Continuous Index Compaction
└── Hybrid Keyword + Dense Semantic Cross-Attention Gateway`
  },
  'enclave': {
    eyebrow: 'Security // Zero Trust',
    badge: 'SOC-2 Type II',
    title: 'Zero-Trust Cryptographic Enclaves',
    desc: 'Confidential computing enclaves isolating proprietary model weights, enterprise prompt payloads, and client telemetry from host OS inspection.',
    metrics: [
      { val: '0 Breaches', lbl: 'Lifetime Security SLA' },
      { val: 'AES-256-GCM', lbl: 'Hardware Level Encryption' },
      { val: '100%', lbl: 'Confidential Hardware Sealed' }
    ],
    blueprint: `[CRYPTOGRAPHIC ENCLAVE: ISOLATED HARDWARE ENCLAVE]
├── AMD SEV-SNP / Intel SGX Verified Hardware Memory Boundary
├── TLS 1.3 End-to-End Encrypted Attestation
├── Ephemeral Key Management with Auto-Zeroize On Tamper
└── Continuous SOC-2 Type II & HIPAA Audit Telemetry Stream`
  },
  'mesh': {
    eyebrow: 'Infrastructure // Cloud Mesh',
    badge: '99.999% Uptime',
    title: 'Self-Healing Distributed Cloud Mesh',
    desc: 'Automated failover topology dynamically re-routing degraded compute nodes across multi-cloud regions without dropping in-flight state.',
    metrics: [
      { val: '99.999%', lbl: 'Anycast Global Uptime' },
      { val: '< 90ms', lbl: 'Automated Pod Failover' },
      { val: '48 Tbps', lbl: 'Global Cloud Mesh Grid' }
    ],
    blueprint: `[DISTRIBUTED CLOUD MESH: AUTONOMOUS ROUTING]
├── Dynamic Anycast BGP Routing Across 14 Global Edge Points
├── Real-Time Health Probing with Sub-10ms Heartbeat
├── Packet-Loss Zeroization with ECN Congestion Control
└── Autonomous Drain & Rebalance upon Anomalous SLA Spikes`
  },
  'squads': {
    eyebrow: 'Talent Model // Principal Squads',
    badge: '< 5d Deployment',
    title: 'Autonomous Enterprise Squad Assembly',
    desc: 'Elite digital delivery pods assembled from the top 1.2% STEM engineering intake, paired with battle-tested principal directors to eliminate ramp-up drag.',
    metrics: [
      { val: '< 5 Days', lbl: 'Time to Full Deployment' },
      { val: '4.2x', lbl: 'Sprint Velocity Gain' },
      { val: '100%', lbl: 'Tier-1 Certified Engineers' }
    ],
    blueprint: `[TALENT PIPELINE ARCHITECTURE: MISSION-CRITICAL PODS]
├── Rigorous 36-Hour Systems Engineering Asynchronous Filter
├── 16-Week Production Immersion (Distributed Systems & AI)
├── Senior Principal Lead Pairing (Average 12+ Years Experience)
└── Direct Integration into Client Jira / GitHub / Slack Pods`
  }
};

function initFeatureExpandBento() {
  const cards = document.querySelectorAll('.feat-bento-card');
  const overlay = document.getElementById('feat-expand-overlay');
  const dialog = document.getElementById('feat-expand-dialog');
  const backdrop = document.getElementById('feat-expand-backdrop');
  const closeBtn = document.getElementById('feat-expand-close');

  if (!cards.length || !overlay || !dialog) return;

  let activeCard = null;
  let isAnimating = false;

  const expandCard = (card) => {
    if (isAnimating) return;
    isAnimating = true;
    activeCard = card;

    const key = card.dataset.featureKey || 'swarms';
    const data = featureDetails[key] || featureDetails['swarms'];

    const elEyebrow = document.getElementById('feat-dialog-eyebrow');
    const elBadge = document.getElementById('feat-dialog-badge');
    const elTitle = document.getElementById('feat-dialog-title');
    const elDesc = document.getElementById('feat-dialog-desc');
    const elBlueprint = document.getElementById('feat-dialog-blueprint');

    if (elEyebrow) elEyebrow.textContent = data.eyebrow;
    if (elBadge) elBadge.textContent = data.badge;
    if (elTitle) elTitle.textContent = data.title;
    if (elDesc) elDesc.textContent = data.desc;
    if (elBlueprint) elBlueprint.textContent = data.blueprint;

    const metricsContainer = document.getElementById('feat-dialog-metrics');
    if (metricsContainer) {
      metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="feat-metric-card">
          <span class="feat-metric-val">${m.val}</span>
          <span class="feat-metric-lbl">${m.lbl}</span>
        </div>
      `).join('');
    }

    const rect = card.getBoundingClientRect();

    dialog.style.transition = 'none';
    dialog.style.top = `${rect.top}px`;
    dialog.style.left = `${rect.left}px`;
    dialog.style.width = `${rect.width}px`;
    dialog.style.height = `${rect.height}px`;
    dialog.style.transform = 'none';
    dialog.style.opacity = '0.7';
    dialog.style.borderRadius = '26px';

    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      dialog.style.transition = 'all 420ms cubic-bezier(0.16, 1, 0.3, 1)';
      
      const targetWidth = Math.min(880, window.innerWidth * 0.92);
      const targetHeight = Math.min(680, window.innerHeight * 0.86);
      const targetLeft = (window.innerWidth - targetWidth) / 2;
      const targetTop = Math.max(20, (window.innerHeight - targetHeight) / 2);

      dialog.style.top = `${targetTop}px`;
      dialog.style.left = `${targetLeft}px`;
      dialog.style.width = `${targetWidth}px`;
      dialog.style.height = `${targetHeight}px`;
      dialog.style.opacity = '1';
      dialog.style.borderRadius = '28px';

      setTimeout(() => {
        isAnimating = false;
        closeBtn?.focus();
      }, 430);
    });
  };

  const collapseDialog = () => {
    if (isAnimating || !activeCard) return;
    isAnimating = true;

    const rect = activeCard.getBoundingClientRect();

    dialog.style.transition = 'all 380ms cubic-bezier(0.16, 1, 0.3, 1)';
    dialog.style.top = `${rect.top}px`;
    dialog.style.left = `${rect.left}px`;
    dialog.style.width = `${rect.width}px`;
    dialog.style.height = `${rect.height}px`;
    dialog.style.opacity = '0.5';
    dialog.style.borderRadius = '26px';

    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(() => {
      isAnimating = false;
      dialog.style.transition = '';
      activeCard.focus();
      activeCard = null;
    }, 390);
  };

  cards.forEach(card => {
    card.addEventListener('click', () => expandCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        expandCard(card);
      }
    });
  });

  closeBtn?.addEventListener('click', collapseDialog);
  backdrop?.addEventListener('click', collapseDialog);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      collapseDialog();
    }
  });

  const tabBtns = document.querySelectorAll('.feat-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const tabKey = btn.dataset.tab;
      const bp = document.getElementById('feat-dialog-blueprint');
      if (bp && activeCard) {
        const key = activeCard.dataset.featureKey || 'swarms';
        const data = featureDetails[key] || featureDetails['swarms'];
        if (tabKey === 'overview') {
          bp.textContent = data.blueprint;
        } else if (tabKey === 'sla') {
          bp.textContent = `[SLA & PERFORMANCE COMPLIANCE]\n• Maximum Latency: Guaranteed < 12ms P99 SLA\n• Availability Target: 99.999% Triple Anycast Redundancy\n• Support Tier: 24/7 Dedicated Principal Lead Escalation\n• Audit Certification: ISO-27001 & SOC-2 Type II Continuous Verified`;
        } else {
          bp.textContent = `[ARCHITECTURE SPECIFICATIONS]\n• Protocol: gRPC / Protocol Buffers v3 with FP8 Payload Shims\n• Deployment: Kubernetes CRD / Helm Charts with zero-downtime rolling updates\n• Observability: OpenTelemetry Traces + Prometheus Microsecond Profiling\n• Compliance: Hardware Cryptographic SEV-SNP Enclave Sealed`;
        }
      }
    });
  });
}


// 18. Footer: Sticky Reveal (Motion for React physics: fades and scales in as scroll uncovers it)
function initStickyFooterReveal() {
  const footer = document.querySelector('footer.sticky-reveal-footer');
  const mainContent = document.getElementById('main-content');
  if (!footer || !mainContent) return;

  let ticking = false;

  const updateStickyFooter = () => {
    ticking = false;
    const mainRect = mainContent.getBoundingClientRect();
    const winH = window.innerHeight;
    const footerH = footer.offsetHeight || 420;

    // How many pixels of footer are uncovered by main content
    const uncoveredPx = winH - mainRect.bottom;

    if (uncoveredPx <= 0) {
      // Completely hidden behind main content
      footer.style.transform = 'translate3d(0, 36px, 0) scale(0.88)';
      footer.style.opacity = '0.12';
    } else {
      // Uncovering: calculate progress from 0 to 1
      const rawProgress = Math.min(1, Math.max(0, uncoveredPx / footerH));
      
      // Smooth ease-out power curve for Motion for React organic physics
      const easeProgress = 1 - Math.pow(1 - rawProgress, 2);

      const scale = 0.88 + (easeProgress * 0.12);
      const opacity = 0.12 + (easeProgress * 0.88);
      const translateY = (1 - easeProgress) * 36;

      footer.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
      footer.style.opacity = opacity.toFixed(3);
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateStickyFooter);
    }
  };

  // Initial calculation on load
  updateStickyFooter();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateStickyFooter, { passive: true });
}

