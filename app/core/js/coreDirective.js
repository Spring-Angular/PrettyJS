/**
 * Created by dellx on 2015/3/3.
 */
var coreDirective = angular.module('coreDirective', []);

/*
 Tooltips component
 * */
coreDirective.directive('ptToolTips', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            angular.element($('.ttip, [data-toggle="tooltip"]').tooltip());
        }
    }
});

/*
 MessageModal component
 * */
coreDirective.directive('ptMessageModal', function () {
    return {
        restrict: 'EAC',
        templateUrl: '../core/pages/messageModal.html'
    }
});

coreDirective.directive('ptShowMessageModal', function () {
    return {
        restrict: 'EAC',
        scope: {
            'title': '@',
            'msg': '@'
        },
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#messageModal").find('h3').html(scope.title));
                angular.element($("#messageModal").find('h4').html(scope.msg));
                angular.element($("#layer").show());
                angular.element($("#messageModal").niftyModal('show'));
            });
        }
    }
});

coreDirective.directive('ptHideMessageModal', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#layer").hide());
                angular.element($("#messageModal").niftyModal('hide'));
            });
        }
    }
});

/*
 delete confirm modal
 * */
coreDirective.directive('ptDeleteConfirmModal', function () {
    return {
        strict: 'EAC',
        templateUrl: '../core/pages/deleteConfirmModal.html'
    }
});

coreDirective.directive('ptDelete', function (shareDataService) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'idx': '=',
            'msg': '=',
            'service': '@',
            'url': '@',
            'params': '@',
            'flag':'@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                shareDataService.tempData = scope.data;
                shareDataService.idx = scope.idx;
                shareDataService.service = scope.service;
                shareDataService.redirectUrl = scope.url;
                shareDataService.redirectParams = scope.params;
                if(scope.flag===null || scope.flag==='' || scope.flag==='0' || typeof (scope.flag)==='undefined' || scope.flag==='undefined'){
                    shareDataService.flag=0;
                }else{
                    shareDataService.flag=1;
                }
                angular.element($("#deleteConfirmModal").find('h4').html('Ensure to delete ' + scope.msg + '?'));
                angular.element($("#layer").show());
                angular.element($("#deleteConfirmModal").niftyModal('show'));
            });
        }
    }
});

coreDirective.directive('ptHideDeleteConfirmModal', function () {
    return {
        strict: 'EAC',
        template: '',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#layer").hide());
                angular.element($("#deleteConfirmModal").niftyModal('hide'));
            });
        }
    }
});


coreDirective.directive('ptInsert', function (shareDataService, $rootScope) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'service': '@',
            'redirect': '=',
            'flag':'@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                console.log('OK');
                console.log(scope.redirect);
                shareDataService.tempData = scope.data;
                shareDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectParams = scope.redirect.params;
                }
                if(scope.flag===null || scope.flag==='' || scope.flag==='0' || typeof (scope.flag)==='undefined' || scope.flag==='undefined'){
                    shareDataService.flag=0;
                }else{
                    shareDataService.flag=1;
                }
                $rootScope.operationItem(1);
            });
        }
    }
});

coreDirective.directive('ptUpdate', function (shareDataService, $rootScope) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'service': '@',
            'redirect': '=',
            'flag':'@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                shareDataService.tempData = scope.data;
                shareDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectParams = scope.redirect.params;
                }
                if(scope.flag===null || scope.flag==='' || scope.flag==='0' || typeof (scope.flag)==='undefined' || scope.flag==='undefined'){
                    shareDataService.flag=0;
                }else{
                    shareDataService.flag=1;
                }
                $rootScope.operationItem(3);
            });
        }
    }
});

/*
 * Multiple Select
 * */
coreDirective.directive("ptMultipleSelect", function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs, ctrl) {
            angular.element($('.associateSelect').multiselect({
                buttonWidth: '100%',
                buttonClass: 'btn btn-default btn-sm',
                buttonText: function (options) {
                    if (options.length === 0) {
                        return 'None selected <b class="caret"></b>';
                    }
                    else {
                        var selected = '';
                        options.each(function () {
                            selected += $(this).text() + ', ';
                        });
                        return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
                    }

                }
            }));
        }
    }
});

coreDirective.directive("ptRefreshMultipleSelect", function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                angular.element($('.associateSelect').multiselect('refresh'));
            });
        }
    }
});

/*
 * Form Validate
 * */

/*
 *  input Reg Exp or intput validate type(which in commonService->validateService), check match Reg Exp or not (for form)
 *
 * example:
 * <input name ="num" ng-model="numa" common-validate  valid-r-e="[0-9]"/>
 * <form name="form">
 *   <div ng-hide="form.num.$error.commonValidate">error</div>
 * </form>
 * */

coreDirective.directive('ptValidate', function (validateService) {
    return {
        restrict: 'EAC',
        require: 'ngModel',
        scope: {
            validRE: '@',
            validErrMsg: '@',
            validType: '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            var validGroup = [];
            if ((scope.validRE !== undefined) && (scope.validErrMsg !== undefined)) {
                validGroup.push({'reg': new RegExp(scope.validRE), 'errMsg': scope.validErrMsg});
            }
            if ((scope.validType !== undefined)) {
                var typeArray = scope.validType.split(' ');
                for (var num in typeArray) {
                    validGroup.push(validateService.choice(typeArray[num]));
                }
            }
            ctrl.$validators.commonValidate = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                else {
                    for (var num in validGroup) {
                        console.log(validGroup[num].reg);
                        if (!(validGroup[num].reg.test(viewValue))) {
                            return false;
                        }
                    }
                    return true;
                }
            };
        }
    };
});

/*
 * Multiple Block Select
 * */

coreDirective.directive('ptMultipleBlockSelect', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.select2({width: '100%', closeOnSelect: false});
        }
    }
});

coreDirective.directive('ptTest', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                alert();
            });

        }
    }
});