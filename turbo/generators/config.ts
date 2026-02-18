import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    // A simple generator to add a new React component to the internal UI library
    plop.setGenerator("package", {
        description: "Generates a new package",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the package?",
            },
        ],
        actions: [
            {
                type: "addMany",
                destination: "packages/{{name}}",
                base: "templates/package",
                templateFiles: "templates/package/**/*",
            },
        ],
    });
}
