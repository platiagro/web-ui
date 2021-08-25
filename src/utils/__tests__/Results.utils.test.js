import {
  downloadExperimentRunResult,
  formatCompareResultDate,
  formatResultsParameters,
  formatTensorValues,
  transformResults,
} from 'utils/Results.utils';

describe('Results utils', () => {
  it('should transform results with an operator ID', () => {
    const results = [{ type: 'plot', uuid: 'plot_uuid', plotUrl: 'plot_url' }];
    const transformedResults = transformResults('OPERATOR', results);
    expect(transformedResults).toEqual([
      { type: 'plot', uuid: 'plot_OPERATOR_0', plotUrl: results[0] },
    ]);
  });

  it('should format the date of a result', () => {
    const date = new Date(1629477399451);
    expect(formatCompareResultDate(date, 'en-US')).toBe(
      'August 20, 04:36 , PM'
    );
  });

  it('should format the parameters of a result', () => {
    expect(formatResultsParameters(null, {})).toEqual([]);

    expect(
      formatResultsParameters([{ label: 'the value', name: 'value' }], {
        value: 'some value',
      })
    ).toEqual([{ name: 'the value', value: 'some value' }]);

    expect(
      formatResultsParameters([{ name: 'value' }], {
        value: 'some value',
      })
    ).toEqual([{ name: 'value', value: 'some value' }]);

    expect(formatResultsParameters([{ name: 'value' }])).toEqual([
      { name: 'value', value: null },
    ]);

    expect(
      formatResultsParameters([{ name: 'value' }], {
        value: ['1', '2', '3'],
      })
    ).toEqual([{ name: 'value', value: '1,2,3' }]);

    expect(
      formatResultsParameters([{ name: 'value' }], {
        value: true,
      })
    ).toEqual([{ name: 'value', value: 'true' }]);
  });

  it('should call window.open to download the experiment result', () => {
    const open = window.open;
    window.open = jest.fn();
    downloadExperimentRunResult({
      experimentId: 'experimentId',
      operatorId: 'operatorId',
      projectId: 'projectId',
      runId: 'runId',
    });
    expect(window.open).toBeCalled();
    window.open = open;
  });

  it('should format TensorFlow result values', () => {
    expect(formatTensorValues([1, 2, 3, 4], [2, 2])).toEqual([
      [1, 2],
      [3, 4],
    ]);

    expect(formatTensorValues([1, 2, 3, 4], [])).toEqual([1, 2, 3, 4]);
    expect(formatTensorValues([1, 2, 3, 4], [1, 1, 1])).toEqual([1, 2, 3, 4]);
    expect(formatTensorValues(null, [1, 1])).toEqual([]);
    expect(formatTensorValues([], [1, 1])).toEqual([]);
    expect(formatTensorValues([1, 2, 3, 4], null)).toEqual([1, 2, 3, 4]);
  });
});
