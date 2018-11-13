import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Loading } from 'atoms/Loading';

describe('components/atom/Loading', () => {
  it('Should render correct', () => {
    const snap = Enzyme.shallow(
      <Loading isLoading pastDelay timedOut error={null} retry={jest.fn()} />,
    );

    expect(snap).toMatchSnapshot();
  });
});
