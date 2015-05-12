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

coreDirective.directive('ptDelete', function (ptGlobalDataService) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'idx': '=',
            'msg': '=',
            'service': '@',
            'redirect': '=',
            'flag': '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                ptGlobalDataService.tempData = scope.data;
                ptGlobalDataService.idx = scope.idx;
                ptGlobalDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    ptGlobalDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    ptGlobalDataService.redirectParams = scope.redirect.params;
                }
                if (scope.flag === null || scope.flag === '' || scope.flag === '0' || typeof (scope.flag) === 'undefined' || scope.flag === 'undefined') {
                    ptGlobalDataService.flag = 0;
                } else {
                    ptGlobalDataService.flag = 1;
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


coreDirective.directive('ptInsert', function (ptGlobalDataService, $rootScope) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'service': '@',
            'redirect': '=',
            'flag': '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                ptGlobalDataService.tempData = scope.data;
                ptGlobalDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    ptGlobalDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    ptGlobalDataService.redirectParams = scope.redirect.params;
                }
                if (scope.flag === null || scope.flag === '' || scope.flag === '0' || typeof (scope.flag) === 'undefined' || scope.flag === 'undefined') {
                    ptGlobalDataService.flag = 0;
                } else {
                    ptGlobalDataService.flag = 1;
                }
                $rootScope.operationItem(1);
            });
        }
    }
});

coreDirective.directive('ptUpdate', function (ptGlobalDataService, $rootScope) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'service': '@',
            'redirect': '=',
            'flag': '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                ptGlobalDataService.tempData = scope.data;
                ptGlobalDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    ptGlobalDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    ptGlobalDataService.redirectParams = scope.redirect.params;
                }
                if (scope.flag === null || scope.flag === '' || scope.flag === '0' || typeof (scope.flag) === 'undefined' || scope.flag === 'undefined') {
                    ptGlobalDataService.flag = 0;
                } else {
                    ptGlobalDataService.flag = 1;
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
 *  input Reg Exp or intput validate type(which in coreService->ptValidateService), check match Reg Exp or not (for form)
 *
 * example:
 *<form name="form">
 *<input name="num" ng-model="num" pt-validate valid-r-e="[0-9]" valid-err-msg="Error"/>
 *<div ng-show="form.num.$error.ptValidate">error</div>
 </form>
 * */

coreDirective.directive('ptValidate', function (ptValidateService) {
    return {
        restrict: 'EAC',
        require: 'ngModel',
        scope: {
            validRE: '@',
            validErrMsg: '@',
            validType: '@',
            required:'@'
        },
        link: function (scope, elm, attrs, ctrl) {

            var validGroup = [];
            if ((scope.validRE !== undefined) && (scope.validErrMsg !== undefined)) {
                validGroup.push({'reg': new RegExp(scope.validRE), 'errMsg': scope.validErrMsg});
            }
            if ((scope.validType !== undefined)) {
                var typeArray = scope.validType.split(' ');
                for (var num in typeArray) {
                    validGroup.push(ptValidateService.choice(typeArray[num]));
                }
            }
            ctrl.$validators.ptValidate = function (modelValue, viewValue) {
                elm.parent().find('.inputError').remove();
                if (ctrl.$isEmpty(modelValue)) {
                    elm.parent().find('.inputError').remove();
                    return true;
                }
                else {
                    for (var num in validGroup) {
                        console.log(validGroup[num].reg);
                        if (!(validGroup[num].reg.test(viewValue))) {
                            elm.after('<span class="inputError"> <span class="badge badge-danger" style="margin-top: 5px;"><i class="fa fa-times"></i></span>'+scope.validErrMsg+'</span>');
                            return false;
                        }
                    }
                    elm.parent().find('.inputError').remove();
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