const CACHE_NAME = 'oj-portfolio-v3';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './data.js',
    './resume.js',
    './favicon.svg',
    './manifest.json',
    './404.html',
    './resources/hero/headshot.jpg',
    './resources/hero/headshot.webp',
    './resources/icons/icon-192.png',
    './resources/icons/icon-512.png',
    './resources/projects/project-ica.webp',
    './resources/projects/project-ica-800.webp',
    './resources/projects/project-ica-400.webp',
    './resources/projects/project-avere-dmv.webp',
    './resources/projects/project-avere-dmv-800.webp',
    './resources/projects/project-avere-dmv-400.webp',
    './resources/projects/project-willscot.webp',
    './resources/projects/project-willscot-800.webp',
    './resources/projects/project-willscot-400.webp',
    './resources/projects/project-az-courts.webp',
    './resources/projects/project-az-courts-800.webp',
    './resources/projects/project-az-courts-400.webp',
    './resources/projects/project-wyoming-ptsb.webp',
    './resources/projects/project-wyoming-ptsb-800.webp',
    './resources/projects/project-wyoming-ptsb-400.webp',
    './resources/projects/project-california-hcd.webp',
    './resources/projects/project-california-hcd-800.webp',
    './resources/projects/project-california-hcd-400.webp',
    './resources/projects/project-republic-services.webp',
    './resources/projects/project-republic-services-800.webp',
    './resources/projects/project-republic-services-400.webp',
    './resources/certifications/certification-admin.webp',
    './resources/certifications/certification-agentforce-specialist.webp',
    './resources/certifications/certification-app-builder.webp',
    './resources/certifications/certification-application-architect.webp',
    './resources/certifications/certification-data-architect.webp',
    './resources/certifications/certification-data-cloud-consultant.webp',
    './resources/certifications/certification-deployment-architect.webp',
    './resources/certifications/certification-identity-architect.webp',
    './resources/certifications/certification-omnistudio-developer.webp',
    './resources/certifications/certification-sharing-architect.webp',
    './resources/certifications/certification-ai-associate.webp',
    './resources/certifications/certification-platform-developer-i.webp'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;

    e.respondWith(
        caches.match(e.request).then(cached => {
            const fetchPromise = fetch(e.request).then(response => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => cached);

            return cached || fetchPromise;
        })
    );
});
