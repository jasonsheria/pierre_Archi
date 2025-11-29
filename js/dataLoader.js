// dataLoader.js
// Ce script charge les données du serveur, les stocke dans le localStorage et les injecte dans la page d'accueil.
// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = 'https://wise-server.onrender.com';
// const API_URL = 'http://localhost:5000/site/details';
const API_URL = 'https://wise-server.onrender.com/site/details';
const SITE_ID = '68979a270b46624b143783ab';

function showPreloader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('show');
    if (loader) loader.classList.remove('hide');
}

function hidePreloader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('show');
        loader.classList.add('hide');
        setTimeout(() => { loader.style.display = 'none'; }, 700);
    }
}

function injectDataToHome(data) {

    // Hero
    if (data && data.user) {
        // Log pour debug
        // Nom
        const h1 = document.querySelector('.hero-text h1');
        if (h1) h1.textContent = data.user.name || data.user.username;
        // Rôle
        const h2 = document.querySelector('.hero-text h2');
        if (h2) h2.textContent = data.user.expertise || data.user.subtidomaine
        // Intro

        // Image de profil
        const heroImg = document.querySelector('.hero-image img');
        if (heroImg) {
            if (data.user && data.user.profileImage1) {
                heroImg.src = data.user.profileImage1.startsWith('http') ? data.user.profileImage1 : ( data.user.profileImage1);
                heroImg.alt = data.user.username || data.user.name || 'Hero Image';
                heroImg.style.display = '';
            } else {
                // Pas d'image : masquer ou afficher un placeholder stylé
                heroImg.style.display = 'none';
                // Ajouter un avatar SVG si pas déjà présent
                if (!document.getElementById('hero-avatar-placeholder')) {
                    const parent = heroImg.parentElement;
                    const svg = document.createElement('div');
                    svg.id = 'hero-avatar-placeholder';
                    svg.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60" fill="url(#paint0_linear)"/><ellipse cx="60" cy="52" rx="28" ry="26" fill="#fff"/><ellipse cx="60" cy="100" rx="36" ry="18" fill="#fff"/><defs><linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#43e97b"/><stop offset="1" stop-color="#6c63ff"/></linearGradient></defs></svg>`;
                    svg.style.display = 'block';
                    svg.style.margin = '0 auto';
                    parent.appendChild(svg);
                }
            }
        }
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.src = data.user.logo ? (data.user.logo.startsWith('http') ? data.user.logo : ( data.user.logo)) :  '/images/logo.png';
            logo.alt = data.user.username || data.user.name || 'Logo';

        }
        // Affichage dynamique de l'expérience ou du texte animé dans le Hero
        // On cible un élément .hero-text .typed-text si présent, sinon le premier div
        let typed = document.querySelector('.hero-text .typed-text');
        if (!typed) {
            // fallback : premier div dans .hero-text
            typed = document.querySelector('.hero-text span');
        }
        if (typed) {
            // On affiche l'expérience principale ou un résumé des expériences
            let experienceText = data.user.experience;
            typed.textContent = experienceText || '';
        }
        document.getElementById('brand-name').textContent = data.user.username.slice(0, 12) || data.user.name.slice(0, 12) || 'Portfolio';
    } else {
        // Hero fallback
        const h1 = document.querySelector('.hero-text h1');
        if (h1) h1.textContent = 'Bienvenue !';
        const h2 = document.querySelector('.hero-text h2');
        if (h2) h2.textContent = 'Votre futur site ici';
        // Image : masquer
        const heroImg = document.querySelector('.hero-image img');
        if (heroImg) heroImg.style.display = 'none';
        // Placeholder SVG
        if (!document.getElementById('hero-avatar-placeholder')) {
            const parent = heroImg ? heroImg.parentElement : null;
            if (parent) {
                const svg = document.createElement('div');
                svg.id = 'hero-avatar-placeholder';
                svg.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60" fill="url(#paint0_linear)"/><ellipse cx="60" cy="52" rx="28" ry="26" fill="#fff"/><ellipse cx="60" cy="100" rx="36" ry="18" fill="#fff"/><defs><linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#43e97b"/><stop offset="1" stop-color="#6c63ff"/></linearGradient></defs></svg>`;
                svg.style.display = 'block';
                svg.style.margin = '0 auto';
                parent.appendChild(svg);
            }
        }
    }
    // About

    if (data && data.user) {
        const aboutTitle = document.querySelector('#about .section-header h2');
        if (aboutTitle) aboutTitle.textContent = data.user.description || aboutTitle.textContent;
        const aboutDesc = document.querySelector('#about .about-text p');
        if (aboutDesc) aboutDesc.textContent = data.user.experience || aboutDesc.textContent;

        const logo = document.querySelector('.about-img img');
        if (logo) {
            if (data.user.profileImage2) {
                logo.src = data.user.profileImage2.startsWith('http') ? data.user.profileImage2 : ( data.user.profileImage2);
                logo.alt = data.user.username || data.user.name || 'Logo';
                logo.style.display = '';
                if (document.getElementById('about-avatar-placeholder')) document.getElementById('about-avatar-placeholder').remove();
            } else {
                logo.style.display = 'none';
                if (!document.getElementById('about-avatar-placeholder')) {
                    const parent = logo.parentElement;
                    const svg = document.createElement('div');
                    svg.id = 'about-avatar-placeholder';
                    svg.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60" fill="url(#paint0_linear)"/><ellipse cx="60" cy="52" rx="28" ry="26" fill="#fff"/><ellipse cx="60" cy="100" rx="36" ry="18" fill="#fff"/><defs><linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#43e97b"/><stop offset="1" stop-color="#6c63ff"/></linearGradient></defs></svg>`;
                    svg.style.display = 'block';
                    svg.style.margin = '0 auto';
                    parent.appendChild(svg);
                }
            }
        }
    } else {
        // About fallback
        const logo = document.querySelector('.about-img img');
        if (logo) logo.style.display = 'none';
        if (!document.getElementById('about-avatar-placeholder')) {
            const parent = logo ? logo.parentElement : null;
            if (parent) {
                const svg = document.createElement('div');
                svg.id = 'about-avatar-placeholder';
                svg.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60" fill="url(#paint0_linear)"/><ellipse cx="60" cy="52" rx="28" ry="26" fill="#fff"/><ellipse cx="60" cy="100" rx="36" ry="18" fill="#fff"/><defs><linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stop-color="#43e97b"/><stop offset="1" stop-color="#6c63ff"/></linearGradient></defs></svg>`;
                svg.style.display = 'block';
                svg.style.margin = '0 auto';
                parent.appendChild(svg);
            }
        }
    }
    // Services dynamiques 100% JS (plus de statique HTML)
    if (data && data.services && Array.isArray(data.services)) {
        const serviceRow = document.querySelector('.service .row');
        if (serviceRow) {
            serviceRow.innerHTML = '';
            // Tableau enrichi d'icônes cohérent par thème (FontAwesome)
            const iconMap = {
                'web': 'fa-laptop-code',
                'web design': 'fa-laptop',
                'web development': 'fa-laptop-code',
                'mobile': 'fa-mobile-alt',
                'mobile app': 'fa-mobile-alt',
                'app': 'fa-mobile-alt',
                'apps design': 'fab fa-android',
                'apps development': 'fab fa-apple',
                'seo': 'fa-search',
                'design': 'fa-paint-brush',
                'cloud': 'fa-cloud',
                'data': 'fa-database',
                'ai': 'fa-robot',
                'ecommerce': 'fa-shopping-cart',
                'cyber': 'fa-shield-alt',
                'consulting': 'fa-comments',
                'support': 'fa-headset',
                'security': 'fa-lock',
                'marketing': 'fa-bullhorn',
                'analytics': 'fa-chart-line',
                'database': 'fa-database',
                'hosting': 'fa-server',
                'devops': 'fa-tools',
                'blockchain': 'fa-link',
                'game': 'fa-gamepad',
                'video': 'fa-video',
                'photo': 'fa-camera',
                'audio': 'fa-music',
                'education': 'fa-graduation-cap',
                'finance': 'fa-coins',
                'legal': 'fa-balance-scale',
                'medical': 'fa-user-md',
                'travel': 'fa-plane',
                'restaurant': 'fa-utensils',
                'logistics': 'fa-truck',
                'energy': 'fa-bolt',
                'agriculture': 'fa-seedling',
                'sport': 'fa-futbol',
                'art': 'fa-palette',
                'writing': 'fa-pen-nib',
                'translation': 'fa-language',
                'default': 'fa-cogs'
            };
            // Limiter à 6 services maximum
            data.services.slice(0, 6).forEach((srv, i) => {
                // Déterminer l'icône selon le titre ou le thème
                // Attribution d'icône améliorée :
                // - On regarde d'abord srv.icon (si fourni par l'API)
                // - Sinon, on cherche dans le titre, le thème, ou la description
                // - On prend le premier mot clé qui matche dans iconMap (ordre de priorité)
                let icon = iconMap['default'];
                const candidates = [srv.icon, srv.theme, srv.title, srv.service_name, srv.service_descriptions, srv.description];
                for (const val of candidates) {
                    if (!val) continue;
                    const key = val.toLowerCase();
                    for (const k in iconMap) {
                        if (k !== 'default' && key.includes(k)) {
                            icon = iconMap[k];
                            break;
                        }
                    }
                    if (icon !== iconMap['default']) break;
                }
                const col = document.createElement('div');
                col.className = 'col-lg-6 wow fadeInUp';
                col.setAttribute('data-wow-delay', `${0.2 * (i % 4)}s`);
                col.innerHTML = `
                    <div class="service-item">
                        <div class="service-icon">
                            <i class="fa ${icon}"></i>
                        </div>
                        <div class="service-text">
                            <h3>${srv.service_name || srv.title || ''}</h3>
                            <p>${srv.service_descriptions || srv.description || ''}</p>
                        </div>
                    </div>
                `;
                serviceRow.appendChild(col);
            });
            // Ajouter le bouton "Voir plus" centré si plus de 6 services
            if (data.services.length > 6) {
                const btnRow = document.createElement('div');
                btnRow.style.width = '100%';
                btnRow.style.display = 'flex';
                btnRow.style.justifyContent = 'center';
                btnRow.style.marginTop = '24px';
                btnRow.innerHTML = `<button class="btn btn-primary" id="see-more-services" style="font-weight:600;font-size:1.1em;padding:12px 36px;border-radius:10px;box-shadow:0 2px 12px #43e97b44;background:linear-gradient(90deg,#43e97b 0%,#38f9d7 100%);color:#222;transition:background 0.3s,box-shadow 0.3s;">Voir plus</button>`;
                serviceRow.appendChild(btnRow);
            }
        }
    }
    // Experience dynamique (Expérience professionnelle)
    if (data && data.projets && Array.isArray(data.projets)) {
        const timeline = document.getElementById('experience-timeline');
        const moreBtnContainer = document.getElementById('experience-more-btn-container');
        if (timeline) {
            timeline.innerHTML = '';
            const maxToShow = 6;
            const projetsToShow = data.projets.slice(0, maxToShow);
            projetsToShow.forEach((exp, i) => {
                const side = i % 2 === 0 ? 'left' : 'right';
                const item = document.createElement('div');
                item.className = `timeline-item ${side} wow slideIn${side.charAt(0).toUpperCase() + side.slice(1)}`;
                item.setAttribute('data-wow-delay', '0.1s');
                item.innerHTML = `
                    <div class="timeline-text">
                        <div class="timeline-date">${exp.anneeDebut || ''}-${exp.anneeFin || ''}</div>
                        <h2>${exp.titre || ''}</h2>
                        <h4>${exp.company || ''}${exp.location ? ', ' + exp.location : ''}</h4>
                        <p>${exp.description || ''}</p>
                    </div>
                `;
                timeline.appendChild(item);
            });
            // Bouton "Voir plus" si plus de 6 expériences
            if (data.projets.length > maxToShow && moreBtnContainer) {
                moreBtnContainer.innerHTML = `<button class="btn btn-primary" id="see-more-experiences" style="font-weight:600;font-size:1.1em;padding:12px 36px;border-radius:10px;box-shadow:0 2px 12px #43e97b44;background:linear-gradient(90deg,#43e97b 0%,#38f9d7 100%);color:#222;transition:background 0.3s,box-shadow 0.3s;">Voir plus</button>`;
                document.getElementById('see-more-experiences').onclick = function () {
                    // Affiche toutes les expériences restantes
                    timeline.innerHTML = '';
                    data.projets.forEach((exp, i) => {
                        const side = i % 2 === 0 ? 'left' : 'right';
                        const item = document.createElement('div');
                        item.className = `timeline-item ${side} wow slideIn${side.charAt(0).toUpperCase() + side.slice(1)}`;
                        item.setAttribute('data-wow-delay', '0.1s');
                        item.innerHTML = `
                            <div class=\"timeline-text\">
                                <div class=\"timeline-date\">${exp.anneeDebut || ''}-${exp.anneeFin || ''}</div>
                                <h2>${exp.titre || ''}</h2>
                                <h4>${exp.company || ''}${exp.location ? ', ' + exp.location : ''}</h4>
                                <p>${exp.description || ''}</p>
                            </div>
                        `;
                        timeline.appendChild(item);
                    });
                    moreBtnContainer.innerHTML = '';
                    if (typeof WOW !== 'undefined') setTimeout(() => { new WOW().init(); }, 100);
                };
            } else if (moreBtnContainer) {
                moreBtnContainer.innerHTML = '';
            }
        }
    }
    // Portfolio
    const portfolioRow = document.querySelector('.portfolio .row');
    if (portfolioRow) portfolioRow.innerHTML = '';
    // On n'injecte que si data.portfolio est un tableau non vide ET que le conteneur était non vide ou vide (toujours vidé avant)
    if (data && Array.isArray(data.portfolio) && data.portfolio.length > 0) {
        const portfolio = data.portfolio.filter(post => post && (post.updatedAt || post.createdAt))
            .sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.createdAt || 0);
                const dateB = new Date(b.updatedAt || b.createdAt || 0);
                return dateB - dateA; // plus récent d'abord
            })
            .slice(0, 6);
        portfolio.forEach(item => {
            let imgUrl = item.imageUrl || '';
            if (imgUrl && !imgUrl.startsWith('http')) {
                imgUrl = `${API_BASE_URL}` + imgUrl;
            }
            const block = document.createElement('div');
            block.className = 'col-lg-4 col-md-6 portfolio-item';
            block.innerHTML = `
                <div class="portfolio-wrap" style="margin: 10px; box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; margin: 10px  ">
                    <img src="${imgUrl || 'img/portfolio-1.jpg'}" class="img-fluid" alt="${item.title || ''}" style="height : 30vh, width : 100%; object-fit: cover; border-radius: 18px;">
                    <div class="portfolio-info">
                        <h4 style="margin-top: 15px; text-transform: capitalize; font-weight : bold ">${item.title || ''}</h4>
                    </div>
                    
                </div>
            `;
            portfolioRow.appendChild(block);
        });
    } else {
        // Pas de données : afficher 1 à 3 blocs vides stylés
        for (let i = 0; i < 3; i++) {
            const block = document.createElement('div');
            block.className = 'col-lg-4 col-md-6 portfolio-item';
            block.innerHTML = `
                <div class="portfolio-wrap" style="background:linear-gradient(120deg,#f8fafd 60%,#e0fff7 100%);border-radius:18px;min-height:220px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px #43e97b22;">
                    <div style="text-align:center;width:100%;color:#aaa;font-size:1.2em;">
                        <i class="fa fa-image" style="font-size:2.5em;color:#43e97b;"></i><br>Projet à venir
                    </div>
                </div>
            `;
            portfolioRow.appendChild(block);
        }
    }
    // Price
    if (data && data.pricing && Array.isArray(data.pricing)) {
        const priceTitles = document.querySelectorAll('.price .price-title h2');
        const priceValues = document.querySelectorAll('.price .price-prices h2');
        data.pricing.forEach((price, i) => {
            if (priceTitles[i]) priceTitles[i].textContent = price.title;
            if (priceValues[i]) priceValues[i].innerHTML = price.value;
        });
    }
    // Team
    if (data && data.team && Array.isArray(data.team)) {
        const teamNames = document.querySelectorAll('.team .team-text h2');
        const teamRoles = document.querySelectorAll('.team .team-text h4');
        const teamDescs = document.querySelectorAll('.team .team-text p');
        data.team.forEach((member, i) => {
            if (teamNames[i]) teamNames[i].textContent = member.name;
            if (teamRoles[i]) teamRoles[i].textContent = member.role;
            if (teamDescs[i]) teamDescs[i].textContent = member.description;
        });
    }
    // Testimonials
    if (data && data.testimonials && Array.isArray(data.testimonials)) {
        const testiDescs = document.querySelectorAll('.testimonial .testimonial-item p');
        const testiNames = document.querySelectorAll('.testimonial .testimonial-text h3');
        const testiRoles = document.querySelectorAll('.testimonial .testimonial-text h4');
        data.testimonials.forEach((testi, i) => {
            if (testiDescs[i]) testiDescs[i].textContent = testi.text;
            if (testiNames[i]) testiNames[i].textContent = testi.name;
            if (testiRoles[i]) testiRoles[i].textContent = testi.role;
        });
    }
    // Contact
    // Footer (remplacer data.contact par data.user)
    if (data && data.user) {
        const contactName = document.querySelector('.footer .footer-info h2');
        if (contactName) contactName.textContent = data.user.name || data.user.username || '';
        const contactAddress = document.querySelector('.footer .footer-info h3');
        if (contactAddress) contactAddress.textContent = data.user.address || '';
        const contactPhone = document.querySelector('.footer .footer-menu p:first-child');
        if (contactPhone) contactPhone.textContent = data.user.phone || '';
        const contactEmail = document.querySelector('.footer .footer-menu p:last-child');
        if (contactEmail) contactEmail.textContent = data.user.email || '';
    }
    // Banner contact infos dynamiques
    if (data && data.user) {
        const bannerAddress = document.getElementById('banner-contact-address');
        const bannerEmail = document.getElementById('banner-contact-email');
        const bannerPhone = document.getElementById('banner-contact-phone');
        if (bannerAddress) bannerAddress.textContent = data.user.address || '';
        if (bannerEmail) bannerEmail.textContent = data.user.email || '';
        if (bannerPhone) bannerPhone.textContent = data.user.phone || '';
    }
    // Blog
    let blogArray = undefined;
    if (data && Array.isArray(data.posts)) {
        // Trier du plus récent au plus ancien (par date de création ou de mise à jour)
        blogArray = [...data.posts]
            .filter(post => post && (post.updatedAt || post.createdAt))
            .sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.createdAt || 0);
                const dateB = new Date(b.updatedAt || b.createdAt || 0);
                return dateB - dateA; // plus récent d'abord
            })
            .slice(0, 6);
        console.log('[DataLoader] Articles détectés dans data.posts :', blogArray);
    } else {
        console.warn('[DataLoader] data.posts absent ou non-tableau. Valeur reçue :', data);
    }
    if (blogArray) {
        console.log(`[DataLoader] Nombre d'articles à injecter : ${blogArray.length}`);
        if (blogArray.length === 0) {
            console.warn('[DataLoader] Attention : Aucun article à afficher dans le tableau blogArray !');
        }
        const blogRow = document.querySelector('.blog .row');
        if (blogRow) {
            blogRow.innerHTML = '';
            blogArray.forEach(post => {
                // Gestion de l'URL de l'image
                let imgUrl = post.media?.[0]?.url || post.media?.[1]?.url || post.image;
                if (imgUrl && !imgUrl.startsWith('http')) {
                    imgUrl =  imgUrl;
                }
                // Construction du bloc article
                const article = document.createElement('div');
                article.className = 'col-lg-4 col-md-6 blog-item';
                article.innerHTML = `
                    <div class="blog-img">
                        <img src="${imgUrl || 'img/blog-1.jpg'}" alt="${post.title || ''}">
                    </div>
                    <div class="blog-text">
                        <h2>${post.title || ''}</h2>
                        <div class="blog-meta">
                            <p><i class="fa fa-user"></i> ${post.author || 'Admin'}</p>
                            <p><i class="fa fa-calendar"></i> ${post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '')}</p>
                        </div>
                        <div class="lien">
                                  <p>
                                       Link : <i class="fa fa-link"></i> <a href="${post.link ? post.link : null || null}" class="lien-blog" style="color : blue"> ${post.link || null}</a>
                                  </p>
                                </div>
                        <p>${(post.content ? post.content.slice(0, 200) + '...' : (post.description ? post.description.slice(0, 200) + '...' : ''))}</p>
                        ${post.link ? `<a class="btn" href="${post.link}" target="_blank">Read More <i class="fa fa-angle-right"></i></a>` : ''}
                    </div>
                `;
                blogRow.appendChild(article);
            });
        }
    }
    // Contact user image (formulaire)
    if (data && data.user) {
        const contactImg = document.getElementById('contact-user-img');
        if (contactImg) {
            let imgUrl = data.user.profileImage1 || data.user.profileImage3 || '';
            if (imgUrl && !imgUrl.startsWith('http')) {
                imgUrl =  imgUrl;
            }
            contactImg.src = imgUrl || '';
            contactImg.alt = data.user.name || data.user.username || 'User';
        }
    }
    // Contact section: background dynamique
    const contactSection = document.querySelector('.contact .container-fluid');
    if (contactSection && data && data.user) {
        let bgUrl = data.user.profileImage || data.user.profileImage1 || '';
        if (bgUrl && !bgUrl.startsWith('http')) {
            bgUrl =  bgUrl;
        }
        contactSection.style.background = `url('${bgUrl}') left center / contain no-repeat`;
    }
    // Réinitialiser les animations après injection dynamique
    if (typeof WOW !== 'undefined') {
        setTimeout(() => {
            new WOW().init();
        }, 100); // petit délai pour garantir l'injection DOM
    }

    // Skills dynamiques depuis user.domaine (séparé par virgules)
    if (data && data.user && data.user.domaine) {
        const skillsContainer = document.querySelector('.about .skills');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            // Limiter à 5 domaines maximum
            const domaines = data.user.domaine.split(',').map(s => s.trim()).filter(Boolean).slice(0, 5);
            domaines.forEach(skill => {
                // Pourcentage aléatoire entre 70 et 90
                const percent = Math.floor(Math.random() * 21) + 70;
                const skillBlock = document.createElement('div');
                skillBlock.innerHTML = `
                    <div class="skill-name">
                        <p>${skill}</p><p>${percent}%</p>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                `;
                skillsContainer.appendChild(skillBlock);
            });
        }
    }

    // footer dynamique depuis data.user 
    if (data && data.user) {
        const footerLogo = document.querySelector('.footer .footer-logo img');
        if (footerLogo) {
            footerLogo.src = data.user.logo ? (data.user.logo.startsWith('http') ? data.user.logo : ( data.user.logo)) :  '/images/logo.png';
            footerLogo.alt = data.user.username || data.user.name || 'Logo';
        }
        const footerText = document.querySelector('.footer .footer-text p');
        if (footerText) {
            footerText.textContent = `© ${new Date().getFullYear()} ${data.user.username || data.user.name || 'Wise Portfolio'}. Tous droits réservés.`;
        }
        // Avatar
        const avatarImg = document.getElementById('footer-avatar-img');
        if (avatarImg) {
            let avatarUrl = data.user.avatarUrl || data.user.profileImage3 || data.user.profileImage1 || '';
            if (avatarUrl && !avatarUrl.startsWith('http')) {
                avatarUrl = (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : '') + avatarUrl;
            }
            avatarImg.src = avatarUrl || 'data:image/svg+xml;utf8,<svg width="70" height="70" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="35" fill="%236c63ff"/><text x="50%" y="54%" text-anchor="middle" fill="white" font-size="28" font-family="Montserrat,Arial" dy=".3em">👤</text></svg>';
            avatarImg.alt = data.user.name || data.user.username || 'Avatar';
        }
        // Nom
        const footerName = document.getElementById('footer-name');
        if (footerName) footerName.textContent = data.user.name || data.user.username || 'Nom Prénom';
        // Rôle
        const footerRole = document.getElementById('footer-role');
        if (footerRole) footerRole.textContent = data.user.role || data.user.expertise || 'Développeur Web';
        // Email
        const footerEmail = document.getElementById('footer-email');
        if (footerEmail) {
            footerEmail.textContent = data.user.email || 'email@example.com';
            footerEmail.href = data.user.email ? `mailto:${data.user.email}` : '#';
        }
        // Téléphone
        const footerPhone = document.getElementById('footer-phone');
        if (footerPhone) {
            footerPhone.textContent = data.user.telephone || '+33 6 00 00 00 00';
            footerPhone.href = data.user.telephone ? `tel:${data.user.telephone}` : '#';
        }
        // Réseaux sociaux
        const footerLinkedin = document.getElementById('footer-linkedin');

        if (footerLinkedin) footerLinkedin.href = data.user.linkedin || '#';

        const footerGithub = document.getElementById('footer-github');
        if (footerGithub) footerGithub.href = data.user.github || '#';
        const footerInstagram = document.getElementById('footer-instagram');
        if (footerInstagram) footerInstagram.href = data.user.instagram || '#';
        const footerWhatsapp = document.getElementById('footer-whatsapp');
        if (footerWhatsapp) footerWhatsapp.href = data.user.whatsapp
        // Site name
        const footerSiteName = document.getElementById('footer-site-name');
        if (footerSiteName) footerSiteName.textContent = data.user.siteName || data.user.username || data.user.name || 'Votre Site';
        // Année dynamique
        const footerYear = document.getElementById('footer-year');
        if (footerYear) footerYear.textContent = new Date().getFullYear();
    }
}

