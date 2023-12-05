import type { Filter } from './types/Filter';


export const COLLECTION = 'biler';

export const DEFAULT_FILTERS: Filter[] = [{
    exists: {
        field: 'pris'
    }
}, {
    exists: {
        field: 'modellar'
    }
}, {
    exists: {
        field: 'km'
    }
}, {
    exists: {
        field: 'hestekrefter'
    }
}];