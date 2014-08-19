// Getting Started
/*
Qns: Why Angular?
Ans: Provides following functionalities:
- Helps you organize your JavaScript
- Helps create responsive(as in fast) websites
- Plays very well with jQuery
- Easy to test and increase maintainability

Qns: What is Angular JS?
Ans: A client-side JS framework for adding interactivity to HTML.

Qns: What is Directives?
Ans: A Directive is a marker on a HTML tag that tells Angular to run or
reference some JavaScript code.

Qns: What is Module?
Ans: Module are place:
- where we write pieces of our Angular Application.
- makes our code more maintainable, testable and readable.
- we define dependencies of our Application.
*/

/*
// First Module
*/
var app = angular.module('store', []);

// Including in HTML
/*
<html ng-app='store'>
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body>
  </body>
</html>
*/


/*
Expressions:
Allow you to insert dynamic values into your HTML
*/
// Including in HTML as
/*
  <body>
    <h1>{{"Hello, Angular!"}}</h1>
  </body>
*/