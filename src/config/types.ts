export type Config = {
  framework: string;
  router: string;
  extension_list: {
    general_extension: string;
    style: string;
    route: string;
    page: string;
    component: string;
  };
  output: {
    general: string;
    routes: string;
  };

  react: {
    output: {
      page: string;
      component: string;
    };
    extension_list: {
      page: string;
      component: string;
    };
  };
};
