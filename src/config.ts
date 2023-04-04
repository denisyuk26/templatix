import configJSON from "../template.config.json";

export type Config = {
  framework: string;
  root_path: string;
  react: {
    page_path?: string;
    component_path?: string;
  };
};

export const config = configJSON;
