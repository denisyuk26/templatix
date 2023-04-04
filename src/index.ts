import { ArgsParser } from "./args-parser/args-parser";
import { Config, config } from "./config";
import { GeneratorFactory } from "./generator/generator-factory";
import { Argument } from "./value-objects/argument";

export class Application {
  argsParser: ArgsParser;
  generator: GeneratorFactory;

  constructor(config?: Config) {
    this.argsParser = new ArgsParser();
    this.generator = new GeneratorFactory(
      {
        name: new Argument(this.argsParser.getArgValue("name")),
        path: new Argument(this.argsParser.getArgValue("path")),
        type: new Argument(this.argsParser.getArgValue("type")),
        framework: new Argument(this.argsParser.getArgValue("framework")),
      },
      config
    );
  }

  public run() {
    this.generator.render();
  }
}

const app = new Application(config);

app.run();
