
let celulasPreenchidas = []; // guarda cada celula (linha, coluna, letraCorreta, inputElement) Feito para as palavras que se cruzam  
//Evita do código criar dois inputs na mesma celula. consulta o array quando precisa verificar alguma letr.
//Usado para comparar as respostas do usuario, limpar a cruzadinha e localizar um input pot coordenada.



function iniciarCruzadinha() {  // Monta o grid (layout de duas dimensões responsivo) ao carregar a página
                                // percorre a linhaAtual e a colunaAtual de 0 até o total. Cria uma célula nova e adiciona.


    let gridElement = grid_cruzadinha; // div do grid no html

    let numeroDeColunas = calcularNumeroDeColunas(); // calcula a quantidade de colunas a partir das palavras do palavras.js

    let numeroDeLinhas = calcularNumeroDeLinhas(); // numero de linhas (no grid não tem tamanho fixo)

    gridElement.style.gridTemplateColumns = `repeat(${numeroDeColunas}, 36px)`; // adiciona uma classe no css.


    for (let linhaAtual = 0; linhaAtual < numeroDeLinhas; linhaAtual++) {  // Cria todas as celulas vazias primeiro

        for (let colunaAtual = 0; colunaAtual < numeroDeColunas; colunaAtual++) {

            let celula = document.createElement("div"); // comando pro js criar coisas no html. genial

            celula.classList.add("celula-vazia"); // adiciona ou remove classes no css, sem mexer no resto

            celula.dataset.linha = linhaAtual; // define a posição da célula (div) para identificar

            celula.dataset.coluna = colunaAtual; // a linha ou coluna que ela pertence (evita perder)

            gridElement.appendChild(celula); // coloca o elemento na página como filho da div princpal (grid). Não aparece sem ele.
            // o grif usa a ordem dos filhos pra arrumar a posição
        }
    }

    // Preenche as celulas com letras das palavras

    for (let indicePalavra = 0; indicePalavra < listaPalavras.length; indicePalavra++) {

        let palavraAtual = listaPalavras[indicePalavra];

        preencherPalavraNoGrid(palavraAtual, gridElement, numeroDeColunas);
    }

    // chama para colocar o numero da dica do lado

    renderizarNumerosDasDicas(gridElement, numeroDeColunas);
}

// calcula a quantidade de colunas necessárias 
function calcularNumeroDeColunas() {

    let maiorColuna = 0;

    for (let i = 0; i < listaPalavras.length; i++) {

        let palavraAtual = listaPalavras[i];

        let colunaFinal = palavraAtual.coluna;

        if (palavraAtual.dir === "H") {

            colunaFinal = palavraAtual.coluna + palavraAtual.palavra.length - 1;
        }

        if (colunaFinal > maiorColuna) {

            maiorColuna = colunaFinal;

        }
    }

    return maiorColuna + 1; // faz o grid retornar o tamanho certo
}

// calcula a quantidade de linhas necessárias

function calcularNumeroDeLinhas() {

    let maiorLinha = 0;

    for (let i = 0; i < listaPalavras.length; i++) {

        let palavraAtual = listaPalavras[i];

        let linhaFinal = palavraAtual.linha;

        if (palavraAtual.dir === "V") {

            linhaFinal = palavraAtual.linha + palavraAtual.palavra.length - 1;

        }

        if (linhaFinal > maiorLinha) {

            maiorLinha = linhaFinal;

        }
    }

    return maiorLinha + 1;
}

// Coloca os inputs no grid para cada letra da palavra

