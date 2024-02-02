import { readdir, stat, unlink } from 'fs';
import { join, extname } from 'path';

/**
 * Removes image files  (.png .jpg) older than 24 hours.
 * 
 * @param {string} dirPath The path to clear.
 */
const clearFileCache = async (dirPath) => {
    const dateTime = Date.now();
    const dayInMs = 86400000;

    readdir(dirPath, (err, files) => {
        console.log(dateTime);
        if (err) {
            console.log(err);
        } else {
            try {
                files.forEach(file => {
                    const filePath = join(dirPath, file)
                    stat(filePath, (error, stats) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log((stats.birthtimeMs) + ' ' + filePath);
                            if ((dateTime - stats.birthtimeMs >= dayInMs) && (extname(filePath) === ('.jpg' || '.png'))) {
                                console.log(`older than 24h`);
                                unlink(filePath, (err) => {
                                    if(err) throw err;
                                    console.log(`${filePath} deleted`);
                                })
                            }
                        }
                    });
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
}

export { clearFileCache };
