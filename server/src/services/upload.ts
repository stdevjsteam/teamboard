import * as fs from 'fs';

interface Params {
  oldPath: string;
  newPath: string;
  file: string;
}

export const upload = ({ oldPath, newPath, file }: Params): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      await unlink(oldPath);
    } catch {}

    if (!file) {
      resolve('');
      return;
    }

    const ext = file.split(';')[0].split('/')[1];
    const withoutHeader = file.split(';base64,').pop();
    const pathWithExt = `${newPath}.${ext}`;
    const fullPath = `${process.cwd()}/${pathWithExt}`;
    const encoding = 'base64';

    if (!withoutHeader) {
      const err = new Error('invalid base64');
      reject(err);
      return;
    }

    fs.writeFile(fullPath, withoutHeader, encoding, err => {
      if (err) {
        reject(err);
      }

      resolve(pathWithExt);
    });
  });

const unlink = (path: string): Promise<void> =>
  new Promise((resolve, reject) => {
    fs.unlink(`${process.cwd()}/${path}`, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
