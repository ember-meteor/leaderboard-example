App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter;

App.Router.map(function() {
  this.resource("leaderboard", {path: "/"});
});

App.Player = DS.Model.extend({
  name: DS.attr(),
  score: DS.attr('integer')
});

App.Player.FIXTURES = [
  {id: 1, name: "Ada Lovelace",         score:  5},
  {id: 2, name: "Grace Hopper",         score: 10},
  {id: 3, name: "Marie Curie",          score: 25},
  {id: 4, name: "Carl Friedrich Gauss", score: 10},
  {id: 5, name: "Nikola Tesla",         score: 20},
  {id: 6, name: "Claude Shannon",       score: 30}
];

App.LeaderboardRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('player');
  }
});

App.LeaderboardController = Ember.ArrayController.extend({
  playerSorting: ["score:desc", "name:asc"],
  players: Ember.computed.sort('content', 'playerSorting')
});

App.SelectedPlayerController = Ember.ObjectController.extend({
  model: null,

  actions: {
    addPoints: function(){
      var model = this.get('model');
      model.incrementProperty('score', 5);
    }
  }
})

App.PlayerController = Ember.ObjectController.extend({
  needs: "selected_player",

  selected: function(){
    return this.get('controllers.selected_player.model') === this.get('model');
  }.property('controllers.selected_player.model', 'model'),

  actions: {
    select: function(){
      var model = this.get('model');
      this.set('controllers.selected_player.model', model);
    }
  }
});
