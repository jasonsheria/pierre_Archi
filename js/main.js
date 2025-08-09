(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
   if ($('.hero .hero-text h2').length == 1) {
        // On récupère dynamiquement le texte à animer depuis la variable globale siteData
        var typed_strings = '';
        if (window.siteData && window.siteData.user && window.siteData.user.experience) {
            typed_strings = window.siteData.user.experience;
        } else {
            // fallback : contenu de .typed-text ou du h2
            typed_strings = $('.hero .hero-text .typed-text').text() || $('.hero .hero-text h2').text() || 'Développeur, Designer, Consultant';
        }
        // On injecte le texte dans .typed-text pour cohérence DOM
        $('.hero .hero-text .typed-text').text(typed_strings);
        // Nettoyage de l'ancienne instance Typed si présente
        if (window._typedInstance && typeof window._typedInstance.destroy === 'function') {
            window._typedInstance.destroy();
        }
        // Ajout d'une animation de curseur personnalisée et d'un effet de fade sur le texte
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 55,
            backSpeed: 32,
            startDelay: 300,
            backDelay: 1200,
            fadeOut: true,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 300,
            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
            onBegin: function() {
                $('.hero .hero-text h2').css({
                    'transition': 'color 0.5s, text-shadow 0.5s',
                    'text-shadow': '0 2px 16px #43e97b44, 0 0 8px #6c63ff33'
                });
            },
            onStringTyped: function() {
                $('.hero .hero-text h2').addClass('typed-glow');
                setTimeout(function(){
                    $('.hero .hero-text h2').removeClass('typed-glow');
                }, 600);
            }
        });
        window._typedInstance = typed;
        // Ajout du style pour l'effet fade et glow
        if (!document.getElementById('typed-anim-style')) {
            var style = document.createElement('style');
            style.id = 'typed-anim-style';
            style.innerHTML = `
            .typed-fade-out { opacity: 0; transition: opacity 0.45s cubic-bezier(.4,0,.2,1); }
            .typed-cursor { font-size: 1.1em; color: var(--accent-color,#6C63FF); animation: blink-cursor 1.1s infinite; }
            @keyframes blink-cursor { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
            .typed-glow { color: var(--accent-color,#6C63FF)!important; text-shadow: 0 0 16px #43e97b88, 0 0 8px #6c63ff99; transition: color 0.3s, text-shadow 0.3s; }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    // ================== THEME SWITCHER ==================
    // Palette de thèmes
    const THEMES = [
        {name: 'Clair', class: 'theme-light', color: '#f8fafd', icon: 'fa-sun'},
        {name: 'Sombre', class: 'theme-dark', color: '#ffffff', icon: 'fa-moon'},
        
    ];
    function setTheme(themeClass) {
        THEMES.forEach(t => document.body.classList.remove(t.class));
        document.body.classList.add(themeClass);
        localStorage.setItem('theme', themeClass);
    }
    function showThemePalette() {
        let palette = document.getElementById('theme-palette');
        if (palette) { palette.style.display = palette.style.display === 'block' ? 'none' : 'block'; return; }
        palette = document.createElement('div');
        palette.id = 'theme-palette';
        palette.style.position = 'fixed';
        palette.style.bottom = '116px';
        palette.style.right = '58px';
        palette.style.background = '#fff';
        palette.style.borderRadius = '16px';
        palette.style.boxShadow = '0 4px 24px #43e97b33';
        palette.style.padding = '12px 10px';
        palette.style.zIndex = 10001;
        palette.style.display = 'block';
        palette.style.minWidth = '160px';
        palette.innerHTML = THEMES.map(t => `
            <button class="theme-palette-btn" data-theme="${t.class}" style="background:${t.color};color:#222;border:none;border-radius:8px;padding:8px 18px;margin:4px 0;width:100%;display:flex;align-items:center;gap:10px;font-weight:600;font-size:1em;cursor:pointer;transition:background 0.2s;">
                <i class="fas ${t.icon}"></i> ${t.name}
            </button>
        `).join('');
        document.body.appendChild(palette);
        palette.querySelectorAll('.theme-palette-btn').forEach(btn => {
            btn.onclick = function() {
                setTheme(this.dataset.theme);
                palette.style.display = 'none';
            };
        });
        // Fermer la palette si clic ailleurs
        setTimeout(() => {
            document.addEventListener('click', function hidePalette(e) {
                if (!palette.contains(e.target) && e.target.id !== 'theme-toggle') {
                    palette.style.display = 'none';
                    document.removeEventListener('click', hidePalette);
                }
            });
        }, 100);
    }
    // Initial theme load
    $(document).ready(function() {
        const savedTheme = localStorage.getItem('theme') || 'theme-light';
        setTheme(savedTheme);
        $('#theme-toggle').off('click').on('click', function(e) {
            e.preventDefault();
            showThemePalette();
        });
    });
    // Ajout du CSS pour les thèmes
    if (!document.getElementById('custom-theme-styles')) {
        const style = document.createElement('style');
        style.id = 'custom-theme-styles';
        style.innerHTML = `
        body.theme-light { background: #f8fafd; color: #232136; }
        body.theme-dark { background: #232136; color: #f8fafd; }

        .theme-toggle-btn { position: fixed; bottom: 24px; right: 24px; z-index: 10001; background: linear-gradient(90deg,#43e97b 0%,#6c63ff 100%); color: #fff; border: none; border-radius: 50%; width: 54px; height: 54px; box-shadow: 0 2px 12px #43e97b44; font-size: 1.7em; display: flex; align-items: center; justify-content: center; transition: background 0.3s, box-shadow 0.3s, transform 0.18s; }
        .theme-toggle-btn:hover { background: linear-gradient(90deg,#6c63ff 0%,#43e97b 100%); transform: scale(1.08) translateY(-4px); box-shadow: 0 6px 24px #38f9d744; }
        #theme-palette { animation: fadeInPalette 0.25s; }
        @keyframes fadeInPalette { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        `;
        document.head.appendChild(style);
    }
    
    // ================== CHATBOT UI ==================
    async function getAIResponse(message) {
        // Exemple d'appel à une API IA (remplacer par votre endpoint réel)
        // Ici, on simule une réponse IA pour la démo
        // Pour une vraie intégration, utilisez fetch() vers votre backend ou une API IA (OpenAI, HuggingFace, etc.)
        return new Promise(resolve => {
            setTimeout(() => {
                if(message.toLowerCase().includes('prix')) {
                    resolve('💡 Nos prix sont adaptés à chaque projet. Voulez-vous une estimation ?');
                } else if(message.toLowerCase().includes('contact')) {
                    resolve('📧 Vous pouvez nous contacter via le formulaire ou par email.');
                } else if(message.toLowerCase().includes('bonjour')) {
                    resolve('👋 Bonjour ! Comment puis-je vous aider aujourd’hui ?');
                } else {
                    resolve('🤖 Ceci est une réponse IA simulée. Connectez une vraie API pour des réponses intelligentes !');
                }
            }, 1000);
        });
    }
    $(document).ready(function() {
        // Toggle chatbot window avec blocage anti-double-clic et sans fermeture auto sur clic document
        var isChatbotAnimating = false;
        $('#chatbot-toggle').on('click', function(e) {
            if (isChatbotAnimating) return false;
            isChatbotAnimating = true;
            $('#chatbot-toggle').prop('disabled', true);
             $('#chatbot-window').stop(true, true).fadeToggle(220, function() {
               isChatbotAnimating = false;
                 $('#chatbot-toggle').prop('disabled', false);
             });
            $('#chatbot-window').fadeToggle(220);
             e.stopPropagation();
        });
        // Empêche la fermeture si on clique dans la fenêtre
        $('#chatbot-window').on('click', function(e) { e.stopPropagation(); });
        // Ferme si on clique sur le bouton de fermeture
        $('#chatbot-close').on('click', function(e) {
            $('#chatbot-window').fadeOut(200);
            // alert("close")
            // $('#chatbot-window').hide(220);
            // $('#chatbot-window').toggle(220);
            // e.stopPropagation();
             isChatbotAnimating = false;
            // $('#chatbot-toggle').prop('disabled', false);
            // $('#chatbot-toggle').removeClass('active');

             e.stopPropagation();
        });
        // Send message
        $('#chatbot-form').on('submit', async function(e) {
            e.preventDefault();
            var input = $('#chatbot-input');
            var msg = input.val().trim();
            if (!msg) return;
            $('#chatbot-messages').append('<div class="chatbot-message user">'+msg+'</div>');
            input.val('');
            scrollChatToBottom();
            $('#chatbot-messages').append('<div class="chatbot-message bot"><span>⏳ IA réfléchit...</span></div>');
            scrollChatToBottom();
            const aiResponse = await getAIResponse(msg);
            $('#chatbot-messages .bot:last').html('<span>'+aiResponse+'</span>');
            scrollChatToBottom();
        });
        // Quick options
        $('#chatbot-options').on('click', '.chatbot-option', async function() {
            var txt = $(this).text();
            $('#chatbot-messages').append('<div class="chatbot-message user">'+txt+'</div>');
            scrollChatToBottom();
            $('#chatbot-messages').append('<div class="chatbot-message bot"><span>⏳ IA réfléchit...</span></div>');
            scrollChatToBottom();
            const aiResponse = await getAIResponse(txt);
            $('#chatbot-messages .bot:last').html('<span>'+aiResponse+'</span>');
            scrollChatToBottom();
        });
    });
    
})(jQuery);

