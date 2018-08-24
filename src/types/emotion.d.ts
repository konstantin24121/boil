import { ITheme } from '@common/theme';

declare global {
  interface IThemedComponent {
    theme?: ITheme;
  }
}
