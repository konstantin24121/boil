export interface ITheme {
  color: string;
  bgColor: string;
  colorAccented: string;
}

export const theme: ITheme = {
  color: '#fefefe',
  bgColor: '#2e2e2e',
  colorAccented: 'rebeccapurple',
};

declare global {
  interface IThemedComponent {
    theme?: ITheme;
  }
}
