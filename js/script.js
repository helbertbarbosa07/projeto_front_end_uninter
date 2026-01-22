// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('VidaPlus - Sistema carregado com sucesso!');
    
    // ============================================
    // 1. CONTROLE DE TEMA (CLARO/ESCURO)
    // ============================================
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeToggle && themeIcon) {
        // Verificar tema salvo no localStorage
        const savedTheme = localStorage.getItem('vidaplus-theme') || 'light';
        
        // Aplicar tema salvo ao carregar
        if (savedTheme === 'dark') {
            document.body.classList.add('bg-gray-900', 'text-gray-100');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Alternar tema quando o botão é clicado
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('bg-gray-900')) {
                // Mudar para tema claro
                document.body.classList.remove('bg-gray-900', 'text-gray-100');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('vidaplus-theme', 'light');
                showNotification('Tema claro ativado', 'info');
            } else {
                // Mudar para tema escuro
                document.body.classList.add('bg-gray-900', 'text-gray-100');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('vidaplus-theme', 'dark');
                showNotification('Tema escuro ativado', 'info');
            }
        });
    }
    
    // ============================================
    // 2. FUNÇÕES DE FEEDBACK
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
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // ============================================
    // 3. MENSAGEM INICIAL DE BOAS-VINDAS
    // ============================================
    
    // Mostrar mensagem de boas-vindas após carregar
    setTimeout(() => {
        const welcomeShown = sessionStorage.getItem('welcomeShown');
        if (!welcomeShown) {
            showNotification('Bem-vindo ao VidaPlus! Sistema carregado com sucesso.', 'success');
            sessionStorage.setItem('welcomeShown', 'true');
        }
    }, 1000);
    
    // ============================================
    // 4. SIMULAÇÃO DE CARREGAMENTO DE DADOS
    // ============================================
    
    // Simular carregamento de dados para os cards
    function simulateDataLoading() {
        // Adicionar animação de entrada aos cards
        document.querySelectorAll('.card-estatistica').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    simulateDataLoading();
    
    // ============================================
    // 5. ATUALIZAR DATA E HORA NO DASHBOARD
    // ============================================
    
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
        
        // Atualizar elemento da data se existir
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
    // 6. INTERATIVIDADE DOS CARDS
    // ============================================
    
    // Adicionar efeito de clique aos cards
    document.querySelectorAll('.card-estatistica').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('ring-2', 'ring-blue-500');
            
            // Remover efeito após 300ms
            setTimeout(() => {
                this.classList.remove('ring-2', 'ring-blue-500');
            }, 300);
        });
    });
    
    // ============================================
    // 7. CONTROLE DO MENU ATIVO
    // ============================================
    
    // Ativar item do menu baseado na página atual
    function setActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop() || 'app.html';
        
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('ativo');
            } else if (currentPage === 'app.html' && href === '#') {
                item.classList.add('ativo');
            }
        });
    }
    
    setActiveMenu();
});

