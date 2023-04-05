#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Logger } from "../logger/logger";

function initConfig() {
  const log = new Logger();
  const rootDir = process.cwd();
  const configFileName = "template.config.json";

  if (!fs.existsSync(path.join(rootDir, configFileName))) {
    fs.writeFileSync(
      path.join(rootDir, configFileName),
      JSON.stringify({
        framework: "react",
        router: "type-route",
        extension_list: {
          general_extension: "ts",
          style: "module.scss",
          route: "route.ts",
          page: "ts",
          component: "ts",
        },
        output: {
          general: "src/output",
          routes: "src/routes",
        },

        react: {
          output: {
            page: "src/pages",
            component: "src/components",
          },
          extension_list: { page: "page.tsx", component: "tsx" },
        },
      })
    );
    log.logSuccess(`Config file ${configFileName} created`);
  } else {
    log.logFailure("Config file already exists");
  }
}

initConfig();