// Affiche une notification simple en haut à droite avec un design amélioré et tout en français
function showNotification(message, type = "success") {
    const notif = document.createElement("div");
    notif.className = `custom-notification ${type}`;
    notif.innerHTML = `
        <span class="notif-message">${message}</span>
        <span class="notif-close" style="margin-left:16px;cursor:pointer;font-weight:bold;">&times;</span>
    `;
    Object.assign(notif.style, {
        position: "fixed",
        left: "20%",
        bottom: "32px",
        transform: "translateX(-35%) translateY(60px) scale(0.95)",
        zIndex: 9999,
        background: type === "success" ? "#222" : type === "error" ? "#ff5858" : "#ffc107",
        color: "#fff",
        padding: "18px 32px 18px 22px",
        borderRadius: "14px",
        boxShadow: "0 8px 32px #0003",
        fontSize: "1.13em",
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: "'Montserrat', Arial, sans-serif",
        letterSpacing: "0.01em",
        border: "none",
        minWidth: "220px",
        maxWidth: "90vw",
        textAlign: "center",
        fontWeight: 600,
        transition: "opacity 0.5s cubic-bezier(.4,2,.6,1), transform 0.5s cubic-bezier(.4,2,.6,1)",
    });
    notif.querySelector('.notif-close').onclick = () => notif.remove();
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.opacity = 1;
        notif.style.transform = "translateX(-50%) translateY(0) scale(1)";
    }, 30);
    setTimeout(() => {
        notif.style.opacity = 0;
        notif.style.transform = "translateX(-50%) translateY(60px) scale(0.95)";
        setTimeout(() => notif.remove(), 500);
    }, 4000);
}

