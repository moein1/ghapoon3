angular.module('ghapoon').
controller('selectProductCtrl',['$scope','$location','authService','$stateParams','productService',
  '$rootScope','alertingService','$state',
	function ($scope,$location,authService,$stateParams,productService,$rootScope,alertingService,$state) {
  if(!$rootScope.currentUser){
        alertingService.startAlert('ok','Please Login/Signup for select a product');
        $state.go('home.login');
    }
  $scope.productId=$stateParams.product;
  productService.selectProduct($scope.productId,function (err,data) {

  $scope.imgSrc = data.img1[0];
   
    $scope.images=[];
    $scope.description =data.product.description;
  for (var i = 0; i < data.img1.length; i++) {
    $scope.images.push({src:data.img1[i]});
  };
    $scope.product=data.product;
  })

 

  $scope.AddToBasket=function (product) {
    var newFavour={
      Product:$scope.product,
      userId:$rootScope.currentUser._id
      
    }
    productService.AddToBasket(newFavour,function (err,result) {
      if(result=="success"){
        alertingService.startAlert('ok','Add new product to your basket successfully');
        //we should add this product to basket of
      }
    });
  }

  $scope.sendMessage=function () {
    //we must split the message to shorrer parts
    messagelist =[];
    counts = Math.ceil($scope.BuyerMessasge.length / 25);
   
    for (var j = 0; j < counts; j++) {
      messagelist.push($scope.BuyerMessasge.slice(j*25,(j+1)*25));
    };

    var newMessage={
      BuyerEmail:$rootScope.currentUser.email,
      SellerEmail:$scope.product.email,
      message:$scope.BuyerMessasge,
      Sender:$rootScope.currentUser.name,
      ProductName:$scope.product.name,
      ProductImage:$scope.product.image[0],
      messageList : messagelist
    };
    //for saved image in database
    var newMessageNew={
      BuyerEmail:$rootScope.currentUser.email,
      SellerEmail:$scope.product.email,
      message:$scope.BuyerMessasge,
      Sender:$rootScope.currentUser.name,
      //ProductName:$scope.product.name,
      //ProductImage:$scope.product.image[0],
      productId:$scope.productId,
      messageList : messagelist
    }
    var showingMessage={
      BuyerEmail:$rootScope.currentUser.email,
      SellerEmail:$scope.product.email,
      messageList:messagelist,
      Sender:$rootScope.currentUser.name,
      ProductName:$scope.product.name,
      base64_array:$scope.imgSrc
    }
    productService.sendMessage(newMessageNew,function (err,result) {
      if(result == 'success'){
        alertingService.startAlert('ok','Send new message successfully');
        $scope.BuyerMessasge='';
        $scope.calling.$setPristine();
        $rootScope.outbox.push(showingMessage);
      }
    })
  }
	
}])