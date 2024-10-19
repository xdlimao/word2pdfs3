export function findNameByS3(url:string):string{
    

    const regex = /files\/(.*?)\.docx/;
    const result = url.match(regex);

    if(result)
        return result[1]; // Saída: nomeDoArquivo
    
    return ''
}