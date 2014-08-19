// Adding new directives
/*
Task 1:
Add two new properties to our product that we can use on the
HTML side. The first of these two is canPurchase, which is a boolean
indicating if the product can be purchased. The second is soldOut which,
as you can imagine, is a boolean indicating if the product is sold out.
Use these two new properties in our HTML page to solve the
following objectives.
1) Use a directive to ensure that we can only see the "Add to Cart" button
if the canPurchase property is true.
2) Our first gem is so popular that we've run out of stock already!
Well, Flatlander gems are pretty rare, so it shouldn't be a big surprise.
Luckily there is a soldOut property to our gem. When a gem is soldOut,
hide the .product element.
*/

/* HTML Code:
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="container" ng-controller="StoreController as store">
    <div ng-hide='store.product.soldOut' class="product row">
      <h3>
        {{store.product.name}}
        <em class="pull-right">${{store.product.price}}</em>
      </h3>
      <button ng-show='store.product.canPurchase'>Add to Cart</button>
    </div>
  </body>
</html>
*/
(function() {
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
    this.product = gem;
  });

  var gem = {
    name: 'Azurite',
    price: 110.50,
    canPurchase: false,
    soldOut: true
  };
})();

/*
Task 2: Show multiple products
*/

/*
HTML Code:
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="container" ng-controller="StoreController as store">
    <div ng-repeat='product in store.products' class="product row">
      <h3>
        {{product.name}}
        <em class="pull-right">${{product.price}}</em>
      </h3>
    </div>
  </body>
</html>
*/
(function() {
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
     this.products = gems;
  });

  var gems = [
    { name: 'Azurite', price: 2.95 },
    { name: 'Bloodstone', price: 5.95 },
    { name: 'Zircon', price: 3.95 },
  ];
})();
