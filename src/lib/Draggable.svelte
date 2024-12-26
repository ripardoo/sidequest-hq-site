<script>
  // The initial position to place this draggable item at
  export let x = 100;
  export let y = 100;

  // Callback for "actually clicked" vs. "dragged"
  export let onActuallyClick = () => {};

  // If total mouse movement is below this threshold, we treat it as a click
  export let clickThreshold = 1;

  // Whether the user is currently dragging
  let moving = false;

  // Track how much we have moved while the mouse is down
  let totalMovement = 0;

  function onMouseDown(e) {
    // If it’s not the left button, do nothing special:
    if (e.button !== 0) return;
    
    e.preventDefault(); // helps avoid text selection
    moving = true;
    totalMovement = 0;
  }

  function onMouseMove(e) {
    if (moving) {
      x += e.movementX;
      y += e.movementY;
      totalMovement += Math.abs(e.movementX) + Math.abs(e.movementY);
    }
  }

  function onMouseUp() {
    if (moving) {
      moving = false;
      // If total movement was small, treat it as a "click"
      if (totalMovement < clickThreshold) {
        onActuallyClick();
      }
    }
  }
</script>

<style>
  .draggable {
    user-select: none;
    cursor: move; /* So the user sees a "move" cursor over this element */
    position: absolute;
    z-index: 5;
  }
</style>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  class="draggable"
  style="left: {x}px; top: {y}px;"
  on:mousedown={onMouseDown}
>
  <slot></slot>
</section>

<svelte:window
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
/>
