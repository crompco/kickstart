import { autoUpdate, computePosition, detectOverflow, shift, size } from '@floating-ui/dom';

/**
 * Positions an element against a target with tether style attachments, on
 * top of Floating UI.
 *
 * An attachment is "vertical horizontal" - vertical is top, middle or bottom
 * and horizontal is left, center or right. The element's attachment point is
 * placed on the target's attachment point: attachment "top center" with
 * targetAttachment "bottom center" puts the element under the target.
 *
 * Constraints keep the tether format, for example
 * [{ to: 'window', attachment: 'together ks-together', pin: true }]:
 * - to: 'window' (the viewport), 'scrollParent' (clipping ancestors) or an element
 * - attachment "vertical horizontal": 'together' flips to the opposite side when
 *   the element overflows; 'ks-together' (horizontal) aligns the other edge;
 *   'none' does nothing
 * - pin: shifts the element back inside the boundary
 */

const VERTICAL = ['top', 'middle', 'bottom'];
const HORIZONTAL = ['left', 'center', 'right'];
const FLIPS = ['together', 'element', 'target', 'both'];

const CLASS_PREFIXES = ['tether-element-attached-', 'tether-target-attached-'];

/**
 * @param {string} attachment
 * @param {string} fallback
 * @return {{vertical: string, horizontal: string}}
 */
export function parseAttachment(attachment, fallback = 'top center') {
    const words = String(attachment || fallback).trim().toLowerCase().split(/\s+/);
    let vertical = null;
    let horizontal = null;

    words.forEach((word, index) => {
        if ( word === 'center' && index === 0 && words.length > 1 ) {
            word = 'middle';
        }

        if ( VERTICAL.includes(word) && !vertical ) {
            vertical = word;
        } else if ( HORIZONTAL.includes(word) && !horizontal ) {
            horizontal = word;
        }
    });

    if ( !vertical && !horizontal ) {
        return parseAttachment(fallback, 'top center');
    }

    return {
        vertical: vertical || 'middle',
        horizontal: horizontal || 'center',
    };
}

/**
 * @param {Array|object} constraints
 * @return {{vertical: boolean, horizontal: boolean, alignHorizontal: boolean, pin: boolean, boundary: *}}
 */
export function parseConstraints(constraints) {
    const list = Array.isArray(constraints) ? constraints : (constraints ? [constraints] : []);
    const rules = { vertical: false, horizontal: false, alignHorizontal: false, pin: false, boundary: 'clippingAncestors' };

    for ( const constraint of list ) {
        const [vertical = 'none', horizontal = vertical] = String(constraint.attachment || 'none').split(/\s+/);

        rules.vertical = rules.vertical || FLIPS.includes(vertical);
        rules.horizontal = rules.horizontal || FLIPS.includes(horizontal);
        rules.alignHorizontal = rules.alignHorizontal || horizontal === 'ks-together';
        rules.pin = rules.pin || !!constraint.pin;

        if ( constraint.to === 'window' ) {
            rules.boundary = [];
        } else if ( constraint.to && typeof constraint.to === 'object' ) {
            rules.boundary = constraint.to;
        }
    }

    return rules;
}

const OFFSETS = {
    left: 0,
    center: 0.5,
    right: 1,
    top: 0,
    middle: 0.5,
    bottom: 1,
};

function coordinates(rects, attachment, target_attachment) {
    const { reference, floating } = rects;

    return {
        x: reference.x + reference.width * OFFSETS[target_attachment.horizontal] - floating.width * OFFSETS[attachment.horizontal],
        y: reference.y + reference.height * OFFSETS[target_attachment.vertical] - floating.height * OFFSETS[attachment.vertical],
    };
}

const OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left', middle: 'middle', center: 'center' };

function verticalFlip(attachment, target_attachment, overflow) {
    const opposite_sides = attachment.vertical === OPPOSITE[target_attachment.vertical] && attachment.vertical !== 'middle';

    if ( opposite_sides && ((overflow.bottom > 0 && attachment.vertical === 'top') || (overflow.top > 0 && attachment.vertical === 'bottom')) ) {
        return [
            { ...attachment, vertical: OPPOSITE[attachment.vertical] },
            { ...target_attachment, vertical: OPPOSITE[target_attachment.vertical] },
        ];
    }

    return null;
}

