const products = [{
        id: "1",
        name: "Celular",
        price: 500,
        rating: 2,
        image: "http://placeimg.com/640/480/arch",
    },
    {
        id: "2",
        name: "Celular",
        price: 500,
        rating: 2,
        image: "http://placeimg.com/640/480/arch",
    },
];

function addItem(produto) {
    return {
        type: 'ADICIONA_ITEM',
        payload: produto
    }
}

function removeItem(produtoId) {
    return {
        type: 'REMOVER_ITEM',
        payload: {
            id: produtoId
        }
    }
}

const abrirMenu = {
    type: 'ABRIR_MENU',
    menuAberto: true
}

//estado inicial
function reducer(state = {}, action) {

    switch (action.type) {
        case 'ADICIONA_ITEM':
            return {
                ...state,
                [action.payload.id]: {
                    ...action.payload,
                    quantidade: state[action.payload.id] ? state[action.payload.id].quantidade + 1 : 1
                }
            }
        case 'REMOVER_ITEM':
            return state[action.payload.id].quantidade > 1 ? {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    quantidade: state[action.payload.id].quantidade - 1
                },
            } : Object.keys(state).reduce(function(acumulador, produtoId) {
                return {
                    ...acumulador,
                    ...(produtoId === action.payload.id) ? {} : {
                        [produtoId]: state[produtoId]
                    }

                }
            }, {})
        case 'ABRIR_MENU':
            return {
                ...state,
                menuAberto: true
            }
        default:
            return state
    }
}

const store = Redux.createStore(reducer)

store.subscribe(function() {
    renderizaTodosItemsCarrinho()
    carrinhoValorTotal()
})

// Renderiza a estrutura do card do produto e suas informações
function renderizaProduto(produto, index) {
    //prettier-ignore
    return `     
    <div class="card text-center card_produto" style="width: 18rem;">
            <img src="http://placeimg.com/640/480/arch" class="card-img-top" alt="Imagem aleatória" />
            <div class="card-body">
                <h5 class="card-title text-center fs-5">${produto.name}</h5>
                <div class="price_icon ">
                    <p class="card-text fs-2">R$${produto.price}</p>
                    <i class="fa-light fa-bolt-lightning"></i>
                    <span style="font-weight:bold;">
                        Frete grátis
                    </span>
                </div>
                <button type="button" data-index=${index} style="background-color: orange ;" class="btn  btn-lg btn-add">
                    <i class="fa fa-sharp fa-solid fa-cart-plus icon"></i>
                    Comprar
                </button>
            </div>
    </div>
  `
}

function renderizaItem(produto) {
    return `     
     <div class="card" style="width: 100%;">
                <div class="carrinho_box">
                    <img class="carrinho_img" src="http://placeimg.com/640/480/arch" alt="Imagem aleatoria">
                    <div class="carrinho_detalhes">
                        <div class="carrinho_produto-titulo">nome</div>
                        <div class="carrinho_produto-preco">R$ 20</div>
                        <div class="carrinho_preco-total-item">Total: 20</div>
                        <div class="carrinho_icons">
                            <i class="fa fa-light fa-minus"></i>
                            <div class="carrinho_qtd-item">2</div>
                            <i class="fa fa-light fa-plus"></i>
                        </div>
                        <!-- <input class="btn btn-primary" type="button" value="Adicionar"> -->
                    </div>
                    <i class="fa fa-solid fa-trash btn-remove"></i>
                    <!-- <input data-produto-id="${produto.id}" class="btn btn-danger btn-sm btn-remove" type="button" value="Remover"> -->
                </div>
    </div>
  `;
}

//itera cada objeto do array de produtos
function renderizaTodosProdutos() {
    let html = "";
    for (let i = 0; i < products.length; i++) {
        html += renderizaProduto(products[i], i);
    }
    return html;
}

function renderizaTodosItemsCarrinho() {
    const carrinhoItems = store.getState()
    let html = "";
    for (let produtoId in carrinhoItems) {
        html = html + renderizaItem(carrinhoItems[produtoId]);
    }
    document.querySelector(".lista_items").innerHTML = html;
}

function carrinhoValorTotal() {
    const carrinhoItems = store.getState()
    let total = 0;
    for (let produtoId in carrinhoItems) {
        total = total + (carrinhoItems[produtoId].price * carrinhoItems[produtoId].quantidade);
    }
    document.querySelector(".total").innerHTML = `<h6>Total: <strong>R$${total}</strong></h6>`;
}

// function addItemCarrinho(produto) {
//     if (!cartItems[produto.id]) {
//         cartItems[produto.id] = produto;
//         cartItems[produto.id].amount = 0;
//     }
//     ++cartItems[produto.id].amount
// }

function removerItemCarrinho() {}

document.body.addEventListener("click", function(event) {
    const elemento = event.target;
    if (elemento.classList.contains("btn-add")) {
        const index = parseInt(elemento.getAttribute("data-index"));
        const produto = products[index];
        store.dispatch(addItem(produto))

    }

    if (elemento.classList.contains('btn-remove')) {
        const produtoId = elemento.getAttribute('data-produto-id')
        store.dispatch(removeItem(produtoId))
    }
});
document.querySelector(".lista_produtos").innerHTML = renderizaTodosProdutos();

renderizaTodosProdutos();
carrinhoValorTotal()