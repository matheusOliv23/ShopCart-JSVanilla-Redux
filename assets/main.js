const products = [{
    id: '1',
    name: 'Celular',
    price: 500,
    rating: 2,
    image: 'http://placeimg.com/640/480/arch'

}, {
    id: '2',
    name: 'Celular',
    price: 500,
    rating: 2,
    image: 'http://placeimg.com/640/480/arch'

}]


const cartItems = {
    '1': {
        id: '1',
        name: 'Celular',
        price: 500,
        rating: 2,
        image: 'http://placeimg.com/640/480/arch'
    },
    '2': {
        id: '2',
        name: 'Celular',
        price: 500,
        rating: 2,
        image: 'http://placeimg.com/640/480/arch'
    },
}


// Renderiza a estrutura do card do produto e suas informações
function renderizaProduto(produto) {
    //prettier-ignore
    return `     
      <div class="card" style="width: 18rem;">
          <img src="http://placeimg.com/640/480/arch" class="card-img-top" alt="Imagem aleatória" />
           <div class="card-body">
           <h5 class="card-title">${produto.name}</h5>
           <p class="card-text">${produto.price}</p>
           <p>${produto.rating}</p> 
           <p> Frete grátis </p> 
           <a href="#" class="btn btn-primary">Adicionar ao carrinho</a> </div>
      </div>
  `
}

function renderizaItem(produto) {
    return `     
      <div class="card" style="width: 18rem;">
          <img src="http://placeimg.com/640/480/arch" class="card-img-top" alt="Imagem aleatória" />
           <div class="card-body">
           <h5 class="card-title">${produto.id}</h5>
           <p class="card-text"></p>
           <p>$</p> 
           <p> Frete grátis </p> 
           <a href="#" class="btn btn-primary">Adicionar ao carrinho</a> </div>
      </div>
  `
}

//itera cada objeto do array de produtos
function renderizaTodosProdutos() {
    let html = '';
    for (let i = 0; i < products.length; i++) {
        html += renderizaProduto(products[i])
    }
    return html
}

function renderizaTodosItemsCarrinho() {
    let html = ''
    for (let produtoId in cartItems) {
        html = html + renderizaItem(cartItems[produtoId])
    }
    return html
}



document.querySelector('.lista_produtos').innerHTML = renderizaTodosProdutos()
document.querySelector('.lista_items').innerHTML = renderizaTodosItemsCarrinho()


renderizaTodosProdutos()