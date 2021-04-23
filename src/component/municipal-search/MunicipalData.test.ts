import { describe, test, expect } from '@jest/globals';
import { filterData, CsvData } from './MunicipalData';

const testData: Array<CsvData> = [
  {
    municipal: 'Acton',
    site_oid: '1',
    Growth_Potential_Score: '1',
    Healthy_Communtiies_Score: '1',
    Healthy_Watersheds_Score: '1',
    Travel_Choices_Score: '1',
    Overall_Score: '1'
  },
  {
    municipal: 'Acton',
    site_oid: '2',
    Growth_Potential_Score: '1',
    Healthy_Communtiies_Score: '1',
    Healthy_Watersheds_Score: '1',
    Travel_Choices_Score: '1',
    Overall_Score: '1'
  },
  {
    municipal: 'Bedford',
    site_oid: '3',
    Growth_Potential_Score: '1',
    Healthy_Communtiies_Score: '1',
    Healthy_Watersheds_Score: '1',
    Travel_Choices_Score: '1',
    Overall_Score: '1'
  },
];

describe('Filter municipal data', () => {
  test('returns municipal array when that municipality is set', () => {
    expect(filterData(testData, 'Acton', {})).toHaveLength(2);
  });
  test('returns nothing when there is no selected municipality', () => {
    expect(filterData(testData, undefined, {})).toBeUndefined();
  });
});
