export const environment = {
  production: false,
  API_PATH: 'https://parallelum.com.br/fipe/api/v1/'
};

declare namespace NodeJS {
  interface ProcessEnv {
    API_PATH: string;
  }
}
