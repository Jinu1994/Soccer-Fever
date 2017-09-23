import {Injectable} from '@angular/core'
import {Competition} from '../pages/competitions/competition'

@Injectable()
export class Globals {
    competitions:Competition[];
    selectedCompetition:Competition;
    apiToken="7ee428eb8008489186fe2f17a348a1c6";
}