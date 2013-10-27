App = Ember.Application.create();

App.Router.map(function() {
  this.resource("leaderboard", {path: "/"});
});

App.Player = Ember.Object.extend({
});

App.LeaderboardRoute = Ember.Route.extend({
  model: function() {
    return Ember.A([
      App.Player.create({id: 1, name: "Ada Lovelace",         score: 5}),
      App.Player.create({id: 2, name: "Grace Hopper",         score: 10}),
      App.Player.create({id: 3, name: "Marie Curie",          score: 25}),
      App.Player.create({id: 4, name: "Carl Friedrich Gauss", score: 10}),
      App.Player.create({id: 5, name: "Nikola Tesla",         score: 20}),
      App.Player.create({id: 6, name: "Claude Shannon",       score: 30})
    ]);
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
      console.log("model: ", model);
      this.set('controllers.selected_player.model', model);
    }
  }
});
