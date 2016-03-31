'use strict';

/* ARTISTS (PLURAL) CONTROLLER */

juke.controller('ArtistsCtrl', function ($scope, $log, $rootScope, ArtistFactory, artists) {
  $scope.artists = artists;

});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($scope, $log, ArtistFactory, PlayerFactory, $rootScope, $stateParams, artist) {
  $scope.artist = artist;


  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.artist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

});

juke.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('artistsList', {
    url: '/artists',
    templateUrl: '/views/artists.html',
    resolve: {
      artists: function(ArtistFactory) {
        return ArtistFactory.fetchAll();
      }   
    },
    controller: 'ArtistsCtrl' 
  })
  .state("artistList", {
    url: "/artist/:id",
    templateUrl: "views/artist.html",
    resolve: {
      artist: function(ArtistFactory, $stateParams) {
        return ArtistFactory.fetchById($stateParams.id);
      }
    },
    controller: "ArtistCtrl"
  })
  .state("artistList.songs", {
    url: "/songs",
    templateUrl: "views/artist_songs.html",
    controller: "ArtistCtrl"
  })
  .state("artistList.albums", {
    url: "/albums",
    templateUrl: "views/artist_albums.html",
    controller: "ArtistCtrl"
  })
  //$urlRouterProvider.when('/artist' , '/artist'+$stateParams+'/album')

});

