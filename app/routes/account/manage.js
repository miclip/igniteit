import AuthUserBase from '../authenticated-user';
import moment from 'moment';

export default AuthUserBase.extend({
	setupController:function(controller, model){
    controller.set('model', model);
    var self = this;		
 		var options = moment.tz.names().map((name)=>{
 				return {id:name,text:name};
 		});
    controller.set('contentTimezones', options);		
	},
});
