import Ember from 'ember';

export default Ember.Controller.extend({
	actions:{
	delete:function(model){
		var self = this;		
		var organizationId = model.get('organizationId');
		model.destroyRecord().then(function(){	
			var uid = self.get('session').get('currentUser').get('id');
			self.store.findRecord('user',uid).then((user)=>{
				user.get('packages').removeObject(model);
				user.save();
			});

			self.get('store').findRecord('organization',organizationId).then((organization)=>{
				organization.get('packages').removeObject(model);
				organization.save();
			});
		
		self.notifications.addNotification({
	  message: 'Package successfully deleted!',
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
