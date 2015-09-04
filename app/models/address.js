import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  line1: DS.attr('string'),
  line2: DS.attr('string'),
  line3: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  postCode: DS.attr('string'),
  countryCode: DS.attr('string'),
  createdDate: DS.attr('date', {
    defaultValue() { return new Date(); }
  }),
});
