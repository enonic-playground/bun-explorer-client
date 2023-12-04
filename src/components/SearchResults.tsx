import type { GraphQL } from '../types/GraphQL';


export function SearchResults({
    data,
    loading
}: {
    data: {
        interface: GraphQL.Interface
    } | undefined
    loading: boolean
}) {
    return <div className="search-results">
        <ul>
        {
            !data ? null : data.interface.search.hits.map(({_json: {
                bildebase64,
                modellar,
                prisperar,
                prisperkm,
                prisperhestekreft,
                subtitle,
                title,
                totalpris
            }}, i) => <li key={i}>
                <article>
                    {
                        !bildebase64 ? null : <img src={`data:image/jpeg;base64,${bildebase64}`} width={100}/>
                    }
                    <header>{title}</header>
                    <p>{subtitle}</p>
                    <div className="d-f jc-sb">
                        <p>{modellar}</p>
                        <p>{totalpris}</p>
                    </div>
                    <dl>
                        {!prisperar ? null : <>
                            <dt>Pris/Alder</dt>
                            <dd>{prisperar}</dd>
                        </>}
                        {!prisperkm ? null : <>
                            <dt>Pris/Km</dt>
                        <dd>{prisperkm}</dd>
                        </>}
                        {!prisperhestekreft ? null : <>
                            <dt>Pris/Hk</dt>
                            <dd>{prisperhestekreft}</dd>
                        </>}
                    </dl>
                </article>
            </li>)
        }
        </ul>
    </div>;
}