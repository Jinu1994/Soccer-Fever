import { ErrorHandler,Injectable } from '@angular/core';

@Injectable()
export class SFErrorHandler extends ErrorHandler {

    constructor(){
        super();
    }

  handleError(error) {

    alert(`Error occurred:${error.message}`);

  }

}