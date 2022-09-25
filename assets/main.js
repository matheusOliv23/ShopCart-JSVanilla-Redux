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

const cartItems = {};

// Renderiza a estrutura do card do produto e suas informações
function renderizaProduto(produto, index) {
    //prettier-ignore
    return `     
      <div class="card" style="width: 18rem;" >
        <img src="http://placeimg.com/640/480/arch" class="card-img-top" alt="Imagem aleatória" />
        <div class="card-body">
           <h5 class="card-title">${produto.name}</h5>
           <p class="card-text">${produto.price}</p>
           <p>${produto.rating}</p> 
           <p> Frete grátis </p> 
           <button data-index="${index}" href="#" class="btn btn-primary btn-add">Adicionar ao carrinho</button>
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
                        <div class="carrinho_produto-titulo"></div>
                        <div class="carrinho_produto-preco">R$28</div>
                        <div class="carrinho_qtd-item">Qtd:</div>
                        <div class="carrinho_preco-total-item">Total</div>
                        <input class="btn btn-primary" type="button" value="Adicionar">
                    </div>
                    <input class="btn btn-danger btn-sm" type="button" value="Remover">
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
    let html = "";
    for (let produtoId in cartItems) {
        html = html + renderizaItem(cartItems[produtoId]);
    }
    document.querySelector(".lista_items").innerHTML = html;
}

function addItemCarrinho(produto) {
    if (!cartItems[produto.id]) {
        cartItems[produto.id] = produto;
        cartItems[produto.id].amount = 0;
    }
    ++cartItems[produto.id].amount
    renderizaTodosItemsCarrinho();
}

document.body.addEventListener("click", function(event) {
    const elemento = event.target;
    if (elemento.classList.contains("btn-add")) {
        const index = parseInt(elemento.getAttribute("data-index"));
        const produto = products[index];

        addItemCarrinho(produto);
    }
});
document.querySelector(".lista_produtos").innerHTML = renderizaTodosProdutos();

renderizaTodosProdutos();