export type BlockedSiteFormState = {
    success: boolean;
    message: string;
    fieldErrors?: Record<string, string>;
};