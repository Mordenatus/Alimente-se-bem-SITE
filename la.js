// Smooth scrolling para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para todos os links de navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Botão de alerta existente
    const btnAlert = document.getElementById('btn-alert');
    if (btnAlert !== null) {
        btnAlert.addEventListener('click', function() {
            alert('Uma dieta equilibrada é essencial para o seu bem-estar! Busque sempre alimentos frescos, naturais e nutritivos.');
        });
    }

// Inicializar funcionalidades
initThemeToggle();
initBackToTop();
initCalculator();
if (typeof initQuiz === 'function') {
    initQuiz();
}
initContactForm();
initRecipeModals();
initHamburgerMenu();
});

// Theme toggle disabled as per user request
function initThemeToggle() {
    // Do nothing, theme toggle disabled
}

function updateThemeIcon(icon, theme) {
    // Do nothing, theme toggle disabled
}

// Botão voltar ao topo
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Calculadora de IMC
function initCalculator() {
    const calcularBtn = document.getElementById('calcular-imc');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const resultadoDiv = document.getElementById('resultado-imc');

    if (!calcularBtn || !pesoInput || !alturaInput || !resultadoDiv) return; // ⬅️ Verificação adicionada

    calcularBtn.addEventListener('click', function() {
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        if (!peso || !altura || peso <= 0 || altura <= 0) {
            resultadoDiv.innerHTML = '<p style="color: #f44336;">Por favor, insira valores válidos!</p>';
            return;
        }

        const imc = peso / (altura * altura);
        let classificacao = '';
        let cor = '';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
            cor = '#ff9800';
        } else if (imc < 25) {
            classificacao = 'Peso normal';
            cor = '#4caf50';
        } else if (imc < 30) {
            classificacao = 'Sobrepeso';
            cor = '#ff9800';
        } else if (imc < 35) {
            classificacao = 'Obesidade Grau I';
            cor = '#f44336';
        } else if (imc < 40) {
            classificacao = 'Obesidade Grau II';
            cor = '#d32f2f';
        } else {
            classificacao = 'Obesidade Grau III';
            cor = '#b71c1c';
        }

        resultadoDiv.innerHTML = `
            <p>Seu IMC: <strong>${imc.toFixed(1)}</strong></p>
            <p style="color: ${cor}; font-weight: bold;">Classificação: ${classificacao}</p>
        `;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
});


// Formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        // Validação simples
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Simular envio (em um caso real, aqui seria uma requisição AJAX)
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!`);
        contactForm.reset();
    });
}

// Objeto global de receitas (movido para fora da função para ser acessível globalmente)
const receitas = {
        salada: {
            titulo: "omelete com legumes",
            ingredientes: [
                "2 ovos",
                "2 colheres de sopa de leite (opcional)",
                "1/4 de cenoura ralada",
                "1/4 de tomate picado (sem sementes)",
                "2 colheres de sopa de cebola picada",
                "1 colher de sopa de cheiro-verde ou orégano (opcional)",
                "Sal e pimenta a gosto",
                "1 colher de chá de óleo ou azeiteno lugar"

            ],
            preparo: [
                "Em um prato fundo, bata os ovos com o leite, o sal e a pimenta.",
                "Adicione os legumes picados e misture bem.",
                "Aqueça o óleo em uma frigideira antiaderente.",
                "Despeje a mistura e cozinhe em fogo baixo até firmar.",
                "Vire com cuidado para dourar do outro lado.",
                "Sirva com arroz, salada ou pão integral. Bom apetite!"
            ]
        },
    smoothie: {
        titulo: "Smoothie de Banana",
        ingredientes: [
            "1 banana cobelada",
            "200ml de leite",
            "1 colher de sopa de mel"
        ],
        preparo: [
            "Bata tudo no liquidificador e sirva."
        ]
    },
    wrap: {
        titulo: "Wrap de Atum",
        ingredientes: [
            "1 tortilla",
            "1 lata de atum",
            "Alface",
            "Maionese 0"
        ],
        preparo: [
            "Misture o atum com maionese, coloque na tortilla com alface e enrole."
        ]
    }
};

function initRecipeModals() {
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('modal-recipe-content');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        // Fechar modal
        closeBtn.addEventListener('click', function() {
            console.log('Close button clicked');
            modal.style.display = 'none';
            // Limpar conteúdo do modal para evitar mostrar receita antiga
            modalContent.innerHTML = '';
            // Garantir que o site principal fique visível após fechar o modal
            document.body.style.overflow = 'auto';
        });
    }

    // Garantir que ao clicar fora do modal, o modal feche e o site volte ao normal
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            console.log('Clicked outside modal, closing');
            modal.style.display = 'none';
            modalContent.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar modal ao pressionar ESC e restaurar overflow
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            console.log('ESC pressed, closing modal');
            modal.style.display = 'none';
            modalContent.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Adicionar listener para tecla ESC para fechar modal
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Função global para abrir modal (chamada pelo HTML)
function openModal(recipeType) {
    console.log(`Opening modal for recipe: ${recipeType}`);
    
    const receita = receitas[recipeType];
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('modal-recipe-content');
    
    if (!receita) {
        console.error(`Recipe not found: ${recipeType}`);
        alert('Receita não encontrada!');
        return;
    }

    modalContent.innerHTML = `
        <h3>${receita.titulo}</h3>
        <h4>Ingredientes:</h4>
        <ul>
            ${receita.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h4>Modo de Preparo:</h4>
        <ol>
            ${receita.preparo.map(passo => `<li>${passo}</li>`).join('')}
        </ol>
    `;
    modal.style.display = 'block';
}

// Animações de entrada
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
}

// Inicializar animações quando a página carregar
window.addEventListener('load', animateOnScroll);

// Hamburger menu
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('nav-active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav-active');
                hamburger.classList.remove('active');
            });
        });
    }
}
