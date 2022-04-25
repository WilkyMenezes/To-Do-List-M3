const baseURL = "http://localhost:3000/paletas";


async function findAllPaletas() {
    const response = await fetch(`${baseURL}/todas-paletas`)
    
    const paletas = await response.json();
    
    paletas.forEach(function (paleta) {
        document.querySelector("#paletaList")
            .insertAdjacentHTML("beforeend"
                , `
            <div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
                <div>
                    <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                    <div class="PaletaListaItem__preco">Preço: ${paleta.preco},00 R$</div>
                    <div class="PaletaListaItem__descricao">${paleta.descricao}</div>               
                    <div class="PaletaListaItem__acoes Acoes">
                        <button class="Acoes__editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
                        <button class="Acoes__excluir btn" onclick="abrirModalDelete(${paleta.id})">Excluir</button>
                    </div>                
                </div>
                <img class="PaletaListaItem__foto" src="${paleta.foto}" alt="Paleta de ${paleta.sabor}" />            
            </div>
       `);
    });
};


findAllPaletas();



async function findByIdPaletas() {
    const id = document.querySelector("#idPaleta")
        .value
    
    const response = await fetch(`${baseURL}/paleta/${id}`)
    const paleta = await response.json();
    
    const paletaEscolhidaDiv = document.querySelector("#paletaEscolhida");
    
    paletaEscolhidaDiv.innerHTML =
        `
    <div class="PaletaCardItem" id="PaletaListaItem_${paleta.id}">
        <div>
            <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
            <div class="PaletaCardItem__preco">Preço: ${paleta.preco} R$</div>
            <div class="PaletaCardItem__descricao">${paleta.descricao}</div>
        </div>
        <div class="PaletaListaItem__acoes Acoes">
                <button class="Acoes__editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
                <button class="Acoes__excluir btn" onclick="abrirModalDelete(${paleta.id})">Excluir</button>
    </div>

    <img class="PaletaCardItem__foto" src="${paleta.foto}"
     alt="Paleta de ${paleta.sabor}" />
    </div>
    `
};

async function abrirModal(id = null) {
    
    if (id != null) {
        document.querySelector('#title-header-modal')
            .innerText = "Atualizar Paleta";
        document.querySelector('#form-button-modal')
            .innerText = "Atualizar";
        
        const response = await fetch(`${baseURL}/paleta/${id}`);
        const paleta = await response.json();
        
        document.querySelector("#sabor")
            .value = paleta.sabor;
        document.querySelector("#preco")
            .value = paleta.preco;
        document.querySelector("#descricao")
            .value = paleta.descricao;
        document.querySelector("#foto")
            .value = paleta.foto;
        document.querySelector("#id")
            .value = paleta.id;
        
    } else {
        document.querySelector('#title-header-modal')
            .innerText = "Cadastrar uma Paleta";
        document.querySelector('#form-button-modal')
            .innerText = "Cadastrar";
    }
    document.querySelector("#overlay")
        .style.display = "flex";
};



function fecharModal() {
    document.querySelector(".modal-overlay")
        .style.display = "none";
    document.querySelector("#sabor")
        .value = "";
    document.querySelector("#preco")
        .value = 0;
    document.querySelector("#descricao")
        .value = "";
    document.querySelector("#foto")
        .value = "";
};

async function createPaleta() {
    const id = document.querySelector("#id")
        .value
    const sabor = document.querySelector("#sabor")
        .value
    const preco = document.querySelector("#preco")
        .value
    const descricao = document.querySelector("#descricao")
        .value
    const foto = document.querySelector("#foto")
        .value
    
    const paleta = {
        id
        , sabor
        , preco
        , descricao
        , foto
    , };
    
    const modoEdicaoAtivado = id > 0;
    
    
    /*Nunca na vida que eu ia saber que isso era um if e else */
    const andpoit = baseURL + (modoEdicaoAtivado ? `/update/${id}` : `/create`);
    
    
    
    const response = await fetch(andpoit, {
        method: modoEdicaoAtivado ? "put" : "post"
        , headers: {
            "Content-type": "application/json"
        , }
        , mode: "cors"
        , body: JSON.stringify(paleta)
        
    });
    const novaPaleta = await response.json();
    
    const html =
        `
                <div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
                    <div>
                        <div class="PaletaListaItem__sabor">${novaPaleta.sabor}</div>
                        <div class="PaletaListaItem__preco">Preço: ${novaPaleta.preco},00 R$</div>
                        <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>
                        <div class="PaletaListaItem__acoes Acoes">
                            <button class="Acoes__editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
                            <button class="Acoes__excluir btn" onclick="abrirModalDelete(${paleta.id})"(${paleta.id})">Excluir</button>
                        </div>
                    </div>

                    <img class="PaletaListaItem__foto" src="${novaPaleta.foto}"
                    alt="Paleta de ${novaPaleta.sabor}" />
                </div>
            `
    // document.querySelector("#paletaList").insertAdjacentHTML('beforeend', html)
    
    
    if (modoEdicaoAtivado) {
        document.querySelector(`#PaletaListaItem_${id}`)
            .outerHTML = html
    } else {
        document.querySelector("#paletaList")
            .insertAdjacentHTML('beforeend', html)
    }
    
    fecharModal();
};

function abrirModalDelete(id) {
    document.querySelector("#overlay-delete")
        .style.display = "flex";
    const btnSim = document.querySelector(".btn_delete_yes")
    
    btnSim.addEventListener("click", function () {
        deletarPaleta(id);
    })
};


function fecharModalDelete() {
    document.querySelector("#overlay-delete")
        .style.display = "none";
};


async function deletarPaleta(id) {
    const response = await fetch(`${baseURL}/delete/${id}`, {
        method: "delete"
        , headers: {
            "Content-Type": "application/json"
        , }
        , mode: "cors"
    , });
    const result = await response.json();
    alert(result.message);
    
    fecharModalDelete();
    document.getElementById("#paletaList")
        .innerHTML = "";
    findAllPaletas();
};
