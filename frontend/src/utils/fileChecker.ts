function getExtension(filename: string) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isImage(filename: string) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      //etc
      return true;
  }
  throw new Error('Not a image');
}
