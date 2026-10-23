(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('site-nav');
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menuButton.focus();
    }
  });
  matchMedia('(max-width: 680px)').addEventListener('change', closeMenu);
  const citations = {
    stitch: `@inproceedings{goli2025stitch,
  title = {{STITCH-OPE}: Trajectory Stitching with Guided Diffusion for Off-Policy Evaluation},
  author = {Goli, Hossein and Gimelfarb, Michael and de Lara, Nathan and Nishimura, Haruki and Itkina, Masha and Shkurti, Florian},
  booktitle = {Advances in Neural Information Processing Systems},
  year = {2025},
  volume = {38, Main Conference},
  pages = {7058--7102},
  publisher = {Curran Associates, Inc.},
  doi = {10.52202/085713-0242},
  url = {https://proceedings.neurips.cc/paper_files/paper/2025/file/0a85f2414e354f9d61ffea5705a8bbf4-Paper-Conference.pdf}
}`,
    superpixels: `@inproceedings{goli2026softsuperpixels,
  title = {Soft Super-Pixel Partitioning for Certified Adversarial Robustness},
  author = {Goli, Hossein and Farnia, Farzan},
  booktitle = {ICASSP 2026 - 2026 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
  year = {2026},
  pages = {1861--1865},
  publisher = {IEEE},
  doi = {10.1109/ICASSP55912.2026.11462672},
  url = {https://doi.org/10.1109/ICASSP55912.2026.11462672}
}`,
    medix: `@article{abbas2026medix,
  title = {{Medix}: Out-of-Distribution Detection from Unlabeled Wild Data via Robust Gradient Statistics},
  author = {Abbas, Momin and Falahati, Ali and Goli, Hossein and Amiri, Mohammad Mohammadi},
  journal = {Transactions on Machine Learning Research},
  year = {2026},
  url = {https://arxiv.org/abs/2510.06505}
}`,
    imaginative: `@misc{farnia2026imaginative,
  title = {Imaginative Generative {AI}: Crossing the Entropy Wall into Worlds Beyond Imitation},
  author = {Farnia, Farzan and Goli, Hossein and Gohari, Amin},
  year = {2026},
  eprint = {2608.09385},
  archivePrefix = {arXiv},
  primaryClass = {cs.LG},
  doi = {10.48550/arXiv.2608.09385},
  url = {https://arxiv.org/abs/2608.09385}
}`
  };
  const dialog = document.getElementById('citation-dialog');
  const citationText = document.getElementById('citation-text');
  const copyButton = document.getElementById('copy-citation');
  const copyStatus = document.getElementById('copy-status');
  let citationTrigger;
  document.querySelectorAll('[data-citation]').forEach(button => {
    button.addEventListener('click', () => {
      citationTrigger = button;
      citationText.textContent = citations[button.dataset.citation];
      copyStatus.textContent = '';
      copyButton.textContent = 'Copy BibTeX';
      dialog.showModal();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => citationTrigger?.focus());
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citationText.textContent);
      copyButton.textContent = 'Copied';
      copyStatus.textContent = 'BibTeX copied to clipboard.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citationText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Text selected. Use your usual copy shortcut.';
    }
  });
})();
