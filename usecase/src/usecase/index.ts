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

interface UseCaseSchema {
  name: string;
  appId: string;
  appData: boolean;
}
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
      const renderUtilsFile = tree.read(
        "src/components/utils/renderApps.utils.tsx"
      );

      if (!renderUtilsFile) {
        throw new Error("src/utils/renderApps.utils.tsx not found");
      }

      const renderUtilsFileContent = renderUtilsFile.toString();
      let newRenderUtilsFileContent = renderUtilsFileContent.replace(
        `} from "../../usecases";`,
        ` ${strings.classify(_options.name)} } from "../../usecases";`
      );
      newRenderUtilsFileContent = newRenderUtilsFileContent.replace(
        /\}[\s]\};/gm,
        _options.appData
          ? ` case AppName.${_options.name.toUpperCase()}:
            return <${strings.classify(_options.name)} data={data} />;
          }
        }; `
          : ` case AppName.${_options.name.toUpperCase()}:
            return <${strings.classify(_options.name)} />;
          }
        }; 
        `
      );

      tree.overwrite(
        "src/components/utils/renderApps.utils.tsx",
        newRenderUtilsFileContent
      );

      const appUtilsFile = tree.read("src/utils/appName.utils.ts");
      if (!appUtilsFile) {
        throw new Error("src/utils/appName.utils.ts not found");
      }
      const appUtilsFileContent = appUtilsFile.toString();
      const newAppUtilsFileContent = appUtilsFileContent.replace(
        `};`,
        `  ${_options.name.toUpperCase()}: ${_options.appId}, };`
      );
      tree.overwrite("src/utils/appName.utils.ts", newAppUtilsFileContent);

      const usecaseIndexFile = tree.read("src/usecases/index.tsx");
      if (!usecaseIndexFile) {
        throw new Error("src/usecases/index.tsx not found");
      }

      const usecaseIndexFileContent = usecaseIndexFile.toString();
      let newUsecaseIndexFileContent = usecaseIndexFileContent.replace(
        /export \{/gm,
        `import ${strings.classify(_options.name)} from "./${strings.camelize(
          _options.name
        )}" ;
        export {`
      );
      newUsecaseIndexFileContent = newUsecaseIndexFileContent.replace(
        /[\s]};/gm,
        `  ${strings.classify(_options.name)}, };`
      );
      tree.overwrite("src/usecases/index.tsx", newUsecaseIndexFileContent);

      return branchAndMerge(chain([mergeWith(sourceParametrizedTemplates)]))(
        tree,
        _context
      );
    }

    throw new Error("No usecase folder found");
  };
}
