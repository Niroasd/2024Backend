import { fileURLToPath } from "url";
import { dirname, sep, extname } from "path";
import { readdir } from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const fileEndsIn = process.argv[2];

const probeFolder = async (path) => {
    try {
        const files = await readdir(path)
        for(const file of files){
            if(extname(file) === fileEndsIn){
                console.log(`Matching file extension found: ` + file);
            } else {
            console.log(`Not a match: ` + file);
            }
        }
    } catch (error) {
        console.log(error);
    }
}


probeFolder(__dirname);
console.log(fileEndsIn);
console.log(__dirname);