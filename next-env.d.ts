/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import { Session } from 'next-iron-session';
import * as next from 'next';
declare module "next" {
    interface NextApiRequest{
        session:Session
    }
}