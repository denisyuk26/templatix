import type { Config } from "../config/types";
import { Generator } from "./generator";
import { ReactGenerator } from "./react-generator/react-generator";
import type { GeneratorParams } from "./types";

export class GeneratorFactory {
  args: GeneratorParams;
  config: Config;

  constructor(params: GeneratorParams, config: Config) {
    this.args = params;
    this.config = config;
  }
  private createGenerator() {
    const framework = this.args.framework?.value || this.config.framework;
    if (framework === "react") {
      return new ReactGenerator(this.args, this.config);
    }
    return new Generator(this.args, this.config);
  }

  public render() {
    const generator = this.createGenerator();
    generator.render();
  }
}
