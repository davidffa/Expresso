const vm = function () {
  const self = this;
  self.name = ko.observable();
  self.photoURL = ko.observable();
  self.email = ko.observable();
  self.loggedIn = ko.observable(false);

  self.activate = () => {
    const profileJSON = localStorage.getItem("profile");
    if (!profileJSON) return;

    const profile = JSON.parse(profileJSON);

    self.name(profile.name);
    self.photoURL(profile.photoURL);
    self.email(profile.email);
    self.loggedIn(true);
  }

  self.activate();
}

$("#logoff").click(() => {
  localStorage.removeItem("profile");
  window.location.href = "index.html";
})

$(document).ready(() => {
  ko.applyBindings(new vm());
});