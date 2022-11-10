import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    // const info = { location: rootLocation, children: getDirInfo(rootLocation) };
    console.log("root");

    // return res.json(JSON.stringify(info));
    return res.send("root");
});
app.get("/browse/*", (req, res) => {
    console.log(req.url);
    const reqPath: string = req.url.replace("/browse", "").replace(/%20/g, " ").replace(/%C8%A7/g, ".").replace(":", "");
    console.log(reqPath);


    if (!fs.existsSync(path.join(rootLocation, reqPath))) return res.status(404).send("location not found");
    const info = { location: reqPath, children: getDirInfo(path.join(rootLocation, reqPath)) };
    return res.json(JSON.stringify(info));

});

app.listen(3000, () => {

    console.log("server started on http://127.0.0.1:3000/");

});

const rootLocation = "C:/Users/abyas/Desktop/tuts";
// const rootLocation = process.argv.slice(2);




function getDirInfo(location: string) {
    // if fs.lstatSync(path.join(location, item)).isDirectory()
    const ls = fs.readdirSync(location).filter(item => !item.startsWith('.'));
    const out = ls.map(item => {
        const lstat = fs.lstatSync(path.join(location, item));
        if (lstat.isDirectory()) return new Dir(item, location, getChildDirInfo(path.join(location, item)));
        return new File(item, location, path.extname(path.join(location, item)));
    });
    return out;
}
function getChildDirInfo(location: string, isChildDir: boolean = false) {
    const ls = fs.readdirSync(location);
    const out: (File | ChildDir)[] = ls.map(item => {
        const lstat = fs.lstatSync(path.join(location, item));
        if (lstat.isDirectory()) return new ChildDir(item, location, isChildDir ? [undefined] : getChildDirInfo(path.join(location, item), true));
        // if (lstat.isDirectory()) return new ChildDir(item, location, [undefined]);
        return new File(item, location, path.extname(path.join(location, item)));
    });
    return out;
}


enum FsItems {
    Dir,
    File
}

class File {
    type = FsItems.File;
    name: string;
    parentDir: string;
    extension: string;
    constructor(name: string, parentDir: string, extension: string) {
        this.name = name;
        this.parentDir = parentDir;
        this.extension = extension;
    }
}
class ChildDir {
    type = FsItems.Dir;
    name: string;
    parentDir: string;
    children?: (File | ChildDir | undefined)[];
    constructor(name: string, parentDir: string, children: (File | ChildDir | undefined)[]) {
        this.name = name;
        this.parentDir = parentDir;
        this.children = children;
    }
}
class Dir {
    type = FsItems.Dir;
    name: string;
    parentDir: string;
    children: (File | ChildDir)[];
    constructor(name: string, parentDir: string, children: (File | ChildDir)[]) {
        this.name = name;
        this.parentDir = parentDir;
        this.children = children;
    }
}

// console.log(JSON.stringify(getDirInfo(rootLocation)));
// console.log(getDirInfo(rootLocation));


// fs.writeFileSync(path.join(rootLocation, "info.json"), JSON.stringify(final), { encoding: "utf-8" });




