// ViewModel KnockOut
var vm = function () {
  var self = this;

  self.products = [
    {
      name: "Croissant Misto",
      image: './assets/products/croissant.png',
      price: 1.99,
      stock: true
    },
    {
      name: "Café expresso",
      image: './assets/products/coffee.png',
      price: 0.50,
      stock: true
    },
    {
      name: "Mil folhas",
      image: './assets/products/milfolhas.png',
      price: 0.99,
      stock: true
    },
    {
      name: "Pão de mistura",
      image: './assets/products/pao.png',
      price: 0.07,
      stock: true
    },
    {
      name: "Capuccino",
      image: './assets/products/capuccino.png',
      price: 0.70,
      stock: true
    },
    {
      name: "Bola de berlim",
      image: './assets/products/bolaberlim.png',
      price: 1.29,
      stock: false
    }
  ];

  self.shownProducts = ko.observableArray(self.products);

  self.addToCart = (product) => {
    const pid = self.products.findIndex(p => p.name === product.name);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.find(it => it.id === pid)) {
      Swal.fire(
        'Produto já escolhido!',
        `${product.name} já está no carrinho!`,
        'error'
      );

      return;
    }

    cart.push({
      id: pid,
      qty: 1
    });

    Swal.fire(
      'Adicionado ao pedido!',
      `${product.name} foi adicionado ao seu pedido`,
      'success'
    )

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  self.activate = () => {
    $("#searchBar").on("input", () => {
      self.shownProducts(self.products.filter(p => p.name.toLowerCase().startsWith($("#searchBar").val().toLowerCase())));
    });
  }

  self.activate();
}

$(document).ready(() => {
  ko.applyBindings(new vm());
  // const isLogged = localStorage.getItem('profile');

  // if (!isLogged) {
  //   window.location.href = "./signin.html";
  // }
});