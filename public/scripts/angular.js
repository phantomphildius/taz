var app = angular.module('TazApp', ['ngRoute','vAccordion']);

app.service('userService', function() {
  var controller = this;

  this.setUser = function(user) {
    controller.currentUser = user;
  }

  this.getUser = function() {
    return controller.currentUser;
  }

});

app.controller('mainController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
  var controller = this;

  this.doctor = null;
  this.name = 'andrew';
  console.log($scope);
}]);
app.controller('userController', ['$http', '$location', '$scope', 'userService', function($http, $location, $scope, userService) {
  var controller = this;

  var user = {
        email: "",
        passwordDigest: "",
        name: "",
        age: "",
        doctor: null,
        specialty: "",
        hospital: "",
        patients: [],
        doctors: [],
        records: [],
        currentMedications: [],
        familyHistory: "",
        height: "",
        weight: "",
        pendingRequests: ""
  }

  this.docSignUp = function () {
    $http.post('/users/new', {
      email: controller.user.email,
      passwordDigest: controller.user.passwordDigest,
      name: controller.user.name,
      specialty: controller.user.specialty,
      hospital: controller.user.hospital
    }).then(function(data) {
      if (!data.data.error) {
        $location.path('/users/all');
        console.log(data);
      } else {
        $('body').append('<h2>Sorry, there was an error signing up -- try again!</h2>')
      }
    }, function (err) {
      console.log(err);
    });
  }
console.log(this);
  this.login = function () {
    $http.post('/users/login', {
      email: controller.user.email,
      passwordDigest: controller.user.passwordDigest
    }).then(function(data) {
      if (data.data.user) {
        userService.setUser(data.data.user)
        console.log(userService.getUser());
        $location.path('/users/all')
      } else {
        console.log(data);
      }
    }, function (err) {
      console.log(err);
    })
  }

}]);
app.controller('recordController', ['$http', '$location', function($http, $location) {
  var controller = this;
  var record = {
        complaint: "",
        bodySystem: "",
        description: "",
        treatment: ""
      }

  $http.get('/records/all').success(function (data) {
    controller.records = data;
  });

  this.createRecord = function () {
    $http.post('/records/new',
      controller.record
    ).then(function(data){
      console.log(data);
      if (data) {
        $location.path('/records/all');
      } else {
        $('body').append('<h2>Sorry, there was an error posting your record--try again!</h2>');
      }
    }, function(err){
      console.log("there was an error: " + err);
    });
  }


}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'views/welcome.html',
    controller: 'mainController',
    controllerAs: 'mainCtrl'
  }).when('/users/login', {
    templateUrl: 'views/login.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/new', {
    templateUrl: 'views/user/new.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/users/all', {
    templateUrl: 'views/user/all.html',
    controller: 'userController',
    controllerAs: 'userCtrl'
  }).when('/records/new', {
    templateUrl: 'views/record/new.html',
    controller: 'recordController',
    controllerAs: 'recordCtrl'
  }).when('/records/all', {
    templateUrl: 'views/record/all.html',
    controller: 'recordController',
    controllerAs: 'recordCtrl'
  })
  .otherwise({redirectTo: '/'})
}]);
