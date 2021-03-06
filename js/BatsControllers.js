angular.module('batscontrollers', [
  'login', 'start', 'livetracking',
  'forgotpassword', 'changepassword', 'managetracker',
  'signupstep1', 'signupstep2', 'updatemarkerdetails',
  'replayroute', 'eventhistory', 'vehiclestatistics',
  'eventhistorydetail', 'vehiclestatisticsdetail', 'navigation',
  'livetrackingdetails', 'report', 'addmember',
  'managemember', 'livetrackingdevices', 'eventhistoryfilter',
  'replayroutedetail', 'notification',
    'geofence',
  'underscore', 'gm', 'angular-svg-round-progressbar', 'notificationbell'
])

  .controller('BatsCtrl', function ($scope,  $timeout, $rootScope, PageConfig, Constants,
    $interval, BatsServices, UtilsFactory) {
      // $rootScope.loggedIn = false;
      console.log("inside batscontroller");
    $scope.openSetting = false;
    $scope.openSettingBar = function () {
      $scope.openSetting = !$scope.openSetting;
    }

    $scope.menuLink = 1;
    $scope.sidebarLinkColor = function (selectedMenuPageNumber) {
      $scope.menuLink = selectedMenuPageNumber;
    }

    $rootScope.parking_inavtive=true;
    $rootScope.parking_activate=false;
    
    var notificationCall;

    /************************* internet checking *************************** */
     $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        var onlineState = networkState;
        pingNetConnection();
      })
      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        var offlineState = networkState;
        $ionicPopup.confirm({
            title: 'No Internet Connection',
            content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
          })
          .then(function(result) {
             // ionic.Platform.exitApp();
          });
      })


       function pingNetConnection() {
        // alret("ping network calling");
      var xhr = new XMLHttpRequest();
      var file = 'http://220.227.124.134:8054/images/404.png';
      var r = Math.round(Math.random() * 10000);
      xhr.open('HEAD', file + "?subins=" + r, false);
      try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 304) {
          //alert("true");
        } else {
          $ionicPopup.confirm({
            title: 'No Internet Connection',
            content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
          })
            .then(function (result) {
              ionic.Platform.exitApp();
            });
        }
      } catch (e) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
          .then(function (result) {
            ionic.Platform.exitApp();
          });
      }
    }
    /*........................... App Initialization Ends ...........................*/

    $rootScope.interlogout = function () {
      if (localStorage.getItem(Constants.USER_VO)) {
        localStorage.removeItem(Constants.USER_VO);
      }
      if (localStorage.getItem(Constants.accessToken)) {
        localStorage.removeItem(Constants.accessToken);
      }
      if (localStorage.getItem("choice")) {
        localStorage.removeItem("choice");
      }

      if (localStorage.getItem(Constants.ACCESS_TYPE)) {
        localStorage.removeItem(Constants.ACCESS_TYPE)
      }
       deleteDatabase();
        cordova.plugins.notification.local.cancelAll(function () {
        }, this);
      $scope.menuLink = 1;
      $interval.cancel($rootScope.notificationCall);
      UtilsFactory.setNotificationcallFirst(0);
      $state.go(PageConfig.LOGIN);
    }

    function deleteDatabase() {
      var token = localStorage.getItem("token");
      var query = "DELETE FROM Token WHERE token = (?)";
      $cordovaSQLite.execute(db, query, [token]).then(function (res) {
        //alert("Token Deleted");
      }, function (err) {
       // alert(err);
      });

      var query_eventdelete = "DELETE FROM Notification";
      $cordovaSQLite.execute(db, query_eventdelete, []).then(function (res) {
        //alert("notifi Deleted");
      }, function (err) {
       // alert(err);
      });
    }

    function removeLogin() {
      BatsServices.logout({}).success(function (response) {
       $rootScope.interlogout();
      }).error(function (error) {
        ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
      })
    }

    // $scope.$on('onReminderAdded', function (event, id, state, json) {
    //   // console.log('notification ADDED, id: ' + id + ' state:' + state + ' json:' + json);
    // });

    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Logout',
        template: 'Are you sure you want to log out from Bats?',
        cancelText: 'No',
        scope: $scope,
        okText: 'Yes',
      });
      confirmPopup.then(function (res) {
        if (res) {
          removeLogin();
        }
      });
    }

    // $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
    //     var alertPopup = $ionicPopup.alert({
    //         title: 'No Internet Connection',
    //         template: '<div class="pwdSuccessPopup">Sorry, no Internet connectivity detected. Please reconnect and try again.</div>'
    //     });
    // })
})