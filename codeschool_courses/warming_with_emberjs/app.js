var App = Ember.Application.create({
  LOG_TRANSITIONS: true   // log to the console when visiting a new page
});

Handlebars.registerHelper("log", function(context) {
  return console.log(context);
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
App.CONTACTS = [
  {
    name: 'Man Kumari',
    about: 'Sales and Marketing',
    avatar: 'images/contacts/man.jpg'
  },
  {
    name: 'Budh Ram',
    about: 'Support and Issues',
    avatar: 'images/contacts/ram.jpg'
  }
];

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function(){
    this.resource('product', { path: '/:title'});
  });
  this.resource('contacts', function(){
    this.resource('contact', { path: '/:name'});
  });
});

App.IndexController = Ember.Controller.extend({
  productsCount: 2,
  logo: 'images/logo.png',
  time: function(){
    return (new Date()).toDateString();
  }.property()
});
App.ContactsIndexController = Ember.Controller.extend({
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
App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return App.PRODUCTS.findBy('title', params.title);
  }
});
App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.CONTACTS;
  }
});
App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return App.CONTACTS.findBy('name', params.name);
  }
});
