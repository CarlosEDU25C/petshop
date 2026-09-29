import {
    cadastrarCachorro,
    carregarCachorros
} from "./cachorro.js";

import {
    criarAgendamento,
    listarAgendamentos,
    cancelarAgendamento
} from "./agendamento.js";

import {
    mostrarMensagem,
    obterDiaSemana,
    dataEhPassada
} from "./util.js";


const formCachorro =
    document.getElementById(
        "formCachorro"
    );

const formAgendamento =
    document.getElementById(
        "formAgendamento"
    );


const selectCachorro =
    document.getElementById(
        "cachorro"
    );


const listaCachorros =
    document.getElementById(
        "listaCachorros"
    );


const listaAgendamentos =
    document.getElementById(
        "listaAgendamentos"
    );


const mensagemCachorro =
    document.getElementById(
        "mensagemCachorro"
    );


const mensagemAgendamento =
    document.getElementById(
        "mensagemAgendamento"
    );


const dataInput =
    document.getElementById(
        "data"
    );


const diaSemana =
    document.getElementById(
        "diaSemana"
    );


function atualizarTela() {

    carregarCachorros(
        selectCachorro,
        listaCachorros
    );

    listarAgendamentos(
        listaAgendamentos
    );
}


/* CADASTRO DO CACHORRO */

formCachorro.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const dados = {

            nome:
                document.getElementById(
                    "nome"
                ).value.trim(),

            idade:
                document.getElementById(
                    "idade"
                ).value,

            peso:
                document.getElementById(
                    "peso"
                ).value,

            raca:
                document.getElementById(
                    "raca"
                ).value.trim(),

            tamanho:
                document.getElementById(
                    "tamanho"
                ).value,

            vacinas:
                document.getElementById(
                    "vacinas"
                ).value.trim(),

            doencas:
                document.getElementById(
                    "doencas"
                ).value.trim()

        };


        cadastrarCachorro(
            dados
        );


        mostrarMensagem(

            mensagemCachorro,

            "Cachorro cadastrado com sucesso.",

            true

        );


        formCachorro.reset();


        atualizarTela();

    }
);


/* DATA */

dataInput.addEventListener(
    "change",
    () => {

        const data =
            dataInput.value;


        if (!data) {

            diaSemana.textContent =
                "";

            return;
        }


        diaSemana.textContent =
            obterDiaSemana(
                data
            );


        if (
            obterDiaSemana(data) ===
            "Domingo"
        ) {

            diaSemana.textContent +=
                " - Não há atendimento neste dia.";

        }

    }
);


/* AGENDAMENTO */

formAgendamento.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const dados = {

            cachorroId:
                selectCachorro.value,

            data:
                dataInput.value,

            horario:
                document.getElementById(
                    "horario"
                ).value,

            servico:
                document.getElementById(
                    "servico"
                ).value

        };


        if (
            !dados.cachorroId
        ) {

            mostrarMensagem(

                mensagemAgendamento,

                "Selecione um cachorro.",

                false

            );

            return;
        }


        if (
            dataEhPassada(
                dados.data
            )
        ) {

            mostrarMensagem(

                mensagemAgendamento,

                "Não é possível agendar uma data passada.",

                false

            );

            return;
        }


        try {

            criarAgendamento(
                dados
            );


            mostrarMensagem(

                mensagemAgendamento,

                "Agendamento realizado com sucesso.",

                true

            );


            formAgendamento.reset();

            diaSemana.textContent =
                "";


            atualizarTela();


        } catch (erro) {

            mostrarMensagem(

                mensagemAgendamento,

                erro.message,

                false

            );

        }

    }
);


/* CANCELAMENTO */

listaAgendamentos.addEventListener(
    "click",
    event => {

        if (
            !event.target.classList.contains(
                "botao-cancelar"
            )
        ) {

            return;
        }


        const id =
            event.target.dataset.id;


        const confirmar =
            window.confirm(
                "Deseja realmente cancelar este agendamento?"
            );


        if (!confirmar) {

            return;
        }


        try {

            cancelarAgendamento(
                id
            );


            atualizarTela();

        } catch (erro) {

            alert(
                erro.message
            );

        }

    }
);


/* INICIALIZAÇÃO */

atualizarTela();
