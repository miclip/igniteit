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
					    				user.get('clients').removeObject(model);
					    				user.get('addresses').removeObject(address);
					    				user.save();
					    			});
								});
						self.get('store').findRecord('organization',organizationId).then((organization)=>{
							organization.get('clients').removeObject(model);
							organization.save();
						});
						// delete invites to trainer 
						// TODO Trainer has accepted 
						self.get('store').query('invite',{orderBy: 'parentId', startAt:model.get('id'), endAt:model.get('id')}).then((invites)=>{
							invites.forEach((invite)=>{
								invite.destroyRecord();
							});
						});

				});
				self.notifications.addNotification({
			  message: 'Client successfully deleted!',
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
