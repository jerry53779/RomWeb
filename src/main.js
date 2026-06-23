import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let activeTimelines = [];

// ========================================================
// 1. SHIELD PRELOADER & DOM INITIALIZATION
// ========================================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
  }

  init();
});

function init() {
  initLenis();
  buildAnimations();
  initCountdown();
  initQuiz();
  initProposal();
  initCanvasHearts();
  initAudioPlayer();

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('Recalculating ScrollTrigger coordinates...');
      ScrollTrigger.refresh();
    }, 200);
  });
}

/**
 * 2. INITIALIZE LENIS SMOOTH SCROLLING
 */
function initLenis() {
  // Rely on native browser scrolling to prevent momentum glide / autoscroll.
  console.log("Using native browser scroll for 1-to-1 interactive responsiveness.");
}

/**
 * 3. MASTER CHAPTER TIMELINE WITH SCROLL-DRIVEN TRANSITIONS
 */
function buildAnimations() {
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  ScrollTrigger.config({
    limitCallbacks: true,
  });

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#story-container',
      start: 'top top',
      end: '+=1050%', // 8 chapters * 1.5 dur/weight = approx 10.5 total timeline duration
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      snap: {
        snapTo: [
          0,
          1.5 / 18.1,
          3.8 / 18.1,
          6.1 / 18.1,
          8.4 / 18.1,
          10.7 / 18.1,
          13.0 / 18.1,
          15.3 / 18.1,
          1.0
        ],
        duration: { min: 0.3, max: 0.7 },
        delay: 0.15,
        ease: 'power2.out'
      }
    }
  });

  // CHAPTER 1: THE GLANCE (#glance)
  masterTl
    .to('#glance .story-bg', { scale: 1.12, y: -20, ease: 'none', duration: 1.5 })
    .from('#glance .story-content span, #glance .story-content h2, #glance .story-content div.h-1, #glance .story-content p, #glance .countdown-panel', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      duration: 1.0
    }, '<')

    // TRANSITION 1 -> 2
    .to('#glance .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#glance', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#blush', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#blush .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 2: THE BLUSH (#blush)
    .to('#blush .story-bg', { scale: 1.12, y: -20, ease: 'none', duration: 1.5 })
    .from('#blush .cherry-branch', { x: -60, y: -30, opacity: 0, ease: 'power2.out', duration: 1.2 }, '<')
    .from('#blush .petals-group path', {
      x: 100,
      y: -100,
      rotation: -45,
      opacity: 0,
      stagger: 0.06,
      ease: 'power1.out',
      duration: 1.2
    }, '<')
    .from('#blush .story-content span, #blush .story-content h2, #blush .story-content div.h-1, #blush .story-content p', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      duration: 1.0
    }, '<+0.2')

    // TRANSITION 2 -> 3
    .to('#blush .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#blush', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#wait', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#wait .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 3: THE WAIT (#wait)
    .to('#wait .story-bg', { scale: 1.08, ease: 'none', duration: 1.5 })
    .from('#wait .constellations line', { strokeDasharray: '100', strokeDashoffset: '100', opacity: 0, stagger: 0.08, ease: 'power1.inOut', duration: 1.2 }, '<')
    .from('#wait .constellations circle', { scale: 0, opacity: 0, stagger: 0.06, ease: 'back.out(2)', duration: 1.0 }, '<+0.2')
    .from('#wait .story-content span, #wait .story-content h2, #wait .story-content div.h-1, #wait .story-content p', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      duration: 1.0
    }, '<+0.2')

    // TRANSITION 3 -> 4
    .to('#wait .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#wait', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#sign', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#sign .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 4: A SIGN (#sign)
    .to('#sign .story-bg', { scale: 1.12, y: 15, ease: 'none', duration: 1.5 })
    .from('#sign .light-rays path', { scale: 0.8, opacity: 0, transformOrigin: '960px 1080px', stagger: 0.04, ease: 'power1.out', duration: 1.2 }, '<')
    .from('#sign .story-content span, #sign .story-content h2, #sign .story-content div.h-1, #sign .story-content p', {
      scale: 0.95,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
      duration: 1.0
    }, '<+0.2')

    // TRANSITION 4 -> 5
    .to('#sign .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#sign', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#hand', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#hand .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 5: YOUR HAND (#hand)
    .to('#hand .story-bg', { scale: 1.05, y: -15, ease: 'none', duration: 1.5 })
    .from('#hand .meadow-grass path', { rotation: -8, transformOrigin: 'bottom center', opacity: 0.4, stagger: 0.04, ease: 'power1.inOut', duration: 1.2 }, '<')
    .from('#hand .romantic-card', { y: 100, opacity: 0, ease: 'power2.out', duration: 1.0 }, '<+0.2')

    // TRANSITION 5 -> 6
    .to('#hand .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#hand', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#one', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#one .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 6: AS ONE (#one)
    .to('#one .story-bg', { scale: 1.08, rotation: 0.5, ease: 'none', duration: 1.5 })
    .from('#one .glow-bulb', { scale: 0, opacity: 0, transformOrigin: 'center center', stagger: 0.05, ease: 'back.out(2)', duration: 1.2 }, '<')
    .from('#one .romantic-card', { y: 100, opacity: 0, ease: 'power2.out', duration: 1.0 }, '<+0.2')

    // TRANSITION 6 -> 7
    .to('#one .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#one', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#cafe', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#cafe .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 7: THE CAFÉ (#cafe)
    .to('#cafe .story-bg', { scale: 1.05, y: -5, ease: 'none', duration: 1.5 })
    .from('#cafe .steam-line', { y: 40, strokeDasharray: '40', strokeDashoffset: '40', opacity: 0, stagger: 0.08, ease: 'power1.out', duration: 1.2 }, '<')
    .from('#cafe .romantic-card', { y: 100, opacity: 0, ease: 'power2.out', duration: 1.0 }, '<+0.2')

    // TRANSITION 7 -> 8
    .to('#cafe .story-content', { y: -60, opacity: 0, ease: 'power2.in', duration: 0.6 })
    .to('#cafe', { opacity: 0, visibility: 'hidden', ease: 'power2.in', duration: 0.6 }, '<')
    .to('#silence', { opacity: 1, visibility: 'visible', ease: 'power2.out', duration: 0.6 }, '<+0.2')
    .fromTo('#silence .story-content', { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, '<')

    // CHAPTER 8: SILENCE (#silence)
    .to('#silence .story-bg', { scale: 1.08, y: -10, ease: 'none', duration: 2.0 })
    .from('#silence .full-moon', { scale: 0.85, opacity: 0.6, ease: 'power2.out', duration: 1.5 }, '<')
    .from('#silence .romantic-card', { y: 100, opacity: 0, ease: 'power2.out', duration: 1.2 }, '<+0.2');

  activeTimelines.push(masterTl);
}

/**
 * 4. RELATIONSHIP COUNTDOWN WIDGET (CHAPTER 1)
 */
function initCountdown() {
  const currentYear = new Date().getFullYear();
  const anniversaryDate = new Date(`${currentYear - 1}-06-23T09:30:00`).getTime();

  function updateTicker() {
    const now = new Date().getTime();
    const distance = now - anniversaryDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.innerText = days.toString().padStart(2, '0');
    if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
    if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
    if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
  }

  updateTicker();
  setInterval(updateTicker, 1000);
}

/**
 * 5. INTERACTIVE CONNECTION QUIZ (CHAPTER 5)
 */
const quizQuestions = [
  {
    question: "Where did we share our very first glance?",
    options: ["A crowded train station platform", "A cozy coffee shop corner", "A rainy library aisle", "A sunny park bench"],
    answer: 0
  },
  {
    question: "Which season defines our second cherry-blossom chapter?",
    options: ["Golden-hour autumn sunset", "Soft pastel spring", "Cosmic starry night-sky", "Warm summer flower fields"],
    answer: 1
  },
  {
    question: "What marks our cozy conversations inside the café?",
    options: ["A handwritten letter", "Espresso coffee cup steam", "A glowing compass ring", "Hanging paper lanterns"],
    answer: 1
  },
  {
    question: "What is our ultimate language of comfortable affection?",
    options: ["Writing notes in bottles", "Holding hands silently", "Serene comfort without words", "Speaking coffee secrets"],
    answer: 2
  }
];

let currentQuizIndex = 0;
let quizScore = 0;

function initQuiz() {
  const container = document.getElementById('quiz-options');
  const questionText = document.getElementById('quiz-question-text');
  const questionNum = document.getElementById('quiz-question-num');
  const livesVal = document.getElementById('quiz-lives');
  const resultBox = document.getElementById('quiz-result-container');
  const questionBox = document.getElementById('quiz-question-container');
  const scoreSpan = document.getElementById('quiz-score');
  const msgText = document.getElementById('quiz-message');
  const restartBtn = document.getElementById('quiz-restart');

  function renderQuestion() {
    if (!container || !questionText || !questionNum || !livesVal) return;

    container.innerHTML = '';
    const q = quizQuestions[currentQuizIndex];
    questionNum.innerText = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;
    questionText.innerText = q.question;

    livesVal.innerText = `${Math.round((currentQuizIndex / quizQuestions.length) * 100)}%`;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full text-left p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all text-xs md:text-sm text-slate-200';
      btn.innerText = opt;
      btn.addEventListener('click', () => handleAnswer(idx));
      container.appendChild(btn);
    });
  }

  function handleAnswer(selectedIdx) {
    const q = quizQuestions[currentQuizIndex];
    if (selectedIdx === q.answer) {
      quizScore++;
    }

    currentQuizIndex++;

    if (currentQuizIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    if (!questionBox || !resultBox || !scoreSpan || !msgText || !livesVal) return;

    questionBox.classList.add('hidden');
    resultBox.classList.remove('hidden');

    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    scoreSpan.innerText = pct;
    livesVal.innerText = '100%';

    let msg = '';
    if (pct === 100) {
      msg = "You know my heart perfectly! We share the ultimate soulmate connection. ❤️";
    } else if (pct >= 75) {
      msg = "We are beautifully aligned! Every silent gaze is deeply understood between us. 💕";
    } else {
      msg = "A sweet connection. Let's scroll through our story again to align our heartbeats.";
    }
    msgText.innerText = msg;
  }

  function resetQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    if (questionBox && resultBox) {
      questionBox.classList.remove('hidden');
      resultBox.classList.add('hidden');
      renderQuestion();
    }
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', resetQuiz);
  }

  renderQuestion();
}

/**
 * 6. RUNAWAY PROPOSAL WIDGET (CHAPTER 8)
 */
function initProposal() {
  const noBtn = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  const successBox = document.getElementById('proposal-success');
  const buttonArea = document.getElementById('proposal-buttons-area');

  if (!noBtn || !yesBtn || !successBox || !buttonArea) return;

  document.addEventListener('mousemove', (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 65) {
      const areaRect = buttonArea.getBoundingClientRect();
      const maxX = areaRect.width - rect.width - 20;
      const maxY = areaRect.height - rect.height - 10;

      const randomX = Math.max(10, Math.random() * maxX);
      const randomY = Math.max(5, Math.random() * maxY);

      noBtn.style.position = 'absolute';
      noBtn.style.left = `${randomX}px`;
      noBtn.style.top = `${randomY}px`;
    }
  });

  yesBtn.addEventListener('click', () => {
    successBox.classList.remove('hidden');
    noBtn.classList.add('hidden');

    triggerHeartsExplosion();
    playSweetChime();
  });
}

/**
 * 7. WEB AUDIO API ROMANTIC CHIME SYNTHESIZER
 */
function playSweetChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [659.25, 830.61, 987.77, 1318.51];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + index * 0.15);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + index * 0.15 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.15 + 0.9);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + index * 0.15 + 1.0);
    });
  } catch (err) {
    console.warn("AudioContext blocked.", err);
  }
}

