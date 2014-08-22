/*
Filter: Provide filtering of data
Syntax: {{ data* | filter:options* }}
Example:
1. date :
{{'12121212111423' | date:'dd/MM/yyyy @ h:mma' }}

2. uppercase:
{{'Hello World' | uppercase}}  => HELLO WORLD

3. limitTo:
{{'Hello World' | limitTo:5}}  => Hello

Also, used for limiting no. of items in an Array as:
<li ng-repeat='product in store.products | limitTo:2'>

4. orderBy: help in sorting elements
<li ng-repeat="product in store.products | orderBy:'-price'">
*/

// Task 1: Filter prices in product to show currency properly
// <em class="pull-right">{{product.price | currency}}</em>


// Task 2: Add image to product
// <img ng-src='{{product.images[0]}}' />
/*
Description: image src attribute will not work since browser will try to
load the image before evaluating the expression
*/


// Task 3: Add differnt tab
// <div ng-click='tab = 1'> ... </div>
// <div ng-show='tab === 1'> ... </div>
/*
1. ng-click changes the value of tab
2. {{tab}} expression automatically get updated
3. It defines a 2-way Data binding(means expressions are re-evaluated when
   a property changes)
4.
*/


// Task 4: Set initial value to tab
// <div ng-init='tab = 1'> ... </div>


// Task 5: Show active tab
// <div ng-class='{ active:tab === 1}'> ... </div>


// Task 6: Take out above logic into controller

// 1. Use ng-controller='TabController as tab' and remove ng-init from 'div'
// 2. Define controller in app.js as:
app.controller('TabController', function(){
  this.tab = 1;

  this.setTab = function(newValue){
    this.tab = newValue;
  };

  this.isSet = function(tabName){
    return this.tab === tabName;
  };
});
// 3. Move ng-click tab assignment equality to controller as this.setTab
// 4. Move active logcic of ng-class='{active:tab === 1}' into controller as
//    this.isSet and use as ng-class='{active:tab.isSet(1)}'
