import { Config } from "../../config/types";
import { Generator } from "../generator";
import { GeneratorParams } from "../types";
import { TEMPLATE_PATH } from "./constants";

export class ReactGenerator extends Generator {
  public templatePath: string = TEMPLATE_PATH;
  public config: Config;

  constructor(params: GeneratorParams, config: Config) {
    super(params, config);
    this.config = config;
  }

  public get path(): string | undefined {
    if (this.args.path?.value) {
      return `${this.args.path.value}/`;
    }
    return undefined;
  }

  private get pagePath() {
    return this.path || `${this.config?.react.page_path}/`;
  }

  private get componentPath() {
    return (
      this.path ||
      `${this.config?.react.component_path}/${this.args.name.value}/`
    );
  }

  private get extensionsList() {
    return this.config.react.extension_list;
  }

  public createComponent() {
    this.createTemplateString(`${this.templatePath}/component`);
    this.createDirectory(this.componentPath);
    this.createFile(this.componentPath, this.extensionsList.component);
  }

  public createStyles(path: string) {
    this.createTemplateString(`${this.templatePath}/styles`);
    this.createDirectory(path);
    this.createFile(path, this.config.style);
  }

  public createPage() {
    this.createTemplateString(`${this.templatePath}/page`);
    this.createDirectory(this.pagePath);
    this.createFile(this.pagePath, this.extensionsList.page);
    this.createDirectory(`${this.pagePath}components`);
    this.createStyles(this.pagePath);
    this.createRoute(this.pagePath);
  }

  public createRoute(path: string) {
    this.createTemplateString(`${this.templatePath}/route`);
    this.createDirectory(path);
    this.createFile(this.pagePath, this.config.route);
  }

  public render(): void {
    if (this.args.type.value === "component") {
      this.createComponent();
    }

    if (this.args.type.value === "page") {
      this.createPage();
    }

    if (this.args.type.value === "styles") {
      this.createStyles(this.path ?? "styles");
    }

    if (this.args.type.value === "route") {
      this.createRoute(this.path ?? this.config.output);
    }
  }
}
