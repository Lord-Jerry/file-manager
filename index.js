const fs = require('fs');
/**
 * 
 */
class FileManager {

  static home = process.env.HOME;
  static downloads = `${this.home}/Downloads`;
  static pictures = `${this.home}/Pictures`;
  static vidoes = `${this.home}/Videos`;
  static music = `${this.home}/Music`;

  static files = [];

  static async getDownloads() {
    try {
      // check if the download directory is available
      await fs.promises.opendir(this.downloads);

      const temp = fs.readdirSync(this.downloads);
      this.files.push(...temp);
      console.log(this.files, 1);
    } catch (e) {
      if (e.code && e.code === 'ENOENT') {
        console.error(e.message);
        return;
      }
      console.log(err);
    }
  }

  static async run() {
    this.getDownloads();
  }
}

FileManager.run();
