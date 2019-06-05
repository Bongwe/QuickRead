export class NotificationObj {
  message?: string;
  isSuccess?: boolean;
  isError?: boolean;
  constructor(message: string = null, isSuccess: boolean = false, isError: boolean = false) {
    this.message = message;
    this.isSuccess = isSuccess;
    this.isError = isError;
  }
}
