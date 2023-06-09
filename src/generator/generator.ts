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

  public createTemplateString(
    templatePath: string,
    args?: Record<string, string>
  ) {
    nunjucks.configure(".", {
      autoescape: true,
    });
    const template = `${templatePath}.njk`;

    const render = nunjucks.render(template, {
      ...this.args,
      ...this.config,
      ...args,
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
    this.createTemplateString(`${this.templatePath}/${this.args.type.value}`);
    if (this.path) {
      this.createDirectory(this.path);
      this.createFile(this.path, this.config.extension_list.general_extension);
    } else {
      this.createDirectory(`${this.config.output.general}/`);
      this.createFile(
        `${this.config.output.general}/`,
        this.config.extension_list.general_extension
      );
    }
  }
}
