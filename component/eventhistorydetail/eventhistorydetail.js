angular.module('eventhistorydetail', [])
  .controller('EventHistoryDetailCtrl', function ($scope, $rootScope, $timeout, PageConfig, UtilsFactory, _,
    BatsServices, Constants) {

    
      var startTime;
      var endTime;
      var tokenCheck = window.localStorage.token;
      var latlongVal = [];
      var locationNames = [];
      $scope.locationNameWords = [];

      var inputParam = {"token": tokenCheck};
      var geocoder = new google.maps.Geocoder();
      // console.log("sadsad");

      // function to get th device list
      BatsServices.activeDeviceList(inputParam).success(function (response) {
          //console.log(JSON.stringify(response));
          $scope.deviceList = response
            if (response.length==0) {
              console.log("inside if for no device");
              // ionicToast.show('Active devices are not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
          }
      }).error(function (error) {
          // ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
      })


      $scope.openCalS = function(){
        $('#eventStartTimePic').datetimepicker({
          format: 'DD/MM/YYYY',
          maxDate: 'now',        		
          ignoreReadonly:true,
        }).on("dp.change",function (e) {
          dateChangeStart(e.date._d);
        });
      }

      $scope.openCalE = function(){
        $('#eventEndTimePic').datetimepicker({
          format: 'DD/MM/YYYY',
          maxDate: 'now',        		
          ignoreReadonly:true,
        }).on("dp.change",function (e) {
          dateChangeEnd(e.date._d);
        });
      }

      function dateChangeStart(date){
        startTime = moment(date).valueOf();
      }

      function dateChangeEnd(date){
        endTime = moment(date).valueOf();
      }

      $scope.getEventHistoryDetails = function(){
          console.log("click event happened");
          var inputParam = { 'token': tokenCheck,'devid': $scope.data.selectedvehicle, 'sts': startTime, 'ets': endTime }
          // UtilsFactory.setSelectedEventHistoryDetails(inputParam);
          BatsServices.eventHistory(inputParam).success(function (response) {
              console.log("event history: "+angular.toJson(response));
              $scope.eventHistoryValues = response.values;
              // for(var i=0;i<response.values.length;i++){
              //   var latVal = response.values[i].lat;
              //   var longVal = response.values[i].long;
              //   getLocationValue(latVal,longVal,i);
              //   // console.log("lat: "+latVal+" long: "+longVal);
              //   // function getLocationValue(latVal,longVal,i){
              //   //   var lat = latVal;
              //   //   var long = longVal;
              //   //   var j = i;
              //   //   var latlng = new google.maps.LatLng(lat, long);
              //   //   // var geocoder = geocoder = new google.maps.Geocoder();
              //   //   geocoder.geocode({ 'latLng': latlng }, function (results, status) {
              //   //     if (status == google.maps.GeocoderStatus.OK) {
              //   //       if (results[1]) {
              //   //         console.log("results are: "+results[1].formatted_address);
              //   //         locationNames[j] = results[1].formatted_address;
              //   //         console.log("final json: "+angular.toJson(locationNames)+"j value: "+j);
              //   //         $scope.locationNameWords.push(locationNames[j]);
              //   //         console.log("final json: "+$scope.locationNameWords);
              //   //       }
              //   //     }
              //   //   });
              //   // }
              //   // getLatLong(latVal,longVal);
              //   // $scope.locationNameWords = locationNames;
              //   // console.log("lat long val: "+locationNames);
              // }
              // console.log("lat long val: "+$scope.locationNameWords);
              
              // console.log("lat long val: "+$scope.locationNameWords);
              // $scope.speed = response.speed_limit;
              // UtilsFactory.setEventHistoryList(response);
              // $state.go(PageConfig.EVENT_HISTORY_DETAIL);
              //console.log("\n gdgj" +$scope.speed+$scope.eventHistoryValues);
              // if ($scope.eventHistoryValues.length == 0) {
              //     $scope.noData = true;
              // }
          }).error(function (error) {
              if (error.err == 'Origin Server returned 504 Status') {
                  // ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
              }
              else {
                  // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
              }
              //ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
          })
      }
      
      // function dateChange(date){
      //   myDateChange(date);
      //   // $scope.activeMenu = '5';
      // }
  
      function myDateChange(date){
        // $scope.getHistory(date)
        console.log("date changed: "+date);
      }

    if (UtilsFactory.getEventHistoryList().length == 0) {
      // $state.go(PageConfig.EVENT_HISTORY)
    }
    $scope.gotoFilter = function () {
      // $state.go(PageConfig.EVENT_FILTER);
    }
    if (UtilsFactory.getNotificationDetails()) {
      //  console.log(UtilsFactory.getNotificationDetails());
      $scope.notificationData = UtilsFactory.getNotificationDetails();
      $scope.count = UtilsFactory.getNotificationCount();
      //  console.log($scope.count);
      if ($scope.count == undefined) {
        $scope.count = 0;
        $scope.notificationData = [];
      }
    }
    $scope.speed;
    $scope.noData = false;
    // $scope.filterList = UtilsFactory.getHistoryFilterList();
    $scope.init = function () {
      // *********************** filter checking *****************************
      if (UtilsFactory.getHistoryFilterList().length != 0) {
        $scope.filterList = UtilsFactory.getHistoryFilterList();
      } else {
        $scope.filterList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      }
      // ***********************end  filter checking *****************************

    //   $scope.eventHistoryValueslist = UtilsFactory.getEventHistoryList();
    //   // console.log($scope.eventHistoryValueslist);
    //   $scope.eventHistoryValues = $scope.eventHistoryValueslist.values;
    //   if ($scope.eventHistoryValues.length == 0) {
    //     $scope.noData = true;

    //   } else {
    //     $scope.noData = false;
    //     // $scope.eventHistoryValues = UtilsFactory.setEventHistoryList();
    //     $scope.speed = $scope.eventHistoryValues.speed_limit;
    //   }

    }

    $scope.fetchTime = function (ts) {
       console.log(ts);
          console.log("moment "+moment(ts).format('HH:MM, DDMMM'));
              $scope.timestamp = moment(ts).format('HH:MM, DDMMM');
    }

      
   


    $scope.chexkAlarmType = function (alarm_type, velocity) {

      // console.log("gdgj" +$scope.speed);
      // if ( $scope.speed< velocity) {
      //   $scope.redSpeed = 1;
      // //  console.log("red style applying " + $scope.redSpeed);
      // }
      // else{
      //    $scope.redSpeed = 0;

      // }

      // console.log("geeta its me alarm type" + alarm_type);
      if (alarm_type == '0') {
        $scope.alarmType = "Panic";
        $scope.imageSrc = 'img/eventH/panic.png';
      } else if (alarm_type == '1') {
        $scope.alarmType = "Tamper Sim";
        $scope.imageSrc = 'img/eventH/sim-tamper.png';
      } else if (alarm_type == '2') {
        $scope.alarmType = "Tamper Top";
        $scope.imageSrc = 'img/eventH/tamper-top.png';
      } else if (alarm_type == '3') {
        $scope.alarmType = "Battery Low";
        $scope.imageSrc = 'img/eventH/battery.png';
      } else if (alarm_type == '4') {
        $scope.alarmType = "Overspeed";
        $scope.imageSrc = 'img/eventH/overspeed.png';
      } else if (alarm_type == '5') {
        $scope.alarmType = "Geofence";
        $scope.imageSrc = 'img/eventH/geofence.png';
      } else if (alarm_type == '6') {
        $scope.alarmType = "Sanity alarm";
        $scope.imageSrc = 'img/eventH/sanity.png';
      } else if (alarm_type == '7') {
        $scope.alarmType = "Connection to tracker interrupted";
        $scope.imageSrc = 'img/eventH/warning.png';
      } else if (alarm_type == '8') {
        $scope.alarmType = "Vehicle Moved / Theft ";
        $scope.imageSrc = 'img/eventH/theft.png';
      } else if (alarm_type == '9') {
        $scope.alarmType = "Tracker sim changed";
        $scope.imageSrc = 'img/eventH/sim-tamper.png';
      } else if (alarm_type == '10') {
        $scope.alarmType = "Warning";
        $scope.imageSrc = 'img/eventH/invalid.png';
      }
      // console.log(alarm_type + $scope.alarmType);
    }


    $scope.backToEventHistory = function () {
      $state.go(PageConfig.EVENT_HISTORY);
    }

    function getLatLong(lat, long) {
      var lat = parseFloat(lat);
      var lng = parseFloat(long);
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            // return results[1].formatted_address;
            // var alertPopup = $ionicPopup.alert({
            //   title: '',
            //   template: results[1].formatted_address,
            //   cssClass: 'ehdLatLonPopup'
            // });
            // alertPopup.then(function (res) {
            // });
          }
        }
      });
    }

    $scope.getLocation = function(lat, long){
      var lat = parseFloat(lat);
      var lng = parseFloat(long);
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            // return results[1].formatted_address;
            alert("location is: "+results[1].formatted_address);
          }
        }
      });
    }
  })