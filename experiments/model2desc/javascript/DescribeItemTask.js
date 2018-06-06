'use strict';

define([
  './BaseTask',
  'jquery'
],
  function (BaseTask)
  {
    /**
     * Video description task
     * - User is show a series of video
     *   and asked to describe the video in words
     */
    function DescribeItemTask(params)
    {
      BaseTask.call(this,params);

      this.descriptionElem = params.descriptionElem || $('#description');
      this.itemElem = params.itemElem || $('#itemImage');
      this.textInputElem = params.textInputElem || $('#textInput');
      this.sizeItem();
    }

    DescribeItemTask.prototype = Object.create(BaseTask.prototype);
    DescribeItemTask.prototype.constructor = DescribeItemTask;

    DescribeItemTask.prototype.check = function() {
      // TODO: Check if the description is acceptable...
      var desc = this.descriptionElem.val().trim();
      if (this.minTimeSecPerItem && this.itemStartTime) {
        var elapsedSec = (Date.now() - this.itemStartTime) / 1000;
        console.log("elapsed",elapsedSec);
        if (elapsedSec < this.minTimeSecPerItem) {
          return {
            error: "Please write at least one full sentence describing the color, shape, material, and physical appearance of the object you see!"
          }
        }
      }

      if (desc.length > 40){
        var currentEntry = this.entries[this.entryIndex];
        var results = {
          description: desc,
          entry: currentEntry
        };
        var summary = {
          entryId: currentEntry.id,
          description: desc
        };
        return {
          results: results,
          summary: summary
        };
      } else {
        return {
          error: "Please write at least one full sentence describing the color, shape, material, and physical appearance of the object you see!"
        };
      }
    };

    DescribeItemTask.prototype.updateEntry = function(entry) {
      this.descriptionElem.val('');
      this.descriptionElem.focus();
      this.updateItem(entry);
    };

    DescribeItemTask.prototype.sizeItem = function() {
      if (this.textInputElem && this.textInputElem.length > 0) {
        this.itemElem.css('height', $( window ).height()
          - this.textInputElem.outerHeight(true)
          - this.nextButton.outerHeight(true)
          - this.progressElem.outerHeight(true)
          - 10);
      }
    };

    DescribeItemTask.prototype.updateItem = function(entry) {
      var url = this.toFullUrl(entry['url']);
      this.itemElem.attr('src', url);
    };

    DescribeItemTask.prototype.onResize = function () {
      this.sizeItem();
    };

    // Exports
    return DescribeItemTask;
});
