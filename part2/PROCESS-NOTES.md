# Part 2: Process Notes

Tools: Claude Code as the AI assistant, VS Code, and a browser for checking the fix.
The full unedited AI conversation is included with this submission.

## Steps

1. **Start from the fixed Part 1 file** so the redesign sits on top of working
   navigation instead of forking off the broken version.

2. **Decide how to draw the lines before writing any code.** The main design choice was
   whether the connector is one long line across the container or one line per gap.
   One line per gap won: three circles, two lines, each line starting just past its
   own circle's edge and stopping just before the next circle's edge, with the same
   small gap on both breakpoints. A single container wide line was rejected because
   in the vertical phone layout it cannot know where the last circle sits, and one
   line per gap handles that for free since the last step simply draws nothing.

3. **Build the hover around movement, not just color.** The circle smoothly grows on hover and the title changes color. The
   connector lines stay static. Both effects avoid page relayout.

4. **Small screens:** instead of shrinking the horizontal row until it breaks, the
   layout rotates below 768px. Circles down the left, text beside them, line running
   top to bottom.

5. **The bonus animation** uses an Intersection Observer with three safety nets: no
   JavaScript means nothing gets hidden and it plays only once.

## Verification

Everything was checked directly in the browser: resizing the window across the 768px
breakpoint to watch the layout pivot, checking phone and tablet sizes in the DevTools
device toolbar, hovering each step, and scrolling at different speeds to confirm the
entrance animation waits until the circles are actually on screen and only plays once.
The reduced motion fallback was checked with the DevTools rendering panel, and the
Part 1 nav fix was clicked through again since both changes share the same file.
After the connector change, both breakpoints were rechecked to confirm the lines
start and end with the same gap around every circle.
