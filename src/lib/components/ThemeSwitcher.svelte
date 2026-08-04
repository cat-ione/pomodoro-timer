<script lang="ts">
  let index = 0;
  let flavors = ["mocha", "macchiato", "frappe", "latte"];

  function swapPalette() {
    index = (index + 1) % flavors.length;
    document.documentElement.setAttribute("data-theme", flavors[index]);
  }
</script>

<button id="theme-switcher" onclick={swapPalette} aria-label="theme-switcher">&#xf1fc</button>

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
    box-shadow: var(--color-crust) -5px 6px;
  }
</style>
