// Gunpla Elite - Navbar Component
(function () {
  'use strict';

  // ==================== Path Detection ====================
  function getBase() {
    var scripts = document.querySelectorAll('script[src*="navbar.js"]');
    var src = scripts.length ? scripts[scripts.length - 1].getAttribute('src') : 'components/navbar.js';
    var dir = src.replace(/navbar\.js.*$/, '');
    var parts = dir.split('/').filter(Boolean);
    var upCount = parts.lastIndexOf('components');
    return upCount > 0 ? parts.slice(0, upCount).join('/') + '/' : '';
  }

  function currentPage() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('home.html') !== -1 || p === '/' || p === '') return 'home';
    if (p.indexOf('katalog') !== -1) return 'katalog';
    if (p.indexOf('artikel') !== -1) return 'artikel';
    if (p.indexOf('keranjang') !== -1) return 'keranjang';
    if (p.indexOf('pembayaran') !== -1) return 'pembayaran';
    if (p.indexOf('login') !== -1 || p.indexOf('register') !== -1) return 'login';
    if (p.indexOf('profile') !== -1) return 'profile';
    if (p.indexOf('pesanan') !== -1) return 'pesanan';
    if (p.indexOf('riwayat') !== -1) return 'riwayat';
    if (p.indexOf('pengiriman') !== -1) return 'pengiriman';
    return 'home';
  }

  function isLoggedIn() {
    try {
      return localStorage.getItem('gunpla_logged_in') === '1';
    } catch (e) {
      return false;
    }
  }

  // ==================== Cart Count ====================
  function getCartCount() {
    try {
      var c = localStorage.getItem('gunpla_cart_count');
      var n = parseInt(c, 10);
      if (!isNaN(n) && n > 0) return String(n);
    } catch (e) {}
    // Default fallback agar badge tetap tampil di demo
    return '2';
  }

  // ==================== Render ====================
  function render() {
    var base = getBase();
    var cp = currentPage();
    var cc = getCartCount();
    var loggedIn = isLoggedIn();

    var linkClass = function (page) {
      return cp === page ? 'nav-link nav-active' : 'nav-link';
    };

    var links = [
      { page: 'home', label: 'HOME', href: base + 'home.html' },
      { page: 'katalog', label: 'KATALOG', href: base + 'katalog/katalog.html' },
      { page: 'artikel', label: 'ARTIKEL', href: base + 'artikel/artikel.html' },
    ];

    var dropdownLinks = [
      { href: base + 'pesanan/pesanan.html', label: 'PESANAN SAYA', icon: 'fa-shopping-bag' },
      { href: base + 'riwayat/riwayat.html', label: 'RIWAYAT TRANSAKSI', icon: 'fa-history' },
      { href: base + 'profile/profile.html', label: 'PROFILE SAYA', icon: 'fa-user' },
    ];

    var navLinksHTML = '';
    for (var i = 0; i < links.length; i++) {
      navLinksHTML += '<a href="' + links[i].href + '" class="' + linkClass(links[i].page) + '">'
        + links[i].label + '</a>';
    }

    var dropdownHTML = '';
    for (var j = 0; j < dropdownLinks.length; j++) {
      dropdownHTML += '<a href="' + dropdownLinks[j].href + '" class="dropdown-link">'
        + '<i class="fas ' + dropdownLinks[j].icon + '"></i>'
        + '<span>' + dropdownLinks[j].label + '</span>'
        + '</a>';
    }

    var badgeDisplay = cc === '0' ? 'none' : 'flex';
    var loginLabel = loggedIn ? 'PROFILE' : 'LOGIN';
    var loginHref = loggedIn
      ? base + 'profile/profile.html'
      : base + 'login/login.html';
    var loginClass = 'nav-login-btn' + ((cp === 'login' || cp === 'profile') ? ' nav-active' : '');

    return [
      '<div class="nav-wrapper">',
      '  <div class="nav-inner">',

      // Left: logo
      '    <a href="' + base + 'home.html" class="nav-brand">',
      '      GUNPLA <span class="brand-accent">ELITE</span>',
      '    </a>',

      // Center: nav links
      '    <div class="nav-links">',
      '      ' + navLinksHTML,
      '    </div>',

      // Right: actions
      '    <div class="nav-actions">',

      // Cart
      '      <a href="' + base + 'keranjang/keranjang.html" class="nav-cart" title="Keranjang">',
      '        <i class="fas fa-shopping-cart"></i>',
      '        <span class="cart-badge" style="display: ' + badgeDisplay + ';">' + cc + '</span>',
      '      </a>',

      // Hamburger + dropdown wrapper (dropdown attaches below the hamburger)
      '      <div class="nav-dropdown-menu-wrap">',
      '        <button class="nav-hamburger" type="button" id="nav-hamburger-btn" aria-label="Menu">',
      '          <i class="fas fa-bars"></i>',
      '        </button>',
      '        <div class="nav-dropdown-menu" id="nav-dropdown-menu">',
      dropdownHTML,
      '        </div>',
      '      </div>',

      // Login / Profile
      '      <a href="' + loginHref + '" class="' + loginClass + '">' + loginLabel + '</a>',

      '    </div>',  // .nav-actions
      '  </div>',    // .nav-inner

      '</div>',      // .nav-wrapper
    ].join('\n');
  }

  // ==================== Events ====================
  function setupEvents() {
    var wrapper = document.querySelector('.nav-wrapper');
    var btn = document.getElementById('nav-hamburger-btn');
    if (!wrapper || !btn) return;

    var inner = wrapper.querySelector('.nav-inner');
    var menu = document.getElementById('nav-dropdown-menu');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.toggle('open');
      inner.classList.toggle('mobile-open', isOpen);
      var icon = btn.querySelector('i');
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-wrapper')) {
        menu.classList.remove('open');
        inner.classList.remove('mobile-open');
        var icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    // Close on resize back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        menu.classList.remove('open');
        inner.classList.remove('mobile-open');
        var icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // ==================== Init ====================
  function init() {
    var container = document.getElementById('navbar-container');
    if (!container) return;
    container.innerHTML = render();
    setupEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
