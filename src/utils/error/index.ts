const getMessageFromError = (error: Error) => {
    return error.stack ? error.stack : error.message
}

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return getMessageFromError(error)
    }

    if (error && (error as { response: { data: Record<string, unknown> } }).response) {
        return (error as { response: { data: Record<string, unknown> } }).response.data
    }

    return error
}

export const getTextMessageFromError = (error: unknown) => {
    if (error instanceof Error) {
        return error.message
    }
    return null
}
