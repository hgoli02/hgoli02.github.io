(() => {
  'use strict';
  const designs = {
    classic: { name: 'Classic', description: 'Same content · centered mathematical banner' },
    sidebar: { name: 'Sidebar', description: 'Same content · a profile beside the research page' },
    compact: { name: 'Compact', description: 'Same content · a horizontal introduction and quieter reading layout' },
    cards: { name: 'Research Cards', description: 'Same content · a mathematical cover and a two-column paper grid' }
  };
  const frame = document.getElementById('design-frame');
  const buttons = [...document.querySelectorAll('[data-design]')];
  const openLink = document.getElementById('open-design');
  const description = document.getElementById('design-description');
  let active = 'classic';
  function select(design, remember = true) {
    if (!Object.hasOwn(designs, design)) return;
    let anchor = '';
    try { anchor = frame.contentWindow.location.hash; } catch { /* Initial document may still be loading. */ }
    const target = `index.html?design=${design}${anchor}`;
    if (design !== active || new URL(frame.src).searchParams.get('design') !== design) frame.src = target;
    active = design;
    frame.title = `${designs[design].name} website design`;
    description.textContent = designs[design].description;
    openLink.href = target;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.design === design)));
    if (remember) {
      const url = new URL(location.href);
      url.searchParams.set('design', design);
      history.replaceState(null, '', url);
    }
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.design)));
  const initial = new URLSearchParams(location.search).get('design');
  if (initial) select(initial, false);
  frame.addEventListener('load', () => {
    try { openLink.href = frame.contentWindow.location.href; } catch { /* Keep the selected design link. */ }
  });
})();
