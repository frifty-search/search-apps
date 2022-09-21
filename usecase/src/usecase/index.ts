import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  template,
  url,
  move,
  branchAndMerge,
  chain,
} from "@angular-devkit/schematics";

import { strings } from "@angular-devkit/core";

import { UseCaseSchema } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function usecase(_options: UseCaseSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url("./files");
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
      }),
      move(`src/usecases/`),
    ]);

    if (tree.getDir("src/usecases")) {
      return branchAndMerge(chain([mergeWith(sourceParametrizedTemplates)]))(
        tree,
        _context
      );
      
    }

    throw new Error("No usecase folder found");
  };
}
