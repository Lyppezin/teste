const cores = ["vermelho", "azul", "verde", "amarelo"];
let cartas = [];
let tentativas = 0;

function reloadJogo() {
  location.reload()
}
function iniciarJogo() {
    tentativas = 0;
    cartas = gerarCartas();
    distribuirCartas();
    document.querySelector(".buttons").style.display = "flex";
    document.getElementById("revelar-btn").style.display = "none";
    document.getElementById("reiniciar-btn").style.display = "none";
}

function gerarCartas() {
    const novasCartas = [];
    const numerosPorCor = {};

    while (novasCartas.length < 21) {
        const cor = cores[Math.floor(Math.random() * cores.length)];
        const numero = Math.floor(Math.random() * 10);

        if (!numerosPorCor[cor]) numerosPorCor[cor] = [];
        if (!numerosPorCor[cor].includes(numero)) {
            numerosPorCor[cor].push(numero);
            novasCartas.push({ cor, numero });
        }
    }

    return novasCartas;
}

function distribuirCartas() {
    const colunas = [[], [], []];

    cartas.forEach((carta, i) => {
        colunas[i % 3].push(carta);
    });

    for (let i = 0; i < 3; i++) {
        const colunaDiv = document.getElementById(`coluna-${i + 1}`);
        colunaDiv.innerHTML = "";
        colunas[i].forEach(carta => {
            const div = document.createElement("div");
            div.classList.add("carta", carta.cor);
            div.innerHTML = `<span class="numero">${carta.numero}</span>`;
            colunaDiv.appendChild(div);
        });
    }
}

function recolherCartas(colunaEscolhida) {
    const colunas = [
        Array.from(document.getElementById("coluna-1").children),
        Array.from(document.getElementById("coluna-2").children),
        Array.from(document.getElementById("coluna-3").children),
    ];

    let novaOrdem = [];
    if (colunaEscolhida === 0) {
        novaOrdem = [...colunas[1], ...colunas[0], ...colunas[2]];
    } else if (colunaEscolhida === 1) {
        novaOrdem = [...colunas[0], ...colunas[1], ...colunas[2]];
    } else {
        novaOrdem = [...colunas[0], ...colunas[2], ...colunas[1]];
    }

    cartas = novaOrdem.map(div => ({
        cor: div.classList[1],
        numero: parseInt(div.innerText)
    }));

    redistribuirCartas();
}

function redistribuirCartas() {
    const novasColunas = [[], [], []];

    cartas.forEach((carta, i) => {
        novasColunas[i % 3].push(carta);
    });

    for (let i = 0; i < 3; i++) {
        const colunaDiv = document.getElementById(`coluna-${i + 1}`);
        colunaDiv.innerHTML = "";
        novasColunas[i].forEach(carta => {
            const div = document.createElement("div");
            div.classList.add("carta", carta.cor);
            div.innerHTML = `<span class="numero">${carta.numero}</span>`;
            colunaDiv.appendChild(div);
        });
    }

    tentativas++;
    if (tentativas == 1) {
      document.querySelector(".instrucoes").style.display = "none"
      document.querySelector(".instrucoess").style.display = "none"
    }    if (tentativas === 3) {
        document.querySelector(".buttons").style.display = "none";
        document.getElementById("revelar-btn").style.display = "block";
    }
}

function revelarCarta() {
    const cartaEscolhida = cartas[10]; // 11ª carta (índice 10)

    const cartaDiv = document.createElement("div");
    cartaDiv.classList.add("carta", cartaEscolhida.cor);
    cartaDiv.innerHTML = `<span class="numero">${cartaEscolhida.numero}</span>`;

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("resultado");
    resultadoDiv.innerHTML = "<h2>A carta escolhida foi:</h2>";
    resultadoDiv.appendChild(cartaDiv);

    const reiniciarBtn = document.getElementById("reiniciar-btn");
    reiniciarBtn.style.display = "block";

    document.querySelector(".grid-container").innerHTML = "";
    document.querySelector(".buttons").innerHTML = "";
    document.getElementById("revelar-btn").style.display = "none";
    document.querySelector(".container").appendChild(resultadoDiv);
}
