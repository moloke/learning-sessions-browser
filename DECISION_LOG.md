# Decision Log

## Where do you coerce mins to a number and why there?

I'm doing the conversion in `api.js` right when the data comes back from the "fetch". I just wanted to clean up the data as soon as it enters the app, so the rest of the code doesn't have to worry about it being a string vs a number.

This felt like the right spot because:
- The UI components can just assume `mins` is always a number
- If I need to do any calculations or sorting later, I won't get any bugs from comparing strings
- It keeps all the data cleanup in one place instead of scattered around

The actual code is just using `parseInt()` in `api.js`. Same thing for the difficulty field - if it's null, I'm setting it to "N/A".

## How did you implement the debounce and why did you choose that approach?

I used a `useEffect` hook that waits 300ms after the user stops typing before updating the search. The key part is the cleanup function that cancels the timer if they type again before 300ms is up.

Here's why I went with this:
- Pretty standard React pattern, so other developers would recognize it
- The cleanup prevents memory leaks and makes sure old searches don't overwrite new ones
- I didn't want to add another dependency when React's built-in stuff works fine

The debounced value is in its own state variable (`debouncedSearch`), which keeps the input responsive while the actual filtering happens after the delay. You can see this in `App.jsx`.

## If two sessions share the same popularity, what guarantees their relative order?

When two items have the same popularity score, I'm doing a secondary sort by their title alphabetically. So if "Session A" and "Session B" both have 150 popularity, "Session A" will always come first.

The sorting code is in `App.jsx`. First it compares popularity, then if that's equal (diff === 0), it falls back to comparing titles with `localeCompare()`. This way items don't randomly jump around when you toggle between ascending and descending.

## What's your approach to accessibility for the toggle?

I'm using regular `<button>` elements for the completion toggles because they give you keyboard support for free - users can tab to them and press Enter or Space to activate.

I also added `aria-pressed` to show whether it's currently completed or not. The button text itself is pretty clear too - it says "✓ Completed" or "Mark Complete" so screen reader users know what's happening.

The colors change when you toggle it (green for completed, gray for not completed), which helps sighted users see the state at a glance. All the interactive stuff uses native HTML elements like buttons and inputs with labels, so keyboard navigation just works without me having to wire up custom key handlers.