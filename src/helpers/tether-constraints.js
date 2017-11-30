// External Dependencies
import Tether from 'tether';

Tether.modules.push({
    position({top, left, targetAttachment, targetPos}) {
        if (!this.options.constraints) {
            return true;
        }

        const tAttachment = Tether.Utils.extend({}, targetAttachment);
        const eAttachment = Tether.Utils.extend({}, this.attachment);

        let {height, width} = this.cache('element-bounds', () => {
            return getBounds(this.element);
        });

        if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
            // Handle the item getting hidden as a result of our positioning without glitching
            // the classes in and out
            ({width, height} = this.lastSize);
        }

        const targetSize = this.cache('target-bounds', () => {
            return this.getTargetBounds();
        });

        const {height: targetHeight, width: targetWidth} = targetSize;

        this.options.constraints.forEach(constraint => {
            let {to, attachment} = constraint;

            if ( typeof attachment === 'undefined' ) {
                attachment = '';
            }

            let changeAttachX, changeAttachY;
            if ( attachment.indexOf(' ') >= 0 ) {
                [changeAttachY, changeAttachX] = attachment.split(' ');
            } else {
                changeAttachX = changeAttachY = attachment;
            }

            let bounds;
            if ( to == 'window' ) {
                bounds = {
                    left: pageXOffset,
                    top: pageYOffset,
                    width: innerWidth + pageXOffset,
                    height: innerHeight + pageYOffset
                };
            } else if ( to == 'scrollParent' ) {
                bounds = Tether.Utils.getBounds(this.scrollParents[0]);
            } else {
                bounds = Tether.Utils.getBounds(to);
            }

            if ( changeAttachX === 'ks-together' ) {
                if ( (left + width) > bounds.width && tAttachment.left === 'center' ) {
                    if ( eAttachment.left === 'center' ) {
                        left = targetPos.left;
                        left += targetWidth;
                        eAttachment.left = 'right';

                        left -= width;
                        tAttachment.left = 'right';
                    }
                }

                if ( (left + width) > bounds.width && targetPos.left == left && tAttachment.left === 'left' ) {
                    if ( eAttachment.left === 'left' ) {
                        left += targetWidth;
                        eAttachment.left = 'right';

                        left -= width;
                        tAttachment.left = 'right';
                    }
                }
            }

            if ( tAttachment.left !== targetAttachment.left || eAttachment.left !== this.attachment.left ) {
                this.updateAttachClasses(eAttachment, tAttachment);
                this.trigger('update', {
                    attachment: eAttachment,
                    targetAttachment: tAttachment
                });
            }
        });

        return {top, left};
    }
});