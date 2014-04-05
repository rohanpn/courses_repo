var App = Ember.Application.create({
  LOG_TRANSITIONS: true   // log to the console when visiting a new page
});

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.route('about');
});