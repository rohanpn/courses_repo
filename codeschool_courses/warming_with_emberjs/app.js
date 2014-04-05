var App = Ember.Application.create({
  LOG_TRANSITIONS: true   // log to the console when visiting a new page
});

App.PRODUCTS = [
  {
    title: 'Chair',
    price: 99,
    description: 'Chair is...',
    isOnSale: true,
    image: 'images/products/chair.jpg'
  },
  {
    title: 'Old Clock',
    price: 59,
    description: 'Clock is...',
    isOnSale: false,
    image: 'images/products/clock.jpg'
  }
];

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.route('about');
  this.resource('products');
});

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/logo.png',
  time: function(){
    return (new Date()).toDateString();
  }.property()
});
App.AboutController = Ember.Controller.extend({
  contactName: 'Budh Ram Gurung',
  open: function(){
    return (new Date()).getDay() === 0 ? 'Closed !!!' : 'Open !!!';
  }.property()
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
});