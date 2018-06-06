'use strict';

define([
  './DescribeItemTask',
  'jquery',
  'base'
],
  function (DescribeItemTask) {
    /**
     * Model description task
     * - User is show several models
     *   and asked to describe the model in words
     */
    function DescribeModelTask(params) {
      DescribeItemTask.call(this, params);
      this.autoRotate = params.conf.autoRotate;
      this.categoryElem = params.categoryElem || $('#category');
    }

    DescribeModelTask.prototype = Object.create(DescribeItemTask.prototype);
    DescribeModelTask.prototype.constructor = DescribeModelTask;

    DescribeModelTask.prototype.updateItem = function(entry) {
      var fullId = '3dw.' + entry['id'];
      var url = getShapeNetModelImageUrl(fullId, /*this.useGIFs*/ true);
      console.log(url);
      this.categoryElem.text(entry['category']);
      this.itemElem.attr('src', url);
    };

    DescribeModelTask.prototype.Launch = function() {
      DescribeItemTask.prototype.Launch.call(this);
    };

    // Exports
    return DescribeModelTask;
  }
);
