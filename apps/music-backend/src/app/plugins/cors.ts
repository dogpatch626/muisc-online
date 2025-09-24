import fastifyCors from '@fastify/cors';
import fp from 'fastify-plugin';

export default fp(
  function corsPlugin(fastify, options, done) {
    fastify.register(fastifyCors, {
      origin: false,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    done();
  },
  { name: 'cors' }
);
