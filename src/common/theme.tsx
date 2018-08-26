export interface ITheme {
  color: string;
}

export const theme: ITheme = {
  color: 'rebeccapurple',
};

declare global {
  interface IThemedComponent {
    theme?: ITheme;
  }
}
