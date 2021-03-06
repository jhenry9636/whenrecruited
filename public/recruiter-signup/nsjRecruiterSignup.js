(function () {
  'use strict'


  angular.module('recruiter-signup')
    .directive('nsjRecruiterSignup', nsjRecruiterSignup)

  function nsjRecruiterSignup() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/recruiter-signup/nsjRecruiterSignUp.html',
      controller: RecruiterSignUpController,
      controllerAs: 'vm'
    }

  }

  RecruiterSignUpController.$inject = ['$window', 'recruiterSignupService'];

  function RecruiterSignUpController($window, recruiterSignupService) {
    var vm = this;

    vm.recruiter = {}
    vm.recruiter.givenName = null;
    vm.recruiter.familyName = null;
    vm.recruiter.primaryEmail = null;
    vm.recruiter.password = null;
    vm.recruiter.companyName = null;
    vm.recruiter.primaryPhone = null;
    vm.recruiter.companyCity = null;
    vm.recruiter.companyState = null;
    vm.recruiter.companyZip = null;
    vm.signUp = signUp;
    vm.hasErrors = false;
    vm.selectContract = selectContract;
    vm.selectFulltime = selectFulltime;
    vm.fulltimeSelected = false;
    vm.contractSelected = true;
    vm.sucessSignUp = false;

    vm.signin = {};
    vm.signin.primaryEmail = null;
    vm.signin.password = null;

    vm.submitSignin = submitSignin;


    function signUp(isValid) {
      if(!isValid) {
        vm.hasErrors = true;
        return;
      }
      vm.hasErrors = false;
      debugger;
      recruiterSignupService.save(vm.recruiter)
        .then(function(response) {
          if(!response.data.success) {
            vm.loginError = true;
            return;
          }
          vm.sucessSignUp = true;
          vm.serverSignUpError = null;
        }, function(error) {
          debugger
          vm.serverSignUpError = error.data.reason.split(':')[1].split(',')
        })
    }

    function submitSignin(isValid) {
      if (!isValid) {
        vm.hasErrors = true;
        return;
      }
      vm.hasErrors = false;
      recruiterSignupService.submitSignin(vm.signin)
        .then(function (response) {
          $window.location.assign('/search');
          vm.serverError = null;
        }, function(error) {
          vm.serverError = error.data.reason;
        })
    }

    function selectContract() {
      vm.contractSelected = true;
      vm.fulltimeSelected = false;
    }

    function selectFulltime() {
      vm.contractSelected = false;
      vm.fulltimeSelected = true;
    }


  }

})()