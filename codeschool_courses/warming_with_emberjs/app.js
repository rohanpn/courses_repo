var App = Ember.Application.create({
  LOG_TRANSITIONS: true   // log to the console when visiting a new page
});

Handlebars.registerHelper("log", function(context) {
  return console.log(context);
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Product = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string'),
  reviews: DS.hasMany('review', { async: true }),
  crafter: DS.belongsTo('contact')
});
App.Product.FIXTURES = [
  {
    id: 1,
    crafter: 200,
    title: 'Chair',
    price: 99,
    description: 'Chair is...',
    isOnSale: true,
    image: 'images/products/chair.jpg',
    reviews: [100, 101]
  },
  {
    id: 2,
    crafter: 201,
    title: 'Old Clock',
    price: 59,
    description: 'Clock is...',
    isOnSale: false,
    image: 'images/products/clock.jpg',
    reviews: []
  }
];

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string'),
  products: DS.hasMany('product', { async: true })
});
App.Contact.FIXTURES = [
  {
    id: 200,
    products: [1, 2],
    name: 'Man Kumari',
    about: 'Sales and Marketing',
    avatar: 'images/contacts/man.jpg',
  },
  {
    id: 201,
    products: [2],
    name: 'Budh Ram',
    about: 'Support and Issues',
    avatar: 'images/contacts/ram.jpg'
  }
];

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});
App.Review.FIXTURES = [
  {
    id: 100,
    product: 1,
    text: "Started a fire in no time!"
  },
  {
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!"
  }
];

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function(){
    this.resource('product', { path: '/:product_id' });
  });
  this.resource('contacts', function(){
    this.resource('contact', { path: '/:contact_id'});
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
    return this.store.findAll('product');
  }
});
App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return this.store.find('product', params.product_id);
  }
});
App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});
App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return this.store.find('contact', params.contact_id);
  }
});
