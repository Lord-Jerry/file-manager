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
  /**
   * this method helps get all the file in the download directory
   */
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
        return reject();
      }
    });
  }

  static copyFiles() {
    try {
      const { COPYFILE_EXCL } = fs.constants;
      files.forEach((data) => {
        // if file has a image extention, copy to picture folder and delete from downloads folder
        if (data.endsWith('.jpg') || data.endsWith('.png')
          || data.endsWith('.jpeg') || data.endsWith('.gif')
        ) {
          fs.copyFileSync(`${downloads}/${data}`, `${pictures}/${data}`, COPYFILE_EXCL);
          fs.unlinkSync(`${downloads}/${data}`);
        }

        // // if file has a video extention, copy to video folder and delete from downloads folder
        if (data.endsWith('.mp4') || data.endsWith('.avi')
          || data.endsWith('.mkv') || data.endsWith('.3gp') || data.endsWith('.3gpp')
        ) {
          fs.copyFileSync(`${downloads}/${data}`, `${vidoes}/${data}`, COPYFILE_EXCL);
          fs.unlinkSync(`${downloads}/${data}`);
        }

        // // if file has a audio extention, copy to music folder and delete from downloads folder
        if (data.endsWith('.mp3')) {
          fs.copyFileSync(`${downloads}/${data}`, `${music}/${data}`, COPYFILE_EXCL);
          fs.unlinkSync(`${downloads}/${data}`);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  static async run() {
    const { copyFiles } = this;
    await this.getDownloads();
    copyFiles();
  }
}

FileManager.run();
