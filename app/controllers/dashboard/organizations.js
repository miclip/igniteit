import Ember from 'ember';

export default Ember.Controller.extend({
actions:{
	delete:function(model){
				var self = this;		
				model.destroyRecord().then(function(){	

						var uid = self.get('session').get('currentUser').get('id');
	    			self.store.findRecord('user',uid).then((user)=>{
	    				user.get('organizations').removeObject(model);
	    				user.save();
	    			});

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
