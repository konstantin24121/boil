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
  hostname: string;
  cacheLimit: number;
  cacheLifeTime: number;
  appMeta: {
    version: string;
    name: string;
  };
}

declare namespace NodeJS {
  interface Global {
    boil: Boil;
  }
}

declare interface NodeModule {
  hot: any;
}
