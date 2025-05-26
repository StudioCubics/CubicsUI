import loadConfig from "@/utils/configFile/loadConfig.js";
import {
  ComponentDocument,
  ComponentModel,
  connectDB,
  disconnectDB,
  LibraryModel,
} from "@cubicsui/db";
import stageComponents from "./stageComponents.js";
import downloadCodeblocks from "./downloadCodeblocks.js";
import pc from "picocolors";
import { printRootNode } from "@/utils/print.js";
// import eq from "enquirer";
// import { select } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";

/**
 * Downloads a specified component and its dependencies from the database
 * and saves them into the project directory.
 *
 * @param componentName - The name of the component to download.
 * @remarks
 * - If multiple components with the same name are found, it currently selects
 *   the second one (TODO: Add user selection for such cases).
 */
export default async function getComponents(componentName: string) {
  try {
    const config = await loadConfig();

    await connectDB();

    const library = await LibraryModel.findOneOrThrow({
      name: config.databaseOptions.library.name,
    });

    const components = await ComponentModel.find({
      name: componentName,
      lib: library.id,
    }).exec();

    let startingComponent = components[0];
    const componentsToDownload: ComponentDocument[] = [];

    //TODO Handle multiple components with the same name by listing the similar components and asking the user to select.
    if (components.length > 1) {
      console.log(
        `\n🔍 Found multiple components called "${pc.bold(componentName)}" with different outPaths`
      );
      // startingComponent = await select({
      //   message: "Select the component you want to download\n",
      //   choices: components.map((c) => {
      //     return {
      //       name: `${pc.bold("Name")}: ${c.name} ├→ ${pc.bold("OutPath")}: ${c.outPath}`,
      //       value: c,
      //     };
      //   }),
      // });
      // Ongoing issue https://github.com/SBoudrias/Inquirer.js/issues/1743
      startingComponent = await select({
        message: "Select the component you want to download\n",
        choices: components.map((c, i) => {
          return {
            name: `${i + 1}) ${pc.bold("Name")}: ${c.name} ├→ ${pc.bold("OutPath")}: ${c.outPath}`,
            description: `${pc.bold("ID")}: ${c.id}\n${pc.bold("Name")}: ${c.name}\n${pc.bold("OutPath")}: ${c.outPath}\n`,
            value: c,
          };
        }),

        pageSize: 10,
        loop: false,
      });
    }

    console.log("\n⏳ Staging components to download.\n");

    printRootNode(1, "💿 Database", "down");
    await stageComponents(startingComponent, componentsToDownload);

    console.log("\n💾 Saving staged components files in your project.");
    for (const cmp of componentsToDownload) {
      await downloadCodeblocks(cmp, config);
    }

    await disconnectDB();
    console.log(
      `\n✅ Completed downloading "${pc.bold(componentName)}" and all its dependencies.`
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      console.error(`\n❌ Stopped getting component`);
      console.log("👋 Until next time!");
    } else {
      console.error(
        `\n❌ Failed to get component "${pc.bold(componentName)}"!`
      );
      console.error(error);
    }
    await disconnectDB();
    process.exit(1);
  }
}
