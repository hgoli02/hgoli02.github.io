// Layout comparisons share the homepage's content and assets.
(() => {
  const design = new URLSearchParams(location.search).get('design');
  if (['classic', 'sidebar', 'compact', 'cards'].includes(design)) {
    document.documentElement.dataset.design = design;
  }
})();
