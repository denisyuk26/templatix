import type { Config } from "../config";
import { Generator } from "./generator";
import { ReactGenerator } from "./react-generator/react-generator";
import type { GeneratorParams } from "./types";

export class GeneratorFactory {
  args: GeneratorParams;
  config: Config | undefined;
  constructor(params: GeneratorParams, config?: Config) {
    this.args = params;
    this.config = config;
  }
  public createGenerator() {
    const framework = this.args.framework.value || this.config?.framework;
    if (framework === "react") {
      return new ReactGenerator(this.args, this.config);
    }
    return new Generator(this.args);
  }

  public render() {
    const generator = this.createGenerator();
    generator.render();
  }
}
