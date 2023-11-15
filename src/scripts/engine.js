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

let embaralharEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Criação dinâmica das cartas no jogo
for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = embaralharEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

// Função chamada quando uma carta é clicada
function handleClick() {
  if (abrirCards.length < 2) {
    this.classList.add("boxOpen");
    abrirCards.push(this);
  }

  if (abrirCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(abrirCards);
}

// Função para verificar se as duas cartas abertas correspondem
function checkMatch() {
  if (abrirCards[0].innerHTML === abrirCards[1].innerHTML) {
    abrirCards[0].classList.add("boxMatch");
    abrirCards[1].classList.add("boxMatch");
  } else {
    abrirCards[0].classList.remove("boxOpen");
    abrirCards[1].classList.remove("boxOpen");
  }

  abrirCards = [];

  // Verifica se todas as cartas têm correspondência (jogo concluído)
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    alert("Você venceu !");
  }
}
