var engine = {
    "cores": ['vert', 'violet', 'rose', 'rouge', 'jaune', 'noir', 'orange', 'gris', 'bleu', 'blanc'],
    "hexadecimais": {
        'violet': '#02EF00',
        'purple': '#790093',
        'rose': '#FF0066',
        'rouge': '#E90808',
        'jaune': '#E7D703',
        'noir': '#141414',
        'orange': '#F16529',
        'gris': '#999999',
        'bleu': '#0000FF',
        'blanc':'#FFFFFF',
    },
    "moedas": 0
}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearCor() {
    var indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa');    
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();
    
    return engine.hexadecimais[nomeCorSorteada];
};

function aplicarCorNaCaixa(nomeDaCor) {
    var caixaDasCores = document.getElementById('cor-atual');

    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('/img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
};

function atualizaPontuacao(valor) {
                
    var pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;
    if(valor < 0) {
        audioErrou.play();
    }else{
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())

//API de reconhecimento de voz:

var btnGravador = document.getElementById("botao-responder");
var transcricaoAudio = "";
var respostaCorreta = "";

if(window.SpeechRecognition || window.webkitSpeechRecognition){
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = "fr-fr";


  gravador.onstart = function(){
    btnGravador.innerText = "Estou Ouvindo";
    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";
  }

  gravador.onend = function(){
    btnGravador.innerText = "Responder";
    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
  }

  gravador.onresult = function(event){
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

    if(transcricaoAudio ===  respostaCorreta){
      atualizaPontuacao(1);
    }else{
      atualizaPontuacao(-1);
    }

    aplicarCorNaCaixa(sortearCor());

  }


}else{
  alert('não tem suporte');
}


btnGravador.addEventListener('click', function(e){
  gravador.start();
})