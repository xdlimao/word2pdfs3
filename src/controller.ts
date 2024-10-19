import { FastifyInstance } from "fastify"
import { cleanTemp, convert, readPdfBinary} from './msofficeService'
import { download } from './downloadService'
import { findNameByS3 } from './util'

interface defaultBody{
    url:string
}

async function controllers(fastify: FastifyInstance){
    fastify.post<{ Body: defaultBody }>('/send', async (request, reply) => {
        
        //Pega o nome 
        let archivename = findNameByS3(request.body.url);
        console.log("Nome do arquivo: " + archivename);
        
        //Baixa o arquivo
        await download(request.body.url);

        //Converter para PDF
        convert(archivename);

        //Pega os binários do PDF
        let pdfBinary = await readPdfBinary(archivename);

        //Agora é só fazer a lógica de enviar para o S3
        //...

        //Apagar arquivos para economizar espaço
        cleanTemp(archivename);
  })
}

export default controllers;