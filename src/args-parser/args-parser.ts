import yargs from "yargs";

export class ArgsParser {
  private args: Record<string, any>;

  constructor() {
    const { argv } = yargs(process.argv.slice(2))
      .option("name", {
        type: "string",
        description: "Name of the entity",
        demandOption: true,
        alias: "n",
      })
      .option("type", {
        type: "string",
        description: "Type of generated template (component, page, entity)",
        demandOption: true,
        alias: "t",
      })
      .option("framework", {
        type: "string",
        description: "Framework of the entity (React, Vue)",
        alias: "f",
      })
      .option("path", {
        type: "string",
        description: "Path to the generated file",
        alias: "p",
      })
      .help();

    this.args = argv;
  }

  public showHelp(): void {
    yargs.showHelp();
  }

  public getArgValue(argName: string): any {
    return this.args[argName];
  }
}
