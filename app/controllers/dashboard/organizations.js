import Ember from 'ember';

export default Ember.Controller.extend({
actions:{
	delete:function(model){
				var self = this;		
				model.destroyRecord().then(function(){	

 						self.notifications.addNotification({
						  message: 'Organization successfully deleted!',
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
