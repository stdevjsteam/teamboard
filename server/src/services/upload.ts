import * as fs from 'fs';
import * as glob from 'glob';

type Params = {
  oldPath: string;
  newPath: string;
  file: string;
};

export const upload = ({ oldPath, newPath, file }: Params): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (!file) {
      await unlink(oldPath);
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

    await deleteMatchingFiles(`${newPath}.*`);

    fs.writeFile(fullPath, withoutHeader, encoding, err => {
      if (err) {
        reject(err);
      }

      resolve(pathWithExt);
    });
  });

const deleteMatchingFiles = (path: string): Promise<void> =>
  new Promise((resolve, reject) => {
    glob(path, {}, async (err, files) => {
      if (err) {
        reject(err);
      }

      await Promise.all(files.map(unlink));

      resolve();
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
