import { useCallback } from 'react';

/*
 * All the transform functions can throw errors. Be careful.
 */
export const useShellAndExecFunctions = () => {
  const isValidJSON = (json) => {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isJSONSerializable = (data) => {
    try {
      JSON.stringify(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isValidExec = useCallback((execText) => {
    if (isValidJSON(execText)) {
      const json = JSON.parse(execText);

      const isValidArray = Array.isArray(json);
      if (!isValidArray) return false;

      const isStringArray = json.every((item) => typeof item === 'string');
      if (!isStringArray) return false;

      return true;
    }

    return false;
  }, []);

  const transformShellIntoExec = useCallback(
    (shellText) => {
      if (!shellText) return '';
      if (isValidExec(shellText)) return shellText;

      const numberOfSingleQuotes = shellText.split("'").length - 1;
      const numberOfDoubleQuotes = shellText.split('"').length - 1;
      // Return default split if number of single or double quotes is odd
      if (numberOfSingleQuotes % 2 !== 0 || numberOfDoubleQuotes % 2 !== 0) {
        return JSON.stringify(shellText.split(' '));
      }

      let shellTextClone = `${shellText}`;
      const quotesReplaceIdentifier = '@@_@@';
      const whiteSpaceReplaceIdentifier = '##_##';

      // Get substrings inside single or double quotes
      const textsWithQuotes = shellTextClone.match(
        /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g
      );

      if (textsWithQuotes) {
        // Replace text inside quotes to preserve its white spaces
        textsWithQuotes.forEach((text, index) => {
          shellTextClone = shellTextClone.replace(
            text,
            `${quotesReplaceIdentifier}${index}`
          );
        });
      }

      shellTextClone = shellTextClone.replace(
        new RegExp(' ', 'g'),
        whiteSpaceReplaceIdentifier
      );

      if (textsWithQuotes) {
        // Put texts with quotes in the array again
        textsWithQuotes.forEach((textWithQuotes, index) => {
          shellTextClone = shellTextClone.replace(
            `${quotesReplaceIdentifier}${index}`,
            textWithQuotes
          );
        });
      }

      const shellTextParts = shellTextClone.split(whiteSpaceReplaceIdentifier);
      return JSON.stringify(shellTextParts);
    },
    [isValidExec]
  );

  const transformExecJsonIntoShell = useCallback(
    (execJson) => {
      if (!execJson) return '';

      if (!isValidExec(execJson)) {
        throw new Error('The given EXEC JSON is not valid');
      }

      return JSON.parse(execJson).join(' ');
    },
    [isValidExec]
  );

  const transformExecArrayIntoShell = useCallback(
    (execArray) => {
      if (!isJSONSerializable(execArray)) {
        throw new Error(
          'Unable to transform non-serializable data to SHELL format'
        );
      }

      if (!isValidExec(JSON.stringify(execArray))) {
        throw new Error('The given EXEC array is not valid');
      }

      return execArray.join(' ');
    },
    [isValidExec]
  );

  return {
    transformExecArrayIntoShell,
    transformExecJsonIntoShell,
    transformShellIntoExec,
    isValidExec,
  };
};
