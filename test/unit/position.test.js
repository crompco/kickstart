import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { attach, parseAttachment, parseConstraints } from '../../src/helpers/position';
import { flushPromises, setRect, setViewport } from '../helpers/layout';

let target;
let element;

beforeEach(() => {
    setViewport(1000, 800);
    target = document.createElement('button');
    element = document.createElement('div');
    document.body.append(target, element);
    setRect(target, { x: 100, y: 100, width: 50, height: 20 });
    setRect(element, { width: 80, height: 30 });
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('parseAttachment', () => {
    test('reads vertical and horizontal words', () => {
        expect(parseAttachment('top left')).toEqual({ vertical: 'top', horizontal: 'left' });
        expect(parseAttachment('bottom right')).toEqual({ vertical: 'bottom', horizontal: 'right' });
        expect(parseAttachment('center left')).toEqual({ vertical: 'middle', horizontal: 'left' });
        expect(parseAttachment('middle center')).toEqual({ vertical: 'middle', horizontal: 'center' });
    });

    test('fills a missing word and ignores unknown words', () => {
        expect(parseAttachment('bottom 20')).toEqual({ vertical: 'bottom', horizontal: 'center' });
        expect(parseAttachment('left')).toEqual({ vertical: 'middle', horizontal: 'left' });
        expect(parseAttachment('', 'bottom center')).toEqual({ vertical: 'bottom', horizontal: 'center' });
        expect(parseAttachment('nonsense', 'top right')).toEqual({ vertical: 'top', horizontal: 'right' });
    });
});

test('parseConstraints reads tether constraints', () => {
    expect(parseConstraints([{ to: 'window', attachment: 'together ks-together' }]))
        .toMatchObject({ vertical: true, horizontal: false, alignHorizontal: true, pin: false, boundary: [] });
    expect(parseConstraints([{ to: 'scrollParent', attachment: 'none ks-together' }]))
        .toMatchObject({ vertical: false, alignHorizontal: true, boundary: 'clippingAncestors' });
    expect(parseConstraints([{ to: 'window', attachment: 'together', pin: true }]))
        .toMatchObject({ vertical: true, horizontal: true, pin: true });
    expect(parseConstraints(null)).toMatchObject({ vertical: false, horizontal: false, pin: false });
});

describe('attach', () => {
    test('places the element on the target attachment', async () => {
        const positioner = attach(target, element, { attachment: 'top center', targetAttachment: 'bottom center' });
        await flushPromises();

        expect(element.style.position).toBe('absolute');
        expect(element.style.left).toBe('85px');
        expect(element.style.top).toBe('120px');
        expect(element.classList.contains('tether-target-attached-bottom')).toBe(true);
        expect(element.classList.contains('tether-element-attached-top')).toBe(true);
        expect(element.classList.contains('tether-element-attached-center')).toBe(true);

        positioner.destroy();
    });

    test('aligns the right edges', async () => {
        const positioner = attach(target, element, { attachment: 'top right', targetAttachment: 'bottom right' });
        await flushPromises();

        expect(element.style.left).toBe('70px');
        positioner.destroy();
    });

    test('flips above the target when there is no room below', async () => {
        setViewport(1000, 140);
        const positioner = attach(target, element, {
            constraints: [{ to: 'window', attachment: 'together' }],
        });
        await flushPromises();

        expect(element.style.top).toBe('70px');
        expect(element.classList.contains('tether-target-attached-top')).toBe(true);
        expect(element.classList.contains('tether-element-attached-bottom')).toBe(true);
        positioner.destroy();
    });

    test('does not flip without a constraint', async () => {
        setViewport(1000, 140);
        const positioner = attach(target, element, {});
        await flushPromises();

        expect(element.style.top).toBe('120px');
        positioner.destroy();
    });

    test('ks-together moves a centered element to the right edge', async () => {
        setViewport(200, 800);
        setRect(target, { x: 150, y: 100, width: 40, height: 20 });
        setRect(element, { width: 100, height: 30 });

        const positioner = attach(target, element, {
            constraints: [{ to: 'window', attachment: 'none ks-together' }],
        });
        await flushPromises();

        expect(element.style.left).toBe('90px');
        expect(element.classList.contains('tether-element-attached-right')).toBe(true);
        positioner.destroy();
    });

    test('pin shifts the element back into the viewport', async () => {
        setRect(target, { x: 0, y: 100, width: 20, height: 20 });

        const positioner = attach(target, element, {
            constraints: [{ to: 'window', attachment: 'none', pin: true }],
        });
        await flushPromises();

        expect(element.style.left).toBe('0px');
        positioner.destroy();
    });

    test('matchWidth gives the element the target width', async () => {
        const positioner = attach(target, element, { matchWidth: true });
        await flushPromises();

        expect(element.style.width).toBe('50px');
        positioner.destroy();
    });

    test('destroy removes the attachment classes and stops updates', async () => {
        const positioner = attach(target, element, {});
        await flushPromises();
        positioner.destroy();

        expect([...element.classList].some(name => name.startsWith('tether-'))).toBe(false);

        element.style.top = '';
        window.dispatchEvent(new Event('resize'));
        await flushPromises();
        expect(element.style.top).toBe('');
    });
});
