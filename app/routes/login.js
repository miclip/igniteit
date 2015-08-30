import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		if(!this.get('session').get('isAuthenticated')){
    	return this.store.createRecord('user',{});
    }
 },
 deactivate: function(){
 			var model = this.get('controller.model');
			if(model && model.get('isNew')){
				model.deleteRecord();
			}
	},
	onLogin: function () {	
		
  	if(this.get('session').get('isAuthenticated')){

  				if(!this.get('controller')){
  					this.transitionTo("dashboard");
  				}

					var previousTransition = this.get('controller.previousTransition');

		  		if (previousTransition) {
		        previousTransition.retry();
		        return;
          }

		  		this.transitionTo("dashboard");
		}
}.observes('session.isAuthenticated').on('init')
	

});
