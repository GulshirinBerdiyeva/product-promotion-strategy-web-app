import {Injectable, Logger} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

const DIR_PATH = 'D:\\NodeProjects\\product-promotion-strategy-web-app\\logs\\';
const FILE_NAME = 'log_';
const TXT = '.txt';
const KILO_BYTE = 1024;
const FILE_MAX_SIZE = 2;

@Injectable()
export class AppLogger extends Logger {
    log(message: string, trace: string) {
        const fileAbsPath = getFileAbsPath();

        logIntoFile(fileAbsPath, message, trace);

        super.log(message, trace);
    }

    error(message: string, trace: string) {
        const fileAbsPath = getFileAbsPath();

        logIntoFile(fileAbsPath, message, trace);

        super.error(message, trace);
    }
}

function getFileAbsPath() {
    const files = fs.readdirSync(DIR_PATH);
    const lastFile = files.at(files.length - 1);

    let fileAbsPath;
    if (typeof lastFile === "undefined") {
        fileAbsPath = path.join(DIR_PATH, FILE_NAME.concat('1', TXT));
    } else {
        fileAbsPath = path.join(DIR_PATH, lastFile);

        const fileStatistics = fs.statSync(fileAbsPath);
        const fileSize = fileStatistics.size / KILO_BYTE;

        if (fileSize >= FILE_MAX_SIZE) {
            const fileInitPart = fileAbsPath.substring(0, fileAbsPath.lastIndexOf('_') + 1);
            let number = fileAbsPath.charAt(fileAbsPath.lastIndexOf('_') + 1);
            let newNumber = parseInt(number) + 1;
            fileAbsPath = fileInitPart.concat(String(newNumber), TXT);
        }
    }

    return fileAbsPath;
}

function logIntoFile(fileAbsPath: string, message: string, trace: string) {
    const data = '\n\n'.concat(message.concat(trace));
    fs.appendFile(fileAbsPath, data, (err) => {
        if (err) {
            throw err;
        }
    });
}
