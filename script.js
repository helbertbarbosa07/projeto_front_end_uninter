
// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('SGHSS - Sistema carregado com sucesso!');
    
    // ============================================
    // 1. CONTROLE DE TEMA (CLARO/ESCURO)
    // ============================================
    
    // Elementos do tema
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeContainer = document.getElementById('theme-container');
    
    // Verificar tema salvo no localStorage ou usar o padrão (claro)
    const savedTheme = localStorage.getItem('sghss-theme') || 'light';
    
    // Aplicar tema salvo ao carregar a página
    applyTheme(savedTheme);
    
    // Alternar tema quando o botão é clicado
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = themeContainer.classList.contains('theme-dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            localStorage.setItem('sghss-theme', newTheme);
            
            // Feedback visual
            showNotification(`Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`);
        });
    }
    
    // Função para aplicar tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            themeContainer.classList.remove('theme-light');
            themeContainer.classList.add('theme-dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            document.body.classList.add('bg-gray-900', 'text-gray-100');
            document.body.classList.remove('bg-gray-50', 'text-gray-800');
        } else {
            themeContainer.classList.remove('theme-dark');
            themeContainer.classList.add('theme-light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            document.body.classList.remove('bg-gray-900', 'text-gray-100');
            document.body.classList.add('bg-gray-50', 'text-gray-800');
        }
    }
    
    // ============================================
    // 2. CONTROLE DA SIDEBAR (RESPONSIVIDADE)
    // ============================================
    
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const showSidebar = document.getElementById('show-sidebar');
    
    // Recolher sidebar no mobile
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // Mostrar sidebar no mobile
    if (showSidebar) {
        showSidebar.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    // Fechar sidebar ao clicar fora (apenas mobile)
    document.addEventListener('click', function(event) {
        const isMobile = window.innerWidth <= 768;
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnShowButton = showSidebar && showSidebar.contains(event.target);
        
        if (isMobile && !isClickInsideSidebar && !isClickOnShowButton && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // ============================================
    // 3. MODAL DE NOTIFICAÇÕES
    // ============================================
    
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationsModal = document.getElementById('notifications-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Abrir modal de notificações
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function() {
            notificationsModal.classList.remove('hidden');
            notificationsModal.classList.add('flex', 'fade-in');
        });
    }
    
    // Fechar modal de notificações
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            notificationsModal.classList.add('hidden');
            notificationsModal.classList.remove('flex', 'fade-in');
        });
    }
    
    // Fechar modal ao clicar fora
    notificationsModal.addEventListener('click', function(event) {
        if (event.target === notificationsModal) {
            notificationsModal.classList.add('hidden');
            notificationsModal.classList.remove('flex', 'fade-in');
        }
    });
    
    // ============================================
    // 4. NAVEGAÇÃO SUAVE ENTRO SEÇÕES
    // ============================================
    
    // Adicionar evento de clique suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um link para uma seção da página
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                // Fechar sidebar no mobile após clicar em um link
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
                
                // Atualizar item ativo no menu
                updateActiveNavItem(this);
                
                // Rolar suavemente para a seção
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Função para atualizar item ativo no menu
    function updateActiveNavItem(clickedLink) {
        // Remover classe 'active' de todos os itens
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Adicionar classe 'active' ao item clicado
        clickedLink.classList.add('active');
    }
    
    // ============================================
    // 5. SIMULAÇÃO DE DADOS DINÂMICOS
    // ============================================
    
    // Atualizar horário no dashboard
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        // Encontrar o elemento da data (adicionar se não existir)
        let dateElement = document.querySelector('.current-date');
        if (!dateElement) {
            const header = document.querySelector('header h2');
            if (header) {
                dateElement = document.createElement('p');
                dateElement.className = 'current-date text-gray-600 text-sm mt-1';
                header.parentNode.insertBefore(dateElement, header.nextSibling);
            }
        }
        
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('pt-BR', options);
        }
    }
    
    // Chamar função inicialmente e a cada minuto
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    // ============================================
    // 6. FUNÇÕES DE FEEDBACK E UTILITÁRIAS
    // ============================================
    
    // Mostrar notificação temporária
    function showNotification(message, type = 'info') {
        // Criar elemento da notificação
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-y-0 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Adicionar ao corpo do documento
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.add('translate-y-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Simular logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                showNotification('Saindo do sistema...', 'info');
                
                // Simular delay de logout
                setTimeout(() => {
                    window.location.href = '#';
                    showNotification('Logout realizado com sucesso!', 'success');
                }, 1000);
            }
        });
    }
    
    // ============================================
    // 7. INTERATIVIDADE DOS CARDS
    // ============================================
    
    // Adicionar efeito de clique aos cards
    document.querySelectorAll('.card-stat').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('ring-2');
            this.classList.toggle('ring-amil-blue');
            
            // Remover efeito após 300ms
            setTimeout(() => {
                this.classList.remove('ring-2', 'ring-amil-blue');
            }, 300);
        });
    });
    
    // ============================================
    // 8. RESPONSIVIDADE DINÂMICA
    // ============================================
    
    // Ajustar sidebar baseado no tamanho da tela
    function handleResponsiveSidebar() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }
    
    // Executar ao carregar e ao redimensionar a janela
    window.addEventListener('resize', handleResponsiveSidebar);
    handleResponsiveSidebar(); // Executar uma vez ao carregar
    
    // ============================================
    // 9. MENSAGEM INICIAL DE BOAS-VINDAS
    // ============================================
    
    // Mostrar mensagem de boas-vindas após carregar
    setTimeout(() => {
        const welcomeShown = sessionStorage.getItem('welcomeShown');
        if (!welcomeShown) {
            showNotification('Bem-vindo ao SGHSS! Sistema carregado com sucesso.', 'success');
            sessionStorage.setItem('welcomeShown', 'true');
        }
    }, 1000);
    
    // ============================================
    // 10. SIMULAÇÃO DE CARREGAMENTO DE DADOS
    // ============================================
    
    // Simular carregamento de dados para os cards
    function simulateDataLoading() {
        // Simular atraso no carregamento dos dados
        setTimeout(() => {
            // Adicionar animação de entrada aos cards
            document.querySelectorAll('.card-stat').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 500);
    }
    
    // Chamar função de simulação
    simulateDataLoading();
});

/* ============================================
   FIM DO ARQUIVO SCRIPT.JS
   ============================================ */