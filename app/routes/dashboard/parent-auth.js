import AuthBase from '../authenticated-base';

export default AuthBase.extend({
actions: {
    showModal: function(name, model) {
      this.render(name, {
        into: this.get('currentController'),
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: this.get('currentController'),
      });
    }
  }
})