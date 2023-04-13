'use strict';
exports.main = async (event, context) => {
  if (event.type === 'deleteImg') {
    let result = await uniCloud.deleteFile({
      fileList: event.fileUrls
    });
    return result
  }
};