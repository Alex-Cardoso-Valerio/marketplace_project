const path = require("path");
const { defineConfig } = require("prisma/config");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});