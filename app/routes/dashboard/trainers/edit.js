import AuthBase from '../../authenticated-base';
import Ember from 'ember';

export default AuthBase.extend({
	model: function(params){
		var self = this;
		return new Ember.RSVP.Promise(function(resolve) {
			var user = self.get('session').get('currentUser');
		  var uid = user.get('id');
		 	self.store.findRecord('trainer',params.trainer_id).then((trainer)=>{
			 	trainer.get('invite').then((invite)=>{
			 		if(!invite){
			 			var invite = self.store.createRecord('invite', {invitedBy: user,role:'trainer',owner: uid });
		 				trainer.set('invite',invite);
			 		}
			 		resolve(trainer);
			 	});	 
		  });
		 });
	
	},
			
	deactivate: function(){
		var model = this.get('controller.model');
		if(model.get('isNew')){
			model.deleteRecord();
		}			
	},
	setupController:function(controller, model){
    controller.set('model', model);
    var self = this;
    // set user orgs for select2
		var uid = self.get('session').get('currentUser').get('id');
		self.store.findRecord('user',uid).then((user)=>{
		   	 user.get('organizations').then((organizations)=>{
		   	 		var options = [];
		   	 		organizations.forEach(function(org){
		   	 				options.push({id:org.id,text:org.get('name')});
		   	 		});
		   	    controller.set('userOrganizations', options);
		   	});
	 	});
	 	self.store.query('trainer',{orderBy:'owner',startAt:uid, endAt:uid}).then((trainers)=>{
	 		trainers.forEach((trainer)=>{
	 			if( trainer.get('userId')===uid){
	 				if(trainers.get('length')!==0){
			 			controller.set('userIsTrainerSet', true);
			 			controller.set('userIsTrainer', false);
			 		} else {
			 			controller.set('userIsTrainerSet', false);
			 			controller.set('userIsTrainer', true);
			 		}
			 		
	 			}

	 		});
	 		

	 	}).catch(()=>{
	 		controller.set('userIsTrainerSet', false);
	 		controller.set('userIsTrainer', true);
	 	});
	},

});

