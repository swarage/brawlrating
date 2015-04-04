'use strict';

angular.module('brawlratingApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.mainPath = 'assets/images/';
    $scope.brawlcharacters = [
      'Diddy Kong',
      'Ike',
      'King Dedede',
      'Lucas',
      'Meta Knight',
      'Olimar',
      'Pit',
      'Squirtle',
      'Ivysaur',
      'Charizard',
      'Zero Suit Samus',
      'Wario',
      'Bowser',
      'Donkey Kong',
      'Fox',
      'Ice Climbers',
      'Kirby',
      'Link',
      'Mario',
      'Peach',
      'Pikachu',
      'Samus',
      'Yoshi',
      'Zelda',
      'Sheik',
      'Captain Falcon',
      'Falco',
      'Ganondorf',
      'Jigglypuff',
      'Lucario',
      'Luigi',
      'Marth',
      'Mr Game And Watch',
      'Ness',
      'ROB',
      'Snake',
      'Sonic',
      'Toon Link',
      'Wolf'
    ];
    $scope.brawlarray = [];
    for (var i = 0; i < $scope.brawlcharacters.length; i++) {
      $scope.brawlarray.push({
        'id': i,
        'name': $scope.brawlcharacters[i],
        'path': $scope.mainPath + $scope.brawlcharacters[i].replace(/\s+/g, '') + '.png',
      });
    }

    $scope.elim = new Array();
    $scope.like = new Array();
    $scope.seen = new Array();

    $scope.first_char = 0;
    $scope.second_char = 1;

    $scope.updateRoster = function() {
      for (var i = 0; i < $scope.brawlarray.length; i++) {
        $scope.like.push($scope.brawlarray[i]);
      }
    }

    $scope.reroll = function(fav) {
      if ($scope.elim.length >= 38) return;
      if (fav == 1) {
        $scope.elim.push($scope.brawlarray[$scope.second_char]);
        $scope.seen.push($scope.brawlarray[$scope.first_char]);
        console.log('chose left');
      } else if (fav == 2) {
        $scope.elim.push($scope.brawlarray[$scope.first_char]);
        $scope.seen.push($scope.brawlarray[$scope.second_char]);
        console.log('chose right');
      }

      $scope.first_char = $scope.getNewChar();
      $scope.second_char = $scope.getNewChar();

      if ($scope.like.length == 1 && $scope.seen.length == 0) {
        $scope.second_char = $scope.first_char;
        console.log($scope.like[0].name);
        $scope.elim.push($scope.like.splice(0,1)[0]);
        $scope.elim.push($scope.brawlarray.filter(function(elem) {
          return elem.id == $scope.first_char;
        })[0]);
        var name_arr = $scope.elim.map(function(elem) {
          return elem.name;
        });
        console.log(name_arr);
        var id_arr = $scope.elim.map(function(elem) {
          return elem.id;
        });
        console.log(id_arr);
      }

    }

    if (typeof console._commandLineAPI !== 'undefined') {
      console.API = console._commandLineAPI;
    } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
      console.API = console._inspectorCommandLineAPI;
    } else if (typeof console.clear !== 'undefined') {
      console.API = console;
    }

    $scope.getNewChar = function() {
      if ($scope.like.length <= 0) {
        $scope.like = $scope.like.concat($scope.seen);
        $scope.seen.length = 0;
      }

      var ret_val = $scope.like.splice(Math.floor(Math.random() * $scope.like.length), 1)[0].id;

      console.API.clear();

      console.log('seen:');
      for (var i = 0; i < $scope.seen.length; i++) {
        console.log($scope.seen[i].name);
      }
      console.log('elim:');
      for (var i = 0; i < $scope.elim.length; i++) {
        console.log($scope.elim[i].name);
      }
      console.log('like length: ' + $scope.like.length + ', seen length: ' + $scope.seen.length);

      return ret_val;

    }

    $scope.updateRoster();

    /*
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
    */
  });
