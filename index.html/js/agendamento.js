import {
    obterAgendamentos,
    salvarAgendamentos,
    obterCachorros
} from "./armazenamento.js";

import {
    gerarId,
    formatarData
} from "./util.js";


export function criarAgendamento(dados) {

    const agendamentos =
        obterAgendamentos();


    const horarioOcupado =
        agendamentos.some(
            agendamento =>

                agendamento.data ===
                dados.data

                &&

                agendamento.horario ===
                dados.horario

                &&

                agendamento.status ===
                "Agendado"
        );


    if (horarioOcupado) {

        throw new Error(
            "Este horário já está ocupado."
        );
    }


    const dataObj =
        new Date(
            dados.data +
            "T00:00:00"
        );


    if (
        dataObj.getDay() === 0
    ) {

        throw new Error(
            "Não há atendimento aos domingos."
        );
    }


    const novoAgendamento = {

        id: gerarId(),

        cachorroId:
            dados.cachorroId,

        data:
            dados.data,

        horario:
            dados.horario,

        servico:
            dados.servico,

        status:
            "Agendado"

    };


    agendamentos.push(
        novoAgendamento
    );


    salvarAgendamentos(
        agendamentos
    );


    return novoAgendamento;
}


export function listarAgendamentos(elemento) {

    const agendamentos =
        obterAgendamentos();

    const cachorros =
        obterCachorros();


    elemento.innerHTML = "";


    if (
        agendamentos.length === 0
    ) {

        elemento.innerHTML = `

            <tr>

                <td colspan="6">

                    Nenhum agendamento cadastrado.

                </td>

            </tr>

        `;

        return;
    }


    agendamentos.sort(
        (a, b) => {

            const primeiro =
                new Date(
                    `${a.data}T${a.horario}`
                );

            const segundo =
                new Date(
                    `${b.data}T${b.horario}`
                );

            return primeiro - segundo;
        }
    );


    agendamentos.forEach(
        agendamento => {

            const cachorro =
                cachorros.find(
                    cachorro =>
                        cachorro.id ===
                        agendamento.cachorroId
                );


            const linha =
                document.createElement(
                    "tr"
                );


            linha.innerHTML = `

                <td>
                    ${cachorro
                        ? cachorro.nome
                        : "Cachorro não encontrado"}
                </td>

                <td>
                    ${formatarData(
                        agendamento.data
                    )}
                </td>

                <td>
                    ${agendamento.horario}
                </td>

                <td>
                    ${agendamento.servico}
                </td>

                <td>
                    ${agendamento.status}
                </td>

                <td>

                    ${
                        agendamento.status ===
                        "Agendado"

                        ?

                        `<button
                            class="botao-cancelar"
                            data-id="${agendamento.id}"
                        >
                            Cancelar
                        </button>`

                        :

                        "-"
                    }

                </td>

            `;


            elemento.appendChild(
                linha
            );

        }
    );
}


export function cancelarAgendamento(id) {

    const agendamentos =
        obterAgendamentos();


    const agendamento =
        agendamentos.find(
            item =>
                item.id === id
        );


    if (!agendamento) {

        throw new Error(
            "Agendamento não encontrado."
        );
    }


    agendamento.status =
        "Cancelado";


    salvarAgendamentos(
        agendamentos
    );
}
