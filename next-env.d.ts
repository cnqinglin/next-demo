/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

type Post = {
    id: string;
    date: string;
    title: string;
    content: string;
    htmlContent: string;
}

type User = {
id: string;
}