import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
	delete:function(model){
				var self = this;		
				var parentId = model.get('parentId');
				model.destroyRecord().then(function(){	

						self.get('store').findRecord('trainer',parentId).then((trainer)=>{
							  trainer.set('invite', null);
								trainer.save();
						
				});
				self.notifications.addNotification({
			  message: 'Invite successfully deleted!',
			  type: 'warning',
			  autoClear: true,
			});		
						
				}).catch(function(err){
					// TODO 
					console.log("errors:"+err);
				});
			
  	
	},
}
});