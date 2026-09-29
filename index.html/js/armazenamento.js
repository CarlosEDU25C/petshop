const CHAVE_CACHORROS = "cachorros";
const CHAVE_AGENDAMENTOS = "agendamentos";


export function obterCachorros() {

    const dados =
        localStorage.getItem(CHAVE_CACHORROS);

    return dados
        ? JSON.parse(dados)
        : [];
}


export function salvarCachorros(cachorros) {

    localStorage.setItem(
        CHAVE_CACHORROS,
        JSON.stringify(cachorros)
    );
}


export function obterAgendamentos() {

    const dados =
        localStorage.getItem(CHAVE_AGENDAMENTOS);

    return dados
        ? JSON.parse(dados)
        : [];
}


export function salvarAgendamentos(agendamentos) {

    localStorage.setItem(
        CHAVE_AGENDAMENTOS,
        JSON.stringify(agendamentos)
    );
}
