/** biome-ignore-all lint/complexity/noStaticOnlyClass: // TODO change to function instead of class */
/** biome-ignore-all lint/suspicious/noExplicitAny: // TODO change to function instead of class */
import { apiRes } from "./apiRes";

export class RAPIResponse {
  private static ar = apiRes;

  private static jsonResponse(
    status: number,
    message: Record<string, any> | string,
  ) {
    return Response.json(typeof message === "string" ? { message } : message, {
      status,
    });
  }

  static error(error: unknown, message?: string): Response {
    const errMssgs = message ? [message] : [];

    if (Array.isArray(error)) {
      error.forEach((e) => {
        console.error(e);
        if (e instanceof Error) errMssgs.push(e.message);
      });
    }

    if (error instanceof Error) {
      errMssgs.push(error.message);
    }

    return RAPIResponse.jsonResponse(
      400,
      RAPIResponse.ar.error(errMssgs.join("\n")),
    );
  }

  static unauthorised(): Response {
    return RAPIResponse.jsonResponse(401, RAPIResponse.ar.unauthorised);
  }

  static forbidden(): Response {
    return RAPIResponse.jsonResponse(403, RAPIResponse.ar.forbidden);
  }

  static missingParams(param: string | string[]): Response {
    return RAPIResponse.jsonResponse(400, RAPIResponse.ar.missingParams(param));
  }

  static notFound(item: string): Response {
    return RAPIResponse.jsonResponse(404, RAPIResponse.ar.notFound(item));
  }

  static itemAlreadyExists(item: string): Response {
    return RAPIResponse.jsonResponse(409, RAPIResponse.ar.alreadyExists(item));
  }

  static success(obj: Record<string, any> | any[]): Response {
    return RAPIResponse.jsonResponse(200, obj);
  }

  static wrongType(item: string): Response {
    return RAPIResponse.jsonResponse(422, RAPIResponse.ar.wrongType(item));
  }

  static contentTooLarge(content: string, maxSize?: string): Response {
    return RAPIResponse.jsonResponse(
      413,
      RAPIResponse.ar.contentTooLarge(content, maxSize),
    );
  }
}
