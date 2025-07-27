import * as crypto from 'crypto';

if (!(crypto as any).randomUUID) {
  (crypto as any).randomUUID = () =>
    ([1e7] as any+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c: any) =>
      (
        Number(c) ^
        (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))
      ).toString(16)
    );
}
