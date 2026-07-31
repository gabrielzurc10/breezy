# Part 1: Process Notes

Tools: Claude Code as the AI assistant, VS Code, and a browser for checking the fix.
The full unedited AI conversation is included with this submission.

## Steps

1. **Read the whole file first.** Everything is in one HTML file, so the first pass was
   reading the nav markup, the mobile menu, and all the scripts to map every piece of
   code that touches those links.

2. **Start from the key question: why is the browser's default behavior not working?**
   Links like `<a href="#features">` scroll on their own without any JavaScript. If that
   is not happening, something must be actively blocking it. Only one piece of code
   calls `preventDefault()` on those links, the smooth scroll script at the bottom. That
   narrowed the search immediately.

3. **Find the actual bug.** The script passes `a.href` to `querySelector()`. But
   `a.href` returns the full URL, not the `#features` text written in the HTML. A URL is
   not a valid selector, so the call throws an error. Confirmed in the browser: click a
   link, watch the error appear in the console.

4. **Explain the mobile red herring.** The mobile links also carry
   `onclick="closeMobile()"`, which is separate and works. The menu closes (looks like
   success) while the scroll fails silently. Documented because this is the kind of
   thing that sends debugging in the wrong direction.

5. **Fix it, then check what the fix exposes.** With scrolling working, the pinned header
   (about 140px tall) covered the top of every section. Fixed with `scroll-margin-top`
   in CSS. The script was also made safer: `preventDefault()` only runs when there is
   actually somewhere to scroll, and placeholder `href="#"` links are skipped instead of
   erroring.

6. **Check the work.** Every `href="#..."` in the file was compared against every
   `id="..."`, and all seven match up. During that pass the editor flagged a second,
   unrelated bug: the "Watch the Story" button had broken quote escaping in its
   `onclick`. Fixed and documented as well.
