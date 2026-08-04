<script lang="ts">
  import { applyTheme } from "$lib/theme/themes";

  function swapTheme() {
    applyTheme("everforest");
  }
</script>

<button id="theme-switcher" onclick={swapTheme}>&#xf1fc</button>

<style lang="scss">
  #theme-switcher {
    position: absolute;
    left: 20px;
    top: 20px;
    aspect-ratio: 1 / 1;
    width: 50px;
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--color-shadow-main) -5px 6px;

    &:active {
      box-shadow: none;
    }
  }
</style>
