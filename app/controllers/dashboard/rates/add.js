import Base from './base';

export default Base.extend({
onOrganizationChange: function () {	
		var self = this;
	  var organizationId = this.get('model.organizationId');
		alert('hi '+organizationId);
		
		self.store.findRecord('organization',organizationId).then((organization)=>{
			organization.get('rates').then((rates)=>{
				var options = [];
				rates.forEach(function(rate){
						options.push({id:rate.id,text:rate.get('name')});
				});
				alert('hi'+options[0]);
				self.set('selectRates', options);
			});
		
		});
	}.observes('model.organizationId'),
actions:{
	save:function(model){
			var self = this;
			
			self.validate().then(function(){
				model.save().then(function(){
					  var uid = self.get('session').get('currentUser').get('id');
						// save the address
						self.store.findRecord('user',uid).then((user)=>{
    					user.get('rates').pushObject(model);
    					user.save();
    				});

	    			// update organization and save 
	    			self.store.findRecord('organization',model.get('organizationId')).then((org)=>{
	    				org.get('rates').pushObject(model);
	    				org.save();
	    			});	    			

						self.set('addSuccess', true);
							self.notifications.addNotification({
				      message: 'Rate successfully added!',
				      type: 'success',
				      autoClear: true,
			    	});
						self.transitionToRoute('dashboard.rates.index');
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
