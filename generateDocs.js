import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const docsPath = "./public/docs";
const srcPath = "./src/spec-path.json";

function readMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((folder) => ({
      folder: folder.name,
      files: readdirSync(join(directory, folder.name)).filter((file) =>
        file.endsWith(".md")
      ),
    }));
}

const markdownData = readMarkdownFiles(docsPath);
writeFileSync(srcPath, JSON.stringify(markdownData, null, 2));