// Animation du bouton d'envoi lors de la soumission du formulaire (texte en français)
function animateSendButton(btn) {
    if (!btn) return;
    btn.classList.add('btn-animate');
    btn.disabled = true;
    btn.innerHTML = `<span class="btn-spinner"></span> <span class="btn-text">Envoi...</span>`;
}
function resetSendButton(btn, text) {
    if (!btn) return;
    btn.classList.remove('btn-animate');
    btn.disabled = false;
    btn.innerHTML = `<span class="btn-text">${text || 'Envoyer'}</span>`;
}

async function fetchAndPersistSiteData() {
    showPreloader();
    try {
        const response = await fetch(`${API_URL}/${SITE_ID}`);
        if (!response.ok) throw new Error('Erreur lors du chargement des données');
        const data = await response.json();
        // Correction : extraire le bon objet si GlobalData existe et fusionner user
        let mainData = data;
        if (data && Array.isArray(data.GlobalData)) {
            const global = data.GlobalData;
            const mainData = {
                ...global[0], // infos site
                user: global[1],
                posts: Array.isArray(global[3]) ? global[3] : [],
                experiences: Array.isArray(global[4]) ? global[4] : [],
                portfolio: Array.isArray(global[4]) ? global[4] : [], // Ajout du portfolio
                services: Array.isArray(global[6]) ? global[6] : [],
                projets: Array.isArray(global[7]) ? global[7] : [], // Ajout des projets
            };
            // Variable globale pour accès dans tout le site (ex: main.js)
            window.siteData = mainData;
            // Formatage synthétique pour affichage
            const synthese = {
                Titre: mainData.title || mainData.siteName || '-',
                SousTitre: mainData.subtitle || '-',
                Description: mainData.description || mainData.siteDescription || '-',
                Email: mainData.email || (mainData.user && mainData.user.email) || '-',
                Téléphone: mainData.phone || (mainData.user && mainData.user.phone) || '-',
                Adresse: mainData.address || '-',
                Autres: Object.keys(mainData).filter(k => !['title', 'subtitle', 'description', 'email', 'phone', 'address', 'siteName', 'siteDescription'].includes(k)).reduce((obj, k) => { obj[k] = mainData[k]; return obj; }, {})
            };
            localStorage.setItem('siteData', JSON.stringify(mainData));
            injectDataToHome(mainData);
            // Charger main.js dynamiquement après injection des données
            if (!window._mainJsLoaded) {
                var script = document.createElement('script');
                script.src = 'js/main.js';
                script.onload = function () { window._mainJsLoaded = true; };
                document.body.appendChild(script);
            }
            setTimeout(() => {
                hidePreloader();
            }, 400);
            return;
        }
        // Formatage synthétique pour affichage
        const synthese = {
            Titre: mainData.title || mainData.siteName || '-',
            SousTitre: mainData.subtitle || '-',
            Description: mainData.description || mainData.siteDescription || '-',
            Email: mainData.email || (mainData.user && mainData.user.email) || '-',
            Téléphone: mainData.phone || (mainData.user && mainData.user.phone) || '-',
            Adresse: mainData.address || '-',
            Autres: Object.keys(mainData).filter(k => !['title', 'subtitle', 'description', 'email', 'phone', 'address', 'siteName', 'siteDescription'].includes(k)).reduce((obj, k) => { obj[k] = mainData[k]; return obj; }, {})
        };
        window.siteData = mainData;
        localStorage.setItem('siteData', JSON.stringify(mainData));
        injectDataToHome(mainData);
        // Charger main.js dynamiquement après injection des données
        if (!window._mainJsLoaded) {
            var script = document.createElement('script');
            script.src = 'js/main.js';
            script.onload = function () { window._mainJsLoaded = true; };
            document.body.appendChild(script);
        }
        // Masquer le préloader APRÈS l'injection des données
        setTimeout(() => {
            console.log('[DataLoader] Préloader masqué après affichage des données et animations');
            hidePreloader();
        }, 600); // délai augmenté pour garantir l'effet
    } catch (e) {
        const cached = localStorage.getItem('siteData');
        if (cached) {
            try {
                const data = JSON.parse(cached);
                window.siteData = data;
                injectDataToHome(data);
                // Charger main.js dynamiquement après injection des données (fallback localStorage)
                if (!window._mainJsLoaded) {
                    var script = document.createElement('script');
                    script.src = 'js/main.js';
                    script.onload = function () { window._mainJsLoaded = true; };
                    document.body.appendChild(script);
                }
                setTimeout(() => {
                    console.log('[DataLoader] Préloader masqué après affichage des données (localStorage)');
                    hidePreloader();
                }, 1700);
            } catch { }
        } else {
            hidePreloader();
        }
    }
}

