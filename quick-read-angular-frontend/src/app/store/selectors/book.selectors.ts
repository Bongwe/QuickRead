import {IAppState} from "../state/app.state";

export const selectBooks = (state: IAppState) => state.books;
