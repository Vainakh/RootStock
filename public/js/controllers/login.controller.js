// Handles login views
app.controller('LoginController', ['$http', '$scope',  function($http, $scope) {
  this.errorMessage = false;

  this.credentials = {
    username: null,
    password: null
  };

  this.login = () => {
    console.log(this.credentials);

    $http({
      method: "POST",
      url: '/admin/session',
      data: this.credentials
    }).then(response => {
      if(response.data.error){
        this.errorMessage = true;
        this.errorMessage = response.data.error;
      } else {
        this.errorMessage = false;
        $scope.user = response.data;
        $http({
          method: "GET",
          url: '/admin/portfolio/' + response.data.portfolioId
        })
        .then(response => {
          $scope.portfolio = response.data
        },
        error => {

        })
      }
      console.log(response)
    });
  };//end of function
}]);