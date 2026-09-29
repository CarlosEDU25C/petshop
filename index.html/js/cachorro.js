import {
    obterCachorros,
    salvarCachorros
} from "./armazenamento.js";

import {
    gerarId,
    mostrarMensagem
} from "./util.js";


export function cadastrarCachorro(dados) {

    const cachorros =
        obterCachorros();

    const cachorro = {

        id: gerarId(),

        nome: dados.nome,

        idade: Number(
            dados.idade
        ),

        peso: Number(
            dados.peso
        ),

        raca: dados.raca,

        tamanho: dados.tamanho,

        vacinas: dados.vacinas,

        doencas: dados.doencas

    };


    cachorros.push(cachorro);

    salvarCachorros(cachorros);

    return cachorro;
}


export function carregarCachorros(select, lista) {

    const cachorros =
        obterCachorros();


    select.innerHTML =
        '<option value="">Selecione um cachorro</option>';


    lista.innerHTML = "";


    if (cachorros.length === 0) {

        lista.innerHTML =
            "<p>Nenhum cachorro cadastrado.</p>";

        return;
    }


    cachorros.forEach(cachorro => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            cachorro.id;

        option.textContent =
            cachorro.nome;

        select.appendChild(
            option
        );


        const item =
            document.createElement(
                "div"
            );

        item.className =
            "item-cachorro";


        item.innerHTML = `

            <h3>
                ${cachorro.nome}
            </h3>

            <p>
                <strong>Idade:</strong>
                ${cachorro.idade} ano(s)
            </p>

            <p>
                <strong>Peso:</strong>
                ${cachorro.peso} kg
            </p>

            <p>
                <strong>Raça:</strong>
                ${cachorro.raca}
            </p>

            <p>
                <strong>Tamanho:</strong>
                ${cachorro.tamanho}
            </p>

            <p>
                <strong>Vacinas:</strong>
                ${cachorro.vacinas || "Não informado"}
            </p>

            <p>
                <strong>Doenças anteriores:</strong>
                ${cachorro.doencas || "Nenhuma informada"}
            </p>

        `;


        lista.appendChild(
            item
        );

    });
}
