/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable n/no-deprecated-api */
const path = require("path");
const fs = require("fs");
const esbuild = require("esbuild");
const compiler = require("@vue/compiler-sfc");
const filePath = process.argv[2];

require.extensions[".ts"] = function (module, filename) {
  const filePath = path.resolve(__dirname, filename);
  const content = fs.readFileSync(filePath, "utf-8");

  const { code } = esbuild.transformSync(content, {
    loader: "ts",
    target: "es2017",
    format: "cjs",
  });
  // console.log(code);

  module._compile(code, filename);
};

require.extensions[".vue"] = function (module, filename) {
  const filePath = path.resolve(__dirname, filename);
  const content = fs.readFileSync(filePath, "utf-8");

  const sfc = compiler.parse(content);

  const { content: _content } = compiler.compileScript(sfc.descriptor, {
    id: "test1",
    inlineTemplate: true,
  });
  // console.log(_content);

  const { code } = esbuild.transformSync(_content, {
    loader: "ts",
    target: "es2017",
    format: "cjs",
  });

  module._compile(code, filename);
};

require(filePath);
