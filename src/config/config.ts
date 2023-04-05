import fs from "fs";
import path from "path";
import { deepMerge } from "../libs/deep-merge";
import { CONFIG_FILE_NAME } from "./constants";
import { Config } from "./types";

function readConfig() {
  const configFileName = CONFIG_FILE_NAME;
  const rootDir = process.cwd();
  const foundConfigs: Record<string, any>[] = [];

  for (
    let currentDir = rootDir;
    currentDir !== path.parse(currentDir).root;
    currentDir = path.dirname(currentDir)
  ) {
    const filePath = path.join(currentDir, configFileName);
    if (fs.existsSync(filePath)) {
      const configFileContent = fs.readFileSync(filePath, "utf8");
      const configFileParsed = JSON.parse(configFileContent);
      foundConfigs.push(configFileParsed);
    }
  }

  const mergedConfig = foundConfigs
    .reverse()
    .reduce((acc, cur) => deepMerge(acc, cur), {});

  return mergedConfig as Config;
}

export const config = readConfig();
