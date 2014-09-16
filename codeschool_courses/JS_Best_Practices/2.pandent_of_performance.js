// Task 1: Async loading
// Allow the page to continue to load without too much delay of script.

// Use 'async'
// <script type="text/javascript" src="https://www.fourlands.com/takesForever.js" async/></script>

// ============================================================================>
// Task 2: Increase speed by Inheritance

// 'prototype' should be used for shared properties and methods in order
// to increase memory efficiency.

// ============================================================================>
// Task 3: Minize page reflow (https://developers.google.com/speed/articles/reflow)
// Task Code
var list = document.getElementById('list'),
    listValues = ['Aaaa', 'Bbbb', 'Cccc'],
    i, length, element;

for(i=0, length = listValues.length; i<length; i++) {
  element = document.createElement('li');
  element.appendChild(document.createTextNode(list[i]));
  list.appendChild(element);
}
// Here DOM elements are joined in pieces

// solution Code
var list = document.getElementById('list'),
    listValues = ['Aaaa', 'Bbbb', 'Cccc'],
    i, length, element, fragment;

fragment = document.createDocumentFragment();
for(i=0, length = listValues.length; i<length; i++) {
  element = document.createElement('li');
  element.appendChild(document.createTextNode(list[i]));
  fragment.appendChild(element);
}
list.appendChild(fragment);
