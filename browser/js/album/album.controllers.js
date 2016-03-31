'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */

juke.controller('AlbumCtrl', function ($scope, PlayerFactory, album, $location) {
  album.url = $location.$$absUrl;
  $scope.album = album;
  $scope.toggle = function (song) {
    (song !== PlayerFactory.getCurrentSong()) ?
      PlayerFactory.start(song, $scope.album.songs):
			PlayerFactory[PlayerFactory.isPlaying() ? "pause": "resume"]();
  };
  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };
});

/* ALBUMS (PLURAL) CONTROLLER */

juke.config(function ($stateProvider) {
  $stateProvider.state('albumsList', {
    url: '/albums',
    templateUrl: '/views/albums.html',
    resolve: {
      albums: function(AlbumFactory) {
        return AlbumFactory.fetchAll();
      }
    },
    controller: function ($scope, albums) {
		  $scope.albums = albums;
	  }
  })
  .state('albumList', {
    url: '/albums/:id',
    templateUrl: '/views/album.html',
    resolve: {
      album: function(AlbumFactory, $stateParams) {
        return AlbumFactory.fetchById($stateParams.id);
      }
    },
    controller: 'AlbumCtrl'
  });
});
