import Fastify from 'fastify'
import controller from './controller'

const fastify = Fastify({
    logger: true
})

fastify.register(controller)
  
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    console.log("Rodando conversor, certifique-se de ter o office original na máquina.")
})