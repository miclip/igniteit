import { moduleForModel, test } from 'ember-qunit';

moduleForModel('facility', 'Unit | Model | facility', {
  // Specify the other units that are required for this test.
  needs: ['address']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
