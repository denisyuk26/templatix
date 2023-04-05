#!/usr/bin/env node

import { Application } from "./application/application";
import { config } from "./config/config";

const app = new Application(config);

app.run();
