import { minimatch } from "minimatch";

const rules: Array<{
    url: string;
    handlers: {
        [key: number]: (error: any) => void;
    };
}> = [
    {
        url: "/resource/courses",
        handlers: {
            500: () => {
                // Error handle logic
                console.log("error");
            },
        },
    },
    {
        url: "/**/**",
        handlers: {
            500: () => {
                // Error handle logic
                console.log("Server Internal Error");
            },
            404: () => {
                // Error handle logic
                console.log("Not Found");
            },
            403: () => {
                // Error handle logic
                console.log("Forbidden");
            },
            401: () => {
                // Error handle logic
                console.log("Unauthorized");
            },
            400: () => {
                // Error handle logic
                console.log("Bad request");
            },
        },
    },
];

const errorHandler = (error: any) => {
    const url = error.response.config.url;
    const status = error.response.status;

    const matchedRule = rules.find((rule) => minimatch(url, rule.url));

    if (matchedRule) {
        const handler = matchedRule.handlers[status];

        handler && handler(error);
    }
};

export default errorHandler;
