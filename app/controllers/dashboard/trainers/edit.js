import FacilityBase from './base';

export default FacilityBase.extend({
actions:{
	save:function(model){
			var self = this;
			model.set('countryCode','US');
			self.validate().then(function(){
				model.save().then(function(){
						// save the address
						self.store.findRecord('address',model.get('address').get('id')).then((address)=>{
	    				address.save();
	    			});

							self.notifications.addNotification({
				      message: 'Trainer successfully saved!',
				      type: 'success',
				      autoClear: true,
			    	});
						self.transitionToRoute('dashboard.trainers.index');
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