// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    // save transition to return post login
    this.get("session").fetch().catch(function() {});
    this.saveTransition(transition);

    this.notifications.setDefaultClearNotification(3000);
    
  },
  actions: {
	// global signout action  
    signOut: function() {
    	this.get('store').unloadAll('user');
      this.get("session").close();
      this.transitionTo('index');
    },
    willTransition: function (transition) {
            this.saveTransition(transition);
        }
  },
  saveTransition: function (transition) {
        if (transition.targetName !== 'login') {
            this.controllerFor('login').set('previousTransition', transition);
        }
    }
});