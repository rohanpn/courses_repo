/*
Controllers:
It is a place where we define our app's behavior by defining functions
and values.
*/
// Task: Add a controller named StoreController to our gemStore application.
// app.js
(function(){
  var gem = { name: 'Azurite', price: 2.95 };
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
    this.product = gem;
  });
})();
