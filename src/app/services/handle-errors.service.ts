import { of } from 'rxjs/observable/of';
export class HandleError {
    public static handleError(error: Response) {
        console.error(error);
        return of(null);
    }
}  