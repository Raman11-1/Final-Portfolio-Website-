(function () {
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const widget = document.getElementById('chatWidget');

  // Keep a short rolling history so follow-up questions have context.
  // Capped client-side too — the server also trims this, this just avoids
  // sending an ever-growing payload as a conversation goes on.
  let history = [];
  const MAX_TURNS = 6;

  function openPanel() {
    widget.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    input.focus();
  }

  function closePanel() {
    widget.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', () => {
    widget.classList.contains('open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('open')) closePanel();
  });

  function addMessage(text, who) {
    const el = document.createElement('div');
    el.className = `chat-msg chat-msg-${who}`;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function addTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg-bot chat-msg-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    const typingEl = addTypingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });

      const data = await response.json().catch(() => ({}));
      typingEl.remove();

      if (!response.ok || !data.answer) {
        addMessage(
          data.error === 'Chat is not configured yet'
            ? "This chat isn't switched on yet — feel free to use the contact form below instead."
            : "Something went wrong on my end — try again, or use the contact form below.",
          'bot'
        );
      } else {
        addMessage(data.answer, 'bot');
        history.push({ role: 'user', content: question });
        history.push({ role: 'assistant', content: data.answer });
        history = history.slice(-MAX_TURNS * 2);
      }
    } catch (err) {
      typingEl.remove();
      addMessage("Couldn't reach the chat service — try again, or use the contact form below.", 'bot');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });
})();
