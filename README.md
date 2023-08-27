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

## 3. Create API instance base

-   Install packages:
    ```shell
    npm i axios minimatch
    ```
-   Create axios client instance (for request API from client). We will request to next server and handle logic with backend API on server side.
    -   Create `configs/client/index.ts` and `configs/server/index.ts` files (save app config for server and client side).
    -   Create `apiClient/errorHandler.ts` file (handler error on client side).
    -   Create `apiClient/index.ts` file (API instance for request to next server).
    -   Create `api/utils/index.ts` file (save utilities serve for next api).
    -   Create `api/[...url]/route.ts` file (handler logic with backend API).

## 4. Setup TailwindCSS

-   Install packages:
    ```shell
    npm i lodash tailwind-merge
    ```
-   Create `utils/cx.ts` file:

    ```ts
    import { isString } from "lodash";
    import { twMerge } from "tailwind-merge";

    const cx = (...args: Array<string | { [key: string]: any }>) => {
        const classNames = args
            .filter(Boolean)
            .map((item) => {
                if (isString(item)) {
                    return item;
                }

                return Object.keys(item)
                    .filter((key) => item[key])
                    .join(" ");
            })
            .join(" ");

        return twMerge(classNames);
    };

    export default cx;
    ```

    -   Usage:

        ```tsx
        import cx from "@/utils/cx";

        export default function Home() {
            const active = true;

            return (
                <div className={cx("text-red-500", { "bg-white": active })}>
                    Hello
                </div>
            );
        }
        ```
