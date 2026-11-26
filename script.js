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
            <img src="resources/headshot.jpg" alt="${escapeHtml(data.name)}" loading="eager" decoding="async" width="150" height="150">
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
            <span class="stat-number" data-target="${escapeHtml(s.number)}">0</span>
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

function renderTestimonials(data) {
    const el = document.getElementById('testimonialsGrid');
    if (!data.testimonials) return;

    el.innerHTML = data.testimonials.map(t => `
        <div class="testimonial-card fade-up">
            <svg class="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.172 0-2.283-.549-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.172 0-2.283-.549-2.917-1.179z"/></svg>
            <blockquote>${escapeHtml(t.quote)}</blockquote>
            <div class="testimonial-author">
                <span class="testimonial-name">${escapeHtml(t.name)}</span>
                <span class="testimonial-role">${escapeHtml(t.role)}</span>
            </div>
        </div>
    `).join('');
}

function renderBlog(data) {
    const el = document.getElementById('blogContent');
    if (!data.blog) return;

    const blogUrl = escapeHtml(data.blog.url);
    let html = '';

    if (data.blog.posts.length > 0) {
        html += '<div class="blog-grid">';
        html += data.blog.posts.map(post => `
            <a href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer" class="blog-card">
                <span class="blog-date">${escapeHtml(post.date)}</span>
                <h3>${escapeHtml(post.title)}</h3>
                <p>${escapeHtml(post.summary)}</p>
                <span class="blog-read-more">Read more &rarr;</span>
            </a>
        `).join('');
        html += '</div>';
    } else {
        html += `
            <div class="blog-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <p>I'm starting to share my thoughts on Salesforce architecture, Public Sector solutions, and lessons from 10+ years in the ecosystem. Stay tuned!</p>
            </div>
        `;
    }

    html += `<div class="blog-cta"><a href="${blogUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit My Blog</a></div>`;
    el.innerHTML = html;
}

function renderContact(data) {
    const el = document.getElementById('contactLinks');
    let html = '';

    if (data.contact.email) {
        html += `<a href="mailto:${escapeHtml(data.contact.email)}" class="contact-item">
            ${CONTACT_ICONS.email}<span>${escapeHtml(data.contact.email)}</span>
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

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    let theme;
    try {
        theme = localStorage.getItem('theme');
    } catch (e) {}

    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', theme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}
    });
}

function initNav() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        statsObserver.observe(statsSection);
    }
}

function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const target = el.getAttribute('data-target');
        const num = parseInt(target);
        const suffix = target.replace(/^\d+/, '');
        const duration = 1500;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), num);
            el.textContent = current + suffix;
            if (step >= steps) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, duration / steps);
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    if (PORTFOLIO_DATA.contact.formUrl) {
        form.action = PORTFOLIO_DATA.contact.formUrl;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('formSubmit');
        const status = document.getElementById('formStatus');
        const originalText = btn.textContent;

        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.textContent = '';
        status.className = 'form-status';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                status.textContent = 'Message sent successfully!';
                status.classList.add('success');
                form.reset();
            } else {
                status.textContent = 'Something went wrong. Please try again.';
                status.classList.add('error');
            }
        } catch {
            status.textContent = 'Network error. Please try again later.';
            status.classList.add('error');
        }

        btn.disabled = false;
        btn.textContent = originalText;
    });
}

function initSEO(data) {
    const url = data.siteUrl || '';

    const canonical = document.getElementById('canonicalLink');
    if (canonical) canonical.href = url;

    const sameAs = [];
    if (data.contact && data.contact.links) {
        data.contact.links.forEach(link => sameAs.push(link.url));
    }
    if (data.blog && data.blog.url) sameAs.push(data.blog.url);

    const skillItems = [];
    if (data.skills) {
        data.skills.forEach(group => group.items.forEach(item => skillItems.push(item)));
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": data.name,
        "jobTitle": data.title,
        "url": url,
        "image": url + "resources/headshot.jpg",
        "description": data.heroSummary,
        "sameAs": sameAs,
        "worksFor": {
            "@type": "Organization",
            "name": data.employer || ""
        },
        "knowsAbout": skillItems
    };

    const el = document.getElementById('jsonLd');
    if (el) el.textContent = JSON.stringify(jsonLd);
}

document.addEventListener('DOMContentLoaded', () => {
    const data = PORTFOLIO_DATA;

    initSEO(data);
    renderHero(data);
    renderAbout(data);
    renderSkills(data);
    renderExperience(data);
    renderProjects(data);
    renderCertifications(data);
    renderEducation(data);
    renderTestimonials(data);
    renderBlog(data);
    renderContact(data);
    renderFooter(data);

    initTheme();
    initNav();
    initAnimations();
    initContactForm();
});