// Lancer au chargement de la page
window.addEventListener('DOMContentLoaded', fetchAndPersistSiteData);

window.handleAppointmentForm = function (userId) {
    const form = document.getElementById('appointment-form');
    if (!form) {
        console.warn('[handleAppointmentForm] Formulaire #appointment-form non trouvé dans le DOM');
        return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) {
        return;
    }
    console.log('[handleAppointmentForm] Handler attaché au formulaire #appointment-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        // Récupérer les données du formulaire
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName')?.trim(),
            lastName: formData.get('lastName')?.trim(),
            email: formData.get('email')?.trim(),
            phone: formData.get('phone')?.trim(),
            service: formData.get('service'),
            message: formData.get('message')?.trim(),
            userId: userId || (window.currentUserId || null),
        };
        // Validation basique
        if (!data.firstName || !data.lastName || !data.phone || !data.service || !data.message) {
            showNotification('warning', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }
        // Validation du téléphone (format simple)
        const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
        if (!phoneRegex.test(data.phone)) {
            showNotification('warning', 'Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        // Changer l'état du bouton
        animateSendButton(submitBtn);
        try {
            // Envoyer la demande
            const result = await window.sendAppointmentRequest(data);
            if (result.success) {
                // Réinitialiser le formulaire
                form.reset();
                showNotification('success', 'Votre demande a bien été envoyée !');
            } else {
                showNotification('error', result.message || 'Erreur lors de l\'envoi de la demande.');
            }
        } catch (error) {
            showNotification('error', 'Une erreur inattendue s\'est produite.');
        } finally {
            resetSendButton(submitBtn, 'Envoyer');
        }
    });
};

// Initialisation automatique du handler de formulaire avec l'id user depuis le localStorage
(function () {
    try {
        const siteData = JSON.parse(localStorage.getItem('siteData'));
        const userId = siteData && siteData.user ? (siteData.user._id || siteData.user.id || null) : null;
        if (userId) {
            window.handleAppointmentForm(userId);
        } else {
            console.warn('[handleAppointmentForm] Impossible de trouver l\'id utilisateur dans le localStorage');
        }
    } catch (e) {
        console.warn('[handleAppointmentForm] Erreur lors de la récupération de l\'id utilisateur:', e);
    }
})();

// Ajout du style pour la notification et le bouton animé
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.innerHTML = `
    .custom-notification {
        min-width: 220px;
        max-width: 90vw;
        font-family: 'Montserrat', Arial, sans-serif;
        letter-spacing: 0.01em;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        font-weight: 600;
        box-sizing: border-box;
        text-align: center;
        border: none;
        box-shadow: 0 8px 32px #0003;
        font-size: 1.13em;
        background: #222;
        color: #fff;
        padding: 18px 32px 18px 22px;
        border-radius: 14px;
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(.4,2,.6,1), transform 0.5s cubic-bezier(.4,2,.6,1);
    }
    .custom-notification.success { background: #222; color: #fff; }
    .custom-notification.error { background: #ff5858; color: #fff; }
    .custom-notification.warning { background: #ffc107; color: #222; }
    .custom-notification .notif-message {
        flex: 1;
        color: inherit;
        font-weight: 600;
        font-size: 1.13em;
        letter-spacing: 0.01em;
    }
    .custom-notification .notif-close {
        font-size: 1.3em;
        opacity: 0.7;
        transition: opacity 0.2s;
        color: inherit;
        font-weight: bold;
    }
    .custom-notification .notif-close:hover {
        opacity: 1;
    }
    `;
    document.head.appendChild(style);
});

