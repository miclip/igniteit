import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
	delete:function(model){
				var self = this;		
				var addressId = model.get('address').get('id');
				var organizationId = model.get('organizationId');
				model.destroyRecord().then(function(){	

						self.get('store').findRecord('address',addressId).then((address)=>{
								address.destroyRecord().then(()=>{
									var uid = self.get('session').get('currentUser').get('id');
					    			self.store.findRecord('user',uid).then((user)=>{
					    				user.get('trainers').removeObject(model);
					    				user.get('addresses').removeObject(address);
					    				user.save();
					    			});
								});

						self.get('store').findRecord('organization',organizationId).then((organization)=>{
							organization.get('trainers').removeObject(model);
							organization.save();
						});
				});
				self.notifications.addNotification({
			  message: 'Trainer successfully deleted!',
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
