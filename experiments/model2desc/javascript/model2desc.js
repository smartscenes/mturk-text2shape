'use strict';

// TODO: Global scope for runtime debugging, pull declaration into scope below
define(function(require) {
  require(['./DescribeModelTask','jquery','base'], function(DescribeModelTask) {
    $(document).ready(function() {
      $("img.enlarge").hover(function(){
        showLarge($(this));
      },function() {
      } );

      var describeModelTask = new DescribeModelTask({
        base_url: window.globals.base_url,
        entries: window.globals.entries,
        conf: window.globals.conf,
        descriptionElem: $('#description'),
        itemElem: $('#model'),
        categoryElem: $('#category')
      });

      describeModelTask.Launch();
    } );
  });
});
