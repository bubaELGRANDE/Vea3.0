export interface FormattedHttpError {
    message: string;
    errors: string; // todos los errores en un solo string plano
}

export function formatHttpError(error: any): FormattedHttpError {
    const fallbackMessage = 'Error desconocido. Intenta más tarde.';

    if (!error || !error.error || !error.error.error) {
        return {
            message: fallbackMessage,
            errors: ''
        };
    }

    const { message, details } = error.error.error;

    let errorsText = '';

    if (Array.isArray(details)) {
        for (const item of details) {
            for (const err of item.errors) {
                errorsText += `${err}\n`;
            }
        }
    }

    return {
        message: message || fallbackMessage,
        errors: errorsText.trim()
    };
}