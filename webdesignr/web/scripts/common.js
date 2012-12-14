/**
 * Author: 李军
 * Date: 12-11-23
 * Time: 下午5:50
 *
 */
!function( $, undefined ) {

    $.fn.extend({

        // Calls the handler function if the user has clicked outside the object (and not on any of the exceptions)
        clickOutside: function(handler, exceptions) {
            var $this = this;

            $("body").bind("click", function(event) {
                if (exceptions && $.inArray(event.target, exceptions) > -1) {
                    return;
                } else if ($.contains($this[0], event.target)) {
                    return;
                } else {
                    handler(event, $this);
                }
            });

            return this;
        },

        floatEditor: function(options, event) {
            var pos = options.position,
                $target = options.target,
                event = options.event,
                target = $target.get(0);
            if(!target) return this;
            pos || (pos = 'right');

            var that = this,
                offset = $target.offset(),
                lt = target.offsetLeft,
                tp = target.offsetTop,
                bt = target.offsetHeight + tp,
                rt = target.offsetWidth + lt,
                top,left;

            switch ( pos ) {
                case 'right':
                    left = rt;
                    top = tp;
                    break;
                case 'bottom':
                    left = lt + target.offsetWidth/2;
                    top = bt;
                    break;
                case 'top':
                    break;
                case 'left':
                    break;
            }

            this.css( 'position', 'absolute' ).css( 'top', top + 'px' ).css( 'left', left + 'px' );

            this.appendTo($('body'));



            if ( event ) {
                event.preventDefault();
                event.stopPropagation();
            }

            this.click( function (  ) {
                return false;
            });

            $ ( document ).one( "click", function ( ) {
                that.fadeOut();
            });

            return this;
        }

    });

}(jQuery);
