import type { GraphQL } from '../types/GraphQL';


export function Best({
    best,
    data,
    setBest,
    setBestValue,
}: {
    best: 'km'|'alder'|'effekt'|undefined
    data: {
        interface: GraphQL.Interface
    } | undefined
    setBest: React.Dispatch<React.SetStateAction<'km'|'alder'|'effekt'|undefined>>
    setBestValue: React.Dispatch<React.SetStateAction<number|undefined>>
}) {
    return <div className="best">
        <h2>Best</h2>
        <div>
            <input type="radio" id="off" name="best" value="off"
                checked={best === undefined}
                onClick={() => {
                    setBest(undefined);
                }}
                onChange={() => {/* avoid react warning*/}}
            />
            <label htmlFor="off">- av -</label>
        </div>
        <div>
            <input type="radio" id="km" name="best" value="km"
                checked={best === 'km'}
                onClick={() => {
                    if (data?.interface.search.aggregationsAsJson.prisperkmStats.min) {
                        setBest(prev => prev === 'km' ? undefined : 'km');
                        setBestValue(data?.interface.search.aggregationsAsJson.prisperkmStats.min)
                    } else {
                        setBest(undefined);
                    }
                }}
                onChange={() => {/* avoid react warning*/}}
            />
            <label htmlFor="km">Km</label>
        </div>
        <div>
            <input type="radio" id="effekt" name="best" value="effekt"
                checked={best === 'effekt'}
                onClick={() => {
                    if (data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min) {
                        setBest(prev => prev === 'effekt' ? undefined : 'effekt');
                        setBestValue(data?.interface.search.aggregationsAsJson?.prisperhestekreftStats.min)
                    } else {
                        setBest(undefined);
                    }
                }}
                onChange={() => {/* avoid react warning*/}}
            />
            <label htmlFor="effekt">Effekt</label>
        </div>
        <div>
            <input type="radio" id="alder" name="best" value="alder"
                checked={best === 'alder'}
                onClick={() => {
                    if (data?.interface.search.aggregationsAsJson.prisperarStats.min) {
                        setBest(prev => prev === 'alder' ? undefined : 'alder');
                        setBestValue(data?.interface.search.aggregationsAsJson.prisperarStats.min)
                    } else {
                        setBest(undefined);
                    }
                }}
                onChange={() => {/* avoid react warning*/}}
            />
            <label htmlFor="alder">Alder</label>
        </div>
    </div>;
}