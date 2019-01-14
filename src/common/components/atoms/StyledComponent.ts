import styled from '@emotion/styled';
import { css } from '@emotion/core';

interface IStylesComponentProps extends IThemedComponent {
  underlined?: boolean;
}

const StyledComponent = styled('div')<IStylesComponentProps>(
  ({ underlined, theme }) => css`
    font-size: 18px;
    color: ${theme.color};
    text-decoration: ${underlined ? 'underline' : undefined};
  `,
);

export { StyledComponent };
