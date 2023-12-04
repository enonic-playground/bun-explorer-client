export function Best({
    best,
    data,
    setBest,
    setBestValue,
}: {
    best: 'km'|'alder'|'effekt'|undefined
    data: any
    setBest: React.Dispatch<React.SetStateAction<'km'|'alder'|'effekt'|undefined>>
    setBestValue: React.Dispatch<React.SetStateAction<number|undefined>>
}) {
    return <div className="best">
        <h2>Best</h2>
        
        {!data?.interface?.search?.aggregationsAsJson?.prisperkmStats?.min ? null :
            <div>
                <input type="radio" id="km" name="best" value="km"
                    checked={best === 'km'}
                    onClick={() => {
                        setBest(prev => prev === 'km' ? undefined : 'km');
                        setBestValue(data?.interface?.search?.aggregationsAsJson?.prisperkmStats?.min)
                    }}
                    onChange={() => {/* avoid react warning*/}}
                />
                <label htmlFor="km">Km</label>
            </div>}
        {!data?.interface?.search?.aggregationsAsJson?.prisperhestekreftStats?.min ? null :
            <div>
                <input type="radio" id="effekt" name="best" value="effekt"
                    checked={best === 'effekt'}
                    onClick={() => {
                        setBest(prev => prev === 'effekt' ? undefined : 'effekt');
                        setBestValue(data?.interface?.search?.aggregationsAsJson?.prisperhestekreftStats?.min)
                    }}
                    onChange={() => {/* avoid react warning*/}}
                />
                <label htmlFor="effekt">Effekt</label>
            </div>}
        {!data?.interface?.search?.aggregationsAsJson?.prisperarStats?.min ? null :
            <div>
                <input type="radio" id="alder" name="best" value="alder"
                    checked={best === 'alder'}
                    onClick={() => {
                        setBest(prev => prev === 'alder' ? undefined : 'alder');
                        setBestValue(data?.interface?.search?.aggregationsAsJson?.prisperarStats?.min)
                    }}
                    onChange={() => {/* avoid react warning*/}}
                />
                <label htmlFor="alder">Alder</label>
            </div>}
    </div>;
}