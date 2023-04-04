import fs from "fs";
import nunjucks from "nunjucks";
import { TEMPLATE_PATH } from "./constants";
import type { GeneratorParams } from "./types";

export class Generator {
  public templatePath: string = TEMPLATE_PATH;
  private template: string | undefined = undefined;
  public args: GeneratorParams;
  extension: string;

  constructor(params: GeneratorParams) {
    this.args = params;
    this.extension = "ts";
  }
  public get path(): string | undefined {
    if (this.args.path.value) {
      return `${this.args.path.value}/`;
    }
    return;
  }

  public createDirectory(path: string) {
    fs.mkdirSync(path, { recursive: true });
  }

  public createTemplateString(templatePath: string) {
    nunjucks.configure(".", {
      autoescape: true,
    });
    const template = `${templatePath}.njk`;

    const render = nunjucks.render(template, {
      name: this.args.name.pascalCase(),
    });

    this.template = render;
  }

  public createFile(path: string, extension: string) {
    const generatedPath = `${path}${this.args.name.kebabCase()}.${extension}`;

    if (fs.existsSync(generatedPath)) {
      console.log(`File ${generatedPath} already exists`);
      return;
    }

    if (this.template) {
      fs.writeFileSync(generatedPath, this.template);
    }
  }

  public render() {
    if (!this.path) {
      console.log("Path is not defined");
      return;
    }
    this.createTemplateString(this.templatePath);

    this.createDirectory(this.path);
    this.createFile(this.path, this.extension);
  }
}
