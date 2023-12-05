import type { GraphQL } from '../types/GraphQL.d';

export function Sort({
    sort,
    setSort,
}: {
    sort: GraphQL.Sort[]
    setSort: React.Dispatch<React.SetStateAction<GraphQL.Sort[]>>
}) {
    return <div>
        <h2>Sortering</h2>
        <select
            id="sort"
            name="sort"
            onChange={(e) => {
                const [field, direction] = e.target.value.split('-') as [string, 'asc' | 'desc'];
                setSort([{
                    field,
                    direction
                }]);
            }}
            value={`${sort[0].field}-${sort[0].direction}`}
        >
            <option value="_score-desc">Relevans</option>
            <option value="prisperkm-asc">Pris per km (lav)</option>
            <option value="prisperkm-desc">Pris per km (høy)</option>
            <option value="prisperhestekreft-asc">Pris per effekt (lav)</option>
            <option value="prisperhestekreft-desc">Pris per effekt (høy)</option>
            <option value="prisperar-asc">Pris per år (lav)</option>
            <option value="prisperar-desc">Pris per år (høy)</option>
            <option value='pris-asc'>Pris (lav)</option>
            <option value='pris-desc'>Pris (høy)</option>
            <option value='km-asc'>Kilometer (lav)</option>
            <option value='km-desc'>Kilometer (høy)</option>
            <option value='modellar-asc'>Årsmodell (lav)</option>
            <option value='modellar-desc'>Årsmodell (høy)</option>
            <option value='hestekrefter-asc'>Effekt (lav)</option>
            <option value='hestekrefter-desc'>Effekt (høy)</option>
        </select>
    </div>;
}
