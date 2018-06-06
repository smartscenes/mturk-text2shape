'use strict';

define([
  './DescribeItemTask',
  '../gl_app/STK',
  'jquery'
],
  function (DescribeItemTask, STK)
  {
    /**
     * Model description task
     * - User is show several models
     *   and asked to describe the model in words
     */
    function DescribeModelTask(params)
    {
      DescribeItemTask.call(this, params);
      this.autoRotate = params.conf.autoRotate;
      this.categoryElem = params.categoryElem || $('#category');
    }

    DescribeModelTask.prototype = Object.create(DescribeItemTask.prototype);
    DescribeModelTask.prototype.constructor = DescribeModelTask;

    DescribeModelTask.prototype.updateItem = function(entry) {
      var modelId = '3dw.' + entry['id'];
      this.modelViewer.showModel(modelId, this.autoRotate);
      this.categoryElem.text(entry['category']);
    };

    DescribeModelTask.prototype.sizeItem = function() {
      DescribeItemTask.prototype.sizeItem.call(this);
      if (this.modelViewer) {
        this.modelViewer.onWindowResize();
      }
    };

    DescribeModelTask.prototype.Launch = function() {
      this.modelViewer = new STK.SimpleModelViewer({
        container: this.itemElem[0],
        loadingIconUrl: '../loading.gif'
      });
      this.modelViewer.redisplay();
      this.modelViewer.singleModelCanvas.controls.setAutoRotateSpeed(6);
      DescribeItemTask.prototype.Launch.call(this);
    };

    // Exports
    return DescribeModelTask;
  }
);
