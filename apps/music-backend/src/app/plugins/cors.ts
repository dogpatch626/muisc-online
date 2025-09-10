import fastifyCors from '@fastify/cors';
import fp from 'fastify-plugin';

export default fp(
  function corsPlugin(fastify, options, done) {
    fastify.register(fastifyCors, {
      methods: ['GET', 'OPTIONS'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type'],
      hook: 'onRequest',
      origin: (origin, cb) => {
        // const hostname = new URL(org).hostname;
        // if (hostname === 'localhost') {
        //   cb(null, true);
        //   return;
        // }
        cb(null, true);
      },
      ...options,
    });
    done();
  },
  { name: 'cors' }
);

// import fp from 'fastify-plugin';
// import sensible from '@fastify/sensible';

// /**
//  * This plugins adds some utilities to handle http errors
//  *
//  * @see https://github.com/fastify/fastify-sensible
//  */
// export default fp(
//   function (fastify, opts, done) {
//     fastify.register(sensible);
//     done();
//   },
//   { name: 'sensible' }
// );
