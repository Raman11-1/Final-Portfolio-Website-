// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(sec => navObserver.observe(sec));

// ===== Terminal log-stream animation (hero signature) =====
const logLines = [
  { text: '[BOOT] initializing raman_mankar.dev ...', cls: 'info' },
  { text: '[INFO] role: AI-Focused Python Developer', cls: 'info' },
  { text: '[INFO] loaded module: SkillOpt — self-optimizing log classifier', cls: 'info' },
  { text: '[METRIC] validation_accuracy: +18% on unseen firmware logs', cls: 'metric' },
  { text: '[METRIC] pipeline_throughput: +20% via document-in-document trigger', cls: 'metric' },
  { text: '[INFO] status: MTech CSE @ IIT Hyderabad, in progress', cls: 'info' },
  { text: '[READY] scroll to explore \u2192', cls: 'info' },
];

const logStream = document.getElementById('logStream');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLog() {
  logStream.textContent = '';
  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= logLines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'log-cursor';
      cursor.textContent = '\u00A0';
      logStream.appendChild(cursor);
      return;
    }
    const line = logLines[lineIndex];
    const span = document.createElement('span');
    span.className = line.cls;
    logStream.appendChild(span);

    let charIndex = 0;
    const speed = 16;
    (function typeChar() {
      if (charIndex < line.text.length) {
        span.textContent += line.text[charIndex];
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        logStream.appendChild(document.createTextNode('\n'));
        lineIndex++;
        setTimeout(typeNextLine, 220);
      }
    })();
  }
  typeNextLine();
}

if (prefersReducedMotion) {
  logStream.textContent = logLines.map(l => l.text).join('\n');
} else if (logStream) {
  typeLog();
}

// ===== Contact form =====
// Submits to Formspree (https://formspree.io) — no backend of your own needed.
//
// SETUP (one-time, ~5 minutes):
//   1. Go to https://formspree.io and create a free account.
//   2. Create a new form, copy the form ID it gives you (looks like "xnqpvwa").
//   3. In index.html, find the <form id="contactForm" ...> tag and replace
//      YOUR_FORM_ID in its action="https://formspree.io/f/YOUR_FORM_ID" with
//      that ID. That's it — submissions land in your inbox from then on.
//
// Until that's done (or if the request fails for any reason — offline, ad
// blocker, etc.), this falls back to opening the visitor's email client with
// a pre-filled draft, so the form never just silently fails.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const formSubmitBtn = contactForm.querySelector('.form-submit');

function mailtoFallback(name, email, message) {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:ramanrsm123@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Couldn't reach the form service — opening your email client instead.";
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const actionUrl = contactForm.getAttribute('action') || '';

  // Formspree endpoint not configured yet — go straight to the fallback.
  if (!actionUrl || actionUrl.includes('YOUR_FORM_ID')) {
    mailtoFallback(name, email, message);
    return;
  }

  formSubmitBtn.disabled = true;
  formSubmitBtn.textContent = 'Sending…';
  formNote.textContent = '';

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    });

    if (response.ok) {
      formNote.textContent = "Message sent — I'll get back to you soon.";
      contactForm.reset();
    } else {
      mailtoFallback(name, email, message);
    }
  } catch (err) {
    mailtoFallback(name, email, message);
  } finally {
    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = 'Send message';
  }
});
