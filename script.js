(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('.expandable').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => card.classList.toggle('open'));
  });

  const info = document.getElementById('archInfo');
  document.querySelectorAll('.layer').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.layer').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (info) info.textContent = btn.dataset.info || '';
    });
  });

  const steps = [
    'Step 1: Define Desired State',
    'Step 2: Collect Observed State',
    'Step 3: Compare Configurations',
    'Step 4: Identify Drift',
    'Step 5: Evaluate Policy',
    'Step 6: Request Authorization',
    'Step 7: Demonstrate Reconciliation',
    'Step 8: Verify Result'
  ];
  let step = 0;
  const stepEl = document.getElementById('simStep');
  function updateStep() { if (stepEl) stepEl.textContent = steps[step]; }
  document.getElementById('simNext')?.addEventListener('click', () => { step = Math.min(step + 1, steps.length - 1); updateStep(); });
  document.getElementById('simPrev')?.addEventListener('click', () => { step = Math.max(step - 1, 0); updateStep(); });
  document.getElementById('simReset')?.addEventListener('click', () => { step = 0; updateStep(); });

  document.querySelectorAll('.dash-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-nav').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('panel-' + btn.dataset.panel);
      if (panel) panel.classList.add('active');
    });
  });
})();