/**
 * 8. INTERACTIVE CANVAS HEARTS BACKGROUND
 */
let canvas = null;
let ctx = null;
let particles = [];
let mouse = { x: -9999, y: -9999 };

function initCanvasHearts() {
  canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const maxParticles = 40;
  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle());
  }

  requestAnimationFrame(tickCanvas);
}

function createParticle(x = null, y = null, isHeartBurst = false) {
  const canvasW = canvas ? canvas.width : window.innerWidth;
  const canvasH = canvas ? canvas.height : window.innerHeight;

  return {
    x: x !== null ? x : Math.random() * canvasW,
    y: y !== null ? y : Math.random() * canvasH + canvasH,
    size: Math.random() * 8 + 4,
    speedX: isHeartBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 1.5,
    speedY: isHeartBurst ? (Math.random() - 0.7) * 8 : -(Math.random() * 1.5 + 0.8),
    opacity: Math.random() * 0.5 + 0.25,
    type: Math.random() > 0.4 ? 'heart' : 'petal',
    color: Math.random() > 0.5 ? '#f472b6' : '#ec4899',
    wiggle: Math.random() * 100,
    wiggleSpeed: Math.random() * 0.05 + 0.02
  };
}

function tickCanvas() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, idx) => {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(p.wiggle) * 0.3;
    p.wiggle += p.wiggleSpeed;

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 120) {
      const forceX = dx / distance;
      const forceY = dy / distance;
      const strength = (120 - distance) / 120;
      p.x += forceX * strength * 4;
      p.y += forceY * strength * 4;
    }

    if (p.y < -30 || p.x < -30 || p.x > canvas.width + 30) {
      particles[idx] = createParticle(null, null, false);
      return;
    }

    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    if (p.type === 'heart') {
      drawHeart(ctx, p.x, p.y, p.size);
    } else {
      drawPetal(ctx, p.x, p.y, p.size);
    }
    ctx.restore();
  });

  requestAnimationFrame(tickCanvas);
}

