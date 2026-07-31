# Part 1: Technical Explanation

## 1. The root cause

At the bottom of the file there is a script that handles clicks on the nav links:

```js
// original (broken)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

The root cause is `a.href`.

For a link written as `<a href="#features">`, it seems like `a.href` should return
`"#features"`. It does not. It returns the full URL, something like:

```
file:///Users/you/Desktop/breezy-fulltime-test.html#features
```

`document.querySelector()` expects a CSS selector like `"#features"`, not a URL.
Handing it that URL string makes it throw an error, and the function stops right
there. `scrollIntoView` never runs.

## 2. The fix

```js
// fixed
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');   // gives the literal "#features"
    if (href === '#') {                    // placeholder links should do nothing
      e.preventDefault();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();                  // only take over once scrolling is possible
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
```

Three changes:

1. `getAttribute('href')` instead of `.href`. This returns the text exactly as written
   in the HTML, `"#features"`, which is a valid selector. This is the actual fix.
2. `preventDefault()` moved after the target check. If the target is ever missing, the
   browser's normal link behavior still works as a backup instead of being switched off
   for nothing.
3. Links that are just `href="#"` (the placeholder links all over the page) are skipped
   cleanly. `querySelector('#')` would also throw an error, so they needed handling too.

With the handler fixed, all nav links smooth scroll to their sections, and a
`scroll-margin-top` rule keeps each scrolled to section from landing underneath the
fixed header.

## 3. Why the bug happens, and the console errors

Two things combine to make the page feel completely dead:

- The line before the error is `e.preventDefault()`, which tells the browser to skip
  its normal link behavior. Clicking `<a href="#features">` would normally jump to
  that section without any JavaScript, because browsers handle that natively. The
  script disables that working behavior first, then fails before providing its own
  replacement. Both are lost.
- On mobile the failure is masked. The mobile menu links have two click handlers:

  ```html
  <a href="#features" onclick="closeMobile()">Features</a>
  ```

  The `closeMobile()` handler is separate from the broken scroll script and works
  correctly. Tapping a link closes the menu, which makes the tap appear successful,
  but the page never scrolls. One handler succeeded, the other failed, and only the
  successful one is visible to the user.

Clicking any nav link prints this console error:

```
Uncaught SyntaxError: Failed to execute 'querySelector' on 'Document':
'file:///.../breezy-fulltime-test.html#features' is not a valid selector.
```

**Meaningful or misleading? Both, in different respects.**

The error is meaningful because the full diagnosis is contained in the message itself.
A complete URL appears where a selector should be, and the stack trace points at the
exact line and it leads directly to the fix.

It misleads in three ways:

1. Timing. The error only appears on click. Opening the console, seeing it clean, and
   concluding that there are no JavaScript errors misses it completely. The console
   has to be open while clicking.
2. Wording. "Is not a valid selector" suggests a mistake in selector syntax. The real
   problem is that the wrong kind of value (a URL) was passed in. The error also says
   nothing about the larger issue: `preventDefault()` had already disabled the
   browser's own working behavior.
3. Mobile. A phone has no visible console, and the closing menu gives a false
   impression of success. Catching this requires desktop developer tools in a phone
   sized viewport.
