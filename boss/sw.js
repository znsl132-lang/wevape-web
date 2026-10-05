/* We Vape — 입금 요청 앱 상단바 알림 (범위: boss/ — 다른 페이지에는 영향 없음)
   Copyright © 2026 Dae Woon Jang. All Rights Reserved. 내부 운영 자료 · 외부 공유를 금합니다 */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let j = {}; try { j = e.data ? e.data.json() : {}; } catch (err) { j = {}; }
  const d = j.data || {}, n = j.notification || {};
  const title = d.title || n.title || '입금 요청';
  const opt = { body: d.body || n.body || '', icon: 'boss-192.png', badge: 'boss-192.png',
    tag: d.id || ('wv-' + Date.now()), renotify: true, data: { url: d.url || '../boss.html' } };
  e.waitUntil(self.registration.showNotification(title, opt));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || '../boss.html', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(ws => {
    for (const w of ws) if (w.url.indexOf('boss.html') >= 0) { w.focus(); return; }
    return self.clients.openWindow(url);
  }));
});
