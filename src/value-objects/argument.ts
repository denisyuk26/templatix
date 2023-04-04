export class Argument {
  private raw: string;

  constructor(raw: string) {
    this.raw = raw;
  }

  public camelCase() {
    return this.raw.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  public pascalCase() {
    return this.raw.replace(
      /\w+/g,
      (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
    );
  }

  public kebabCase() {
    return this.raw.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  public snakeCase() {
    return this.raw.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }

  public get value() {
    return this.raw;
  }
}
