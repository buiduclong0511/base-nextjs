const getBody = async (request: Request): Promise<any> => {
    let json = null;
    let formData = null;

    try {
        formData = await request.formData();
    } catch (err) {}

    try {
        json = await request.json();
    } catch (err) {}

    return json || formData;
};

const isFormData = (body: any) => body instanceof FormData;

export const buildConfig = async (request: Request): Promise<RequestInit> => {
    const body = await getBody(request);

    const config: RequestInit = {};
    if (body) {
        if (isFormData(body)) {
            config.body = body;
        } else {
            config.body = JSON.stringify(body);
            config.headers = {
                "Content-Type": "Application/json",
            };
        }
    }

    return config;
};
