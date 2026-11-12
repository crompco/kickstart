import { afterEach, expect, test, vi } from 'vitest';
import events, { mouseHold, removeSmartFocusToggle, scrolledToBottom, smartFocusToggle, stopParentScroll } from '../../src/helpers/events';

afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
});

function focusable() {
    const el = document.createElement('div');
    const input = document.createElement('input');
    el.appendChild(input);
    document.body.appendChild(el);

    return { el, input };
}

test('smartFocusToggle reports focus in and out', () => {
    vi.useFakeTimers();
    const { el, input } = focusable();
    const callback = vi.fn();

    smartFocusToggle(el, callback, 50);

    input.focus();
    expect(callback).toHaveBeenLastCalledWith(true, expect.any(FocusEvent));

    input.blur();
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenLastCalledWith(false, expect.any(FocusEvent));
});

test('removeSmartFocusToggle removes the listeners and the pending callback', () => {
    vi.useFakeTimers();
    const { el, input } = focusable();
    const callback = vi.fn();
    const toggle = smartFocusToggle(el, callback, 50);

    input.focus();
    input.blur();
    removeSmartFocusToggle(toggle);
    vi.advanceTimersByTime(50);
    input.focus();

    expect(callback).toHaveBeenCalledTimes(1);
});

test('scrolledToBottom returns a remover', () => {
    vi.useFakeTimers();
    const el = document.createElement('div');
    Object.defineProperties(el, {
        scrollTop: { value: 80 },
        offsetHeight: { value: 100 },
        scrollHeight: { value: 190 },
    });
    const callback = vi.fn();

    const remove = scrolledToBottom(el, callback, 10, 20);
    el.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(10);
    expect(callback).toHaveBeenCalledTimes(1);

    remove();
    el.dispatchEvent(new Event('scroll'));
    vi.advanceTimersByTime(10);
    expect(callback).toHaveBeenCalledTimes(1);
});

test('stopParentScroll returns a remover', () => {
    const el = document.createElement('div');
    const parent = vi.fn();
    document.body.appendChild(el);
    document.body.addEventListener('wheel', parent);

    const remove = stopParentScroll(el);
    el.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 10 }));
    expect(parent).not.toHaveBeenCalled();

    remove();
    el.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaY: 10 }));
    expect(parent).toHaveBeenCalledTimes(1);
});

test('mouseHold repeats while held and stops after removal', () => {
    vi.useFakeTimers();
    const el = document.createElement('button');
    const callback = vi.fn();

    const remove = mouseHold(el, callback, 100, 100);
    el.dispatchEvent(new MouseEvent('mousedown'));
    vi.advanceTimersByTime(100 + 100 + 93);
    expect(callback).toHaveBeenCalledTimes(2);

    el.dispatchEvent(new MouseEvent('mouseup'));
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    remove();
    el.dispatchEvent(new MouseEvent('mousedown'));
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
});

test('the default export has removeEvent', () => {
    expect(typeof events.removeEvent).toBe('function');
});
