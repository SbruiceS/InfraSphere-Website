(function () {
  // Mobile menu
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

  // Active section highlighting (Part 14)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[data-section]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector('.nav a[data-section="' + e.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => obs.observe(s));

  // Expandable cards
  document.querySelectorAll('.expandable, #integrationGrid .card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => card.classList.toggle('open'));
  });

  // Hero hover (Part 4)
  const hoverInfo = document.getElementById('heroHover');
  document.querySelectorAll('#heroTopology .provider').forEach(g => {
    g.addEventListener('mouseenter', () => {
      if (hoverInfo) hoverInfo.textContent = (g.dataset.name || '') + ' · ' + (g.dataset.status || '') + ' · ' + (g.dataset.role || '');
    });
    g.addEventListener('mouseleave', () => {
      if (hoverInfo) hoverInfo.textContent = 'Hover a provider for status and role';
    });
  });

  // Architecture explorer (Part 6)
  const info = document.getElementById('archInfo');
  document.querySelectorAll('.layer').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.layer').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (info) info.textContent = btn.dataset.info || '';
    });
  });
  document.getElementById('archReset')?.addEventListener('click', () => {
    document.querySelectorAll('.layer').forEach(b => b.classList.remove('active'));
    if (info) info.textContent = 'Select a layer to view its architectural role, inputs, and outputs.';
  });

  // Reconciliation simulator with dynamic content (Part 7)
  const steps = [
    { title: 'Step 1: Define Desired State', detail: 'Authoritative intended configuration is recorded.', desired: ['3 application instances', 'Approved network configuration', 'Required security policy', 'Defined resource allocation'], observed: ['—'] },
    { title: 'Step 2: Collect Observed State', detail: 'Current state is gathered from the environment.', desired: ['3 application instances', 'Approved network configuration', 'Required security policy', 'Defined resource allocation'], observed: ['2 application instances', 'Current network rules', 'Current security settings'] },
    { title: 'Step 3: Compare Configurations', detail: 'Desired and observed are compared side by side.', desired: ['3 application instances', 'Approved network configuration', 'Required security policy'], observed: ['2 application instances', 'Network mismatch', 'Policy violation'] },
    { title: 'Step 4: Identify Drift', detail: 'Differences are classified as missing, unexpected, or mismatched.', desired: ['3 application instances'], observed: ['Missing 1 instance', 'Unexpected security group rule'] },
    { title: 'Step 5: Evaluate Policy', detail: 'Proposed changes are checked against governance rules.', desired: ['Policy: require approval for instance count change'], observed: ['1 policy violation detected'] },
    { title: 'Step 6: Request Authorization', detail: 'Change requires explicit authorization before proceeding.', desired: ['Awaiting authorization'], observed: ['Pending approval'] },
    { title: 'Step 7: Demonstrate Reconciliation', detail: 'Authorized alignment is applied (illustrative).', desired: ['3 application instances', 'Approved network'], observed: ['Applying changes…'] },
    { title: 'Step 8: Verify Result', detail: 'Observed state is re-checked against desired state.', desired: ['3 application instances', 'Approved network', 'Policy satisfied'], observed: ['3 application instances', 'Approved network', 'Policy satisfied'] }
  ];
  let step = 0;
  function renderStep() {
    const s = steps[step];
    const stepEl = document.getElementById('simStep');
    const detailEl = document.getElementById('simDetail');
    const dList = document.getElementById('desiredList');
    const oList = document.getElementById('observedList');
    if (stepEl) stepEl.textContent = s.title;
    if (detailEl) detailEl.textContent = s.detail;
    if (dList) dList.innerHTML = s.desired.map(i => '<li>' + i + '</li>').join('');
    if (oList) oList.innerHTML = s.observed.map(i => '<li>' + i + '</li>').join('');
  }
  document.getElementById('simNext')?.addEventListener('click', () => { step = Math.min(step + 1, steps.length - 1); renderStep(); });
  document.getElementById('simPrev')?.addEventListener('click', () => { step = Math.max(step - 1, 0); renderStep(); });
  document.getElementById('simReset')?.addEventListener('click', () => { step = 0; renderStep(); });
  renderStep();

  // Dashboard panels
  document.querySelectorAll('.dash-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-nav').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('panel-' + btn.dataset.panel);
      if (panel) panel.classList.add('active');
    });
  });

  // Topology explorer (Part 9)
  const topoDetail = document.getElementById('topoDetail');
  document.querySelectorAll('.topo-node, .topo-child').forEach(node => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.topo-node, .topo-child').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      if (topoDetail) topoDetail.textContent = node.dataset.detail || node.textContent.trim().split('\n')[0];
    });
  });
  const search = document.getElementById('topoSearch');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      document.querySelectorAll('.topo-node, .topo-child').forEach(n => {
        const text = n.textContent.toLowerCase();
        n.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Integration filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('#integrationGrid .card').forEach(c => {
        c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
      });
    });
  });

  // Scroll-driven storytelling (Part 13)
  const storyObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.story-step').forEach(s => storyObs.observe(s));
})();
