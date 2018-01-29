var result;
/*$(document).ready(function(){
	$("#search").click(function(){
		
		}
	});
});*/
var app = angular.module('myForm', ['ngSanitize', 'ngAnimate', 'ngRoute']);

app.controller('formCtrl', function($scope, $http, $parse) {
	//localStorage.clear();
	//get location
	var lo="";
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			lo=position.coords.latitude+","+position.coords.longitude;
			
			});
	} else {}
	sUrl = "http://hw80608-env.us-west-2.elasticbeanstalk.com?";
	//fav
	var i = 0,
    oJson = {},
    sKey;
	for (; sKey = window.localStorage.key(i); i++) {
		var temp = window.localStorage.getItem(sKey);
		temp = angular.fromJson(temp);
		oJson[sKey] = temp;
	}
	$scope.data6 = oJson;
	$scope.templateUrl6="ct6.html";
	
	window.fbAsyncInit = function() {
		FB.init({
		  appId      : '197420594075103',
		  xfbml      : true,
		  version    : 'v2.8'
		});
		FB.AppEvents.logPageView();
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "http://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	$scope.searchfb = function() {
		if($scope.search == ""){
			$('#kw').tooltip("show");
		} else {	
			var temp = window.location.href.match(/\S*detail\b/gi);
			if(temp != null){
				window.history.back();
			}
		
			//console.log(sUrl+$('#kw').val()+"&type=user");
			$('#kw').tooltip("hide");
			
			//progressbar
			var type=$('.nav-pills .active').text();
			if(type=="Users") {
				//console.log("user");
				$scope.templateUrl1="progress.html";
			}
			else if(type=="Pages") {
				//console.log("page");
				$scope.templateUrl2="progress.html";
			}
			else if(type=="Events") {
				//console.log("event");
				$scope.templateUrl3="progress.html";
			}
			else if(type=="Places") {
				//console.log("place");
				$scope.templateUrl4="progress.html";
			}
			else if(type=="Groups") {
				//console.log("aa");
				$scope.templateUrl5="progress.html";
			}
			else if(type=="Favorites") {
				//console.log("fav");
				$scope.templateUrl6="progress.html";
			}
			//get user
			$http({
				method:'GET',
				url:sUrl+"search="+$('#kw').val()+"&type=user"
			}).then(function successCallback(response){
				if(response.data['data'].length== 0) {
					$scope.templateUrl1 = "nodata.html";
				}else{
					if(response.data['paging']==null){
						$scope.next=false;
						$scope.previous=false;
					}else{
						var next=response.data['paging']['next'];
						var previous=response.data['paging']['previous'];
						$scope.next=false;
						$scope.previous=false;
						if(next!=null){
							$scope.next=true;
							$scope.nextUrl1=next;
						}
						if(previous!=null){
							$scope.previous=true;
							$scope.preUrl1=previous;
							//console.log($scope.preUrl1);
						}
					}
					
					var data = response.data['data'];
					$scope.data=data;
					//console.log(data);
					$scope.templateUrl1 = "ct1.html";
					$scope.templateUrl6="ct6.html";
				}
			}, function errorCallback(response){
				
			});
			//page
			$http({
				method:'GET',
				url:sUrl+"search="+$('#kw').val()+"&type=page"
			}).then(function successCallback(response){
				if(response.data['data'].length== 0) {
					$scope.templateUrl2 = "nodata.html";
				}else{
					if(response.data['paging']==null){
						$scope.next2=false;
						$scope.previous2=false;
					}else{
						var next=response.data['paging']['next'];
						var previous=response.data['paging']['previous'];
						$scope.next2=false;
						$scope.previous2=false;
						if(next!=null){
							$scope.next2=true;
							$scope.nextUrl2=next;
						}
						if(previous!=null){
							$scope.previous2=true;
							$scope.preUrl2=previous;
						}
					}
					var data2 = response.data['data'];
					$scope.data2=data2;
					$scope.templateUrl2 = "ct2.html";
				}
			}, function errorCallback(response){
				
			});
			//event
			$http({
				method:'GET',
				url:sUrl+"search="+$('#kw').val()+"&type=event"
			}).then(function successCallback(response){
				if(response.data['data'].length== 0) {
					$scope.templateUrl3 = "nodata.html";
				}else{
					if(response.data['paging']==null){
						$scope.next3=false;
						$scope.previous3=false;
					}else{
						var next=response.data['paging']['next'];
						var previous=response.data['paging']['previous'];
						$scope.next3=false;
						$scope.previous3=false;
						if(next!=null){
							$scope.next3=true;
							$scope.nextUrl3=next;
						}
						if(previous!=null){
							$scope.previous3=true;
							$scope.preUrl3=previous;
						}
					}
					var data3 = response.data['data'];
					$scope.data3=data3;
					$scope.templateUrl3 = "ct3.html";
				}
			}, function errorCallback(response){
				
			});
			//place
			
			$http({
				method:'GET',
				url:sUrl+"search="+$('#kw').val()+"&type=place"+"&location="+lo
			}).then(function successCallback(response){
				if(response.data['data'].length== 0) {
					console.log("dsfa");
					$scope.templateUrl4 = "nodata.html";
				}else{
					if(response.data['paging']==null){
						$scope.next4=false;
						$scope.previous4=false;
					}else{
						var next=response.data['paging']['next'];
						var previous=response.data['paging']['previous'];
						$scope.next4=false;
						$scope.previous4=false;
						if(next!=null){
							$scope.next4=true;
							$scope.nextUrl4=next;
						}
						if(previous!=null){
							$scope.previous4=true;
							$scope.preUrl4=previous;
						}
					}
					
					var data4 = response.data['data'];
					$scope.data4=data4;
					$scope.templateUrl4 = "ct4.html";
				}
			}, function errorCallback(response){
				
			});
			//group
			$http({
				method:'GET',
				url:sUrl+"search="+$('#kw').val()+"&type=group"
			}).then(function successCallback(response){
				if(response.data['data'].length== 0) {
					$scope.templateUrl5 = "nodata.html";
				}else{
					if(response.data['paging']==null){
						$scope.next5=false;
						$scope.previous5=false;
					}else{
						var next=response.data['paging']['next'];
						var previous=response.data['paging']['previous'];
						$scope.next5=false;
						$scope.previous5=false;
						if(next!=null){
							$scope.next5=true;
							$scope.nextUrl5=next;
						}
						if(previous!=null){
							$scope.previous5=true;
							$scope.preUrl5=previous;
						}
					}
					
					var data5 = response.data['data'];
					$scope.data5=data5;
					$scope.templateUrl5 = "ct5.html";
				}
			}, function errorCallback(response){
				
			});
		}
	};
	//$scope.submit();
    $scope.reset = function() {
		$scope.search = "";
		$scope.templateUrl1="";
		$scope.templateUrl2="";
		$scope.templateUrl3="";
		$scope.templateUrl4="";
		$scope.templateUrl5="";
		//$scope.templatUrl6="";
    };
    $scope.reset();
	
	$scope.checkf=function(x){
		if(localStorage.getItem(x.id)!=null){
			//console.log("aa");
			x.toggled=true;
		}
	};
	$scope.postfb=function(a){
		FB.ui({
			 app_id: 197420594075103,
			 method: 'feed',
			 link: window.location.href,
			 picture: a.picture.data.url,
			 name: a.name,
			 caption: "FB SEARCH FROM USC CSCI571",
			 }, function(response){
			 if (response && !response.error_message)
				alert("Posted Successfully");
			 else
				alert("Not Posted");
			});
		
		
	};
	$scope.changeClass=function(x,type){
		//console.log(x);
		x.toggled=!x.toggled;
		
		// Check browser support
		if (typeof(Storage) !== "undefined") {
			if(x.toggled==true){//local storage
				x.type=type;
				var str = JSON.stringify(x);
				//console.log(str);
				// Store
				localStorage.setItem(x.id, str);
				str=angular.fromJson(str);
				//console.log(str);
				$scope.data6[x.id]=str;
			}else{//remove
				localStorage.removeItem(x.id);
				delete $scope.data6[x.id];	
			}
			
		} else {
			
		}
	};
	
	$scope.getImg=function(y){
		//console.log($("#i1528028767221570").attr('class'));
		$http({
				method:'GET',
				url:sUrl+"picture="+y.id
			}).then(function successCallback(response){
				var data = response.data;
				y.iurl=data['data']['url'];
			}, function errorCallback(response){
				
			});
	};
	$scope.formatTime=function(x){
		x.created_time=moment(x.created_time).format("YYYY-MM-DD HH:mm:ss");
	};
	$scope.detail=function(x,id,pro,name,type){
		$scope.d = x;
		$scope.d.type=type;
		console.log(type);
		console.log($scope.d.type);
		$scope.detailUrl="detail.html";
		$scope.albumUrl="progress.html";
		$scope.postUrl="progress.html";
		$http({
				method:'GET',
				url:sUrl+"id="+id
			}).then(function successCallback(response){
				$scope.pro=pro;
				$scope.name=name;
				//console.log($scope.pro);
				var data = response.data;
				//console.log(data);
				$scope.detailUrl="detail.html";
				//albums
				if(data['albums']==null){
					//console.log("aa");
					$scope.albumUrl="nodata.html";
				}else{
					$scope.albums=data['albums']['data'];
					//var albums=data['albums']['data'];
					$scope.albumUrl="albums.html";
				}
				//posts
				if(data['posts']==null){
					$scope.postUrl="nodata.html";
				}else {
					$scope.posts=data['posts']['data'];
					//console.log($scope.posts);
					//var posts = data['posts']['data'];
					$scope.postUrl="posts.html";
				}
				
				//if()
			}, function errorCallback(response){
				
			});
	};
	$scope.deletef=function(y){
		//console.log(name);
		var id = y.id;
		y.toggled = false;
		var index = -1;		
		var keys = Object.keys($scope.data6);
		//console.log(arr);
		for( var i = 0; i < keys.length; i++ ) {
			if( $scope.data6[keys[i]].id === id ) {
				//console.log($scope.data6[keys[i]].name);
				index = keys[i];
				break;
			}
		}
		if( index === -1 ) {
			alert( "Wrong" );
		}
		delete $scope.data6[index];	
		//console.log($scope.data6);
		localStorage.removeItem(id);
		if(y.type=="users"){
			index = -1;		
			keys = Object.keys($scope.data);
			//console.log(arr);
			for( var i = 0; i < keys.length; i++ ) {
				if( $scope.data[keys[i]].id === id ) {
					index = keys[i];
					break;
				}
			}
			$scope.data[index].toggled=false;
		}else if(y.type=="pages"){
			index = -1;		
			keys = Object.keys($scope.data2);
			//console.log(arr);
			for( var i = 0; i < keys.length; i++ ) {
				if( $scope.data2[keys[i]].id === id ) {
					index = keys[i];
					break;
				}
			}
			$scope.data2[index].toggled=false;
		}else if(y.type=="events"){
			index = -1;		
			keys = Object.keys($scope.data3);
			//console.log(arr);
			for( var i = 0; i < keys.length; i++ ) {
				if( $scope.data3[keys[i]].id === id ) {
					//console.log($scope.data6[keys[i]].name);
					index = keys[i];
					break;
				}
			}
			$scope.data3[index].toggled=false;
		}else if(y.type=="places"){
			index = -1;		
			keys = Object.keys($scope.data4);
			//console.log(arr);
			for( var i = 0; i < keys.length; i++ ) {
				if( $scope.data4[keys[i]].id === id ) {
					//console.log($scope.data6[keys[i]].name);
					index = keys[i];
					break;
				}
			}
			$scope.data4[index].toggled=false;
		}else if(y.type=="groups"){
			index = -1;		
			keys = Object.keys($scope.data5);
			//console.log(arr);
			for( var i = 0; i < keys.length; i++ ) {
				if( $scope.data5[keys[i]].id === id ) {
					//console.log($scope.data6[keys[i]].name);
					index = keys[i];
					break;
				}
			}
			$scope.data5[index].toggled=false;
		}
	};
	//user
	$scope.nex=function() {
		$http({
				method:'GET',
				url:$scope.nextUrl1
			}).then(function successCallback(response){
				if(response.data['paging']==null){
						$scope.next=false;
						$scope.previous=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next=false;
					$scope.previous=false;
					if(next!=null){
						$scope.next=true;
						$scope.nextUrl1=next;
					}
					if(previous!=null){
						$scope.previous=true;
						$scope.preUrl1=previous;
					}
				}
				
				var data = response.data['data'];
				$scope.data=data;
			}, function errorCallback(response){
				
			});
	};
	$scope.pre=function() {
		$http({
				method:'GET',
				url:$scope.preUrl1
			}).then(function successCallback(response){
				if(response.data['paging']==null){
						$scope.next=false;
						$scope.previous=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next=false;
					$scope.previous=false;
					if(next!=null){
						$scope.next=true;
						$scope.nextUrl1=next;
					}
					if(previous!=null){
						$scope.previous=true;
						$scope.preUrl1=previous;
					}
				}
					
				var data = response.data['data'];
				$scope.data=data;
			}, function errorCallback(response){
				
			});
	};
	//page
	$scope.nex2=function() {
		$http({
				method:'GET',
				url:$scope.nextUrl2
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next2=false;
					$scope.previous2=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next=false;
					$scope.previous=false;
					if(next!=null){
						$scope.next2=true;
						$scope.nextUrl2=next;
					}
					if(previous!=null){
						$scope.previous2=true;
						$scope.preUrl2=previous;
					}
				}
				var data2 = response.data['data'];
				$scope.data2=data2;
			}, function errorCallback(response){
				
			});
	};
	$scope.pre2=function() {
		$http({
				method:'GET',
				url:$scope.preUrl2
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next2=false;
					$scope.previous2=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next2=false;
					$scope.previous2=false;
					if(next!=null){
						$scope.next2=true;
						$scope.nextUrl2=next;
					}
					if(previous!=null){
						$scope.previous2=true;
						$scope.preUrl2=previous;
					}
				}
				
				var data2 = response.data['data'];
				$scope.data2=data2;
			}, function errorCallback(response){
				
			});
	};
	//event
	$scope.nex3=function() {
		$http({
				method:'GET',
				url:$scope.nextUrl3
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next3=false;
					$scope.previous3=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next3=false;
					$scope.previous3=false;
					if(next!=null){
						$scope.next3=true;
						$scope.nextUrl3=next;
					}
					if(previous!=null){
						$scope.previous3=true;
						$scope.preUrl3=previous;
					}
				}
				var data3 = response.data['data'];
				$scope.data3=data3;
			}, function errorCallback(response){
				
			});
	};
	$scope.pre3=function() {
		$http({
				method:'GET',
				url:$scope.preUrl3
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next3=false;
					$scope.previous3=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next3=false;
					$scope.previous3=false;
					if(next!=null){
						$scope.next3=true;
						$scope.nextUrl3=next;
					}
					if(previous!=null){
						$scope.previous3=true;
						$scope.preUrl3=previous;
					}
				}
				
				var data3 = response.data['data'];
				$scope.data3=data3;
			}, function errorCallback(response){
				
			});
	};
	//place
	$scope.nex4=function() {
		$http({
				method:'GET',
				url:$scope.nextUrl4
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next4=false;
					$scope.previous4=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next4=false;
					$scope.previous4=false;
					if(next!=null){
						$scope.next4=true;
						$scope.nextUrl4=next;
					}
					if(previous!=null){
						$scope.previous4=true;
						$scope.preUrl4=previous;
					}
				}
				var data4 = response.data['data'];
				$scope.data4=data4;
			}, function errorCallback(response){
				
			});
	};
	$scope.pre4=function() {
		$http({
				method:'GET',
				url:$scope.preUrl4
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next4=false;
					$scope.previous4=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next4=false;
					$scope.previous4=false;
					if(next!=null){
						$scope.next4=true;
						$scope.nextUrl4=next;
					}
					if(previous!=null){
						$scope.previous4=true;
						$scope.preUrl4=previous;
					}
				}
				var data4 = response.data['data'];
				$scope.data4=data4;
			}, function errorCallback(response){
				
			});
	};
	//group
	$scope.nex5=function() {
		$http({
				method:'GET',
				url:$scope.nextUrl5
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next5=false;
					$scope.previous5=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next5=false;
					$scope.previous5=false;
					if(next!=null){
						$scope.next5=true;
						$scope.nextUrl5=next;
					}
					if(previous!=null){
						$scope.previous5=true;
						$scope.preUrl5=previous;
					}
				}
				var data5 = response.data['data'];
				console.log(response.data);
				console.log($scope.next5);
				console.log($scope.previous5);
				$scope.data5=data5;
			}, function errorCallback(response){
				
			});
	};
	$scope.pre5=function() {
		$http({
				method:'GET',
				url:$scope.preUrl5
			}).then(function successCallback(response){
				if(response.data['paging']==null){
					$scope.next5=false;
					$scope.previous5=false;
				}else{
					var next=response.data['paging']['next'];
					var previous=response.data['paging']['previous'];
					$scope.next5=false;
					$scope.previous5=false;
					if(next!=null){
						$scope.next5=true;
						$scope.nextUrl5=next;
					}
					if(previous!=null){
						$scope.previous5=true;
						$scope.preUrl5=previous;
					}
				}
				var data5 = response.data['data'];
				$scope.data5=data5;
			}, function errorCallback(response){
				
			});
	};
});

//route
app.config(function($routeProvider) {
	$routeProvider
	.when("/pages", {
		template:'<article ng-include="templateUrl2"></article>'
	})
	.when("/", {
		template:'<article ng-include="templateUrl1"></article>'
	})
	.when("/users", {
		template:'<article ng-include="templateUrl1"></article>'
	})
	.when("/events", {
		template:'<article ng-include="templateUrl3"></article>'
	})
	.when("/places", {
		template:'<article ng-include="templateUrl4"></article>'
	})
	.when("/groups", {
		template:'<article ng-include="templateUrl5"></article>'
	})
	.when("/detail", {
		template:'<article ng-include="detailUrl"></article>'
	})
	.when("/favorites", {
		template:'<article ng-include="templateUrl6"></article>'
	})
});