function drawHeart(c, x, y, size) {
  c.beginPath();
  c.moveTo(x, y + size / 4);
  c.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y + size / 4);
  c.bezierCurveTo(x - size, y + size * 0.9, x, y + size * 1.3, x, y + size * 1.5);
  c.bezierCurveTo(x, y + size * 1.3, x + size, y + size * 0.9, x + size, y + size / 4);
  c.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y + size / 4);
  c.closePath();
  c.fill();
}

function drawPetal(c, x, y, size) {
  c.beginPath();
  c.ellipse(x, y, size * 0.7, size, Math.PI / 4, 0, Math.PI * 2);
  c.fill();
}

function triggerHeartsExplosion() {
  if (!canvas) return;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < 90; i++) {
    particles.push(createParticle(centerX, centerY, true));
  }
}

/**
 * 9. CLEANUP MEMORY DISPOSAL HOOK
 */
function cleanup() {
  console.log('Cleaning up active chapter timelines and Lenis integrations...');
  activeTimelines.forEach((timeline) => {
    if (timeline) timeline.kill();
  });
  activeTimelines = [];

  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill(true);
  });

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

function initAudioPlayer() {
  const musicPlayer = document.getElementById('music-player');
  const bgAudio = document.getElementById('bg-audio');
  const iconPlaying = document.getElementById('music-icon-playing');
  const iconPaused = document.getElementById('music-icon-paused');

  if (musicPlayer && bgAudio) {
    musicPlayer.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          iconPlaying.classList.remove('hidden');
          iconPaused.classList.add('hidden');
        }).catch(err => {
          console.warn("Audio play blocked by browser:", err);
        });
      } else {
        bgAudio.pause();
        iconPlaying.classList.add('hidden');
        iconPaused.classList.remove('hidden');
      }
    });
  }
}

window.cleanupAntigravity = cleanup;
