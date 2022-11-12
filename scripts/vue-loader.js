import fs from "fs";
import { fileURLToPath } from "url";
import { compileScript, parse } from "@vue/compiler-sfc";
import { transformSync } from "esbuild";

export async function resolve(specifier, context, defaultResolver) {
  const resolved = await defaultResolver(specifier, context, defaultResolver);
  if (resolved.url.endsWith(".vue")) {
    return {
      ...resolved,
      format: "vue",
    };
  }
  return resolved;
}

export async function load(url, context, defaultLoad) {
  const loaded = await defaultLoad(url, context, defaultLoad);

  if (!loaded.source)
    return loaded;

  if (loaded.format === "vue") {
    const source = fs.readFileSync(fileURLToPath(url), "utf-8");

    const sfc = parse(source);
    const { content } = compileScript(sfc.descriptor, {
      id: "test1",
      inlineTemplate: true,
    });

    const { code } = transformSync(content, {
      loader: "ts",
      target: "es2017",
      format: "esm",
    });
    console.log(code);

    return {
      format: "module",
      source: code,
    };
  }
  return loaded;
}
