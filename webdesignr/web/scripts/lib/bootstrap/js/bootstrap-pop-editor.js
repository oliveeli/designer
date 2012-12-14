/* ===========================================================
 * bootstrap-popover.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var PopEditor = function (element, options) {
    this.init('popEditor', element, options)
    this.editorElement = ['INPUT', 'BUTTON', 'A']
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

PopEditor.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: PopEditor

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.pop-editor-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.pop-editor-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

    , toggle: function (event) {
        this[this.tip().hasClass('in') ? 'hide' : 'show'](event)
    }

    , show: function (event) {
        var $tip
            , inside
            , pos
            , actualWidth
            , actualHeight
            , placement
            , tp

        if (this.hasContent() && this.enabled) {
            $tip = this.tip()

            if (this.options.animation) {
                $tip.addClass('fade')
            }

            placement = typeof this.options.placement == 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement

            inside = /in/.test(placement)

            $tip
                .remove()
                .css({ top: 0, left: 0, display: 'block' })
                .appendTo(inside ? this.$element : document.body)

            this.setContent()

            event.stopPropagation()
            event.preventDefault()


            $tip.on({
                'mousedown': $.proxy(this.mousedown, this)
            });

            $(document).on({
                'mousedown': $.proxy(this.hide, this)
            });

            pos = this.getPosition(inside)

            actualWidth = $tip[0].offsetWidth
            actualHeight = $tip[0].offsetHeight

            switch (inside ? placement.split(' ')[1] : placement) {
                case 'bottom':
                    tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
                    break
                case 'top':
                    tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
                    break
                case 'left':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
                    break
                case 'right':
                    tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
                    break
            }

            $tip
                .css(tp)
                .addClass(placement)
                .addClass('in')
        }
    }

    , mousedown: function( event ) {
        this.clickTimeStamp = event.timeStamp;
    }

    ,hide: function(event) {
        if(event && this.clickTimeStamp && event.timeStamp === this.clickTimeStamp){
            return;
        }
        var $tip = this.tip()
        $tip.remove()

        $(document).off({
            'mousedown': this.hide
        })
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , getTitle: function () {
        var title
            , $e = this.$element
            , o = this.options

        title = (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title) || $e.attr('data-original-title')

        return title
  }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popEditor = function (option, event) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('pop-editor')
        , options = typeof option == 'object' && option
      if (!data) $this.data('pop-editor', (data = new PopEditor(this, options)))
      if ( option == 'show' ) {
          data[option](event)
          return
      }
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popEditor.Constructor = PopEditor

  $.fn.popEditor.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="pop-editor"><div class="arrow"></div><div class="pop-editor-inner"><h3 class="pop-editor-title"></h3><div class="pop-editor-content"><p></p></div></div></div>'
  })

}(window.jQuery);