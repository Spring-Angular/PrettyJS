/**
 * Created by dellx on 2015/4/1.
 */
var coreController = angular.module('coreController', []);

coreController.controller('coreController', function ($timeout,$injector, $scope, $rootScope,ptGlobalDataService, ptForwardService) {
    $scope.$on('BUSY', function () {
        $scope.busy = true;
    });

    $scope.$on('UNBUSY', function () {
        $scope.busy = false;
    });

    $rootScope.operationItem = function (type) {
        hideModal();
        $scope.busy = true;
        if(ptGlobalDataService.flag===0){
            switch (type) {
                case 1:                              /*add item*/
                    $injector.get(ptGlobalDataService.service).save({},angular.toJson(ptGlobalDataService.tempData), function (resp) {
                        $scope.responseWay(resp,1);
                    });
                    break;
                case 2:                             /*delete item*/
                    $injector.get(ptGlobalDataService.service).delete({id: ptGlobalDataService.tempData.id}, angular.toJson(ptGlobalDataService.tempData), function (resp) {
                        $scope.responseWay(resp,2);
                    });
                    break;
                case 3:                             /*update item*/
                    $injector.get(ptGlobalDataService.service).update({id: ptGlobalDataService.tempData.id}, angular.toJson(ptGlobalDataService.tempData), function (resp) {
                        $scope.responseWay(resp,3);
                    });
                    break;
            }
        }else if(ptGlobalDataService.flag===1){
            switch (type) {
                case 1:                              /*add item*/
                    $injector.get(ptGlobalDataService.service).save({},angular.toJson(ptGlobalDataService.tempData), function (resp) {
                        $scope.responseWay(resp,1);
                    });
                    break;
                case 2:                             /*delete item*/
                    $injector.get(ptGlobalDataService.service).save({id: ptGlobalDataService.tempData.id}, angular.toJson(ptGlobalDataService.tempData), function (resp) {
                        $scope.responseWay(resp,2);
                    });
                    break;
                case 3:                             /*update item*/
                    $injector.get(ptGlobalDataService.service).save({id: ptGlobalDataService.tempData.id}, angular.toJson(ptGlobalDataService.tempData), function (resp) {
                        $scope.responseWay(resp,3);
                    });
                    break;
            }
        }

    };

    $scope.responseWay = function (resp,type) {
        $scope.busy = false;
        if (resp.status === true) {
            if(type!==2){
                message('Operation is successful!');
            }
            if(type===2){
                if(typeof($rootScope.$$childHead.$$childHead.$$childHead.dataList.content)==='undefined'){
                    $rootScope.$$childHead.$$childHead.$$childHead.dataList.splice(ptGlobalDataService.idx,1);
                }else{
                    $rootScope.$$childHead.$$childHead.$$childHead.dataList.content.splice(ptGlobalDataService.idx,1);
                    $rootScope.$$childHead.$$childHead.$$childHead.dataList.totalElements=$rootScope.$$childHead.$$childHead.$$childHead.dataList.totalElements-1;
                }

            }
            if (ptGlobalDataService.redirectUrl !== '' && typeof (ptGlobalDataService.redirectUrl)!='undefined') {
                var tempUrl = ptGlobalDataService.redirectUrl;
                var tempParams = ptGlobalDataService.redirectParams;
                ptGlobalDataService.redirectUrl = '';
                ptGlobalDataService.redirectParams = '';
                $timeout(function () {
                    ptForwardService.redirect(tempUrl, tempParams);
                },500);
            }
        } else {
            message(resp.error.rawMessage);
        }

    };



    function hideModal() {
        $("#layer").hide();
        $("#deleteConfirmModal").niftyModal('hide');
    }

    function message(msg) {
        $("#messageModal").find('h4').html(msg);
        $("#layer").show();
        $("#messageModal").niftyModal('show');
        $timeout(function () {
            $("#layer").hide();
            $("#messageModal").niftyModal('hide');
            $("#messageModal").find('h4').html('');
        }, 1000);
    }


});