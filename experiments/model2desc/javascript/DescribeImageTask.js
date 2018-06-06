'use strict';

define([
    './DescribeItemTask',
    'jquery'
],
  function (DescribeItemTask)
  {
    /**
     * Scene description task
     * - User is show a series of images
     *   and asked to describe the scene in words
     */
    function DescribeImageTask(params)
    {
      DescribeItemTask.call(this,params);
    }

    DescribeImageTask.prototype = Object.create(DescribeItemTask.prototype);
    DescribeImageTask.prototype.constructor = DescribeImageTask;

    // Exports
    return DescribeImageTask;
  }
);
