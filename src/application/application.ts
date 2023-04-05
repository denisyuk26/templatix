import { ArgsParser } from "../args-parser/args-parser";
import type { Config } from "../config/types";
import { GeneratorFactory } from "../generator/generator-factory";
import { GeneratorParams } from "../generator/types";

export class Application {
  argsParser: ArgsParser;
  generator: GeneratorFactory;

  constructor(config: Config) {
    this.argsParser = new ArgsParser();
    this.generator = new GeneratorFactory(
      this.argsParser.arguments as GeneratorParams,
      config
    );
  }

  public run() {
    this.generator.render();
  }
}
