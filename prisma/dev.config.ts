import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "schema.sqlite.prisma",
  migrations: {
    path: "migrations_sqlite",
  },
  datasource: {
    url: "file:../dev.db",
  },
});
