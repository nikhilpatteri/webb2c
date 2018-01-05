angular.module('managemember', [])
    .controller('ManageMemberCtrl', function ($scope, UtilsFactory, $timeout, BatsServices,
        Constants, PageConfig, $rootScope) {
        
        var tokenCheck = window.localStorage.token;
        $scope.data = {};

        $scope.init = function () {
            BatsServices.userList({'token':tokenCheck}).success(function (response) {
                console.log("response: "+angular.toJson(response));
                $scope.memberList = response;
            }).error(function (error) {
                if (error.err == 'Origin Server returned 504 Status') {
                    // ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }
                else {
                    // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                }//  ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            });
        }

        $rootScope.$on('addMemberDone', function (event) {
            $scope.init();
        })

        $scope.updateUser = function (member) {
            $scope.popover.hide();
            UtilsFactory.setEditMemberDetails(member);
            $state.go(PageConfig.ADD_MEMBER);
        }

        $scope.deleteMember = function (member) {

            swal({
                title: "Delete Member",
                text: "Are you sure you want to delete this member?",
                type: "warning",
                confirmButtonColor: "#9afb29",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if(isConfirm){
                    var inputParam = { 'token': tokenCheck,'uid': member };
                            BatsServices.deleteUser(inputParam).success(function (response) {
                                alert("user deleted"+ response);
                                // var alertPopup = $ionicPopup.alert({
                                //     title: 'Member Deleted',
                                //     template: '<div class="pwdSuccessPopup">Member has been successfully deleted</div>'
                                // });
                                // alertPopup.then(function (res) {
                                //     $state.go(PageConfig.MANAGE_MEMBER);
                                // });
                                // BatsServices.userList({}).success(function (response) {
                                //     $scope.memberList = response;
                                // }).error(function (error) {
                                //     if (error.err == 'Origin Server returned 504 Status') {
                                //         ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                                //     }
                                //     else {
                                //         ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                                //     }// ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                                // });
                            }).error(function () {
                                if (error.err == 'Origin Server returned 504 Status') {
                                    // ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                                }
                                else {
                                    // ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
                                }
                                console.log("error while deleting user");
                            })
                }
                // $scope.fetchDevicelist($scope.groupname);
                // $scope.searchDriver = "";
            });
            // $scope.popover.hide();

            // var confirmPopup = $ionicPopup.confirm({
            //     title: 'Cofirm',
            //     template: 'Are you sure you want to delete this member?',
            //     cancelText: 'No',
            //     scope: $scope,
            //     okText: 'Yes',
            // });
            // confirmPopup.then(function (res) {
            //     if (res) {
            //         var inputParam = { 'uid': member.uid };
            //         BatsServices.deleteUser(inputParam).success(function (response) {
            //             var alertPopup = $ionicPopup.alert({
            //                 title: 'Member Deleted',
            //                 template: '<div class="pwdSuccessPopup">Member has been successfully deleted</div>'
            //             });
            //             alertPopup.then(function (res) {
            //                 $state.go(PageConfig.MANAGE_MEMBER);
            //             });
            //             BatsServices.userList({}).success(function (response) {
            //                 $scope.memberList = response;
            //             }).error(function (error) {
            //                 if (error.err == 'Origin Server returned 504 Status') {
            //                     ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            //                 }
            //                 else {
            //                     ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            //                 }// ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            //             });
            //         }).error(function () {
            //             if (error.err == 'Origin Server returned 504 Status') {
            //                 ionicToast.show('Internet is very slow', Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            //             }
            //             else {
            //                 ionicToast.show(error.err, Constants.TOST_POSITION, false, Constants.TIME_INTERVAL);
            //             }
            //             console.log("error while deleting user");
            //         })
            //     }
            // });
        }

        $scope.addNewMember = function () {
            // $state.go(PageConfig.ADD_MEMBER);
        }

        // $ionicPopover.fromTemplateUrl('templates/popover/edit_member.html', {
        //     scope: $scope
        // }).then(function (popover) {
        //     $scope.popover = popover;
        // });

        $scope.openPopover = function ($event, member) {
            $scope.selectedMember = member;
            $scope.popover.show($event);
        };

    })