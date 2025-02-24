declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_TEMP_TOKEN: string;
    }
  }
}
export {};
