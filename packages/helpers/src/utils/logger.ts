import fs from "fs-extra";
import path from "path";
import stripAnsi from "strip-ansi";

type LogStatusType =
  | "Info"
  | "Success"
  | "UserError"
  | "Found"
  | "Failure"
  | "Warning"
  | "Connected"
  | "Disconnected"
  | "Waiting"
  | "Saving";
type LogDisplayType = "all" | "console" | "logfile";

const statusPrefixes: Record<LogStatusType, string> = {
  Info: "",
  Success: "✅",
  UserError: "⛔",
  Found: "🔍",
  Failure: "❌",
  Warning: "🔔",
  Connected: "🔗",
  Disconnected: "⛓",
  Waiting: "⏳",
  Saving: "💾",
};

function timestampedLog(message: string) {
  return `${new Date().toISOString()}\t${stripAnsi(message)}\n`;
}

export class Logger {
  status: LogStatusType = "Info";
  message!: string;
  display: LogDisplayType = "all";
  prefix: string = statusPrefixes["Info"];
  logFile!: string;
  writeStream!: fs.WriteStream;

  constructor(
    logFile: string = path.resolve(process.cwd(), ".cui", "cui.log")
  ) {
    this.logFile = logFile;
    fs.ensureFileSync(logFile);
    this.writeStream = fs.createWriteStream(logFile, { flags: "a" });
    this.writeStream.write(timestampedLog("Started CubicsUI!"));
  }
  private writeLogs(
    message: string,
    status: LogStatusType = this.status,
    prefix: string = this.prefix,
    display: LogDisplayType = this.display
  ) {
    let consoleLogger = console.log;
    switch (status) {
      case "Failure":
      case "Disconnected":
      case "UserError":
        consoleLogger = console.error;
        break;
      case "Warning":
        consoleLogger = console.warn;
        break;
    }
    if (display == "all" || display == "console")
      consoleLogger(`${prefix} ${message}`);
    if (display == "all" || display == "logfile") {
      this.writeStream.write(timestampedLog(message));
    }
  }
  log(
    message: string,
    status?: LogStatusType,
    prefix?: string,
    display?: LogDisplayType
  ) {
    this.writeLogs(message, status, prefix, display);
  }
  info(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Info", statusPrefixes["Info"], display);
  }
  success(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Success", statusPrefixes["Success"], display);
  }
  userError(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "UserError", statusPrefixes["UserError"], display);
  }
  found(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Found", statusPrefixes["Found"], display);
  }
  failure(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Failure", statusPrefixes["Failure"], display);
  }
  warning(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Warning", statusPrefixes["Warning"], display);
  }
  connected(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Connected", statusPrefixes["Connected"], display);
  }
  disconnected(message: string, display?: LogDisplayType) {
    this.writeLogs(
      message,
      "Disconnected",
      statusPrefixes["Disconnected"],
      display
    );
  }
  waiting(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Waiting", statusPrefixes["Waiting"], display);
  }
  saving(message: string, display?: LogDisplayType) {
    this.writeLogs(message, "Saving", statusPrefixes["Saving"], display);
  }
}
