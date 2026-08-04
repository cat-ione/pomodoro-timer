<script lang="ts">
  import {
    applyTheme,
    themes,
    getModes,
    getFlavors,
    getAccents,
    type ThemeName
  } from "$lib/theme/themes";

  let theme = $state({
    theme: "catppuccin" as ThemeName,
    mode: "dark",
    flavor: "mocha",
    accent: "mauve",
  });

  let showMode = $derived(Object.keys(getModes(theme.theme)).length > 1);
  let showFlavor = $derived(Object.keys(getFlavors(theme.theme, theme.mode)).length > 1);
  let showAccent = $derived(getAccents(theme.theme, theme.mode, theme.flavor).length > 1);

  function getNext<K extends string, V>(obj: Record<K, V>, key: K): K {
    const keys = Object.keys(obj) as K[];
    const index = keys.indexOf(key);
    return keys[(index + 1) % keys.length];
  }

  function swapTheme() {
    theme = applyTheme(getNext(themes, theme.theme), theme.mode);
  }

  function swapMode() {
    const modes = getModes(theme.theme);
    theme = applyTheme(theme.theme, getNext(modes, theme.mode), theme.flavor, theme.accent)
  }

  function swapFlavor() {
    const flavors = getFlavors(theme.theme, theme.mode);
    theme = applyTheme(theme.theme, theme.mode, getNext(flavors, theme.flavor), theme.accent);
  }

  function swapAccent() {
    const accents = getAccents(theme.theme, theme.mode, theme.flavor);
    const newAccent = accents[(accents.indexOf(theme.accent) + 1) % accents.length];
    theme = applyTheme(theme.theme, theme.mode, theme.flavor, newAccent);
  }
</script>

<div id="theme-switcher-container">
  <button id="theme-switcher" class="switcher-button" onclick={swapTheme}>&#xefcc;</button>
  <button id="mode-switcher" class="switcher-button" class:hidden={!showMode} onclick={swapMode}>
    {theme.mode === "dark" ? "\uf186" : "\uf185"}
  </button>
  <button id="flavor-switcher" class="switcher-button" class:hidden={!showFlavor} onclick={swapFlavor}>&#xf0f4;</button>
  <button id="accent-switcher" class="switcher-button" class:hidden={!showAccent} onclick={swapAccent}>&#xf043;</button>
</div>

<style lang="scss">
  #theme-switcher-container {
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: var(--color-bg-outer);
    border-radius: 10px;
  }

  .switcher-button {
    width: 50px;
    height: 50px;
    margin-top: 10px;

    background-color: var(--color-bg-button);
    border: none;
    border-radius: 10px;
    font: 3em "FiraCode Nerd Font";
    line-height: 0;
    color: var(--color-text);
    overflow: hidden;

    user-select: none;

    transition:
      background-color 260ms ease,
      color 260ms ease,
      transform 100ms ease,
      height 200ms ease,
      margin-top 200ms ease,
      opacity 200ms ease;

    &:first-child {
      margin-top: 0;
    }

    &.hidden {
      height: 0;
      margin-top: 0;
      opacity: 0;
      pointer-events: none;
    }

    &:hover {
      background-color: var(--color-accent);
      color: var(--color-text-hover);
    }

    &:active {
      transform: scale(0.9, 0.9);
    }
  }
</style>
