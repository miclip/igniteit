import OrganizationBase from './base';

export default OrganizationBase.extend({
actions:{
	save:function(model){
			var self = this;
			self.validate().then(function(){
				model.save().then(function(){
						self.set('addSuccess', true);
							self.notifications.addNotification({
				      message: 'Organization successfully updated!',
				      type: 'success',
				      autoClear: true,
			    	});
						self.transitionToRoute('dashboard.organizations.index');
				}).catch(function(err){
					console.log("errors:"+err);
				});
			}).catch(function(){
  		console.log('unepxected validation errors');
		  	self.set('hasValidationErrors',true);
  	});
	},
}
});
