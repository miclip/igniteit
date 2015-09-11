import AuthBase from '../../authenticated-base';
import Ember from 'ember';


export default AuthBase.extend({
	model: function(){
		var self = this;
		return new Ember.RSVP.Promise(function(resolve) {
			var uid = self.get('session').get('currentUser').get('id');
			self.store.findRecord('user',uid).then((user)=>{
		   	 user.get('facilities').then((facilities)=>{
		   	 		user.get('addresses').then(()=>{
		   	 			resolve(facilities);
		   	 		});
		   	 });
	    });
    });  
	}
});