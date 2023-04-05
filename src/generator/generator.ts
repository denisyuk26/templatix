import fs from "fs";
import nunjucks from "nunjucks";
import { Logger } from "../logger/logger";
import { TEMPLATE_PATH } from "./constants";

import type { Config } from "../config/types";
import type { GeneratorParams } from "./types";

export class Generator {
  public args: GeneratorParams;
  public config: Config;
  public logger: Logger;

  public templatePath: string = TEMPLATE_PATH;
  private template: string | undefined = undefined;

  constructor(params: GeneratorParams, config: Config) {
    this.args = params;
    this.config = config;
    this.logger = new Logger();
  }

  public get path(): string | undefined {
    if (this.args.path?.value) {
      return `${this.args.path.value}/`;
    }
    return undefined;
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
      name: this.args.name,
    });

    this.template = render;
  }

  public createFile(path: string, extension: string) {
    const generatedPath = `${path}${this.args.name.kebabCase()}.${extension}`;
    if (fs.existsSync(generatedPath)) {
      this.logger.logFailure(`File ${generatedPath} already exists`);

      return;
    }

    if (this.template) {
      fs.writeFileSync(generatedPath, this.template);
      this.logger.logSuccess(`File ${generatedPath} created`);
    }
  }

  public render() {
    this.createTemplateString(this.templatePath);
    if (this.path) {
      this.createDirectory(this.path);
      this.createFile(this.path, this.config.general_extension);
    } else {
      this.createDirectory(`${this.config.output}/}`);
      this.createFile(`${this.config.output}/}`, this.config.general_extension);
    }
  }
}
