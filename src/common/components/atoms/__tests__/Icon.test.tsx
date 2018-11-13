import * as React from 'react';
import * as Enzyme from 'enzyme';
import { EIconNames } from 'icons/IconsManifest';
import { Icon } from 'atoms/Icon';

describe('components/atom/Icon', () => {
  it('Should render correct', () => {
    const snap = Enzyme.shallow(<Icon name={EIconNames.infinity} />);

    expect(snap).toMatchSnapshot();
  });
});