function horizontalFlip(attachment, target_attachment, overflow, rules) {
    const opposite_sides = attachment.horizontal === OPPOSITE[target_attachment.horizontal] && attachment.horizontal !== 'center';

    if ( rules.horizontal && opposite_sides && ((overflow.right > 0 && attachment.horizontal === 'left') || (overflow.left > 0 && attachment.horizontal === 'right')) ) {
        return [
            { ...attachment, horizontal: OPPOSITE[attachment.horizontal] },
            { ...target_attachment, horizontal: OPPOSITE[target_attachment.horizontal] },
        ];
    }

    // ks-together: an element aligned with the target moves to the other edge
    if ( rules.alignHorizontal && attachment.horizontal === target_attachment.horizontal ) {
        if ( overflow.right > 0 && attachment.horizontal !== 'right' ) {
            return [{ ...attachment, horizontal: 'right' }, { ...target_attachment, horizontal: 'right' }];
        }

        if ( overflow.left > 0 && attachment.horizontal !== 'left' ) {
            return [{ ...attachment, horizontal: 'left' }, { ...target_attachment, horizontal: 'left' }];
        }
    }

    return null;
}

function overflowSize(overflow) {
    return Math.max(0, overflow.top) + Math.max(0, overflow.bottom) + Math.max(0, overflow.left) + Math.max(0, overflow.right);
}

function attachMiddleware(attachment, target_attachment, rules) {
    return {
        name: 'ksAttach',
        async fn(state) {
            let element_attachment = attachment;
            let target = target_attachment;
            let position = coordinates(state.rects, element_attachment, target);

            const overflowAt = point => detectOverflow({ ...state, ...point }, { boundary: rules.boundary, rootBoundary: 'viewport' });

            if ( rules.vertical || rules.horizontal || rules.alignHorizontal ) {
                let overflow = await overflowAt(position);

                const flips = [
                    rules.vertical ? verticalFlip : null,
                    (rules.horizontal || rules.alignHorizontal) ? horizontalFlip : null,
                ].filter(Boolean);

                for ( const flip of flips ) {
                    const flipped = flip(element_attachment, target, overflow, rules);
                    if ( !flipped ) {
                        continue;
                    }

                    const flipped_position = coordinates(state.rects, flipped[0], flipped[1]);
                    const flipped_overflow = await overflowAt(flipped_position);

                    if ( overflowSize(flipped_overflow) < overflowSize(overflow) ) {
                        [element_attachment, target] = flipped;
                        position = flipped_position;
                        overflow = flipped_overflow;
                    }
                }
            }

            return {
                ...position,
                data: {
                    attachment: element_attachment,
                    targetAttachment: target,
                },
            };
        },
    };
}

function setAttachClasses(element, data) {
    removeAttachClasses(element);

    if ( !data ) {
        return;
    }

    element.classList.add(
        `tether-element-attached-${data.attachment.vertical}`,
        `tether-element-attached-${data.attachment.horizontal}`,
        `tether-target-attached-${data.targetAttachment.vertical}`,
        `tether-target-attached-${data.targetAttachment.horizontal}`,
    );
}

function removeAttachClasses(element) {
    const stale = [...element.classList].filter(name => CLASS_PREFIXES.some(prefix => name.startsWith(prefix)));
    element.classList.remove(...stale);
}

/**
 * Keeps an element positioned against a target until destroyed
 *
 * @param {Element} target
 * @param {HTMLElement} element
 * @param {{attachment?: string, targetAttachment?: string, constraints?: Array|object, strategy?: string, matchWidth?: boolean, maxHeight?: boolean, onUpdate?: Function}} options
 * @return {{update: Function, destroy: Function}}
 */
export function attach(target, element, options = {}) {
    const attachment = parseAttachment(options.attachment, 'top center');
    const target_attachment = parseAttachment(options.targetAttachment, 'bottom center');
    const rules = parseConstraints(options.constraints);
    const strategy = options.strategy || 'absolute';

    const middleware = [attachMiddleware(attachment, target_attachment, rules)];

    if ( rules.pin ) {
        middleware.push(shift({ crossAxis: true, boundary: rules.boundary, rootBoundary: 'viewport' }));
    }

    if ( options.matchWidth || options.maxHeight ) {
        middleware.push(size({
            boundary: rules.boundary,
            rootBoundary: 'viewport',
            apply({ rects, availableHeight }) {
                if ( options.matchWidth ) {
                    element.style.width = `${rects.reference.width}px`;
                }
                if ( options.maxHeight ) {
                    element.style.maxHeight = `${Math.max(0, Math.floor(availableHeight))}px`;
                }
            },
        }));
    }

    let destroyed = false;

    // Measure with the final strategy, not the element's CSS position
    element.style.position = strategy;

    const update = () => computePosition(target, element, { strategy, placement: 'bottom', middleware })
        .then(({ x, y, middlewareData }) => {
            if ( destroyed ) {
                return;
            }

            Object.assign(element.style, {
                position: strategy,
                left: `${Math.round(x)}px`,
                top: `${Math.round(y)}px`,
            });

            setAttachClasses(element, middlewareData.ksAttach);

            if ( options.onUpdate ) {
                options.onUpdate(middlewareData.ksAttach);
            }
        });

    const stop = autoUpdate(target, element, update);

    return {
        update,
        destroy() {
            destroyed = true;
            stop();
            removeAttachClasses(element);
        },
    };
}
