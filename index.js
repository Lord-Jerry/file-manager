const fs = require('fs');
/**
 * 
 */
class FileManager {

  static home = process.env.HOME;
  static download = `${this.home}/Downloads2`;
  static pictures = `${this.home}/Pictures`;
  static vidoes = `${this.home}/Videos`;
  static music = `${this.home}/Music`;

  static async getDownloads() {
    try {
      await fs.promises.opendir(this.download);
    } catch (e) {
      if (e.code && e.code === 'ENOENT') {
        console.error(e.message)
      }
    }
  }

  static async run() {
    this.getDownloads();
  }
}

FileManager.run();
