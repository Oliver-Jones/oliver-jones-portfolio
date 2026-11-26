const CERT_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 15l-2 5 2-1 2 1-2-5z"/><circle cx="12" cy="9" r="6"/></svg>';

const CONTACT_ICONS = {
    email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>',
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
    LinkedIn: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    GitHub: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>',
    link: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>'
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderHero(data) {
    const el = document.getElementById('heroContent');
    document.title = `${data.name} | ${data.title}`;

    el.innerHTML = `
        <div class="hero-photo fade-up">
            <img src="resources/headshot.png" alt="${escapeHtml(data.name)}">
        </div>
        <div class="hero-text">
            <p class="hero-greeting fade-up">${escapeHtml(data.greeting)}</p>
            <h1 class="hero-name fade-up">${escapeHtml(data.name)}</h1>
            <h2 class="hero-title fade-up">${escapeHtml(data.title)}</h2>
            <p class="hero-summary fade-up">${escapeHtml(data.heroSummary)}</p>
            <div class="hero-actions fade-up">
                <a href="#contact" class="btn btn-primary">Get in Touch</a>
                <a href="#projects" class="btn btn-outline">View Projects</a>
                <button onclick="generateResume(PORTFOLIO_DATA)" class="btn btn-outline">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download Resume
                </button>
            </div>
        </div>
    `;
}

function renderAbout(data) {
    const el = document.getElementById('aboutContent');
    const paragraphs = data.about.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const stats = data.stats.map(s => `
        <div class="stat">
            <span class="stat-number">${escapeHtml(s.number)}</span>
            <span class="stat-label">${escapeHtml(s.label)}</span>
        </div>
    `).join('');

    el.innerHTML = `${paragraphs}<div class="about-stats">${stats}</div>`;
}

function renderSkills(data) {
    const el = document.getElementById('skillsGrid');
    el.innerHTML = data.skills.map(group => `
        <div class="skill-category">
            <h3>${escapeHtml(group.category)}</h3>
            <ul>
                ${group.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderExperience(data) {
    const el = document.getElementById('timeline');
    el.innerHTML = data.experience.map(job => `
        <div class="timeline-item fade-up">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3>${escapeHtml(job.role)}</h3>
                    <span class="timeline-date">${escapeHtml(job.date)}</span>
                </div>
                <p class="timeline-company">${escapeHtml(job.company)}</p>
                <ul>
                    ${job.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function renderProjects(data) {
    const el = document.getElementById('projectsGrid');
    el.innerHTML = data.projects.map(proj => `
        <div class="project-card fade-up">
            <div class="project-date">${escapeHtml(proj.date)}</div>
            <h3>${escapeHtml(proj.name)}</h3>
            <p>${escapeHtml(proj.description)}</p>
            <div class="project-tags">
                ${proj.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderCertifications(data) {
    const el = document.getElementById('certsGrid');
    el.innerHTML = data.certifications.map(cert => `
        <div class="cert-card">
            <div class="cert-icon">${CERT_ICON}</div>
            <h4>${escapeHtml(cert.name)}</h4>
            ${cert.issuer ? `<span class="cert-issuer">${escapeHtml(cert.issuer)}</span>` : ''}
            <span class="cert-date">${escapeHtml(cert.date)}</span>
        </div>
    `).join('');
}

function renderEducation(data) {
    const el = document.getElementById('educationGrid');
    el.innerHTML = data.education.map(edu => `
        <div class="edu-card">
            <h3>${escapeHtml(edu.degree)}</h3>
            <p class="edu-school">${escapeHtml(edu.school)}</p>
            <p class="edu-details">${escapeHtml(edu.period)} &bull; ${escapeHtml(edu.grade)}</p>
        </div>
    `).join('');
}

function renderContact(data) {
    const el = document.getElementById('contactLinks');
    let html = '';

    if (data.contact.email) {
        html += `<a href="mailto:${escapeHtml(data.contact.email)}" class="contact-item">
            ${CONTACT_ICONS.email}<span>${escapeHtml(data.contact.email)}</span>
        </a>`;
    }

    if (data.contact.phone) {
        const tel = data.contact.phone.replace(/\s/g, '');
        html += `<a href="tel:${escapeHtml(tel)}" class="contact-item">
            ${CONTACT_ICONS.phone}<span>${escapeHtml(data.contact.phone)}</span>
        </a>`;
    }

    if (data.contact.links) {
        data.contact.links.forEach(link => {
            const icon = CONTACT_ICONS[link.label] || CONTACT_ICONS.link;
            html += `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="contact-item">
                ${icon}<span>${escapeHtml(link.label)}</span>
            </a>`;
        });
    }

    el.innerHTML = html;
}

function renderFooter(data) {
    const el = document.getElementById('footerText');
    const year = new Date().getFullYear();
    el.textContent = `© ${year} ${data.name}. All rights reserved.`;
}

function initNav() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

function initAnimations() {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('#navLinks a');

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        item.classList.toggle('active', item.getAttribute('href') === '#' + id);
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(section => sectionObserver.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    const data = PORTFOLIO_DATA;

    renderHero(data);
    renderAbout(data);
    renderSkills(data);
    renderExperience(data);
    renderProjects(data);
    renderCertifications(data);
    renderEducation(data);
    renderContact(data);
    renderFooter(data);

    initNav();
    initAnimations();
});
