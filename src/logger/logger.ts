type ColorMap = Record<string, string>;

export class Logger {
  private color_map: ColorMap = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    black: "\x1b[30m",
  };

  constructor() {}

  public logSuccess(message: string) {
    console.log(`${this.color_map.green}%s${this.color_map.white}`, message);
  }

  public logFailure(message: string) {
    console.log(`${this.color_map.red}%s${this.color_map.white}`, message);
  }
}
