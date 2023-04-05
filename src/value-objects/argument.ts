export class Argument {
  private raw: string;

  constructor(raw: string) {
    this.raw = raw;
  }

  public camelCase() {
    return this.raw.replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  }

  public pascalCase() {
    const camelCase = this.camelCase();
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }

  public kebabCase() {
    return this.raw
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  }
  public snakeCase() {
    return this.raw
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_")
      .toLowerCase();
  }

  public get value() {
    return this.raw;
  }
}
