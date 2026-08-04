<script lang="ts">
  import TimerVisual from "$lib/components/TimerVisual.svelte";
  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";

  let timerVisual: TimerVisual;

  let timerDurations = [25, 5, 25, 5, 25, 5, 25, 15];
  let timerIndex = $state(0);
  let totalTime = $derived(timerDurations[timerIndex] * 60 * 1000);

  let startTime = performance.now();
  let timeAccumulated = 0;
  let timeElapsed = $state(0);
  let timeRemaining = $derived(totalTime - timeElapsed);
  let progress = $derived(timeElapsed / totalTime);

  let timerPaused = $state(true);
  let timerIntervalId: number;

  function startTimer() {
    startTime = performance.now();
    timerPaused = false;
    timerIntervalId = setInterval(() => {
      timeElapsed = timeAccumulated + performance.now() - startTime;
      if (timeRemaining <= 0) {
        nextTimer();
      }
    }, 10);
  }

  function pauseTimer() {
    timeAccumulated = timeElapsed;
    timerPaused = true;
    clearInterval(timerIntervalId);
  }

  function nextTimer() {
    timerIndex = (timerIndex + 1) % timerDurations.length;
    timeAccumulated = timeElapsed = 0;
    timerPaused = true;
    timerVisual.triggerJumpAnimation();
    clearInterval(timerIntervalId);
  }

  function resetTimer() {
    timeAccumulated = 0;
    timeElapsed = 0;
    timerPaused = true;
    timerVisual.triggerJumpAnimation();
    clearInterval(timerIntervalId);
  }
</script>

<main id="main-container">
  <ThemeSwitcher />
  <div id="timer-container">
    <div id="timer-visual-container">
      <TimerVisual bind:this={timerVisual} {timeRemaining} {progress} />
    </div>
    <div id="timer-buttons-container">
      <button id="start-button"
        onclick={() => (timerPaused ? startTimer() : pauseTimer())}>
        {timerPaused ? "\uf04b" : "\uf04c"}
      </button>
      <button id="reset-button" onclick={resetTimer}>&#xf0e2</button>
      <button id="next-button" onclick={nextTimer}>&#xf051</button>
    </div>
  </div>
</main>
