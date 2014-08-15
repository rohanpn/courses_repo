// Task 1:
/*
Update the form view to use model's name and title
*/

var AppointmentForm = Backbone.View.extend({
  template: _.template('<form><input name="title" type="text" value="<%= title %>"/>' +
    '<input name="name" type="text"  value="<%= name %>"/></form>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});


//==========================================================================>
// Task 2: Event Handling
/*
Update the AppointmentForm view to handle the submit event on the form.
Implement the function to handle that event. It should save both the title
and name attributes on the model with values from their respective inputs.
*/
var AppointmentForm = Backbone.View.extend({
  template: _.template('<form><input name="title" type="text" value="<%= title %>" />'+
    '<input name="name" type="text" value="<%= name %>" />' +
    '<button>Submit</button></form>'),
  events: {
    // Backbone special events which called on click of button or press Enter
    // inside form
    submit: 'save'
  },
  save: function(e){
    e.preventDefault();
    var newName = this.$('input[name=name]').val();
    var newTitle = this.$('input[name=title]').val();
    this.model.save({name: newName, title: newTitle});
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});


//==========================================================================>
// Task 3: Reuse form
/*
Reuse existing form to edit the item
*/
// Get existing Appointment from already fetched collection
var appointment = appointments.get(1);

// Pass in existing model
var editAppointmentForm = new AppointmentForm({model: appointment});

// Replace #app with the HTML of the form
$('#app').html(editAppointmentForm.render().el);


//==========================================================================>
// Task 4: Add various routers for :
// 1: creating new appointment
// 2: editing appointment

var AppointmentRouter = new Backbone.Router.extend({
  routes: {
    "": "index" ,
    "appointments/new": "newAppointment",
    "todos/:id/edit": "edit"
  },
  initialize: function(){
    this.appointments = new Appointments();
    this.appointmentsView = new AppointmentsView({collection: this.appointments});
  },
  index: function(){
    this.appointments.fetch();
    $('#app').html(this.appointmentsView.render().el);
  },
  newAppointment: function(){
    var appointment = new Appointment({
      name: 'Budh Ram Gurung',
      title: 'Backbone.js Developer'
    });
    var appointmentForm = new AppointmentForm({model: appointment});
    $('#app').append(appointmentForm.render().el);
  },
  edit: function(id){
    var appointmentForm = new AppointmentForm({model: this.appointments.get(id) });
    $('#app').html(appointmentForm.render().el);
  }
});


//==========================================================================>
// Task 5: Redirect to appointments list after successful save of
// appointment and also handle error message on unsuccess
var AppointmentForm = Backbone.View.extend({
  template: _.template('<form><input name="title" type="text" value="<%= title %>" />'+
    '<input name="name" type="text" value="<%= name %>" />' +
    '<button>Submit</button></form>'),
  events: {
    // Backbone special events which called on click of button or press Enter
    // inside form
    submit: 'save'
  },
  save: function(e){
    e.preventDefault();
    var newName = this.$('input[name=name]').val();
    var newTitle = this.$('input[name=title]').val();
    this.model.save({name: newName, title: newTitle}, {
      success: function(model, response, options){
        Backbone.history.navigate('', { trigger: true });
      }, error: function(model, xhr, options){
        var errors = JSON.parse(xhr.responseText).errors;
        alert('Something went wrong with saving the Appointment: ' + errors);
      }
    });
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});



