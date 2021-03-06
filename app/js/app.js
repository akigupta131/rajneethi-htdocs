'use strict';

var rajneethiApp = angular.module('rajneethiApp', ['ui.router', 'ngCookies', 'ngMaterial', 'angucomplete-alt', 'nvd3']);

rajneethiApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
	
	$urlRouterProvider.when('/login/','/login');
	$urlRouterProvider.otherwise('/home');
	$locationProvider.html5Mode(true);

	$stateProvider


// ********************ACL Dashboard***************************
//Home
	.state('home', {
		url: '/',
		templateUrl: '/views/home/index.html',
		controller: 'HomeCtrl'
	})
//Login Page
	.state('login', {
		url: '/login',
		templateUrl: '/views/session/login.html',
		controller: 'LoginCtrl',
	})

	// /logout
//Dashboard
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: '/views/home/dashboard.html',
		controller: 'DashboardCtrl'
	})
});