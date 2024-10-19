import { Downloader } from 'nodejs-file-downloader'

export async function download(url:string){
    const downloader = new Downloader({
        url: url,
        directory: "./temp"
    });
    try {
        console.log('Baixando conteúdo...')
        await downloader.download();
        console.log('Baixado!')
    } catch (error) {
        console.log("Download falhou", error);
    }
}