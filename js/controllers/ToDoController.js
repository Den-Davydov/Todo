const app = angular.module('todoApp', []);

/**
 * Main app controller
 */
app.controller('main', function($scope) {


  $scope.todos = [{
    text: 'Learn AngularJS',
    works:[{
      name: "S�o Paulo",
      done: true
    }, {
      name: "Rio de Janeiro",
      done: false
    }
    ]},
    {
    text: 'Build a Nodejs app using the `MEAN` Framework',
      works:[{
        name: "1111111111111111",
        done: false
      }, {
        name: "222222222222",
        done: false
      }
      ]}];

  /**
   * Add a new item
   */
  $scope.addTask = function() {

    const text = $scope.todoInput;

    if (!text)
      return;

    $scope.todos.push({
      text: text,
      works:[]
    });

    $scope.todoInput = "";
  };

  $scope.addWork = function(item) {
    const i = $scope.todos.indexOf(item);
    userEnter = prompt("Add Work","");
    if(userEnter == "" || userEnter== null){}
    else{
      $scope.todos[i].works.push({
        name: userEnter,
        done: false
      });
    }
  };


  $scope.editTask = function(item) {

    userEnter = prompt("Edit Task",item.text);
    if(userEnter == "" || userEnter== null){}
    else{
      item.text =userEnter;
      $scope.$apply();
    }
  };

  $scope.editWork = function(item) {

    userEnter = prompt("Edit Work",item.name);
    if(userEnter == "" || userEnter=== null){}
    else{
      item.name =userEnter;

    }
  };


  $scope.removeTask = function(item) {

    var msg = "Are you sure you want to delete this Task."

    if(confirm(msg)){
      const i = $scope.todos.indexOf(item);
      $scope.todos.splice(i, 1);
    }};

  $scope.removeWork = function(item,parent) {

    var msg = (item.done) ?
      "Are you sure you want to delete this work." :
      "You are about to remove an unfinished work.\nAre you sure?";

    if(confirm(msg)){
      const i = $scope.todos.indexOf(parent);
      const j = $scope.todos[i].works.indexOf(item);
      console.log(i,"  ",j);
      $scope.todos[i].works.splice(j, 1);
    }};

  var options = {
    group: 'share',
    animation: 100
  };

  events = [
    'onChoose',
    'onStart',
    'onEnd'
  ].forEach(function (name) {
    options[name] = function (evt) {

      if (name='onEnd' && evt.oldIndex!==undefined && evt.newIndex!==undefined){
        console.log({
          'event': name,
          'from':+evt.from.id.slice(1),
          'to':+evt.item.parentElement.id.slice(1),
          'old': evt.oldIndex,
          'new': evt.newIndex
        });

        var iFrom=+evt.from.id.slice(1);
        var iTo=+evt.item.parentElement.id.slice(1);
        var jFrom=evt.oldIndex;
        var jTo=evt.newIndex;

        console.log(jFrom,"  iiiii= ", iFrom,"!!!=== ++++++",jTo,"  iiiii= ", iTo);
        console.log($scope.todos);
        var r= $scope.todos[iFrom].works.splice(jFrom,1);
        $scope.$apply();
        $scope.todos[iTo].works.splice(jTo,0, r[0]);
        $scope.$apply();
        var sort="i"+iTo;
        Sortable.create(document.getElementById(sort), options);
        $scope.$apply();
        console.log(sort);


      }

    };
  });

  $scope.init = function (parent) {

    const i1 = $scope.todos.indexOf(parent);

    console.log(i1);
    for (var t = 0; t < $scope.todos.length; t++) {
     var i="i"+t;

      Sortable.create(document.getElementById(i), options);
  }};




});

