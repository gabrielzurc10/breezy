# Part 2: Timeline Redesign, Design Notes

Built on top of the Part 1 HTML file. The redesign lives entirely in the "HOW IT
WORKS" CSS block and a small script.

**Layout.** The three steps sit in a flexbox row of equal columns. Two connector
lines join the three circles: each step except the last draws one line with an
`::after` pseudo element, starting just past its own circle's edge and stopping just
before the next circle's edge, with the same small gap the vertical phone layout
uses. Because the columns are equal width, the offsets are measured from the column
centers and stay aligned at any screen size.

**Hover.** A real transition, not just a color swap: the circle smoothly grows about
15 percent and the title fades to the brand blue. The lines stay static so the
movement draws attention to the step itself.

**Small screens (under 768px).** The timeline rotates: circles stack down the left,
text sits beside each circle, and the same pseudo elements draw the line vertically
from each circle to the next. Text switches to left aligned for the narrow column.

**Scroll in animation (bonus).** An Intersection Observer watches the row of steps
and, once half of it is on screen, the steps fade in and slide up 0.15s apart, left
to right. It plays once, renders everything visible if JavaScript is unavailable, and
respects the system reduced motion setting.

**Staying on brand.** Same 56px gradient circles, fonts, and spacing rhythm as the
rest of the site: the same site with a better layout, not a different product.
