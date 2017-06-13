 var app = angular.module('rajneethi');

 app.controller('clientProfileCtrl', function ($scope) {
		$scope.booths=[];
		 $scope.projectId1 = window.localStorage.getItem("USERid"); 
		 var reqObj = {
				 PRCID: "GETPROJECTCONSTITUTEIDBYUSERID",
				 paramArray: [$scope.projectId1]
		 };

		 executeApi(reqObj, function (data) {
				 $scope.projectId = data[0].projectId;
				 window.localStorage.setItem("projectId", data[0].projectId);
				 window.localStorage.setItem("constituencyId", data[0].constituencyId);
				 $scope.$apply();
				 //if (data[0].role == "Admin") {
						// window.localStorage.setItem("ROLE", "Admin");
						// $location.path('/user/1');
						// $scope.$apply();
				 //} 

				 // getConstituencyMap(55, function (data) {
				 getConstituencyMap($scope.projectId, function (data) {
					 if (data && data.length) {
						var map_data = [];
						var latlong = [];
						for (var i = 0; i < data.length; i++) {
							latlong[i] = data[i].local_booth_panchayat_name;
							$scope.booths.push(data[i].booth_panchayat_name);
							// try {
								if (latlong[i].charAt(0) == '@') {
									var latlong_new = latlong[i].split('@')[1].split(',');
								}
								map_data[i] = {
									latitude: Number(latlong_new[0]),
									longitude: Number(latlong_new[1]),
									booth_name: data[i].booth_panchayat_name,
									caste_percentage: data[i].caste_equation_percentage
								}
						}
						console.log('map_data')
						console.log(map_data)
						initialize(map_data);
					 } else {
						initialize();
					 }
				 })
				 
		 });

		 $scope.projectType = [
						 "Primary Education",
						 "Higher Education",
						 "Sports and Youth Services",
						 "Health", "Development of Women and Child",
						 "Social welfare / Backward Class / Minorities",
						 "Animal Husbandry",
						 "Horticulture",
						 "Home",
						 "Infrastructure developments",
						 "Facilities in notified Slum Areas",
						 "Providing RO water in villages",
						 "Tourism",
						 "Construction of Samudaya Bhavan",
						 "Construction of Public Library Building and providing mobile"
				 ];


		 angular.element(document).ready(function () {
				 new WOW().init();
		 });

					//   Primary Education: [
					//        Construction of class rooms,
					//        Construction of compound walls,
					//        Development of play grounds,
					//        Construction of full pledged libraries with all necessary equipments,
					//        Construction of laboratories,
					//        Construction of open air theatres,
					//        Construction of cycle stands,
					//        Construction of teachers’ quarters near school,
					//        Providing drinking water facilities like RO,
					//        Providing computers, printers etc,
					//        Providing sports and teaching materials,

					// ],

		function initialize(map_data) {
			var map;
			var bounds = new google.maps.LatLngBounds();
			var mapOptions = {
				mapTypeId: 'roadmap'
			};
							
			// Display a map on the page
			map = new google.maps.Map(document.getElementById("default"), mapOptions);
			map.setTilt(45);
				
			// Display multiple markers on a map
			var infoWindow = new google.maps.InfoWindow(), marker, i;
			
			// Loop through our array of markers & place each one on the map  
			for( i = 0; i < map_data.length; i++ ) {

				var booth_name = map_data[i]['booth_name']
				var caste_percentage = map_data[i]['caste_percentage']
				var lat = map_data[i]['latitude']
				var long = map_data[i]['longitude']

				map_data[i].content = "<h5>" + booth_name + '</h5><br>' + caste_percentage

				var position = new google.maps.LatLng(lat, long);
				bounds.extend(position);
				marker = new google.maps.Marker({
					position: position,
					map: map,
					title: booth_name
				});
				
				// Allow each marker to have an info window    
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infoWindow.setContent(map_data[i].content);
						infoWindow.open(map, marker);
					}
				})(marker, i));

				// Automatically center the map fitting all markers on the screen
				map.fitBounds(bounds);
			}

			// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
			var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
				this.setZoom(5);
				google.maps.event.removeListener(boundsListener);
			});
		}
 });
