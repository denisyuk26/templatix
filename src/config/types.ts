export type Config = {
  framework: string;
  router: string;
  style: string;
  route: string;
  page: string;
  component: string;
  output: string;
  general_extension: string;
  routesOutput: string;

  react: {
    page_path?: string;
    component_path?: string;
    extension_list: {
      page: string;
      component: string;
    };
  };
};
