// ViewModel KnockOut
var vm = function () {
  var self = this;

  self.products = [
    {
      name: "Croissant Misto",
      image: './assets/products/croissant.png',
      price: 1.99
    },
    {
      name: "Café expresso",
      image: './assets/products/coffee.png',
      price: 0.50
    },
    {
      name: "Mil folhas",
      image: './assets/products/milfolhas.png',
      price: 0.99
    },
    {
      name: "Pão de mistura",
      image: './assets/products/pao.png',
      price: 0.07
    },
    {
      name: "Capuccino",
      image: './assets/products/capuccino.png',
      price: 0.70
    },
    {
      name: "Bola de berlim",
      image: './assets/products/bolaberlim.png',
      price: 1.29
    }
  ];

  self.items = ko.observableArray([]);
  self.price = (item) => {
    return products[item.id].price * item.qty;
  }
  self.addOne = (item) => {
    self.items.replace(item, { id: item.id, qty: item.qty + 1 });
    localStorage.setItem('cart', JSON.stringify(self.items()));
  }
  self.removeOne = (item) => {
    self.items.replace(item, { id: item.id, qty: item.qty - 1 });
    localStorage.setItem('cart', JSON.stringify(self.items()));
  }
  self.removeItem = (item) => {
    self.items.splice(self.items.indexOf(item), 1);
    localStorage.setItem('cart', JSON.stringify(self.items()));
  }
  self.clearCart = () => {
    self.items([]);
    localStorage.removeItem('cart');
  }
  self.subTotal = () => {
    return self.items().reduce((acc, curr) => acc += self.products[curr.id].price * curr.qty, 0).toFixed(2);
  }
  self.calcServiceTax = () => {
    return Math.min(2.5, Math.log(Number(self.subTotal()) + 1)).toFixed(2);
  }
  self.total = ko.computed(() => {
    return (Number(self.subTotal()) + Number(self.calcServiceTax())).toFixed(2);
  }, self);

  function loadItems() {
    const items = localStorage.getItem('cart');
    if (items) {
      self.items(JSON.parse(items));
    }
  }

  self.activate = () => {
    loadItems();
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