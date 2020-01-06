/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fs = require('fs');

const home = process.env.HOME;
const downloads = `${home}/Downloads`;
const pictures = `${home}/Pictures`;
const vidoes = `${home}/Videos`;
const music = `${home}/Music`;

const files = [];

/**
 *
 */
class FileManager {
  static async getDownloads() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        // check if the download directory is available
        await fs.promises.opendir(downloads);
        const temp = fs.readdirSync(downloads);
        files.push(...temp);
        return resolve();
      } catch (e) {
        if (e.code && e.code === 'ENOENT') {
          console.error(e.message);
          return reject();
        }
        console.log(e);
        reject();
      }
    });
  }

  static copyFiles() {
    // console.log(files);
    files.forEach((data) => {
      console.log(data);
    });
  }

  static async run() {
    await this.getDownloads();
    this.copyFiles();
  }
}

FileManager.run();
