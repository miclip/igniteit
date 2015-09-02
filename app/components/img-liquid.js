import Ember from 'ember';

export default Ember.Component.extend({
	// called with element created
  _init: function() {
    //var self = this;
    var options = {

    	fill: this.get('fill'),
      verticalAlign:   this.get('verticalAlign'),   // 'center' //  'top'   //  'bottom' // '50%'  // '10%'
      horizontalAlign:  this.get('horizontalAlign'),    // 'center' //  'left'  //  'right'  // '50%'  // '10%'
    };

    // apply raty to the component element
    this.$().imgLiquid(options);

  }.on('didInsertElement'),

 
});
