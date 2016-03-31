'use strict';

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($scope, PlayerFactory, artist) {
  $scope.artist = artist;
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };
  $scope.toggle = function (song) {
    (song !== PlayerFactory.getCurrentSong()) ?
      PlayerFactory.start(song, $scope.artist.songs):
			PlayerFactory[PlayerFactory.isPlaying() ? "pause": "resume"]();
  };
});

juke.config(function ($stateProvider) {
  $stateProvider.state('artistsList', {
    url: '/artists',
    templateUrl: '/views/artists.html',
    resolve: {
      artists: function(ArtistFactory) {
        return ArtistFactory.fetchAll();
      }   
    },
    controller: function($scope, artists) {
		  $scope.artists = artists;
		}
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
});
