import libre from 'libreoffice-convert'
import { promises as fs } from 'fs';
import { promisify } from 'util'
import path from 'path';
const convertAsync = promisify(libre.convert)

//Aqui roda usando o LibreOffice
async function main(fileName:string){
    const inputPath:string = path.join(__dirname, `../docs/input/${fileName}.docx`);
    const outputPath:string = path.join(__dirname, `../docs/output/${fileName}.pdf`);
    
    //Ler binários do word
    const docxBuf:Buffer = await fs.readFile(inputPath)

    //Converter
    let pdfBuf:Buffer = await convertAsync(docxBuf, '.pdf', undefined)
    
    //Salvar arquivo
    await fs.writeFile(outputPath, pdfBuf)
}

main(process.argv[2])