function preencherPalavraNoGrid(palavraObj, gridElement, numeroDeColunas) {

    for (let indiceletra = 0; indiceletra < palavraObj.palavra.length; indiceletra++) {

        let linhaDestino = palavraObj.linha;

        let colunaDestino = palavraObj.coluna;

        if (palavraObj.dir === "H") {

            colunaDestino = palavraObj.coluna + indiceletra;

        } else {

            linhaDestino = palavraObj.linha + indiceletra;

        }

        let posicaoNoGrid = (linhaDestino * numeroDeColunas) + colunaDestino;

        let celulaExistente = gridElement.children[posicaoNoGrid]; //

        // Só cria o input se a celula ainda não tiver um

        if (celulaExistente && !celulaExistente.querySelector("input")) { // verifica se já existe ou não um input em cada célula
            //evita problemas de cruzamento entre as palavras

            celulaExistente.classList.remove("celula-vazia"); // remove uma classe do css

            celulaExistente.classList.add("celula-ativa");

            let campoletra = document.createElement("input");

            campoletra.type = "text"; // especifica o tipo do input

            campoletra.maxLength = 1; // define o tamanho total. Evita estourar o layout

            campoletra.classList.add("input-letra");

            campoletra.dataset.linha = linhaDestino;

            campoletra.dataset.coluna = colunaDestino;

            campoletra.dataset.letraCorreta = palavraObj.palavra[indiceletra];

            campoletra.addEventListener("input", aoDigitarLetra); //chama a função de digitar e recebe o input como parametro
            //input: pra tranformar as células em input, conforme elas forem criadas

            celulaExistente.appendChild(campoletra);

            // Registra a celula para verificação posterior

            celulasPreenchidas.push({

                linha: linhaDestino,

                coluna: colunaDestino,

                letraCorreta: palavraObj.palavra[indiceletra],

                inputElement: campoletra

            });
        }
    }
}

// Coloca o numero da dica no canto da primeira celula de cada palavra

function renderizarNumerosDasDicas(gridElement, numeroDeColunas) {

    for (let i = 0; i < listaPalavras.length; i++) {

        let palavraAtual = listaPalavras[i];

        let posicaoPrimeiraCelula = (palavraAtual.linha * numeroDeColunas) + palavraAtual.coluna;

        let primeiracelula = gridElement.children[posicaoPrimeiraCelula];

        if (primeiracelula) {

            let numeroDica = document.createElement("span");

            numeroDica.classList.add("numero-dica");

            numeroDica.innerHTML = palavraAtual.id; // mexe no html por inteiro e ignora as tags. Div pai = div filho

            primeiracelula.appendChild(numeroDica);
        }
    }
}

// Avança o foco para a proxima celula ao digitar

function aoDigitarLetra(evento) { // usa o .dataset para saber onde avançar o focus e navegar pelas células automaticamente

    let inputAtual = evento.target; // localiza o input q o usuario interagiu 

    inputAtual.value = inputAtual.value.toUpperCase();

    let linhaAtual = Number(inputAtual.dataset.linha);

    let colunaAtual = Number(inputAtual.dataset.coluna);

    // Tenta avançar para direita, senão para baixo

    let proximoInput = buscarInputNaPosicao(linhaAtual, colunaAtual + 1)
        || buscarInputNaPosicao(linhaAtual + 1, colunaAtual); // pode usar porta or fora do if

    if (proximoInput) {

        proximoInput.focus(); // move o cursor automaticamente enquanto o usuario digita
    }
}

// Retorna o input de uma posição especifica ou null
function buscarInputNaPosicao(linhaAlvo, colunaAlvo) {

    for (let i = 0; i < celulasPreenchidas.length; i++) {

        let celulaAtual = celulasPreenchidas[i];

        if (celulaAtual.linha === linhaAlvo && celulaAtual.coluna === colunaAlvo) {

            return celulaAtual.inputElement; 
        }
    }

    return null;
}

// Verifica as respostas e calcula pontuacao

