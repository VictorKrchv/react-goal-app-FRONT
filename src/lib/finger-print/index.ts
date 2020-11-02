import FingerPrintJs from "@fingerprintjs/fingerprintjs";

interface Result {
  visitorId: string;
}

export const getFingerId = (): Promise<Result> => {
  return new Promise((resolve, reject) => {
    FingerPrintJs.load()
      .then((fp) => {
        return fp.get();
      })
      .then((result) => resolve(result));
  });
};
