import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const rdbmsConfig: ConnectionOptions = {
  database: process.env.POSTGRES_DB,
  entities: [
    "dist/app/entity/*{.ts,.js}"
  ],
  extra: { max: 5, min: 2 }, // connection pool
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  synchronize: false,
  logging: false,
  type: "postgres",
  username: process.env.POSTGRES_USER,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};

export = rdbmsConfig;
