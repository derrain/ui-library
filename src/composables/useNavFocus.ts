let lastNavEl: HTMLElement | null = null;

export const setLastNavEl = (el: HTMLElement | null) => {
  lastNavEl = el;
}

export const focusLastNav = (fallbackSel = '#side-nav a, #side-nav [role="menuitem"]') => {
  const target = lastNavEl ?? document.querySelector<HTMLElement>(fallbackSel);
  target?.focus();
  return !!target;
}