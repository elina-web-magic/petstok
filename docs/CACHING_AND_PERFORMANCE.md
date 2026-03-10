# Caching and Performance Strategy

Performance is achieved through architectural decisions.

Not through premature optimization.

---

## Server Rendering

Use React Server Components to reduce client JavaScript.

Server components:

- fetch data
- render markup
- send minimal JS to browser

---

## Data Fetching

Prefer server-side fetching.

Example:

page.tsx  
→ server action  
→ database  

Avoid unnecessary client fetching.

---

## Avoid Global Client Stores

Global stores increase complexity and often create stale state.

Prefer server state.

---

## Video Performance

Videos should:

- use preload="metadata"
- avoid autoplay unless in feed
- use proper aspect ratios

---

## Future Video Optimization

Planned improvements:

- frame extraction
- adaptive streaming
- lazy loading in feeds

---

## AI Performance

AI calls are expensive.

Use guards to prevent unnecessary calls.

Example:

- invalid video URL
- too many reference images

Guard first → provider second.

---

## Background Processing (Future)

Deep AI analysis should run asynchronously.

Possible tools:

- queue workers
- background jobs
- distributed inference services

---

## Scaling Strategy

AI pipeline should support:

video  
→ frame extraction  
→ parallel inference  
→ aggregated results
