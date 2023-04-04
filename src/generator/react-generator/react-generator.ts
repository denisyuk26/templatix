import { Config } from "../../config";
import { Generator } from "../generator";
import { GeneratorParams } from "../types";
import { EXTENSIONS_LIST, TEMPLATE_PATH } from "./constants";
import { ExtensionsList } from "./types";

export class ReactGenerator extends Generator {
  private extensionsList: ExtensionsList = EXTENSIONS_LIST;
  public templatePath: string = TEMPLATE_PATH;
  config: Config | undefined;

  constructor(params: GeneratorParams, config?: Config) {
    super(params);
    this.config = config;
  }

  public get path(): string | undefined {
    if (this.args.path.value) {
      return `${this.args.path.value}/`;
    }
    return;
  }

  public get pagePath() {
    if (this.path) {
      return this.path;
    }

    return `${this.config?.react.page_path}/`;
  }

  public get componentPath() {
    if (this.path) {
      return this.path;
    }
    return `${this.config?.react.component_path}/${this.args.name.value}/`;
  }

  public createComponent() {
    this.createTemplateString(`${this.templatePath}/component`);
    this.createDirectory(this.componentPath);
    this.createFile(this.componentPath, this.extensionsList.component);
  }

  public createStyles(path: string) {
    this.createTemplateString(`${this.templatePath}/styles`);
    this.createDirectory(path);
    this.createFile(path, this.extensionsList.styles);
  }

  public createPage() {
    this.createTemplateString(`${this.templatePath}/page`);
    this.createDirectory(this.pagePath);
    this.createDirectory(`${this.pagePath}components`);
    this.createFile(this.pagePath, this.extensionsList.page);
    this.createStyles(this.pagePath);
    this.createRoute();
  }

  public createRoute() {
    this.createTemplateString(`${this.templatePath}/route`);
    if (this.path) {
      this.createDirectory(this.path);
    }
    this.createFile(this.pagePath, this.extensionsList.route);
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
  }
}
