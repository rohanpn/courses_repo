/*
// Models
var Appointment = Backbone.Model.extend({});

var Appointments = Backbone.Collection.extend({
  model: Appointment
});

var AppointmentsView = Backbone.View.extend({
  render: function() {
    var _this = this;
    this.collection.forEach(function(model) {
      return _this.$el.append("<h2>" + (model.get('title')) + "</h2><em>" + (model.get('name')) + "</em>");
    });
    return this;
  }
});

var appointments = new Appointments([
  {
    title: "Toothache",
    name: "Eric"
  }, {
    title: "Regular Checkup",
    name: "Gregg"
  }
]);
*/
// Task 1: Existing el
/*
Change the code to pass in the $('#app') element into the view constructor to
make it the appointmentsView.el.
*/
var appointmentsView = new AppointmentsView({
  collection: appointments, el: $('#app')
});
appointmentsView.render().el;

//==========================================================================>
// Task 2: Extra Options
/*
Update the AppointmentsView class to handle the extra option 'doctor' passed
into the constructor, like so:
new AppointmentsView({collection: appointments, doctor: drGoodparts})
Assign the extra option to the doctor property on the view instance.
*/

var AppointmentsView = Backbone.View.extend({
  initialize: function(options){
    this.doctor = options.doctor;
  }
});

//==========================================================================>
// Task 3: Escaping Content
/*
Escape the model's content to provide XSS attack
*/
var AppointmentView = Backbone.View.extend({
  template: _.template("<span><%= model.escape('title') %></span>"),
  render: function(){
    this.$el.html(this.template({ model: this.model }));
  }
});

//==========================================================================>
// Task 4: Updated model attribute without highlighting the effect
/* Data:
var appointment = new Appointment({title: "Toothache"});
var appView = new AppointmentView({model: appointment});

// appointment.set({title: "General Cleaning"}, { silent: true });
// Above line will disable the event calling after setting title.
appointment.set({title: "General Cleaning"}, { highlight: false });

Update the changedTitle function below to use this extra option
to selectively highlight the view.
*/


var AppointmentView = Backbone.View.extend({
  template: _.template("<span><%= title %></span>"),
  initialize: function(){
    this.model.on('change:title', this.changedTitle, this);
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
  },
  changedTitle: function(model, value, options){
    this.$('span').html(value);
    if(options.highlight !== false){
      this.$el.effect('highlight', {}, 1000);
    }
  }
});

//==========================================================================>
// Task 5: listenTo (Added in Backbone 0.9.9)
/*
Use the new listenTo View function to make the view listen to the
model's 'change:title' event, instead of having the model notify the view of
the event.
This way we can safely call remove() on the view.
*/
var AppointmentView = Backbone.View.extend({
  template: _.template("<span><%= title %></span>"),
  initialize: function(){
    this.listenTo(this.model, 'change:title', this.changedTitle);
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes));
  },
  changedTitle: function(model, value, options){
    this.$('span').html(value);

    if (options.highlight !== false){
      this.$el.effect('highlight', {}, 1000);
    }
  }
});