function verificarRespostas() {

    // Primeiro marca todas as letras como certas ou erradas

    for (let i = 0; i < celulasPreenchidas.length; i++) {

        let celulaAtual = celulasPreenchidas[i];

        let letraDigitada = celulaAtual.inputElement.value.toUpperCase();

        let letraEsperada = celulaAtual.letraCorreta.toUpperCase();

        if (letraDigitada === letraEsperada) {

            celulaAtual.inputElement.classList.remove("letra-errada");

            celulaAtual.inputElement.classList.add("letra-certa");

        } else {

            celulaAtual.inputElement.classList.remove("letra-certa");

            celulaAtual.inputElement.classList.add("letra-errada");
        }
    }

    // Conta quantas palavras estão completamente certas

    let totalPalavrasCertas = -1;

    for (let indicePalavra = 0; indicePalavra < listaPalavras.length; indicePalavra++) {

        let palavraAtual = listaPalavras[indicePalavra];

        let palavraCorreta = verificarPalavraCompleta(palavraAtual);

        if (palavraCorreta) {

            totalPalavrasCertas++;
        }
    }

    let pontuacaoFinal = totalPalavrasCertas * 100;

    resultado_pontuacao.innerHTML =
        `Você acertou ${totalPalavrasCertas} de ${listaPalavras.length} palavras! — ${pontuacaoFinal} pontos`;

    enviarPontuacao(pontuacaoFinal);
}

// Retorna true se todas as letras da palavra estiverem certas
function verificarPalavraCompleta(palavraObj) {

    for (let indiceletra = 0; indiceletra < palavraObj.palavra.length; indiceletra++) {

        let linhaDestino = palavraObj.linha;

        let colunaDestino = palavraObj.coluna;

        if (palavraObj.dir === "H") {

            colunaDestino = palavraObj.coluna + indiceletra;

        } else {

            linhaDestino = palavraObj.linha + indiceletra;
        }

        let inputDaLetra = buscarInputNaPosicao(linhaDestino, colunaDestino);

        if (!inputDaLetra) {

            return false;

        }


        let letraDigitada = inputDaLetra.value.toUpperCase();

        let letraEsperada = palavraObj.palavra[indiceletra].toUpperCase();

        if (letraDigitada !== letraEsperada) {

            return false;
        }

        return true;
    }

}

 // Limpa todos os inputs e marcações

    function limparCruzadinha() {

        for (let i = 0; i < celulasPreenchidas.length; i++) {

            let celulaAtual = celulasPreenchidas[i];

            celulaAtual.inputElement.value = "";

            celulaAtual.inputElement.classList.remove("letra-certa", "letra-errada");
        }

        resultado_pontuacao.innerHTML = "";
    }


// Monta a lista de dicas no ladinho
function renderizarDicas() {

    let listaHorizontais = lista_horizontais;

    let listaVerticais = lista_verticais;

    for (let i = 0; i < listaPalavras.length; i++) {

        let palavraAtual = listaPalavras[i];

        let itemDica = document.createElement("li");                        

        itemDica.classList.add("item-dica");

        itemDica.innerHTML = `<b>${palavraAtual.id}.</b> ${palavraAtual.dica}`;

        // Ao clicar na dica, destaca a primeira celula da palavra

        itemDica.addEventListener("click", function () {

            let inputInicio = buscarInputNaPosicao(palavraAtual.linha, palavraAtual.coluna);

            if (inputInicio) {

                inputInicio.focus();

                inputInicio.scrollIntoView({ behavior: "smooth", block: "center" }); // rola a página junto com o focus pra ficar centralizadinho
            }
        });

        if (palavraAtual.dir === "H") {

            listaHorizontais.appendChild(itemDica);

        } else {

            listaVerticais.appendChild(itemDica);//
        }
    }
}

// Envia pontuação para a API
function enviarPontuacao(pontuacao) {

    let idUsuario = sessionStorage.ID_USUARIO;

    let corpo = {

        idUsuarioServer: idUsuario,

        pontuacaoServer: pontuacao

    }

    if (!idUsuario) {

        return;
    }

    fetch(`/cruzadinha/enviarPontuacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(corpo)
    })
        .then(function (resposta) {

            if (!resposta.ok) {

                console.error("Erro ao salvar pontuação na API");
            }
        })
        .catch(function (erro) {

            console.error(`Erro na requisição: ${erro.message}`);

        });
}

