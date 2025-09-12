

// Quiz sobre Alimentação Saudável em Português (PT-BR) - Estilo Slide

const perguntas = [
    {
        pergunta: "Qual é a importância de beber água?",
        opcoes: ["Apenas mata a sede", "Essencial para todas as funções do corpo", "Só é importante durante exercícios", "Não é tão importante"],
        resposta: 1
    },
    {
        pergunta: "Por que devemos evitar alimentos processados?",
        opcoes: ["São mais caros", "Têm menos nutrientes e mais aditivos", "São mais difíceis de encontrar", "Têm melhor sabor"],
        resposta: 1
    },
    {
        pergunta: "Por que o café da manhã é importante para adolescentes?",
        opcoes: [
            "Apenas por tradição",
            "Fornece energia para o dia e melhora a concentração",
            "É a refeição mais barata do dia",
            "Não é realmente importante"
        ],
        resposta: 1
    },
    {
        pergunta: "Qual destas é uma fonte saudável de proteína?",
        opcoes: [
            "Frango grelhado",
            "Salsicha",
            "Bacon",
            "Nuggets congelados"
        ],
        resposta: 0
    },
    {
        pergunta: "Quanto açúcar um refrigerante de 350ml contém aproximadamente?",
        opcoes: [
            "Cerca de 2 colheres de chá",
            "Cerca de 5 colheres de chá",
            "Cerca de 10 colheres de chá",
            "Não contém açúcar"
        ],
        resposta: 2
    },
    {
        pergunta: "Como deve ser composto um prato saudável e balanceado?",
        opcoes: [
            "Metade proteínas, metade carboidratos",
            "Metade vegetais, 1/4 proteínas, 1/4 carboidratos",
            "Apenas alimentos sem gordura",
            "Qualquer combinação, desde que seja comida"
        ],
        resposta: 1
    },
    {
        pergunta: "Qual destes é um lanche saudável?",
        opcoes: [
            "Batata frita",
            "Biscoito recheado",
            "Iogurte natural com frutas",
            "Refrigerante"
        ],
        resposta: 2
    },
    {
        pergunta: "Qual método de cocção é mais saudável?",
        opcoes: [
            "Fritar em óleo abundante",
            "Grelhar ou assar",
            "Cozinhar com muita manteiga",
            "Todos são igualmente saudáveis"
        ],
        resposta: 1
    },
    {
        pergunta: "O que devemos observar primeiro em um rótulo nutricional?",
        opcoes: [
            "A embalagem bonita",
            "O tamanho da porção e calorias",
            "A marca do produto",
            "A data de validade apenas"
        ],
        resposta: 1
    },
    {
        pergunta: "Qual dessas práticas ajuda a manter uma alimentação saudável no dia a dia?",
        opcoes: [
            "Pular refeições para economizar tempo",
            "Consumir vegetais e frutas diariamente",
            "Beber apenas sucos industrializados",
            "Comer fast food todos os dias"
        ],
        resposta: 1
    }
];

let currentQuestionIndex = 0;
let respostasSelecionadas = new Array(perguntas.length).fill(null);
let pontuacao = 0;

function criarQuiz() {
    const quizContainer = document.getElementById('quiz-opcoes');
    const iniciarBtn = document.getElementById('iniciar-quiz');
    const quizResultado = document.getElementById('quiz-resultado');

    // Esconder o botão de iniciar e mostrar o quiz
    iniciarBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    quizResultado.innerHTML = '';

    mostrarPergunta();
}

function mostrarPergunta() {
    const quizContainer = document.getElementById('quiz-opcoes');
    const pergunta = perguntas[currentQuestionIndex];

    quizContainer.innerHTML = '';

    const perguntaDiv = document.createElement('div');
    perguntaDiv.className = 'quiz-question';

    const perguntaTitulo = document.createElement('h3');
    perguntaTitulo.textContent = pergunta.pergunta;
    perguntaDiv.appendChild(perguntaTitulo);

    pergunta.opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-btn';
        button.textContent = opcao;

            button.onclick = () => {
                if (respostasSelecionadas[currentQuestionIndex] !== null) return; // já respondido

                respostasSelecionadas[currentQuestionIndex] = index;

                const botoes = perguntaDiv.querySelectorAll('button');
                botoes.forEach((btn, i) => {
                    btn.disabled = true;
                    if (i === pergunta.resposta) {
                        btn.classList.add('correct');
                    } else if (i === index) {
                        btn.classList.add('incorrect');
                    }
                });

                // Passar para a próxima pergunta automaticamente após 1,5 segundos
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < perguntas.length) {
                        mostrarPergunta();
                    } else {
                        mostrarResultado();
                    }
                }, 1500); // Delay para mostrar cores
            };

        perguntaDiv.appendChild(button);
    });

    quizContainer.appendChild(perguntaDiv);
}

function mostrarResultado() {
    const quizResultado = document.getElementById('quiz-resultado');
    const quizContainer = document.getElementById('quiz-opcoes');

    quizContainer.style.display = 'none';

    pontuacao = 0;
    respostasSelecionadas.forEach((resposta, i) => {
        if (resposta === perguntas[i].resposta) {
            pontuacao++;
        }
    });

    quizResultado.innerHTML = `
        <h3>Resultado do Quiz</h3>
        <p>Sua pontuação: ${pontuacao}/${perguntas.length}</p>
        <p>${Math.round((pontuacao / perguntas.length) * 100)}% de acerto</p>
        <p>${
            pontuacao === perguntas.length
                ? '🏆 Parabéns! Você acertou todas as perguntas sobre alimentação saudável!'
                : pontuacao >= Math.ceil(perguntas.length * 0.7)
                ? '🎉 Excelente! Você sabe muito sobre alimentação saudável!'
                : pontuacao >= Math.ceil(perguntas.length * 0.5)
                ? '👍 Bom! Continue aprendendo sobre nutrição!'
                : '📚 Continue estudando! A alimentação saudável é importante!'
        }</p>
        <button class="quiz-btn" onclick="reiniciarQuiz()">Reiniciar Quiz</button>
    `;
}

function reiniciarQuiz() {
    currentQuestionIndex = 0;
    respostasSelecionadas = new Array(perguntas.length).fill(null);
    pontuacao = 0;
    const quizContainer = document.getElementById('quiz-opcoes');
    const quizResultado = document.getElementById('quiz-resultado');
    quizResultado.innerHTML = '';
    quizContainer.style.display = 'block';
    mostrarPergunta();
}

function initQuiz() {
    // Inicializar o quiz escondendo as opções
    const quizContainer = document.getElementById('quiz-opcoes');
    const iniciarBtn = document.getElementById('iniciar-quiz');

    quizContainer.style.display = 'none';

    iniciarBtn.addEventListener('click', criarQuiz);
}
