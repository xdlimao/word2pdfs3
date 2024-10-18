export function findNameByS3(url:string):string{
    return url.split("files/")[1];
}