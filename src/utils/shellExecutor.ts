import { exec, ExecException } from "child_process";
import os from "os";

export const runShellCommand = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const shell =
      os.platform() === "win32" ? "cmd.exe" : "/bin/sh";

    exec(
      command,
      { shell },
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          reject(stderr || error.message);
          return;
        }
        resolve();
      }
    );
  });
};
