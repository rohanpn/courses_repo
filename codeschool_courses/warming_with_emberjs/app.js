var App = Ember.Application.create({
  LOG_TRANSITIONS: true   // log to the console when visiting a new page
});

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.route('about');
});

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/logo.png',
  time: function(){
    return (new Date()).toDateString();
  }.property()
});