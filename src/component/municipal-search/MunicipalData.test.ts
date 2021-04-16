import { describe, test, expect } from '@jest/globals';
import { filterData } from './MunicipalData';

const testData = [
  { municipal: 'Acton', site_oid: '1' },
  { municipal: 'Acton', site_oid: '2' },
  { municipal: 'Bedford', site_oid: '3' },
];

describe('Filter municipal data', () => {
  test('returns municipal array when that municipality is set', () => {
    expect(filterData(testData, 'Acton')).toHaveLength(2);
  });
  test('returns nothing when there is no selected municipality', () => {
    expect(filterData(testData, undefined)).toBeUndefined();
  });
});
