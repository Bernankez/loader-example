import * as esmLoader from "@esbuild-kit/esm-loader";
import { load as _load, resolve as _resolve } from "./vue-loader.js";
export * from "@esbuild-kit/cjs-loader";

export function resolve(specifier, context, defaultResolver) {
  if (specifier.endsWith("vue"))
    return _resolve(specifier, context, defaultResolver);
  return esmLoader.resolve(specifier, context, defaultResolver);
}

export function load(url, context, defaultLoad) {
  if (context.format === "vue")
    return _load(url, context, defaultLoad);

  return esmLoader.load(url, context, defaultLoad);
}
