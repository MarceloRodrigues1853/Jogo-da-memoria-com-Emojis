// Array de emojis usados no jogo
const emojis = [
  "🤡",
  "🤡",
  "🤢",
  "🤢",
  "😴",
  "😴",
  "🤑",
  "🤑",
  "😡",
  "😡",
  "😂",
  "😂",
  "😎",
  "😎",
  "😒",
  "😒",
];
let abrirCards = [];
let tentativas = 0;
let startTime;
let endTime;

// Adiciona variáveis para as músicas e sons
let musicaFundo = new Audio("/src/audios/trilhaSonora.mp3");
let somVirarCarta = new Audio("/src/audios/hit.mp3");
let somFimJogo = new Audio("/src/audios/gameover.mp3");

// Embaralha os emojis ao iniciar o jogo
let embaralharEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Cria dinamicamente as cartas no jogo
for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = embaralharEmojis[i];
  box.onclick = handleClick; // Define a função handleClick para ser chamada ao clicar em uma carta
  document.querySelector(".game").appendChild(box);
}

// Função chamada quando uma carta é clicada
function handleClick() {
  somVirarCarta.play(); // Toca o som ao virar a carta

  if (abrirCards.length < 2) {
    this.classList.add("boxOpen"); // Adiciona a classe para mostrar a carta virada
    abrirCards.push(this);
  }

  if (abrirCards.length == 2) {
    setTimeout(checkMatch, 500); // Aguarda um curto período antes de verificar se as cartas correspondem
  }

  console.log(abrirCards);
}

// Função para verificar se as duas cartas abertas correspondem
function checkMatch() {
  tentativas++;

  if (abrirCards[0].innerHTML === abrirCards[1].innerHTML) {
    abrirCards[0].classList.add("boxMatch"); // Adiciona a classe para mostrar que as cartas combinam
    abrirCards[1].classList.add("boxMatch");
  } else {
    abrirCards[0].classList.remove("boxOpen"); // Remove a classe para esconder a carta virada
    abrirCards[1].classList.remove("boxOpen");
  }

  abrirCards = []; // Limpa o array de cartas abertas

  // Verifica se todas as cartas têm correspondência (jogo concluído)
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    endTime = new Date();
    const tempoTotal = (endTime - startTime) / 1000;

    // Toca o som antes da mensagem de alerta
    somFimJogo.play();

    // Espera um pouco antes de exibir a mensagem de alerta para garantir que o som seja reproduzido
    setTimeout(() => {
      // Parar todas as músicas antes de exibir a mensagem de alerta
      pararMusicas();

      // Exibe a mensagem de vitória com o número de tentativas e tempo total
      alert(
        `Você venceu em ${tentativas} tentativas e ${tempoTotal.toFixed(
          2
        )} segundos!`
      );
    }, 1000); // Aguarda 1 segundo (1000 milissegundos) antes de exibir a mensagem de alerta
  }
}

// Função para parar todas as músicas
function pararMusicas() {
  musicaFundo.pause();
  somVirarCarta.pause();
  somFimJogo.pause();
}

// Função para embaralhar as cartas durante o jogo
function embaralharCartas() {
  document.querySelector(".game").innerHTML = ""; // Limpa a área do jogo
  embaralharEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1)); // Embaralha os emojis novamente

  // Cria dinamicamente as cartas no jogo
  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = embaralharEmojis[i];
    box.onclick = handleClick; // Define a função handleClick para ser chamada ao clicar em uma carta
    document.querySelector(".game").appendChild(box);
  }
}

// Função para reiniciar o jogo
function resetGame() {
  startTime = new Date(); // Inicia o temporizador
  tentativas = 0; // Reinicia o contador de tentativas
  document.querySelector(".game").innerHTML = ""; // Limpa a área do jogo
  embaralharEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1)); // Embaralha os emojis novamente

  // Cria dinamicamente as cartas no jogo
  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = embaralharEmojis[i];
    box.onclick = handleClick; // Define a função handleClick para ser chamada ao clicar em uma carta
    document.querySelector(".game").appendChild(box);
  }

  // Toca a música de fundo ao reiniciar o jogo
  musicaFundo.play();
}

// Chama a função resetGame para iniciar a música de fundo quando a página é carregada
resetGame();
