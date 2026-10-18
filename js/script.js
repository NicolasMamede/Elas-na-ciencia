/* =========================
   ELAS NA CIÊNCIA
   SCRIPT PRINCIPAL
========================= */


/* =========================
   ELEMENTOS DA PÁGINA
   CIENTISTAS
========================= */

const botoesFiltro =
    document.querySelectorAll(".filtro");

const cientistas =
    document.querySelectorAll(".cientista-card");

const busca =
    document.querySelector("#busca-cientista");

const contador =
    document.querySelector("#contador-cientistas");


let filtroAtual = "todas";


/* =========================
   FUNÇÃO PRINCIPAL
   FILTRO + BUSCA
========================= */

function atualizarCientistas() {

    /* EVITA ERRO EM OUTRAS PÁGINAS */

    if (
        !busca ||
        !contador ||
        cientistas.length === 0
    ) {
        return;
    }


    const textoBusca =
        busca.value
            .toLowerCase()
            .trim();


    let quantidadeVisivel = 0;


    cientistas.forEach(function(cientista) {

        const categorias =
            cientista.dataset.categorias || "";


        const titulo =
            cientista.querySelector("h3");


        let nome = "";


        if (titulo) {

            nome =
                titulo.textContent
                    .toLowerCase()
                    .trim();

        }


        /* =========================
           VERIFICA FILTRO
        ========================= */

        const passaFiltro =
            filtroAtual === "todas" ||
            categorias.includes(filtroAtual);


        /* =========================
           VERIFICA BUSCA
        ========================= */

        const passaBusca =
            nome.includes(textoBusca);


        /* =========================
           MOSTRA CARD
        ========================= */

        if (passaFiltro && passaBusca) {

            quantidadeVisivel++;


            /* CANCELA QUALQUER TIMER ANTIGO */

            if (cientista.timerEsconder) {

                clearTimeout(
                    cientista.timerEsconder
                );

            }


            /* REMOVE DISPLAY NONE */

            cientista.classList.remove(
                "escondido"
            );


            /*
                requestAnimationFrame faz o navegador
                desenhar o card antes de iniciar
                a animação.
            */

            requestAnimationFrame(
                function() {

                    cientista.classList.remove(
                        "saindo"
                    );

                }
            );

        }


        /* =========================
           ESCONDE CARD
        ========================= */

        else {

            /*
                Primeiro reduz a opacidade
                e move levemente o card.
            */

            cientista.classList.add(
                "saindo"
            );


            /*
                Depois da animação,
                aplica display:none.
            */

            cientista.timerEsconder =
                setTimeout(
                    function() {

                        /*
                            Confere se o card
                            continua devendo
                            ficar escondido.
                        */

                        if (
                            cientista.classList.contains(
                                "saindo"
                            )
                        ) {

                            cientista.classList.add(
                                "escondido"
                            );

                        }

                    },
                    250
                );

        }

    });


    /* =========================
       CONTADOR
    ========================= */

    if (quantidadeVisivel === 0) {

        contador.textContent =
            "Nenhuma cientista encontrada";

    }

    else if (quantidadeVisivel === 1) {

        contador.textContent =
            "1 cientista encontrada";

    }

    else {

        contador.textContent =
            quantidadeVisivel +
            " cientistas encontradas";

    }

}


/* =========================
   BOTÕES DE FILTRO
========================= */

botoesFiltro.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {

                /* REMOVE ATIVO */

                botoesFiltro.forEach(
                    function(item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );


                /* ATIVA BOTÃO CLICADO */

                botao.classList.add(
                    "ativo"
                );


                /* GUARDA FILTRO */

                filtroAtual =
                    botao.dataset.filtro;


                /* EXECUTA FILTRO */

                atualizarCientistas();

            }
        );

    }
);


/* =========================
   CAMPO DE BUSCA
========================= */

if (busca) {

    busca.addEventListener(
        "input",
        function() {

            atualizarCientistas();

        }
    );

}


/* =========================
   EXECUÇÃO INICIAL
========================= */

if (
    busca &&
    contador &&
    cientistas.length > 0
) {

    atualizarCientistas();

}

/* =========================
   LINHA DO TEMPO CLICÁVEL
   JS MÍNIMO: troca apenas o conteúdo selecionado
========================= */

const timelineClickPage = document.querySelector(".timeline-click-page");

