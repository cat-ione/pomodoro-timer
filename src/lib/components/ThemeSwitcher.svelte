<script lang="ts">
  import {
    applyTheme,
    themes,
    getModes,
    getFlavors,
    getAccents,
    getName,
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

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  let themeText = $derived(getName(theme.theme));
  let themeTextVisible = $state(false);
  let modeText = $derived(capitalize(theme.mode));
  let modeTextVisible = $state(false);
  let flavorText = $derived(capitalize(theme.flavor));
  let flavorTextVisible = $state(false);
  let accentText = $derived(capitalize(theme.accent));
  let accentTextVisible = $state(false);

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
  <button id="theme-switcher" class="switcher-button" onclick={swapTheme}
    onmouseenter={() => { themeText = getName(theme.theme); themeTextVisible = true; }}
    onmouseleave={() => themeTextVisible = false}>&#xefcc;</button>
  <button id="mode-switcher" class="switcher-button" class:hidden={!showMode} onclick={swapMode}
    onmouseenter={() => { modeText = capitalize(theme.mode); modeTextVisible = true; }}
    onmouseleave={() => modeTextVisible = false}>
    {theme.mode === "dark" ? "\uf186" : "\uf185"}
  </button>
  <button id="flavor-switcher" class="switcher-button"
    class:hidden={!showFlavor} onclick={swapFlavor}
    onmouseenter={() => { flavorText = capitalize(theme.flavor); flavorTextVisible = true; }}
    onmouseleave={() => flavorTextVisible = false}>&#xf0f4;</button>
  <button id="accent-switcher" class="switcher-button"
    class:hidden={!showAccent} onclick={swapAccent}
    onmouseenter={() => { accentText = capitalize(theme.accent); accentTextVisible = true; }}
    onmouseleave={() => accentTextVisible = false}>&#xf043;</button>
</div>
<div id="theme-text-container">
  <div id="theme-text" class="theme-text" class:visible={themeTextVisible}>{themeText}</div>
  <div id="mode-text" class="theme-text" class:visible={modeTextVisible} class:hidden={!showMode}>{modeText}</div>
  <div id="flavor-text" class="theme-text" class:visible={flavorTextVisible} class:hidden={!showFlavor}>{flavorText}</div>
  <div id="accent-text" class="theme-text" class:visible={accentTextVisible} class:hidden={!showAccent}>{accentText}</div>
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
    padding: 0;

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

  #theme-text-container {
    position: absolute;
    top: 8px;
    left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;

    font: 1em "FiraCode Nerd Font";
    color: var(--color-text);
  }

  .theme-text {
    margin-top: 31px;
    align-self: flex-start;
    opacity: 0;

    user-select: none;

    background-color: var(--color-bg-button);
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 10px;

    transition: opacity 500ms ease, width 200ms ease;

    &.hidden {
      height: 0;
      margin-top: 0;
      padding: 0;
      opacity: 0;
      pointer-events: none;
    }

    &.visible {
      opacity: 100%;
    }
  }
</style>
