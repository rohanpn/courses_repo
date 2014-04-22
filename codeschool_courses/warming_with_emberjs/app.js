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
  },
  {
    id: 3,
    crafter: 202,
    title: 'Bean Bag',
    price: 30,
    description: 'Bean Bag is...',
    isOnSale: true,
    image: 'images/products/bean_bag.jpg',
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
  product: DS.belongsTo('product'),
  rating: DS.attr('number')
});
App.Review.FIXTURES = [
  {
    id: 100,
    product: 1,
    text: "Started a fire in no time! This is a nice long line of comment that need to be more than two lines",
    reviewedAt: new Date('12/10/2013').getTime(),
    rating: 4
  },
  {
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!",
    reviewedAt: new Date('12/10/2013').getTime(),
    rating: 5
  }
];

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function(){
    this.resource('product', { path: '/:product_id' });
    this.route('onsale');
    this.route('deals');
  });
  this.resource('contacts', function(){
    this.resource('contact', { path: '/:contact_id'});
  });
});

App.IndexController = Ember.ArrayController.extend({
  productsCount: Ember.computed.alias('length'),
  logo: 'images/logo.png',
  time: function() {
    return (new Date()).toDateString();
  }.property(),
  onSale: function() {
    return this.filterBy('isOnSale').slice(0, 3);
  }.property('@each.isOnSale')
});
App.ContactsIndexController = Ember.ObjectController.extend({
  contactName: Ember.computed.alias('name'),
  open: function() {
    return ((new Date()).getDay() === 0) ? "Closed" : "Open";
  }.property()
});
App.ProductsController = Ember.ArrayController.extend({
  sortProperties: ['title']
});
App.ProductController = Ember.ObjectController.extend({
  isNotReviewed: Ember.computed.alias('review.isNew'),
  review: function(){
    return this.store.createRecord('review',{
      product: this.get('model')
    });
  }.property('model'),
  actions: {
    createReview: function(){
      var controller = this;
      // this.get('review').set('text', this.get('text'));
      this.get('review').set('reviewedAt', new Date());
      this.get('review').save().then(function(review) {
        controller.get('model.reviews').addObject(review);
      });
    }
  }
});
App.ContactsController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  contactsCount: Ember.computed.alias('length')
});
App.ReviewsController = Ember.ArrayController.extend({
  sortProperties: ['reviewedAt'],
  sortAscending: false
});
App.ContactProductsController = Ember.ArrayController.extend({
  sortProperties: ['title']
});

App.IndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('product');
  }
});
App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});
App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});
App.ProductsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('product');
  }
});
App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return this.store.find('product', params.product_id);
  }
});
App.ProductsOnsaleRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('products').filterBy('isOnSale');
  }
});
App.ProductsDealsRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('products').filter(function(product){
      return product.get('price') < 90;
    });
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
App.ContactsIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Contact.store.find('contact', 201);
  }
});

App.ProductDetailsComponent = Ember.Component.extend({
 reviewsCount: Ember.computed.alias('product.reviews.length'),
  hasReviews: function(){
    return this.get('reviewsCount') > 0;
  }.property('reviewsCount')
});
App.ContactDetailsComponent = Ember.Component.extend({
  productsCount: Ember.computed.alias('contact.products.length'),
  isProductive: function() {
    return this.get('productsCount') > 0;
  }.property('productsCount')
});

App.ProductView = Ember.View.extend({
  classNames: ['row'],
  classNameBindings: ['isOnSale'],
  isOnSale: Ember.computed.alias('controller.isOnSale')
});
App.ReviewView = Ember.View.extend({
  isExpanded: false,
  classNameBindings: ['isExpanded', 'readMore'],
  click: function(){
    this.toggleProperty('isExpanded');
  },
  readMore: Ember.computed.gt('length', 50)
});
