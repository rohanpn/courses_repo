// Task 1: Mustache Template Engine
/*
Use Mustache template engine to render form for possibleDates
*/
App.Views.Appointment = Backbone.View.extend({
  template: Mustache.compile('<h2>{{ title }}</h2>' +
    'Possible Dates: <ul>{{#possibleDates}}' +
      '<li>{{day}} at {{time}}</li>' +
    '{{/possibleDates}}</ul>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});


//==========================================================================>
// Task 2: Show a demo for passing function to Mustache template to do
// complex behaviors
var data = {
  name: 'Eric',
  header: function(){
    return function(text, render) {
      return "<h1>" + render(text) + "</h1>";
    };
  }
};

// Inside template
Mustache.compile('{{#header}} Hello {{name}}. {{/header}}');


//==========================================================================>
// Task 3: Override Backbone default behavior and make the model
// Read-Only
App.Models.Appointment = Backbone.Model.extend({
  // method can be either 'read', 'create', 'update' or 'delete'
  sync: function(method, model, options){
    if(method === 'read' || method === 'create') {
      Backbone.sync(method, model, options);
    }
  }
});


//==========================================================================>
// Task 4: Implement your own persistence storage as localStorate for
// read, create, update and delete functionalities
App.Models.Appointment = Backbone.Model.extend({
  sync: function(method, model, options){
    var key;
    options = options || {};

    switch(method){
      case "delete":
        key = "Appointment-" + model.id;
        localStorage.removeItem(key);
        break;
      case "update":
        key = 'Appointment-' + model.id;
        localStorage.setItem(key, JSON.stringify(model));
        break;
      case "create":
        key = "Appointment-" + model.id;
        localStorage.setItem(key, JSON.stringify(model));
        break;
      case "read":
        key = "Appointment-" + model.id;
        var result = localStorage.getItem(key);
        if(result){
          result = JSON.parse(result);
          options.success && options.success(result);
        }else if(options.error){
          options.error("Couldn't find Appointment with id=" + model.id);
        }
        break;
    }
  }
});


//==========================================================================>
// Task 5: Integrate backbone-localstorage.js with Backbone to automatically
// handle read, create, update and delete behaviors

// Inside html include the 'backbone-localstorage.js' as below
// <script src="backbone-localstorage.js" />

// In collection definition use
var Appointments = Backbone.Collection.extend({
  model: Appointment,
  localStorage: new Backbone.LocalStorage('Appointments')
});

