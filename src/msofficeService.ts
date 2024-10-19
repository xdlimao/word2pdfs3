import path from 'path'
import { spawn } from 'child_process'
import fs from 'fs'

//NECESSITA TER OFFICE 2016 INSTALADO

export async function saveDocxBinary(name:string, data:Buffer){
    await fs.promises.writeFile(path.join(__dirname, `../temp/${name}.docx`), data)
}

export function convert(name:string){
    const inputFile:string = path.join(__dirname, `../temp/${name}.docx`);
    const outputFile:string = path.join(__dirname, `../temp/${name}.pdf`);

    const command = path.join(__dirname, `../bin/docto.exe -f ${inputFile} -O ${outputFile} -T wdFormatPDF`);

    console.log("Convertendo!")
    const processo = spawn(command, {shell:true})
    //LOG do Spawn:
    //   processo.stdout.on('data', (data) => {
    //     console.log(data);
    //   });
      
    //   processo.stderr.on('data', (data) => {
    //     console.error(`Erro: ${data}`);
    //   });
      
    //   processo.on('close', (code) => {
    //     console.log(`Processo finalizado com código ${code}`);
    //   });
}

export async function readPdfBinary(name:string):Promise<Buffer>{
    const filePath:string = path.join(__dirname, `../temp/${name}.pdf`);
    
    await new Promise(resolve => setTimeout(resolve, 10000)); //Não consegui criar uma lógica de verificar se o arquivo existe xd.
    
    return await fs.promises.readFile(filePath)
}


export function cleanTemp(name:string):void {
    const inputFile:string = path.join(__dirname, `../temp/${name}.docx`);
    const outputFile:string = path.join(__dirname, `../temp/${name}.pdf`);
    fs.unlink(inputFile,()=>{})
    fs.unlink(outputFile, ()=>{})
}