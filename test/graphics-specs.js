var makeSuite = require('./helpers').makeSuite;

makeSuite('Test Suite 1', function() {

  it('should verify click Arcs Graphics', function() {
    driver
      .elementByAccessibilityId('Graphics')
      .click()
      .elementByAccessibilityId('Arcs')
        .should.eventually.exist;
  });

});
