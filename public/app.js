// ApexFan Web Application Logic
document.addEventListener('DOMContentLoaded', () => {

  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatHistory = document.getElementById('chatHistory');
  const toolChipsContainer = document.getElementById('toolChipsContainer');
  const venueSelect = document.getElementById('venueSelect');
  const proximityList = document.getElementById('proximityList');
  const mapCoordinates = document.getElementById('mapCoordinates');
  const activeStadiumLabel = document.getElementById('activeStadiumLabel');
  const mallMarkersList = document.getElementById('mallMarkersList');

  const btnAutoDemo = document.getElementById('btnAutoDemo');
  const btnStatusToggle = document.getElementById('btnStatusToggle');
  const sectionJudgeCenter = document.getElementById('sectionJudgeCenter');
  const btnCloseJudge = document.getElementById('btnCloseJudge');

  const prePlaybookCode = document.getElementById('prePlaybookCode');
  const tabBtns = document.querySelectorAll('.tab-btn');

  const statDb = document.getElementById('statDb');
  const statGeo = document.getElementById('statGeo');
  const statGemini = document.getElementById('statGemini');
  const statSync = document.getElementById('statSync');
  const statAudit = document.getElementById('statAudit');
  const statLiveApi = document.getElementById('statLiveApi');

  let playbookData = {};
  let isAutoRunning = false;

  // Stadium coordinate registry — all 16 FIFA 2026 host venues
  const coordMap = {
    sofi:      { name: 'SoFi Stadium',             country: '🇺🇸', coords: 'LAT: 33.9534 | LNG: -118.3390', markers: `
      <div class="mall-marker-dot" style="top:55%;left:62%;">🛍️<span class="tooltip">Hollywood Park Retail</span></div>
      <div class="mall-marker-dot" style="top:30%;left:35%;">🛍️<span class="tooltip">The Forum Commerce</span></div>
      <div class="mall-marker-dot" style="top:45%;left:20%;">🍔<span class="tooltip">Inglewood Sports Cafe</span></div>`},
    metlife:   { name: 'MetLife Stadium',           country: '🇺🇸', coords: 'LAT: 40.8135 | LNG: -74.0744', markers: `
      <div class="mall-marker-dot" style="top:60%;left:55%;">🛍️<span class="tooltip">American Dream Mall</span></div>
      <div class="mall-marker-dot" style="top:32%;left:70%;">🛍️<span class="tooltip">Secaucus Plaza</span></div>
      <div class="mall-marker-dot" style="top:40%;left:30%;">🍕<span class="tooltip">Lupis Italian</span></div>`},
    att:       { name: "AT&T Stadium",              country: '🇺🇸', coords: 'LAT: 32.7480 | LNG: -97.0929', markers: `
      <div class="mall-marker-dot" style="top:45%;left:60%;">🛍️<span class="tooltip">Arlington Highlands</span></div>
      <div class="mall-marker-dot" style="top:65%;left:35%;">🍖<span class="tooltip">Texas BBQ Hub</span></div>`},
    levis:     { name: "Levi's Stadium",            country: '🇺🇸', coords: 'LAT: 37.4032 | LNG: -121.9696', markers: `
      <div class="mall-marker-dot" style="top:40%;left:55%;">🛍️<span class="tooltip">Great Mall</span></div>
      <div class="mall-marker-dot" style="top:60%;left:30%;">🍜<span class="tooltip">Silicon Valley Eats</span></div>`},
    arrowhead: { name: 'Arrowhead Stadium',         country: '🇺🇸', coords: 'LAT: 39.0489 | LNG: -94.4839', markers: `
      <div class="mall-marker-dot" style="top:35%;left:65%;">🛍️<span class="tooltip">KC Power &amp; Light District</span></div>`},
    lincoln:   { name: 'Lincoln Financial Field',   country: '🇺🇸', coords: 'LAT: 39.9008 | LNG: -75.1675', markers: `
      <div class="mall-marker-dot" style="top:50%;left:55%;">🛍️<span class="tooltip">Philadelphia Mills</span></div>
      <div class="mall-marker-dot" style="top:30%;left:40%;">🥨<span class="tooltip">South Philly Market</span></div>`},
    nrg:       { name: 'NRG Stadium',               country: '🇺🇸', coords: 'LAT: 29.6847 | LNG: -95.4097', markers: `
      <div class="mall-marker-dot" style="top:55%;left:60%;">🛍️<span class="tooltip">Galleria Houston</span></div>`},
    seattle:   { name: 'Lumen Field',               country: '🇺🇸', coords: 'LAT: 47.5952 | LNG: -122.3316', markers: `
      <div class="mall-marker-dot" style="top:40%;left:50%;">🛍️<span class="tooltip">Westlake Center</span></div>
      <div class="mall-marker-dot" style="top:60%;left:30%;">☕<span class="tooltip">Pike Place Market</span></div>`},
    boston:    { name: 'Gillette Stadium',           country: '🇺🇸', coords: 'LAT: 42.0909 | LNG: -71.2643', markers: `
      <div class="mall-marker-dot" style="top:45%;left:55%;">🛍️<span class="tooltip">Patriot Place</span></div>`},
    miami:     { name: 'Hard Rock Stadium',          country: '🇺🇸', coords: 'LAT: 25.9580 | LNG: -80.2388', markers: `
      <div class="mall-marker-dot" style="top:50%;left:60%;">🛍️<span class="tooltip">Aventura Mall</span></div>
      <div class="mall-marker-dot" style="top:35%;left:35%;">🦞<span class="tooltip">Miami Beach Dining</span></div>`},
    azteca:    { name: 'Estadio Azteca',             country: '🇲🇽', coords: 'LAT: 19.3029 | LNG: -99.1502', markers: `
      <div class="mall-marker-dot" style="top:35%;left:60%;">🛍️<span class="tooltip">Coapa Center</span></div>
      <div class="mall-marker-dot" style="top:65%;left:25%;">🌮<span class="tooltip">Azteca Fan Zone</span></div>`},
    bbva:      { name: 'Estadio BBVA',               country: '🇲🇽', coords: 'LAT: 25.6694 | LNG: -100.2593', markers: `
      <div class="mall-marker-dot" style="top:45%;left:55%;">🛍️<span class="tooltip">Galerías Monterrey</span></div>`},
    akron:     { name: 'Estadio Akron',              country: '🇲🇽', coords: 'LAT: 20.6739 | LNG: -103.3567', markers: `
      <div class="mall-marker-dot" style="top:40%;left:50%;">🛍️<span class="tooltip">Plaza Galerias GDL</span></div>`},
    bcplace:   { name: 'BC Place',                   country: '🇨🇦', coords: 'LAT: 49.2767 | LNG: -123.1120', markers: `
      <div class="mall-marker-dot" style="top:40%;left:50%;">🛍️<span class="tooltip">Pacific Centre</span></div>
      <div class="mall-marker-dot" style="top:60%;left:65%;">🍁<span class="tooltip">Granville Island Market</span></div>`},
    tfc:       { name: 'BMO Field',                  country: '🇨🇦', coords: 'LAT: 43.6334 | LNG: -79.4188', markers: `
      <div class="mall-marker-dot" style="top:45%;left:55%;">🛍️<span class="tooltip">Eaton Centre</span></div>`},
    stade:     { name: 'Stade Olympique',            country: '🇨🇦', coords: 'LAT: 45.5597 | LNG: -73.5514', markers: `
      <div class="mall-marker-dot" style="top:50%;left:50%;">🛍️<span class="tooltip">Complexe Desjardins</span></div>`},
  };

  // Markdown formatter
  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/^#{1,3} (.+)$/gm, '<span class="md-heading">$1</span>')
      .replace(/^\* (.+)$/gm, '<span class="md-bullet">• $1</span>')
      .replace(/^\• (.+)$/gm, '<span class="md-bullet">• $1</span>')
      .replace(/\n/g, '<br>');
  }

  // Append a plain (system/user) message immediately
  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.innerHTML = formatMarkdown(text);
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return msgDiv;
  }

  // Show animated typing indicator while waiting for bot reply
  function showTypingIndicator() {
    removeTypingIndicator();
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.classList.add('chat-message', 'agent', 'typing-indicator');
    indicator.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
    chatHistory.appendChild(indicator);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  // Typewriter reveal for bot messages
  function appendMessageTyped(text) {
    removeTypingIndicator();
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', 'agent');
    chatHistory.appendChild(msgDiv);

    // Stream in chunks for speed — feels live without being slow
    const words = text.split(' ');
    let i = 0;
    const CHUNK = 3;

    function tick() {
      const end = Math.min(i + CHUNK, words.length);
      msgDiv.innerHTML = formatMarkdown(words.slice(0, end).join(' '));
      chatHistory.scrollTop = chatHistory.scrollHeight;
      i = end;
      if (i < words.length) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return msgDiv;
  }

  // Render active tool chips
  function renderToolChips(chips) {
    if (!chips || chips.length === 0) {
      toolChipsContainer.innerHTML = `<span class="no-tools-text">Conversational logic processed. No DB tools triggered.</span>`;
      return;
    }
    toolChipsContainer.innerHTML = '';
    chips.forEach(c => {
      const chip = document.createElement('div');
      chip.classList.add('tool-chip');
      chip.innerHTML = `<span class="tool-chip-name">🍃 ${c.name}</span> <span class="tool-chip-action">${c.action}</span>`;
      toolChipsContainer.appendChild(chip);
    });
  }

  // Load proximity malls from server
  async function loadProximityMalls(stadiumId) {
    try {
      const res = await fetch(`/api/malls?stadiumId=${stadiumId}`);
      const data = await res.json();

      proximityList.innerHTML = '';

      if (data.length === 0) {
        proximityList.innerHTML = `<div class="no-prox-msg">No nearby retail indexed for this venue yet. Using $geoNear proximity buffer.</div>`;
      } else {
        data.forEach(item => {
          const card = document.createElement('div');
          card.classList.add('prox-card');
          card.innerHTML = `
            <div>
              <div class="prox-title">${item.name}</div>
              <div class="prox-desc">${item.details}</div>
              <div class="prox-tags">
                <span class="prox-tag surge-${String(item.surgeLevel || 'medium').toLowerCase()}">${item.surgeLevel || 'Medium'} surge</span>
                <span class="prox-tag">${item.capacityStatus || 'Capacity monitoring active'}</span>
                ${item.vipAvailable ? '<span class="prox-tag vip">VIP-ready</span>' : ''}
              </div>
            </div>
            <div class="prox-metric">
              <span class="prox-badge">${item.type}</span>
              <div class="prox-distance">${item.distance} mi</div>
              <div class="prox-rating">⭐ ${item.rating}</div>
            </div>
          `;
          proximityList.appendChild(card);
        });
      }

      const mapMeta = coordMap[stadiumId];
      if (mapMeta) {
        mapCoordinates.innerText = mapMeta.coords;
        activeStadiumLabel.innerText = `${mapMeta.country} ${mapMeta.name}`;
        mallMarkersList.innerHTML = mapMeta.markers;
      }
    } catch (err) {
      console.error('Error fetching proximity list:', err);
    }
  }

  loadProximityMalls('sofi');

  venueSelect.addEventListener('change', (e) => {
    loadProximityMalls(e.target.value);
  });

  // Suggestion chips handler
  chatHistory.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggest-btn')) {
      submitUserQuery(e.target.getAttribute('data-query'));
    }
    if (e.target.classList.contains('crud-btn')) {
      triggerCRUDDemo();
    }
  });

  // Submit user query via REST API
  async function submitUserQuery(text) {
    appendMessage('user', text);
    chatInput.value = '';

    toolChipsContainer.innerHTML = `<div class="tool-chip"><span class="tool-chip-name">⚡ Gemini</span> <span class="tool-chip-action">Analyzing reasoning graph...</span></div>`;
    showTypingIndicator();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      appendMessageTyped(data.reply);
      renderToolChips(data.toolChips);
    } catch (err) {
      removeTypingIndicator();
      appendMessage('agent', 'Error connecting to the backend agent server. Please confirm the process status.');
    }
  }

  // Live CRUD Demo — shows $push + $inc in real time
  async function triggerCRUDDemo() {
    const activities = [
      { title: '🎉 Victory Drinks at SoFi Rooftop', time: '22:00', cost: 80 },
      { title: '🏆 Fan Trophy Photo Session', time: '23:00', cost: 0 },
      { title: '🌮 Late-Night Tacos — Azteca Style', time: '23:30', cost: 45 },
    ];
    const pick = activities[Math.floor(Math.random() * activities.length)];

    toolChipsContainer.innerHTML = `<div class="tool-chip"><span class="tool-chip-name">🍃 MongoDB</span> <span class="tool-chip-action">$push activity → itineraries | $inc budget.spent</span></div>`;
    showTypingIndicator();

    try {
      const res = await fetch('/api/add-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pick)
      });
      const data = await res.json();
      const it = data.itinerary;
      const spent = it.activities.reduce((s, a) => s + a.cost, 0);
      const pct = Math.min(100, ((spent / it.budget.total) * 100).toFixed(1));

      appendMessageTyped(`✅ **MongoDB $push executed!** Added **"${data.activity.title}"** to group-101 itinerary via \`$push\` + \`$inc budget.spent +$${data.activity.cost}\`.\n\n💰 **Updated Budget**: $${spent} / $${it.budget.total} used (${pct}%)\n\n📅 **All Activities (${it.activities.length} total)**:\n${it.activities.map(a => `* \`[${a.time}]\` ${a.title} — $${a.cost}`).join('\n')}`);
    } catch (err) {
      removeTypingIndicator();
      appendMessage('agent', 'CRUD operation error. Check server connection.');
    }
  }

  // Form submit
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (query) submitUserQuery(query);
  });

  // Toggle Judge Center
  btnStatusToggle.addEventListener('click', () => {
    sectionJudgeCenter.classList.add('active');
    sectionJudgeCenter.scrollIntoView({ behavior: 'smooth' });
    loadSystemDiagnostics();
  });

  btnCloseJudge.addEventListener('click', () => {
    sectionJudgeCenter.classList.remove('active');
  });

  // Load playbook queries
  async function loadPlaybook() {
    try {
      const res = await fetch('/api/playbook');
      playbookData = await res.json();
      prePlaybookCode.innerText = playbookData.geospatialQuery;
    } catch (err) {
      console.error(err);
    }
  }
  loadPlaybook();

  // Playbook tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const tab = e.target.getAttribute('data-tab');
      if (tab === 'geo') prePlaybookCode.innerText = playbookData.geospatialQuery;
      else if (tab === 'agg') prePlaybookCode.innerText = playbookData.aggregationPipeline;
      else if (tab === 'crud') prePlaybookCode.innerText = playbookData.crudOperation;
      else if (tab === 'audit') prePlaybookCode.innerText = playbookData.auditTrail;
    });
  });

  // Load system diagnostics
  async function loadSystemDiagnostics() {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();

      statDb.innerText = data.database.status;
      statDb.className = `status-val ${data.database.status === 'PASS' ? 'pass' : 'warn'}`;
      statDb.title = data.database.detail;
      statGeo.innerText = data.geospatialIndex.status;
      statGemini.innerText = data.geminiEngine.status;
      statSync.innerText = data.groupSyncEngine.status;
      statAudit.innerText = data.auditTrail.status;
      statLiveApi.innerText = data.liveApiEvidence.status;
      statLiveApi.className = `status-val ${data.liveApiEvidence.status === 'PASS' ? 'pass' : 'warn'}`;
      statLiveApi.title = data.liveApiEvidence.detail;
    } catch (err) {
      console.error(err);
    }
  }

  // Auto Demo Tour
  btnAutoDemo.addEventListener('click', async () => {
    if (isAutoRunning) return;
    isAutoRunning = true;
    btnAutoDemo.innerText = '⚡ Tour in progress...';
    btnAutoDemo.disabled = true;

    const steps = [
      { query: "Which stadiums are hosting FIFA World Cup 2026 matches across USA, Canada, and Mexico?", venue: null },
      { query: "What restaurants and malls are near SoFi Stadium in Los Angeles?", venue: 'sofi' },
      { query: "Show my group itinerary and budget breakdown for the World Cup trip.", venue: null },
      { query: "Find the best stadium experience near MetLife Stadium in New York.", venue: 'metlife' },
    ];

    for (let i = 0; i < steps.length; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 1200));
      if (steps[i].venue) {
        venueSelect.value = steps[i].venue;
        loadProximityMalls(steps[i].venue);
      }
      await submitUserQuery(steps[i].query);
    }

    // Append CRUD demo invite
    await new Promise(r => setTimeout(r, 800));
    const inviteDiv = document.createElement('div');
    inviteDiv.classList.add('chat-message', 'system');
    inviteDiv.innerHTML = `
      <strong>🎯 Live MongoDB CRUD Demo</strong><br>
      Click below to push a new activity to the group itinerary in real time using <code class="inline-code">$push</code> + <code class="inline-code">$inc</code>:
      <div class="suggestion-chips" style="margin-top:0.6rem">
        <button class="crud-btn">➕ Add Activity via $push</button>
      </div>`;
    chatHistory.appendChild(inviteDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    isAutoRunning = false;
    btnAutoDemo.innerText = '⚡ Run Auto-Tour';
    btnAutoDemo.disabled = false;

    setTimeout(() => {
      sectionJudgeCenter.classList.add('active');
      sectionJudgeCenter.scrollIntoView({ behavior: 'smooth' });
      loadSystemDiagnostics();
    }, 1200);
  });

  if (new URLSearchParams(window.location.search).get('demo') === 'true') {
    setTimeout(() => btnAutoDemo.click(), 700);
  }

});
