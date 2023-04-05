import { Argument } from "../value-objects/argument";

export type GeneratorParams = {
  name: Argument;
  type: Argument;
  path?: Argument;
  framework?: Argument;
};
