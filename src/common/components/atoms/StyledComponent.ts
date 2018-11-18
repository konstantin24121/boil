import styled, { css } from 'react-emotion';

interface IStylesComponentProps extends IThemedComponent {
  underlined?: boolean;
}

const StyledComponent = styled('div')<IStylesComponentProps>(
  ({ underlined, theme }) => {
    return css`
      font-size: 18px;
      color: ${theme.color};
      text-decoration: ${underlined ? 'underline' : undefined};
    `;
  },
);

export { StyledComponent };
