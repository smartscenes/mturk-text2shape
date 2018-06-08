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

    function getPrefixedLoadPath(baseDir, prefixLength, id) {
      var prefix = id.substr(0,prefixLength);
      var rest = id.substr(prefixLength);
      var path = baseDir;
      for (var i = 0; i < prefix.length; i++) {
        path = path + prefix.charAt(i) + "/";
      }
      path = path + rest + "/" + id + "/";
      return path;
    }

    function getShapeNetModelImageUrl(fullId, useGIF) {
      var parts = fullId.split('.');
      var source = parts[0];
      var id = parts[1];
      var ext = useGIF ? ".gif" : "-13.png";
      if (source === '3dw') {
        var base3dw = "http://shapenet.cs.stanford.edu/shapenet/screenshots/models/3dw/";
        var imagesDir = getPrefixedLoadPath(base3dw, 5, id);
        return imagesDir + id + ext;
      } else if (source === 'wss') {
        var basewss = "http://shapenet.cs.stanford.edu/text2scene/screenshots/models/wss/";
        return basewss + id + "/" + id + ext;
      } else {
        showAlert("Error: unsupported image source. Please close tab and do task again.");
      }
    }

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
