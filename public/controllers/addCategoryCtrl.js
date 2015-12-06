angular.module('ghapoon').
controller('addCategoryCtrl',['$scope','adminService','$rootScope','alertingService',
	function ($scope,adminService,$rootScope,alertingService) {
	$scope.addCategory =function () {
		console.log('we are in add category');
    function changeCase (input) {
      return input.slice(0,1).toUpperCase() + input.slice(1).toLowerCase();
    }
        /*if(!$rootScope.currentUser){
          $state.go('home.login');
          }*/

        var category={
            category : changeCase($scope.newCategory),
            group : changeCase($scope.newGroup)
        }
       adminService.addCategory(category,function (err,data) {
        if(err){
          alertingService.startAlert('error',err);
            console.log(err);
        }else{
          if(data=='success'){
            alertingService.startAlert('ok','adding group successfully')
            console.log(data);
            $scope.newCategory = '';
            $scope.newGroup = '';
            $scope.addCategoryForm.$setPristine();
          }else{
            console.log(data);
            alertingService.startAlert('error',data);
          }
            
        }
       })
	}
}])
//var city=new Option('Select City',0);
    //      CityList.options.add(city);
    /*
$scope.changeCityList= function  () {

        var ProvinceList=document.getElementById('province');
        var CityList=document.getElementById('city');

        var selProvince=ProvinceList.options[ProvinceList.selectedIndex].label;

        var selGroup=
        console.log('you have slelect '+selProvince);

        //remove all the items from list
        while(CityList.options.length){
            CityList.remove(0);
        }

        //var cities=provinceOptions[selProvince];
        var cities=[];

       for (var i = 0; i < $scope.proOptions.length; i++) {
            if($scope.proOptions[i].province==selProvince){
                cities.push($scope.proOptions[i].city);
            }
        };

        if(cities){
          var city=new Option('Select City',0);
           CityList.options.add(city);
            for (var i = 0; i < cities[0].length; i++) {
                city=new Option(cities[0][i],i);
                CityList.options.add(city); 
            };
        }

      }
    */