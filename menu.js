// ViewModel KnockOut
var vm = function () {
  var self = this;

  self.name = ko.observable();
  self.photoURL = ko.observable();
  self.email = ko.observable();
  self.loggedIn = ko.observable(false);

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

    const profileJSON = localStorage.getItem("profile");
    if (!profileJSON) return;

    const profile = JSON.parse(profileJSON);

    self.name(profile.name);
    self.photoURL(profile.photoURL);
    self.email(profile.email);
    self.loggedIn(true);

    $("#logoff").click(() => {
      localStorage.removeItem("profile");
      window.location.href = "index.html";
    })
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