if (timelineClickPage) {

    const timelineDados = [
        {
            ano: "1843",
            area: "Computação",
            nome: "Ada Lovelace",
            imagem: "img/ada-lovelace.png",
            alt: "Ada Lovelace",
            destaque: "Antes dos computadores modernos, ela já imaginava como uma máquina poderia seguir instruções.",
            texto: "Em suas notas sobre a Máquina Analítica de Charles Babbage, Ada descreveu um método para calcular números de Bernoulli, um marco pioneiro da história da programação.",
            impacto: "Uma ideia muito antes do computador pessoal."
        },
        {
            ano: "1898",
            area: "Física e Química",
            nome: "Marie Curie",
            imagem: "img/marie-curie.jpg",
            alt: "Marie Curie",
            destaque: "O estudo da radioatividade abriu novas portas para compreender a matéria.",
            texto: "Em 1898, Marie e Pierre Curie anunciaram evidências dos elementos polônio e rádio. O trabalho de Marie ajudou a consolidar o estudo da radioatividade como uma nova área científica.",
            impacto: "Pesquisa que ecoaria na física, na química e na medicina."
        },
        {
            ano: "1903",
            area: "Invenção",
            nome: "Mary Anderson",
            imagem: "img/mary-anderson.jpg",
            alt: "Mary Anderson",
            destaque: "Uma solução simples tornou dirigir sob chuva e neve muito mais seguro.",
            texto: "Mary Anderson patenteou um dispositivo de limpeza do para-brisa operado de dentro do veículo, pensado para melhorar a visibilidade em condições ruins de tempo.",
            impacto: "Hoje, o limpador de para-brisa é parte básica de um automóvel."
        },
        {
            ano: "1942",
            area: "Comunicação",
            nome: "Hedy Lamarr",
            imagem: "img/hedy-lamarr.jpg",
            alt: "Hedy Lamarr",
            destaque: "Uma atriz de Hollywood também ajudou a imaginar uma nova forma de proteger sinais de rádio.",
            texto: "Hedy Lamarr e George Antheil desenvolveram um sistema de comunicação por salto de frequência para tornar sinais de rádio mais resistentes a interferências.",
            impacto: "Uma contribuição importante para a história das comunicações sem fio."
        },
        {
            ano: "1952",
            area: "Biologia molecular",
            nome: "Rosalind Franklin",
            imagem: "img/rosalind-franklin.jpg",
            alt: "Rosalind Franklin",
            destaque: "Uma imagem de raios X ajudou a revelar a arquitetura da molécula da vida.",
            texto: "Rosalind Franklin e Raymond Gosling produziram a famosa Fotografia 51, cujo padrão de difração forneceu informações fundamentais para compreender a estrutura helicoidal do DNA.",
            impacto: "Uma fotografia que se tornou um marco da história da ciência."
        },
        {
            ano: "1956",
            area: "Física",
            nome: "Chien-Shiung Wu",
            imagem: "img/chien-shiung -wu.jpg",
            alt: "Chien-Shiung Wu",
            destaque: "Um experimento mostrou que a natureza nem sempre respeita sua própria imagem no espelho.",
            texto: "Wu liderou o experimento que demonstrou a violação da paridade no decaimento beta, derrubando uma suposição importante da física da época.",
            impacto: "Um resultado que obrigou a física a rever uma de suas simetrias."
        },
        {
            ano: "1962",
            area: "Matemática e Espaço",
            nome: "Katherine Johnson",
            imagem: "img/katherine-johnson.jpg",
            alt: "Katherine Johnson",
            destaque: "Cálculos precisos ajudaram a transformar a exploração espacial em realidade.",
            texto: "Katherine Johnson verificou cálculos de trajetória para o voo orbital de John Glenn e contribuiu para diversas missões do programa espacial norte-americano.",
            impacto: "Matemática decisiva para levar seres humanos com segurança ao espaço."
        },
        {
            ano: "1965",
            area: "Química e Materiais",
            nome: "Stephanie Kwolek",
            imagem: "img/stephanie-kwolek.jpg",
            alt: "Stephanie Kwolek",
            destaque: "Uma fibra extraordinariamente resistente mudou a proteção moderna.",
            texto: "Ao pesquisar novos polímeros, Stephanie Kwolek desenvolveu a fibra que ficou conhecida como Kevlar, usada em aplicações que exigem alta resistência e baixo peso.",
            impacto: "Um material presente em proteção, cabos, pneus e diversas tecnologias."
        },
        {
            ano: "1972",
            area: "Medicina e Farmacologia",
            nome: "Tu Youyou",
            imagem: "img/tu-youyou.jpg",
            alt: "Tu Youyou",
            destaque: "Conhecimento tradicional e pesquisa científica se encontraram no combate à malária.",
            texto: "Tu Youyou e sua equipe identificaram a artemisinina como um tratamento altamente eficaz contra a malária, contribuindo para salvar milhões de vidas.",
            impacto: "Uma descoberta que transformou o tratamento de uma doença global."
        }
    ];

    const pontos = timelineClickPage.querySelectorAll(".timeline-click-point");
    const detalhe = timelineClickPage.querySelector(".timeline-click-detail");
    const imagem = timelineClickPage.querySelector("#timeline-click-image");
    const anoGrande = timelineClickPage.querySelector("#timeline-click-big-year");
    const meta = timelineClickPage.querySelector("#timeline-click-meta");
    const nome = timelineClickPage.querySelector("#timeline-click-name");
    const headline = timelineClickPage.querySelector("#timeline-click-headline");
    const texto = timelineClickPage.querySelector("#timeline-click-text");
    const impacto = timelineClickPage.querySelector("#timeline-click-impact");
    const progresso = timelineClickPage.querySelector(".timeline-click-progress");

    function atualizarLinhaDoTempo(indice) {
        const dados = timelineDados[indice];

        pontos.forEach(function (ponto, i) {
            const ativo = i === indice;
            ponto.classList.toggle("ativo", ativo);
            ponto.setAttribute("aria-selected", ativo ? "true" : "false");
        });

        const pontoAtivo = pontos[indice];
        const inicioLinha = 30;
        const centroPonto = pontoAtivo.offsetLeft + (pontoAtivo.offsetWidth / 2);

        progresso.style.width = Math.max(0, centroPonto - inicioLinha) + "px";

        detalhe.classList.add("trocando");

        setTimeout(function () {
            imagem.src = dados.imagem;
            imagem.alt = dados.alt;
            anoGrande.textContent = dados.ano;
            meta.textContent = `${dados.ano} · ${dados.area}`;
            nome.textContent = dados.nome;
            headline.textContent = dados.destaque;
            texto.textContent = dados.texto;
            impacto.textContent = dados.impacto;

            detalhe.classList.remove("trocando");
        }, 170);
    }

    pontos.forEach(function (ponto) {
        ponto.addEventListener("click", function () {
            const indice = Number(ponto.dataset.index);
            atualizarLinhaDoTempo(indice);
        });
    });
}
