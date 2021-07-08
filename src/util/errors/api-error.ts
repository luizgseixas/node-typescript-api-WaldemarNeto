import httpStatusCodes from 'http-status-codes';

export interface APIError {
  message: string;
  code: number;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface APIErrorResponse extends Omit<APIError, 'codeAsSting'> {
  error: string;
}

export default class ApiError {
  public static format(error: APIError): APIErrorResponse {
    return {
      ...{
        message: error.message,
        code: error.code,
        error: error.codeAsString
          ? error.codeAsString
          : httpStatusCodes.getStatusText(error.code),
      },
      ...(error.documentation && { documentatio: error.documentation }),
      ...(error.description && { description: error.description }),
    };
  }
}