const CACHE_NAME = 'prayerwall-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add your CSS, JS, icons here too
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value.trim();
  if (text) {
    const div = document.createElement('div');
    div.className = 'prayer';
    div.textContent = text;

    // Save the timestamp as a data attribute
    div.dataset.timestamp = Date.now();

    wall.prepend(div);
    textarea.value = '';
    showPage('wall');
  }
});

// Function to remove prayers older than 2 hours (7200000 ms)
function cleanOldPrayers() {
  const now = Date.now();
  const prayers = wall.querySelectorAll('.prayer');
  prayers.forEach(prayer => {
    const prayerTime = Number(prayer.dataset.timestamp);
    if (now - prayerTime > 2 * 60 * 60 * 1000) {
      prayer.remove();
    }
  });
}

const swearWords = ['shit', 'shit', 'shit']; // replace with your swear words in lowercase

function containsSwear(text) {
  const pattern = '\\b(' + swearWords.join('|') + ')\\b';
  const regex = new RegExp(pattern, 'i');
  return regex.test(text);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const textarea = form.querySelector('textarea');
  const text = textarea.value.trim();

  if (text) {
    const div = document.createElement('div');
    div.className = 'prayer';
    div.dataset.timestamp = Date.now();

    if (containsSwear(text)) {
      div.innerHTML = `
        <div style="filter: blur(6px); background: #f0f0f0; padding: 1rem; border-radius: 6px; user-select:none; width: 100%; box-sizing: border-box;">
          [content removed]
        </div>
        <span style="color: red; font-weight: bold; margin-left: 10px; display: inline-flex; align-items: center;">
          <span style="width:14px; height:14px; border-radius:50%; background:red; display:inline-block; margin-right:6px;"></span>
          removed for vulgar language
        </span>
      `;
    } else {
      div.textContent = text;
    }

    wall.prepend(div);
    textarea.value = '';
    showPage('wall');
  }
});

function cleanOldPrayers() {
  const now = Date.now();
  const prayers = wall.querySelectorAll('.prayer');
  prayers.forEach(prayer => {
    const prayerTime = Number(prayer.dataset.timestamp);
    if (now - prayerTime > 2 * 60 * 60 * 1000) {
      prayer.remove();
    }
  });
}

setInterval(cleanOldPrayers, 5 * 60 * 1000);
