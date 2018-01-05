angular.module('vehiclestatisticsdetail', [])
.controller('VehicleStatisticsDetailCtrl', function($scope,$rootScope, $timeout, PageConfig, 
    UtilsFactory, Constants, ChartFactory, BatsServices) {

    var tokenCheck = window.localStorage.token;

    var inputParam = {"token":tokenCheck};
    BatsServices.activeDeviceList(inputParam).success(function (response) {
        $scope.deviceList = response
         if (response.length==0) {
            console.log("inside if for no device");
            // ionicToast.show('Active devices are not available', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        }
        // else
        //     console.log("inside else for no device");
    }).error(function (error) {
        if (error.err == 'Origin Server returned 504 Status') {
            // ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        }else {
            // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        }// ionicToast.show(error, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
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

    $scope.gotoVehicleStatistics = function(){
        var inputParam = { 'token':tokenCheck, 'devid': $scope.data.selectedvehicle, 'sts': startTime, 'ets': endTime }
        // console.log(inputParam);
        BatsServices.vehicleStatistics(inputParam).success(function (response) {
            console.log(response);
            $scope.statisticsDetails = response;
            // UtilsFactory.setVehicleStatitics(response);
            // UtilsFactory.setDateVehicleStatistics(inputParam);
            // $state.go(PageConfig.VEHICLE_STATISTICS_DETAIL);
        }).error(function (error) {
            // console.log(error);
            if (error.err == 'Origin Server returned 504 Status') {
                // ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            }
            else {
                // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            } //ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
        })
    };

    
    // if(UtilsFactory.getVehicleStatitics().length==0){
    //     // $state.go(PageConfig.VEHICLE_STATISTICS)
    // }
    // $scope.vehicleStatistics = UtilsFactory.getVehicleStatitics();
    // $scope.startEndDate= UtilsFactory.getDateVehicleStatistics();
  //  console.log($scope.startEndDate+"hi im device "+ $scope.vehicleStatistics.devtype);
    // $scope.startdate=$scope.startEndDate.sts;
  //  console.log($scope.startdate);
    //  $scope.enddate=$scope.startEndDate.ets;
    // console.log($scope.enddate);
    // ChartFactory.solidGaugeChart.data("widgetId1", "#00ba88", parseInt($scope.vehicleStatistics.min_speed), 0, 200, "Min");
    // ChartFactory.solidGaugeChart.data("widgetId2", "#f65e77", parseInt($scope.vehicleStatistics.max_speed), 0, 200, "Max");
    // ChartFactory.solidGaugeChart.data("widgetId3", "#fbbf16", parseInt($scope.vehicleStatistics.avg_speed), 0, 200, "Avg");

    $scope.backToVehicleStatistics=function(){
        // $state.go(PageConfig.VEHICLE_STATISTICS);
    }
})