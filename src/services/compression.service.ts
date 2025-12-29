import fs from "fs";
import zlib from "zlib";

export const compressFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(filePath);
    const destination = fs.createWriteStream(`${filePath}.gz`);

    source.pipe(gzip).pipe(destination);

    destination.on("finish", () => resolve(`${filePath}.gz`));
    destination.on("error", reject);
  });
};
