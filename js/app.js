App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter;

App.Router.map(function() {
  this.resource("leaderboard", {path: "/"});
});

App.PlayerList = EmberFire.Array.extend({
  firebaseURI: "https://ember-meteor-leaderboard.firebaseio.com/players",

  init: function(){
    var firebase = new Firebase(this.get('firebaseURI'));
    this.set('ref', firebase);
    this._super();
  },
});

App.PlayerList.InjectFixtures = function(){
  var list = App.PlayerList.create();
  list.pushObjects(App.Player.FIXTURES);
};

App.Player = DS.Model.extend({
  name: DS.attr(),
  score: DS.attr('integer')
});

App.Player.FIXTURES = [
  {name: "Ada Lovelace",         score:  5},
  {name: "Grace Hopper",         score: 10},
  {name: "Marie Curie",          score: 25},
  {name: "Carl Friedrich Gauss", score: 10},
  {name: "Nikola Tesla",         score: 20},
  {name: "Claude Shannon",       score: 30}
];

App.LeaderboardRoute = Ember.Route.extend({
  model: function() {
    return App.PlayerList.create();
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
      var score = model.score;

      // TODO: increment the property,
      // and push it back to firebase
      model.score = score + 5;
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
