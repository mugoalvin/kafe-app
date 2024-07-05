export interface User {
    id: number;
    name: string;
    last_name: string;
    username: string;
    email: string;
    email_verified_at: string;
    password: string;
    isCustomer: boolean
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};