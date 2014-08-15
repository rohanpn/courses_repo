// JSON response
// Task 1:
/*
  Enable paginating appointments instead of just returning all of them when we
  fetch the Appointments collection.
*/

/*
// Get /appointments
{
  "per_page": 10, "page": 1, "total": 50,
  "appointments": [
    {
      "title": "Ms. Kitty Hairball Treatment",
      "cankelled": false, "identifier": 1
    }
  ]
}
*/

// Code
var Appointments = Backbone.Collection.extend({
  parse: function(response){
    this.perPage = response.per_page;
    this.page = response.page;
    this.total = response.total;

    return response.appointments;
  }
});

//==========================================================================>

// Task 2:
// Fetching with Params
/*
Limit the appointments from server based on the appointment date.
Pass an extra param so that the URL is like: /appointments?since=2013-01-01
*/
var appointments = new Appointments();
appointments.fetch({ data: { since: '2013-01-01' }});

//==========================================================================>

// Task 3:
/*
1. Add template for adding 'View Next' link and code to render the link.
2. Implement the route to handle appointments/p:page/pp:per_page and have the
   route function fetch the new appointments based on the parameters.
*/
var AppointmentListView = Backbone.View.extend({
  // Inserted Code
  template: _.template('<a href="#/appointments/p<%= page %>/pp<%= per_page %>">View Next</a>'),
  initialize: function(){
    this.collection.on('reset', this.render, this);
  },
  render: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
    // Inserted Code after rendering all items other it will not be added at last
    this.$el.append(this.template({ page: this.collection.page + 1, per_page: this.collection.per_page }));
  },
  addOne: function(model){
    var appointmentView = new AppointmentView({model: model});
    appointmentView.render();
    this.$el.append(appointmentView.el);
  }
});

var AppRouter = new Backbone.Router.extend({
  routes: {
    "appointments/p:page/pp:per_page": "page",
    "": "index"
  },
  initialize: function(options){
    this.appointmentList = new AppointmentList();
  },
  page: function(page, per_page){
    this.appointmentList.fetch({
      data: {
        page: page, per_page: per_page
      }
    });
  },
  index: function(){
    var appointmentsView = new AppointmentListView({collection: this.appointmentList});
    appointmentsView.render();
    $('#app').html(appointmentsView.el);
    this.appointmentList.fetch();
  },
});

//==========================================================================>

// Task 4:
/*
Sort the appointments based on date in reverse order
*/

var Appointments = Backbone.Collection.extend({
  comparator: function(appointment1, appointment2){
    return appointment1.get('date') < appointment2.get('date');
  }
});


//==========================================================================>

// Task 5:
/*
Implement a function to count up the number of cancelled appointments.
Data:
var Appointment = Backbone.Model.extend({})
var app1 = new Appointment({cancelled: true})
var app2 = new Appointment({cancelled: true})
var app3 = new Appointment({cancelled: true})
var app4 = new Appointment({cancelled: false})
*/

var Appointments = Backbone.Collection.extend({
  cancelledCount: function(){
    return this.where({ cancelled: true }).length;
  }
});
