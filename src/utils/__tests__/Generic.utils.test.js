import {
  getErrorMessage,
  sleep,
  isSupportedBinaryData,
  isImage,
  getSeldonObjectMimeType,
  formatBase64,
  toRawText,
  copyToClipboard,
  convertToBase64,
  downloadFile,
  readFileContent,
  accessCookie,
  deleteCookie,
} from '../Generic.utils';

describe('Generic utils', () => {
  const createBinarySeldonObject = (contentType, binData) => {
    return {
      meta: { tags: { 'content-type': contentType } },
      binData,
    };
  };

  const createStringSeldonObject = (contentType, strData) => {
    return {
      meta: { tags: { 'content-type': contentType } },
      strData,
    };
  };

  const createTabularSeldonObject = (contentType, names, ndarray) => {
    return {
      meta: { tags: { 'content-type': contentType } },
      names,
      ndarray,
    };
  };

  const createTensorSeldonObject = (contentType, names, shape, values) => {
    return {
      meta: { tags: { 'content-type': contentType } },
      names,
      tensor: {
        shape,
        values,
      },
    };
  };

  it('should return the error message', () => {
    const error = new Error('The error message');
    expect(getErrorMessage(error)).toBe(error.message);
    error.response = { data: { message: 'The error response message' } };
    expect(getErrorMessage(error)).toBe(error.response.data.message);
  });

  it('should return a promise to freeze the app for some milliseconds', () => {
    expect(sleep(1000)).toBeInstanceOf(Promise);
  });

  it('should check if a seldon object contains supported binary data', () => {
    const emptySeldonObject = {};
    const jpgSeldonObject = createBinarySeldonObject('image/jpg', 'aaa');
    const pngSeldonObject = createBinarySeldonObject('image/png', 'aaa');
    const videoSeldonObject = createBinarySeldonObject('video/mp4', 'aaa');
    expect(isSupportedBinaryData(emptySeldonObject)).toBe(false);
    expect(isSupportedBinaryData(jpgSeldonObject)).toBe(true);
    expect(isSupportedBinaryData(pngSeldonObject)).toBe(true);
    expect(isSupportedBinaryData(videoSeldonObject)).toBe(true);
  });

  it('should check if a seldon object is an image', () => {
    const emptySeldonObject = {};
    const jpgSeldonObject = createBinarySeldonObject('image/jpg', 'aaa');
    const pngSeldonObject = createBinarySeldonObject('image/png', 'aaa');
    const videoSeldonObject = createBinarySeldonObject('video/mp4', 'aaa');
    expect(isImage(emptySeldonObject)).toBe(false);
    expect(isImage(jpgSeldonObject)).toBe(true);
    expect(isImage(pngSeldonObject)).toBe(true);
    expect(isImage(videoSeldonObject)).toBe(false);
  });

  it('should return the seldon object mime type', () => {
    const emptySeldonObject = {};
    const stringSeldonObject = createStringSeldonObject('text/plain', 'aaa');
    const csvSeldonObject = createTabularSeldonObject('text/csv', [], []);
    const tensorSeldonObject = createTensorSeldonObject('text/csv', [], [], []);
    const jpgSeldonObject = createBinarySeldonObject('image/jpg', 'aaa');
    const pngSeldonObject = createBinarySeldonObject('image/png', 'aaa');
    const videoSeldonObject = createBinarySeldonObject('video/mp4', 'aaa');

    expect(getSeldonObjectMimeType(emptySeldonObject)).toBe('');
    expect(getSeldonObjectMimeType(stringSeldonObject)).toBe('data:text/plain');
    expect(getSeldonObjectMimeType(csvSeldonObject)).toBe('data:text/csv');
    expect(getSeldonObjectMimeType(tensorSeldonObject)).toBe('data:text/csv');

    expect(getSeldonObjectMimeType(jpgSeldonObject, 'image/jpg')).toBe(
      'data:image/jpeg'
    );

    expect(getSeldonObjectMimeType(pngSeldonObject, 'image/png')).toBe(
      'data:image/png'
    );

    expect(getSeldonObjectMimeType(videoSeldonObject, 'video/mp4')).toBe(
      'data:video/mp4'
    );
  });

  it('should return a base64 string from a given seldon object', () => {
    const pngSeldonObject = createBinarySeldonObject('image/png', 'aabbcc');
    const base64 = 'data:image/png;base64,aabbcc';
    expect(formatBase64(pngSeldonObject)).toBe(base64);
  });

  it('should return the raw text for a given seldon object', () => {
    const emptySeldonObject = {};
    const stringSeldonObject = createStringSeldonObject('text/plain', 'str');
    const jpgSeldonObject = createBinarySeldonObject('image/jpg', 'jpg');
    const pngSeldonObject = createBinarySeldonObject('image/png', 'png');
    const videoSeldonObject = createBinarySeldonObject('video/mp4', 'video');

    const csvSeldonObject = createTabularSeldonObject(
      'text/csv',
      ['a', 'b'],
      [[1, 2]]
    );

    const tensorSeldonObject = createTensorSeldonObject(
      'text/csv',
      ['a', 'b'],
      [2, 2],
      [1, 2, 3, 4]
    );

    expect(toRawText(emptySeldonObject)).toBe('');
    expect(toRawText(stringSeldonObject)).toBe('str');
    expect(toRawText(jpgSeldonObject)).toBe('jpg');
    expect(toRawText(pngSeldonObject)).toBe('png');
    expect(toRawText(videoSeldonObject)).toBe('video');
    expect(toRawText(csvSeldonObject)).toBe('a,b\n1,2');
    expect(toRawText(tensorSeldonObject)).toBe('a,b\n1,2\n3,4');
  });

  it('should use the browser navigator API to copy to clipboard', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    const seldonObject = createStringSeldonObject('text/plain', 'str');
    copyToClipboard(seldonObject);
    expect(global.navigator.clipboard.writeText).toBeCalledWith(
      seldonObject.strData
    );
  });

  it('should convert a string to base64', () => {
    const string = 'some text';
    const base64String = convertToBase64(string);
    expect(atob(base64String)).toBe(string);
  });

  it('should return a base64 to download a file', () => {
    const pngSeldonObject = createBinarySeldonObject('image/png', 'aaa');
    const base64 = downloadFile(pngSeldonObject);
    expect(base64).toBe('data:image/png;base64,aaa');
  });

  it('should read and return the file content', async () => {
    const file = new File(['some text'], 'text.txt');
    const fileContent = await readFileContent(file);
    expect(fileContent).toBe('some text');
  });

  it('should throw an error if FileReader does not exist globally', async () => {
    const fileReader = window.FileReader;
    window.FileReader = undefined;

    const canReadFile = async () => {
      try {
        const file = new File(['some text'], 'text.txt');
        await readFileContent(file);
        return true;
      } catch (e) {
        return false;
      }
    };

    const canRead = await canReadFile();
    expect(canRead).toBe(false);

    window.FileReader = fileReader;
  });

  it('should access the cookie stored in the document', () => {
    expect(accessCookie('COOKIE')).toBe('');
    document.cookie = 'KEY=cookie_value';
    expect(accessCookie('KEY')).toBe('cookie_value');
  });

  it('should delete the cookie by its name', () => {
    document.cookie = 'KEY=cookie_value';
    deleteCookie('KEY');
    expect(document.cookie).toBe('');
  });
});
