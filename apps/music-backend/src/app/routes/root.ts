import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/idk',

    async function (_request, reply) {
      reply.send({ hello: 'world' });
    }
  );
}
