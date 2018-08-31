interface Boil {
  port: number;
  host: string;
  src: string;
  dist: string;
  isDevelopment: boolean;
  isProduction: boolean;
  entryPoint: string;
  hmrServer: string;
  appId: string;
}

declare namespace NodeJS {
  interface Global {
    boil: Boil;
  }
}
