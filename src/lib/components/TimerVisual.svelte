<script lang="ts">
  let { timeRemaining, progress } = $props();

  let seconds = $derived(Math.floor(timeRemaining % (60 * 1000) / 1000));
  let minutes = $derived(Math.floor(timeRemaining / (60 * 1000)));

  let circumference = 200 * Math.PI * 2;

  let isJumping = $state(false);
  export function triggerJumpAnimation() {
    // We can't apply the jump transition to the progress bar by default
    // since it would lag behind and look wrong, we only apply the class to
    // it when needed, only for the duration of the transition
    isJumping = true;
    setTimeout(() => { isJumping = false }, 1000);
  }
</script>

<div id="timer">
  <div id="time-text">
    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
  </div>
  <svg viewBox="0 0 500 500" id="timer-progress-svg">
    <circle id="timer-progress-track" />
    <!-- Small hack to draw one long dashed line and offset it forward
    to decrease the length of the progress bar -->
    <circle id="timer-progress" stroke-dasharray={circumference}
      stroke-dashoffset={circumference * progress}
      class:animate-progress-jump={isJumping} />
  </svg>
</div>

<style lang="scss">
  #timer {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #timer-progress-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    aspect-ratio: 1 / 1;
    height: 100%;
    transform: translate(-50%, -50%);
  }

  #timer-progress-track {
    cx: 250px;
    cy: 250px;
    r: 200px;
    fill: none;
    stroke: var(--color-overlay0);
    stroke-width: 17px;
  }

  #timer-progress {
    cx: 250px;
    cy: 250px;
    r: 200px;
    fill: none;
    stroke: var(--color-mauve);
    stroke-width: 17px;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
  }

  .animate-progress-jump {
    transition: stroke-dashoffset 1s ease;
  }

  #time-text {
    font: 4.8em "FiraCode Nerd Font";
    color: var(--color-text);
    user-select: none;
  }
</style>
