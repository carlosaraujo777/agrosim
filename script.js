let meuGrafico = null;

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularMargem() {
    // Pega os valores dos inputs
    const custo = parseFloat(document.getElementById('custo').value);
    const produtividade = parseFloat(document.getElementById('produtividade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    // Cálculos
    const receita = produtividade * preco;
    const lucro = receita - custo;

    // Atualiza os textos na tela
    document.getElementById('receita').innerText = formatarMoeda(receita);
    const elementoLucro = document.getElementById('lucro');
    elementoLucro.innerText = formatarMoeda(lucro);

    // Muda a cor do lucro (Verde se positivo, Vermelho se prejuízo)
    if (lucro > 0) {
        elementoLucro.style.color = "#3fb950"; // Verde
    } else {
        elementoLucro.style.color = "#f85149"; // Vermelho
    }

    atualizarGrafico(custo, receita);
}

function atualizarGrafico(custo, receita) {
    const ctx = document.getElementById('meuGrafico').getContext('2d');

    // Se já existe um gráfico, destrói ele antes de criar outro
    if (meuGrafico) {
        meuGrafico.destroy();
    }

    meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Custo', 'Receita'],
            datasets: [{
                label: 'Balanço Financeiro (R$)',
                data: [custo, receita],
                backgroundColor: [
                    '#f85149', // Vermelho para custo
                    '#3fb950'  // Verde para receita
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#c9d1d9' }
                },
                x: {
                    ticks: { color: '#c9d1d9' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Roda um cálculo inicial ao abrir a página
window.onload = calcularMargem;