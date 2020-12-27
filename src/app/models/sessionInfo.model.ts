import { RelationCards } from './relationCards.model';

export class SessionInfo {
    key: string;
    user: string;
    game: string;
    historyRelations: RelationCards[] = [];
    finish = false;
}
