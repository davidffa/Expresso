const vm = function () {
  const self = this;
  self.name = ko.observable("John Doe");
  self.photoURL = ko.observable();
  self.email = ko.observable("john.doe@gmail.com");
  self.phone = ko.observable("");
  self.address = ko.observable("");
  self.loggedIn = ko.observable(false);

  self.activate = () => {
    const profileJSON = localStorage.getItem("profile");
    if (!profileJSON) return;

    const profile = JSON.parse(profileJSON);

    self.name(profile.name || "Unknown User");
    self.photoURL(profile.photoURL || "./assets/unknown-user.svg");
    self.email(profile.email);
    self.phone(profile.phone || "");
    self.address(profile.address || "");
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