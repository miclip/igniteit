// app/controllers/account.js
import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
actions:{
	delete:function(model){
			var self = this;			
				model.destoryRecord().then(function(){
						self.transitionToRoute('dashboard.organizations.index');
				}).catch(function(err){
					console.log("errors:"+err);
				});
			
  	
	},
}
});