// Ajout dynamique du lien CV si disponible dans les données utilisateur
document.addEventListener('DOMContentLoaded', function () {
    //    alert('[DataLoader] Injection du lien CV dans le bouton "Télécharger CV"');
    const siteData = localStorage.getItem('siteData');
    if (siteData) {
        //    alert('[DataLoader] Données du site trouvées dans le localStorage, injection du lien CV');
        try {
            const data = JSON.parse(siteData);
            const cvUrl =  data?.user?.cvFile;
            // Sélectionne le bouton qui contient le texte "Telecharger Cv"
            const btns = document.querySelectorAll('.hero-btn .btn');
            //    alert(cvUrl)
            let btnCv = null;
            btns.forEach(btn => {
                if (btn.textContent.trim().toLowerCase().includes('cv')) btnCv = btn;
            });
            if (btnCv && cvUrl) {
                btnCv.setAttribute('href', cvUrl);
                btnCv.setAttribute('download', 'CV.pdf');
                btnCv.setAttribute('target', '_blank');
            }
        } catch (e) { console.warn('Erreur injection CV:', e); }
    }
});

// === Chatbot dynamique : envoi et affichage des messages ===
document.addEventListener('DOMContentLoaded', function () {
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    let isSending = false;



    // Affiche un message dans la fenêtre
    function appendMessage(text, sender = 'bot') {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message ' + sender;
        msg.innerHTML = `<span>${text}</span>`;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Envoi du message utilisateur au backend et affichage de la réponse
    async function sendChatbotMessage(message) {
        if (!message || isSending) return;
        isSending = true;
        appendMessage(message, 'user');
        chatbotInput.value = '';
        try {
            // Appel API backend (adapter l'URL si besoin)
            const res = await fetch( '/bot/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            let data = await res.json();
            console.log(data)
            let botMsg = '';
            if (data && typeof data.reply === 'string') {
                botMsg = data.reply;
            } else if (data && typeof data.reply === 'object') {
                botMsg = JSON.stringify(data.reply, null, 2);
            } else if (data && typeof data.message === 'string') {
                botMsg = data.message;
            } else if (data && typeof data.message === 'object') {
                botMsg = JSON.stringify(data.message, null, 2);
            } else if (data && data.response) {
                botMsg = data.response;

            } else {
                botMsg = 'Réponse indisponible.';
            }
            appendMessage(botMsg, 'bot');
        } catch (e) {
            appendMessage('Erreur de connexion au serveur.', 'bot');
        } finally {
            isSending = false;
        }
    }

    if (chatbotForm && chatbotInput) {
        chatbotForm.onsubmit = function (e) {
            e.preventDefault();
            const msg = chatbotInput.value.trim();
            if (msg) sendChatbotMessage(msg);
        };
    }
});

// === Suivi visiteur : collecte IP et envoi backend une fois par jour ===
async function trackVisitorOncePerDay() {
    const TRACK_KEY = 'visitor_ip_sent_date';
    const today = new Date().toISOString().slice(0, 10); // format YYYY-MM-DD
    const lastSent = localStorage.getItem(TRACK_KEY);
    try {
        // Récupérer l'IP publique du visiteur
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const ip = ipData.ip;
        // Afficher l'IP dans une notification visuelle à chaque chargement
        //  showNotification(`Votre adresse IP publique : ${ip}`, 'success');
        // Log console pour debug
        //  console.log('[Suivi visiteur] IP détectée :', ip);
        // Envoyer l'IP au backend seulement si pas déjà envoyé aujourd'hui
        if (lastSent !== today) {
            await fetch(`${API_BASE_URL}/track/visit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip, date: today, site: SITE_ID })
            });
            localStorage.setItem(TRACK_KEY, today);
            //  console.log('[Suivi visiteur] IP envoyée au backend:', ip);
        }
    } catch (e) {
        // Optionnel : log erreur
        console.warn('[Suivi visiteur] Erreur lors de la récupération ou l\'envoi IP:', e);
    }
}
// Lancer le suivi visiteur au chargement de la page
window.addEventListener('DOMContentLoaded', trackVisitorOncePerDay);
