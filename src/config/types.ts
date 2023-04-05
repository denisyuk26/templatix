export type Config = {
  framework: string;
  style: string;
  route: string;
  page: string;
  component: string;
  output: string;
  general_extension: string;

  react: {
    page_path?: string;
    component_path?: string;
    extension_list: {
      page: string;
      component: string;
    };
  };
};
