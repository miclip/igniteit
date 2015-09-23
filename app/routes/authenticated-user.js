import AuthBase from './authenticated-base';
import Ember from 'ember';

export default AuthBase.extend({
	model: function(){
		 var self = this;
		 var uid = this.get('session').get('currentUser').get('id');
	    return new Ember.RSVP.Promise(function(resolve){
	    	self.store.find('user',uid).then((user)=>{
	    		resolve(user);
	    	});
	    });
	},
});