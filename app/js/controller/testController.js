/**
 * Created by Clarence on 2015/4/27.
 */

var testController = angular.module('testController',[])

testController.controller('insertController',function($scope){
    $scope.insertData = {
        'id':'1',
        'name': 'insert'
    }
    $scope.insertRedirect={
        'url':'#',
        'param':'1'
    }
})

testController.controller('deleteController',function($scope){
    $scope.dataList = [
        {
            'id':'1',
            'name':'delete1',
            'msg': 'MSG',
            'deleteRedirect':{
                'url':'#',
                'param':'1'
            }
        },
        {
            'id':'2',
            'name':'delete2',
            'msg': 'MSG2',
            'deleteRedirect':{
                'url':'#',
                'param':'1'
            }
        }
    ]
})