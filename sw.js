// Network first, so a new version shows up on the next online visit; the cache is the offline fallback.
const C='docdoc-lab-v2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));});
