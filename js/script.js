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