 document.getElementById('current-year').textContent = new Date().getFullYear();
 document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Funcionalidade do Menu Responsivo (Hambúrguer) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar o ícone
        });

        // Fechar o menu ao clicar em um link (para one-page)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) { // Só fecha se estiver ativo
                    navList.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- 2. Scroll Suave para as Seções ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adiciona um pequeno offset para o cabeçalho fixo
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px de padding extra

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 3. Tabela de Preços Dinâmica (Exemplo com Modal) ---
    // Você precisará adicionar um botão e um modal HTML no seu index.html para isso funcionar.
    // Exemplo de botão: <a href="#" id="open-prices-btn" class="btn btn-secondary">Ver Tabela de Preços</a>
    // Exemplo de modal: Veja o bloco HTML abaixo.

    const openPricesBtn = document.getElementById('open-prices-btn');
    const priceModal = document.getElementById('price-modal');
    const closeModalBtn = document.querySelector('.close-button');

    if (openPricesBtn && priceModal && closeModalBtn) {
        openPricesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            priceModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Evita scroll da página principal
        });

        closeModalBtn.addEventListener('click', function() {
            priceModal.style.display = 'none';
            document.body.style.overflow = ''; // Restaura scroll da página principal
        });

        // Fechar modal clicando fora dele
        window.addEventListener('click', function(e) {
            if (e.target == priceModal) {
                priceModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Estrutura de dados para a tabela de preços
    const servicesData = {
        'Cabelo': [
            { name: 'Corte Feminino', price: 'R$ 80,00' },
            { name: 'Corte Masculino', price: 'R$ 60,00' },
            { name: 'Coloração (Raiz)', price: 'R$ 120,00' },
            { name: 'Mechas (Comprimento Médio)', price: 'R$ 250,00' },
            { name: 'Hidratação Profunda', price: 'R$ 90,00' },
            { name: 'Penteado', price: 'R$ 150,00' },
            { name: 'Escova', price: 'R$ 50,00' }
        ],
        'Unhas': [
            { name: 'Manicure', price: 'R$ 40,00' },
            { name: 'Pedicure', price: 'R$ 45,00' },
            { name: 'Pé e Mão', price: 'R$ 80,00' },
            { name: 'Unhas de Gel', price: 'R$ 150,00' },
            { name: 'Manutenção de Gel', price: 'R$ 100,00' }
        ],
        'Estética Facial': [
            { name: 'Limpeza de Pele', price: 'R$ 180,00' },
            { name: 'Drenagem Linfática Facial', price: 'R$ 100,00' },
            { name: 'Design de Sobrancelhas', price: 'R$ 60,00' },
            { name: 'Micropigmentação', price: 'A partir de R$ 400,00' }
        ],
        'Estética Corporal': [
            { name: 'Massagem Relaxante (60 min)', price: 'R$ 150,00' },
            { name: 'Drenagem Linfática Corporal', price: 'R$ 130,00' },
            { name: 'Depilação (Diversas Áreas)', price: 'Sob Consulta' }
        ],
        'Maquiagem': [
            { name: 'Maquiagem Social', price: 'R$ 180,00' },
            { name: 'Maquiagem Noiva', price: 'A partir de R$ 500,00' },
            { name: 'Curso de Automaquiagem', price: 'R$ 300,00' }
        ]
    };

    function populatePriceTable() {
        const priceTableBody = document.getElementById('price-table-body');
        if (!priceTableBody) return; // Sai se o elemento não existe (modal pode não estar presente)

        priceTableBody.innerHTML = ''; // Limpa qualquer conteúdo existente

        for (const category in servicesData) {
            // Adiciona a linha de cabeçalho da categoria
            const categoryRow = document.createElement('tr');
            categoryRow.classList.add('category-header');
            const categoryCell = document.createElement('td');
            categoryCell.setAttribute('colspan', '2');
            categoryCell.textContent = category;
            categoryRow.appendChild(categoryCell);
            priceTableBody.appendChild(categoryRow);

            // Adiciona os serviços da categoria
            servicesData[category].forEach(service => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const priceCell = document.createElement('td');

                nameCell.textContent = service.name;
                priceCell.textContent = service.price;

                row.appendChild(nameCell);
                row.appendChild(priceCell);
                priceTableBody.appendChild(row);
            });
        }
    }

    // Chama a função para preencher a tabela quando o modal é aberto
    if (priceModal) { // Só popula se o modal estiver no HTML
        priceModal.addEventListener('animationend', function() {
            if (this.style.display === 'block') {
                populatePriceTable();
            }
        });
        // Também preenche na primeira carga caso o modal não tenha animação de entrada
        populatePriceTable();
    }


    // --- 4. Agendamento (Validação e Redirecionamento) ---
    const contactForm = document.querySelector('#contact .contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Mensagem).');
                return;
            }

            // Validação básica de e-mail
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            // Opção 1: Redirecionar para WhatsApp com mensagem pré-preenchida
            const whatsappNumber = '5511999998888'; // Substitua pelo seu número de WhatsApp com DDD
            let whatsappMessage = `Olá, meu nome é ${name}.`;
            whatsappMessage += `\nMeu e-mail é: ${email}.`;
            if (phone) {
                whatsappMessage += `\nMeu telefone é: ${phone}.`;
            }
            whatsappMessage += `\nEstou interessado(a) no serviço: ${service === "" ? "Não especificado" : service}.`;
            whatsappMessage += `\nMinha mensagem: ${message}`;
            whatsappMessage += `\n\nGostaria de agendar um horário.`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Abrir em nova aba/janela
            window.open(whatsappURL, '_blank');

            // Feedback para o usuário e limpeza do formulário (opcional)
            alert('Sua solicitação de agendamento foi enviada para o WhatsApp! Iremos te contatar em breve.');
            contactForm.reset(); // Limpa o formulário

            // Opção 2 (Alternativa): Envio para um serviço de formulário (ex: Formspree)
            // Se você configurou o 'action' do formulário para um serviço como Formspree,
            // você pode simplesmente remover o e.preventDefault() e o código acima,
            // e deixar o navegador lidar com o envio.
            // Para Formulários PHP/Backend, você precisaria de um script no servidor.
        });
    }

    // --- 5. Atualizar Ano no Rodapé ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 6. Carrossel de Depoimentos (Exemplo Básico) ---
    // Para um carrossel mais robusto, considere bibliotecas como Swiper.js ou Slick.js
    const testimonialsContainer = document.querySelector('.testimonials-carousel');
    if (testimonialsContainer) {
        let scrollAmount = 0;
        const itemWidth = testimonialsContainer.querySelector('.testimonial-item').offsetWidth + 30; // Item width + gap

        // Exemplo: Scroll automático (opcional)
        setInterval(() => {
            if (scrollAmount < testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth) {
                scrollAmount += itemWidth;
            } else {
                scrollAmount = 0; // Volta para o início
            }
            testimonialsContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 5000); // Rola a cada 5 segundos
    }

});