export type ApiErrorType = Error & {
	infos: { statusCode: number }
}

type ApiErrorInfos = {
	message?: string,
	statusCode?: number
}

/**
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP Status code
 * @property {string} message - Error message
 */
class ApiError extends Error {
	infos: ApiErrorInfos

	constructor(message: string, infos: ApiErrorInfos) {
		super(message);
		this.infos = infos;
	}
}

export default ApiError;
