import type { GraphQL } from '../types/GraphQL.d';

export function Sort({
    sortField,
    setSortField
}: {
    sortField: string,
    setSortField: React.Dispatch<React.SetStateAction<string>>
}) {
    return <div>
        <h2>Sortering</h2>
        <input type="radio" id="score" name="sort" value="score"
            checked={sortField === '_score'}
            onClick={() => {
                setSortField('_score');
            }}
            onChange={() => {/* avoid react warning*/}}
        />
        <label htmlFor="score">Normal</label>
        <br />
        <input type="radio" id="prisperkm" name="sort" value="prisperkm"
            checked={sortField === 'prisperkm'}
            onClick={() => {
                setSortField('prisperkm');
            }}
            onChange={() => {/* avoid react warning*/}}
        />
        <label htmlFor="prisperkm">Pris per km</label>
        <br />
        <input type="radio" id="prisperhestekreft" name="sort" value="prisperhestekreft"
            checked={sortField === 'prisperhestekreft'}
            onClick={() => {
                setSortField('prisperhestekreft');
            }}
            onChange={() => {/* avoid react warning*/}}
        />
        <label htmlFor="prisperhestekreft">Pris per effekt</label>
        <br />
        <input type="radio" id="prisperar" name="sort" value="prisperar"
            checked={sortField === 'prisperar'}
            onClick={() => {
                setSortField('prisperar');
            }}
            onChange={() => {/* avoid react warning*/}}
        />
        <label htmlFor="prisperar">Pris per år</label>
    </div>;
}