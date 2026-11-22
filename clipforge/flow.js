// Small bits of interaction for the "How it works" scene.
(function () {
  var flow = document.querySelector('.flow');
  if (!flow) return;

  var lines = {
    fetch: ['On it!', 'Fresh VOD!', 'Got one!', 'Heavy reel!'],
    chef: ['Snip snip!', 'Fresh cut!', 'Chef’s kiss', 'Bon clip!'],
    courier: ['Delivery!', 'Posting!', 'Zoom zoom', 'Hi there!']
  };

  function poke(m) {
    var p = m.querySelector('.poke');
    var say = m.querySelector('.say text');
    var pool = lines[m.getAttribute('data-role')] || ['Hi!'];
    if (say) say.textContent = pool[Math.floor(Math.random() * pool.length)];
    p.classList.remove('hi');
    void p.getBoundingClientRect(); // restart the animation
    p.classList.add('hi');
  }

  flow.querySelectorAll('.m').forEach(function (m) {
    m.addEventListener('click', function () { poke(m); });
    m.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poke(m); }
    });
  });

  // stop all the moving parts while the scene is off screen
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      flow.classList.toggle('offscreen', !entries[0].isIntersecting);
    }).observe(flow);
  }

  var btn = flow.querySelector('.flow-toggle');
  if (btn) btn.addEventListener('click', function () {
    var paused = flow.classList.toggle('paused');
    btn.textContent = paused ? 'Play' : 'Pause';
    btn.setAttribute('aria-pressed', String(paused));
  });
})();
