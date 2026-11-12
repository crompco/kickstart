import { expect, test } from 'vitest';
import { applyMask, dateMask } from '../../src/helpers/mask';

test('dateMask turns date tokens into digit slots', () => {
    expect(dateMask('m/d/Y')).toBe('##/##/####');
    expect(dateMask('Y-m-d')).toBe('####-##-##');
    expect(dateMask('m/d/y')).toBe('##/##/##');
});

test('applyMask adds literals only before a following digit', () => {
    expect(applyMask('', '##/##/####')).toBe('');
    expect(applyMask('01', '##/##/####')).toBe('01');
    expect(applyMask('013', '##/##/####')).toBe('01/3');
    expect(applyMask('01312017', '##/##/####')).toBe('01/31/2017');
    expect(applyMask('01/31/2017999', '##/##/####')).toBe('01/31/2017');
});

test('applyMask drops characters that are not digits', () => {
    expect(applyMask('a0b1/', '##/##')).toBe('01');
    expect(applyMask(null, '##')).toBe('');
});
