export class BaseResponse {
    success: boolean;
    message: string;
    data: object;

    constructor(success: boolean, message: string, data: object) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(data: object, message: string = 'Ok') {
        return new BaseResponse(true, message, data);
    }

    static error(message: string) {
        return new BaseResponse(false, message, null);
    }
}