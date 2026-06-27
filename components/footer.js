// Gunpla Elite - Shared Footer Loader
(function () {
  'use strict';

  function getBase() {
    var scripts = document.querySelectorAll('script[src*="footer.js"]');
    var src = scripts.length ? scripts[scripts.length - 1].getAttribute('src') : 'components/footer.js';
    var scriptDir = src.replace(/footer\.js.*$/, '');
    var parts = scriptDir.split('/').filter(Boolean);
    var upCount = parts.lastIndexOf('components');
    return upCount > 0 ? parts.slice(0, upCount).join('/') + '/' : '';
  }

  function buildLinks(base) {
    return {
      home: base + 'home.html',
      katalog: base + 'katalog/katalog.html',
      artikel: base + 'artikel/artikel.html',
    };
  }

  function render() {
    var base = getBase();
    var links = buildLinks(base);

    return ''
      + '<footer class="bg-bg-footer text-gray-300 pt-16 pb-8 text-sm">'
      + '<div class="container mx-auto px-4">'
      + '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">'
      + '<div>'
      + '<a class="text-2xl font-oswald font-bold tracking-wider text-white block mb-4" href="' + links.home + '">GUNPLA <span class="text-primary-red">ELITE</span></a>'
      + '<p class="text-gray-400 mb-6 text-xs leading-relaxed">Pusat model kit profesional untuk para builder. Menyediakan pengalaman belanja terbaik dengan jaminan kualitas.</p>'
      + '<div class="flex gap-3">'
      + '<a class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-primary-red hover:text-white transition-colors" href="https://twitter.com" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a>'
      + '<a class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-primary-red hover:text-white transition-colors" href="https://instagram.com" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>'
      + '<a class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-primary-red hover:text-white transition-colors" href="https://youtube.com" target="_blank" rel="noopener"><i class="fab fa-youtube"></i></a>'
      + '</div>'
      + '</div>'
      + '<div>'
      + '<h4 class="text-white font-bold uppercase mb-4 tracking-wider text-xs">Quick Links</h4>'
      + '<ul class="space-y-2 text-gray-400">'
      + '<li><a class="hover:text-white transition-colors" href="' + links.home + '">Home</a></li>'
      + '<li><a class="hover:text-white transition-colors" href="' + links.katalog + '">Katalog</a></li>'
      + '<li><a class="hover:text-white transition-colors" href="' + links.artikel + '">Artikel</a></li>'
      + '</ul>'
      + '</div>'
      + '<div>'
      + '<h4 class="text-white font-bold uppercase mb-4 tracking-wider text-xs">Hubungi Kami</h4>'
      + '<ul class="space-y-4 text-gray-400 text-xs">'
      + '<li><span class="block text-gray-500 mb-1">Email</span><a class="hover:text-white transition-colors" href="mailto:support@gunplaelite.com">support@gunplaelite.com</a></li>'
      + '<li><span class="block text-gray-500 mb-1">Toko</span><span>Surabaya, Indonesia</span></li>'
      + '</ul>'
      + '</div>'
      + '</div>'
      + '<div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">'
      + '<p>&copy; 2024 GUNPLA ELITE. All Rights Reserved.</p>'
      + '<div class="flex gap-4"><span>ENG_VER: 2.0.4</span><span>STATUS: ONLINE</span></div>'
      + '</div>'
      + '</div>'
      + '</footer>';
  }

  function init() {
    var host = document.getElementById('footer');
    if (!host) return;
    host.outerHTML = render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
