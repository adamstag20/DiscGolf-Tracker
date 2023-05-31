import Fastify from "fastify";
import config from "./db/mikro-orm.config.js";
import cors from '@fastify/cors'
import {FastifySearchHttpMethodPlugin} from "./plugins/http_search.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import DoggrRoutes from "./routes.js";

const app = Fastify();

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);

await app.register(DoggrRoutes);

await app.register(cors, {
    origin: (origin, cb) => {
        cb(null,true);
    },
    methods: ['GET','POST','DELETE','PATCH','SEARCH']
});
export default app;
