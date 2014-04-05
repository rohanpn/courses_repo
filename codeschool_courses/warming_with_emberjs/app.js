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
App.AboutController = Ember.Controller.extend({
  contactName: 'Budh Ram Gurung',
  open: function(){
    if ( (new Date()).getDay() !== 0 ){
      return 'We are open!!!';
    } else {
      return 'Sunday closed :) ';
    }
  }.property()
});