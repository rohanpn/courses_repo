// Task 1: Solve name collision
/*
Create an object that contains an empty Collections, Models, and Views object
and show example of its usage.
*/
var AppointmentApp = {
  Models: {},
  Views: {},
  Collections: {}
};

AppointmentApp.Models.Appointment = Backbone.Model.extend({});
AppointmentApp.Collections.Appointments = Backbone.Collection.extend({});
AppointmentApp.Views.Appointment = Backbone.View.extend({});
AppointmentApp.Views.Appointments = Backbone.View.extend({});
AppointmentApp.AppRouter = new (Backbone.Router.extend({}))();


//==========================================================================>
// Task 2: Handle links outside Backbone Views
/*
Turn the AppointmentApp to backbone view, immeditately instantiate it and
pass document.body as el.
*/
var AppointmentApp = new (Backbone.View.extend({
  Collections: {},
  Models: {},
  Views: {}
}))({ el: document.body });


//==========================================================================>
// Task 3: Capture links
/*
CAPTURE LINKS
250
Add an event to capture all clicks on 'a' tags that have the data-backbone
attribute on them. In the event handler, prevent the default event and use
Backbone.history.navigate to pass the link through our app's router.
*/
var AppointmentApp = new (Backbone.View.extend({
  Collections: {},
  Models: {},
  Views: {},
  events: {
    'click a[data-backbone]': function(e){
      e.preventDefault();
      Backbone.history.navigate(e.target.pathname, { trigger: true});
    }
  }
}))({el: document.body});


//==========================================================================>
// Task 4: Bootstrap you app you code
/*
BOOTSTRAPPING
250
Bootstrap data on the page that you can use to bootstrap Appointments
collection instead of using fetch. Modify the start function in the
AppointmentApp to receive this data as a parameter and pass in the appointments
bootstrap data to the Appointments() constructor.
*/
var bootstrap = {
  appointments: [
    { id: 1, name: 'Budhram', title: 'Backbone Developer' },
    { id: 2, name: 'Man Kumari', title: 'UI Developer' }
  ]
};

var AppointmentApp = new (Backbone.View.extend({
  Collections: {},
  Models: {},
  Views: {},
  events: {
    'click a[data-backbone]': function(e){
      e.preventDefault();
      Backbone.history.navigate(e.target.pathname, { trigger: true });
    }
  },
  start: function(bootstrap){
    this.appointments = new AppointmentApp.Collections.Appointments(bootstrap.appointments);
    var appointmentsView = new AppointmentApp.Views.Appointments({collection: this.appointments});
    $('#app').html(appointmentsView.render().el);
  }
}))({el: document.body});

// Pass the bootstrap data at start
$(function(){ AppointmentApp.start( bootstrap ); });
