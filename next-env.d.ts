/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
import * as next from 'next';

declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'next' {
  import {Session} from 'next-iron-session';

  interface NextApiRequest {
    session: Session
  }
}