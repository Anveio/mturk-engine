import { pluralize } from '../../utils/formatting';

describe('Pluralizing the word "HIT"', () => {
  const pluralizeHits = pluralize('HIT', 'HITs');

  test('Default argument should always pluralize', () => {
    expect(pluralizeHits()).toBe('HITs');
  });

  test('0 should be "HITs"', () => {
    expect(pluralizeHits(0)).toBe('HITs');
  });

  test('Singular should be "HIT"', () => {
    expect(pluralizeHits(1)).toBe('HIT');
  });

  test('2 or more should be "HITS"', () => {
    expect(pluralizeHits(2)).toBe('HITs');
    expect(pluralizeHits(3)).toBe('HITs');
    expect(pluralizeHits(40)).toBe('HITs');
    expect(pluralizeHits(500)).toBe('HITs');
  });
});
