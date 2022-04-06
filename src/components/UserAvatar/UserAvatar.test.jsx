import React from 'react';
import { render } from '@testing-library/react';

import UserAvatar from './UserAvatar.component';

describe('UserAvatar', () => {
  it('should render the user name initials', () => {
    const { getByText } = render(
      <UserAvatar userName='Peter Park' avatarColor='blue' />
    );

    const initialsElement = getByText('P');
    expect(initialsElement).toBeVisible();
    expect(initialsElement).toHaveClass('avatar');
    expect(initialsElement).toHaveStyle({ backgroundColor: 'blue' });

    const nameElement = getByText('Peter Park');
    expect(nameElement).toHaveClass('name');
    expect(nameElement).toBeVisible();
  });
});
