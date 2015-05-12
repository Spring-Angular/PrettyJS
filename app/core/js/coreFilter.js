/**
 * Created by dellx on 2015/4/9.
 */
var coreFilter = angular.module("coreFilter", []);

coreFilter.filter('ptTimeFilter', function () {
    return function(input) {
        return new Date(input);
    };
});

coreFilter.filter('ptRemoveSemicolonFilter', function () {
    return function(input) {
        var temp=input;
        var count=0;
        for(var i=0;i<temp.length;i++){
            if(temp[i]!==';'){
                temp=temp.substring(i);
                count=i;
                break;
            }
        }
        for(var j=0;j<temp.length;j++){
            if(temp[j]===';'){
                temp=temp.substring(0,j);
                break;
            }
        }
        return temp;
    };
});


coreFilter.filter('ptTimeFormatFilter',function(){
    return function(input){
        var temp = '';
        temp = input.getFullYear() +'-'+ (input.getMonth()+1) + '-' + input.getDay() + ' '+ input.getHours()+ ':' + input.getMinutes() + ':' +input.getSeconds();

        return temp;
    };
});
