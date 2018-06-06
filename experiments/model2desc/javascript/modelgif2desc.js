'use strict';

define(function(require) {
  require(['./DescribeModelGifTask','jquery','base'], function(DescribeModelGifTask) {
    $(document).ready(function() {
      $("img.enlarge").hover(function(){
        showLarge($(this));
      },function() {
      } );

      var describeModelTask = new DescribeModelGifTask({
        base_url: window.globals.base_url,
        entries: window.globals.entries,
        conf: window.globals.conf,
        descriptionElem: $('#description'),
        itemElem: $('#modelImg'),
        categoryElem: $('#category')
      });

      describeModelTask.Launch();
    } );
  });
});
