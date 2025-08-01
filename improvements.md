**Short answer:**
Your page looks completely unstyled because Tailwind CSS isn’t being applied. Everything else (Next.js, Framer Motion, React Modal) can work, but without Tailwind’s styles being loaded you’ll see a plain, Times‑like page exactly like your screenshot.

---

### Why this is likely Tailwind, not your JSX

* Your JSX uses many Tailwind classes (`bg-blue-600`, `grid`, `rounded-lg`, `dark:*`, etc.), but the UI renders as plain HTML with no colors, spacing, or grids. That’s the classic symptom of Tailwind not being loaded.
* The header should be a blue bar, the hero should be a blue→purple gradient, and cards should have rounded corners and shadows. None of those appear.

---

### The most common Tailwind issues that cause this

1. **Global stylesheet not imported**
   In the Next.js App Router, you must import your global CSS (the one that contains the `@tailwind` directives) in `app/layout.tsx` (or `layout.js`). If it isn’t imported there, Tailwind never loads.

2. **Missing Tailwind directives in your global CSS**
   Your global stylesheet must include the three Tailwind directives (`base`, `components`, `utilities`). If they’re missing, no styles get generated.

3. **Incorrect `content` globs in `tailwind.config.js`**
   If Tailwind’s `content` setting doesn’t include your file paths (e.g., `./app/**/*.{js,ts,jsx,tsx,mdx}`, `./components/**/*.{js,ts,jsx,tsx}`, `./pages/**/*.{js,ts,jsx,tsx}`), Tailwind will purge everything and generate almost nothing.

4. **Tailwind/PostCSS not installed or not configured**
   If the packages (tailwindcss, postcss, autoprefixer) aren’t installed or the PostCSS config is missing, Tailwind won’t compile.

5. **Dark mode strategy not configured**
   You’re using `dark:*` classes and a `ThemeToggle`. If `darkMode: 'class'` isn’t set in `tailwind.config.js` and you aren’t toggling the `dark` class on the `<html>` element, dark styles won’t apply. (This won’t cause *all* styles to fail—just the dark-specific ones—but it’s still important.)

6. **Build/Dev server cache or wrong import path**
   Occasionally the dev server caches an old build, or the global CSS path in the import is wrong. Then the stylesheet never loads. You can confirm in your browser’s Network tab whether your main CSS is being requested.

---

### Other smaller issues to tidy up (not the root cause of “unstyled”)

* **Buttons inside Links:** You have a `<button>` wrapping a `<Link>` child. It’s better UX/semantics to make the Link the outer element (or use a Link styled like a button). This won’t break styles, but it’s worth fixing.
* **React Modal app element:** For accessibility (and sometimes to avoid warnings), set the app element (e.g., the `#__next` root). If you skip this, you’ll see console warnings—not a styling failure.
* **Hydration mismatches with theme toggling:** If your theme toggle changes the `class` on `<html>`, you may need to guard against SSR/CSR differences. That would show as console warnings, not a fully unstyled page.

---

### How to quickly verify the diagnosis

* **Open DevTools → Network:** Check if a CSS file from your app is being loaded. If you don’t see one, your global import or Tailwind build isn’t happening.
* **Inspect an element:** You’ll see your Tailwind class names in the DOM, but no corresponding CSS rules in the Styles pane if Tailwind isn’t loaded.
* **Check your `tailwind.config.js` `content` paths:** Make sure they cover `app`, `components`, and `pages` folders for all relevant extensions.

---

### Bottom line

Fix the Tailwind pipeline (global CSS import, directives present, correct `content` globs, packages installed, dev server restarted). Once Tailwind is actually applied, your current JSX should render as a polished, modern UI rather than plain text.
