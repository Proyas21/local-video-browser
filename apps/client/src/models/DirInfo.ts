export enum FsItems {
    Dir,
    File
}

export default interface DirInfo {
    location: string,
    children: (File | ChildDir)[];
}

export interface File {
    type: FsItems.File;
    name: string;
    parentDir: string;
    extension: string;
}
export interface ChildDir {
    type: FsItems.Dir;
    name: string;
    parentDir: string;
    children: (File | ChildDir | undefined)[];
}

export interface Dir {
    type: FsItems.Dir;
    name: string;
    parentDir: string;
    children: (File | ChildDir)[];
}