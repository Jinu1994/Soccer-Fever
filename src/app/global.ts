import { Injectable } from '@angular/core';
import { Competition } from '../pages/competitions/competition';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Globals {
    competitions:Competition[];
    selectedCompetition:Competition;
    apiToken="7ee428eb8008489186fe2f17a348a1c6";
    competitionsFetched:Subject<boolean>=new Subject<boolean>();
}