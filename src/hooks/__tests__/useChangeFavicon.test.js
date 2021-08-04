/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import { useChangeFavicon } from '../useChangeFavicon';

const TestComponent = ({ dependency = false }) => {
  useChangeFavicon(dependency);

  return (
    <div>
      <link
        id='favicon'
        data-testid='favicon'
        rel='shortcut icon'
        href='/favicon.png'
      />
    </div>
  );
};

describe('useChangeFavicon hook', () => {
  it('should change the favicon href attr', () => {
    const { getByTestId, rerender } = render(
      <TestComponent dependency={false} />
    );

    expect(getByTestId('favicon').href).toContain('/favicon.png');
    rerender(<TestComponent dependency={true} />);
    expect(getByTestId('favicon').href).toContain('/favicon_gray.png');
  });
});
