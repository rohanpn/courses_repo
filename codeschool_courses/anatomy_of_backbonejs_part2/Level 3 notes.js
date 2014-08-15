// Task 1:
/*
Remove duplication in routes to make /pp:per_page and trailing '/' as
an optional part of following route:

appointments/p:page/pp:per_page
*/
var AppRouter = new Backbone.Router.extend({
  routes: {
    "appointments/p:page(/pp:per_page)(/)": "page"
  },
  page: function(page, per_page){
    per_page = per_page || 10;

    this.appointments.fetch({data: {page: page, per_page: per_page}});
  }
});

//==========================================================================>
// Task 2
/*
Decode the page and per page as one should able to write 'twenty five' instead
of 25 in page.
*/
var AppRouter = new Backbone.Router.extend({
  routes: {
    "appointments/p:page(/pp:per_page)(/)": "page"
  },
  page: function(page, per_page){
    page = decodeURIComponent(page);
    per_page = decodeURIComponent(per_page);
    this.appointments.fetch({data: {page: page, per_page: per_page}});
  }
});


//==========================================================================>
// Task 3
// Restrict the route to only allow numeric id
var AppRouter = new Backbone.Router.extend({
  initialize: function(){
    this.route(/^appointments\/(\d+)$/, 'show');
  },
  routes: {
    "appointments/:id":  "show"
  },
  show: function(id){
    var appointment = new Appointment({id: id});
    console.log(appointment);
  }
});


//==========================================================================>
// Task 4
// Implement Catch-all Route to catch unmatched route
var AppRouter = new Backbone.Router.extend({
  routes: {
    "appointments/:id":  "show",
    '*path': 'notFound',  // this must be last line in routes
  },
  notFound: function(path){
    console.log('No ' + path + ' found.');
  },
  show: function(id){
    var appointment = new Appointment({id: id});
    console.log(appointment);
  }
});
