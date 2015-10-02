import AuthBase from '../authenticated-base';
import moment from 'moment';

export default AuthBase.extend({
	setupController:function(controller, model){
    controller.set('model', model);
    var self = this;
		var uid = self.get('session').get('currentUser').get('id');
		self.store.findRecord('user',uid).then((user)=>{
			 controller.set('userTimeZone', user.get('timezone') || "America/New_York" );
		 	 user.get('organizations').then((organizations)=>{
		 	 		var options = organizations.map((org)=>{
		 	 				return {id:org.id,text:org.get('name')};
		 	 		});
		 	    controller.set('userOrganizations', options);
		 	});
	 });
	},
	actions:{
		calendarAddOccurrence: function(occurrence){
			var uid = this.get('session').get('currentUser').get('id');
   		var trainingSession = this.get('store').createRecord('trainingSession',{
   			owner: uid,
   			sessionDateTime: occurrence.get('startsAt'),
   			sessionDurationMinutes: Math.floor((occurrence.get('endsAt') - occurrence.get('startsAt')) / (1000*60))
   		});
			this.render('save-session', {
       into: 'dashboard.sessions',
        outlet: 'modal',
        model: trainingSession
    	});
		},
		removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: this.get('currentController'),
      });
    }
	}
});
