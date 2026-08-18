# Raman Mankar — Portfolio Website

Static site (HTML/CSS/JS) plus one small serverless function that powers a
resume-grounded chat assistant.

```
index.html        all page content (sections are labelled with comments)
style.css         design system + layout, including the chat widget
script.js         nav, scroll-reveal, terminal typing effect, contact form
chat-widget.js    the "Ask about Raman" chat panel — calls /api/chat
api/chat.js       serverless function: calls Mistral, holds the API key
api/_knowledge.js the plain-text resume/project info the chat answers from
assets/           profile photo (+ a spare copy of the resume PDF, unused)
package.json      lets Vercel detect the Node version for the function
.env.example      documents the one env var the function needs, no real key in it
```

The "Resume ↗" button in the header links straight to your Google Drive file
(view-only, opens in a new tab). If you'd rather host the PDF yourself, swap
that `<a>` in `index.html`'s nav back to `assets/Raman_Mankar_Resume.pdf` and
add the `download` attribute — the file's already sitting in `assets/`.

## Adding more projects later

Open `index.html`, search for `PROJECTS`. Copy an existing `<article
class="project-card">` block, edit the `<h3>`, `<p>`, and `<li>` tag list,
and drop it in wherever you want it in the grid.

## Contact form

Submits to [Formspree](https://formspree.io) (free, already wired up and
live) — see the `<form id="contactForm" ... action="...">` tag in
`index.html` if you ever need to point it at a different Formspree form. If
the request ever fails (offline, ad blocker, etc.) it falls back to opening
the visitor's email client with a pre-filled draft, so it never just
silently fails. There's also a hidden honeypot field (`_gotcha`) catching a
chunk of spam bots for free.

## The chat assistant — how it works

A visitor types a question in the widget → `chat-widget.js` sends it to
`/api/chat` → that serverless function adds your resume/project info
(`api/_knowledge.js`) as a system prompt, calls the Mistral API, and returns
the answer. The Mistral API key never touches the browser — it only exists
as a server-side environment variable.

The whole knowledge base is one plain-text file (`api/_knowledge.js`), not a
vector database — your resume + project write-ups are small enough (~1,500
words) to just hand the model the entire thing on every question, so nothing
gets missed by imperfect retrieval. **Whenever you update your resume or add
a project, update that file too** — it's a separate copy of the content, not
auto-synced with the rest of the site.

## Deploying — Vercel (needed for the chat function)

GitHub Pages can't run the serverless function, so this needs a host that
does. Vercel's free tier covers both the static site and the function in one
place:

1. Push this whole folder to a GitHub repo.
2. Go to vercel.com → **Add New → Project** → import that repo. Leave the
   build settings as default (no framework, static + `/api` is
   auto-detected) → **Deploy**.
3. Once deployed: **Project → Settings → Environment Variables** → add one:
   - Key: `MISTRAL_API_KEY`
   - Value: your Mistral API key
   - Environment: Production (and Preview, if you want it working on preview
     deploys too)
4. **Deployments → (latest) → ⋯ → Redeploy** so the function picks up the
   new variable (env vars only apply to deployments made after they're set).
5. Open the live site, click the chat bubble bottom-right, ask it something.

Every future `git push` to `main` auto-redeploys. Custom domain: **Settings
→ Domains** on the Vercel project.

If you'd rather not run the chat feature at all, this also works as a plain
static site on GitHub Pages or Netlify — the chat widget just won't have a
function to call, and shows a friendly "not switched on yet" message instead
of erroring.

## Security notes

- The Mistral key lives only in Vercel's environment variables — never in
  the repo, never in `chat-widget.js` or any file that ships to the browser.
- `.gitignore` already excludes `.env`/`.env.local` in case you test locally
  with `vercel dev`.
- The function validates and length-limits input, trims chat history to the
  last few turns, and the system prompt instructs the model to only answer
  from the provided resume content and to decline unrelated requests.
- Vercel's free tier and Mistral's own rate limits provide basic abuse
  protection for a low-traffic portfolio site; there's no additional
  rate-limiting built in beyond that.

## Ideas for what's next

- **A SkillOpt-style live demo** — since your flagship project is literally
  about a model that grades and improves its own output, a simplified,
  safe-to-expose version of that loop as an interactive widget (upload a
  sample log, watch a toy classifier score it, show before/after accuracy)
  would be a strong, on-brand addition to this same site.
- **Streaming responses** in the chat widget instead of waiting for the full
  answer — nicer UX, a bit more code on both the function and widget side.
- **AI-written project summaries from your GitHub** — a script that pulls
  your public repos via the GitHub API and drafts a one-line summary for any
  repo missing a description.
