## 1. Create new project

-   Run command: `npx create-next-app@latest`.
-   Enter name of project.
-   Chose options:
    -   Typescript: **yes**
    -   App router: **yes**
    -   ESLint: **yes**
    -   TailwindCSS: **yes**
    -   Custom alias: **no**

## 2. Config prettier (format code)

-   Install packages:
    -   Run command:
        ```shell
        npm i -D prettier lint-staged husky
        ```
-   Create files `.prettierrc` (prettier rules)
    ```json
    // .prettierrc
    {
        "tabWidth": 4,
        "printWidth": 80,
        "semi": true,
        "singleQuote": false
    }
    ```
    _(Reference: [Prettier Documentation](https://prettier.io/docs/en/options.html))_
-   Create file `.prettierignore` (ignore files that you don't want to be formatted):

    ```
    package-lock.json
    node_modules

    *.yaml
    *.yml

    # any other unwanted files or folders
    ```

-   Configure Lint-staged:
    -   Add content bellow to `package.json` file:
        ```json
        {
            /* other configurations */
            "lint-staged": {
                "**/*.{js,jsx,ts,jsx,json}": ["prettier --write ."]
            }
        }
        ```
-   Configure Husky:
    -   Add content bellow to `package.json` file:
        ```json
        {
            /* other configurations */
            "scripts": {
                /* other scripts */
                "configure-husky": "npx husky install && npx husky add .husky/pre-commit \"npx --no-install lint-staged\""
            },
            "husky": {
                "hooks": {
                    "pre-commit": "lint-staged"
                }
            }
        }
        ```
    -   Run command: `npm run configure-husky`
-   Let's try commit code and check formatted files:
    ```shell
    git add .
    git commit -m "Config prettier & husky"
    ```
-   Config auto format on save:
    -   Create file `.vscode/settings.json`:
        ```json
        {
            "editor.formatOnSave": true,
            "editor.defaultFormatter": "esbenp.prettier-vscode"
        }
        ```
