import type { GraphQL } from '../types/GraphQL';

import DOMPurify from 'dompurify';

function numberWithCommas(x: number) {
    return !x ? '' : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function SearchResults({
    data,
    loading
}: {
    data: {
        interface: GraphQL.Interface
    } | undefined
    loading: boolean
}) {
    console.debug(typeof data?.interface.search.aggregationsAsJson.prisperkmStats.min, data?.interface.search.aggregationsAsJson.prisperkmStats.min);
    return <div className="search-results">
        <ul>
        {
            !data ? null : data.interface.search.hits.map(({
                _highlight,
                _json: {
                    bildebase64,
                    kilometer,
                    modellar,
                    prisperar,
                    prisperkm,
                    prisperhestekreft,
                    subtitle,
                    title,
                    totalpris,
                }
            }, i) => <li key={i}>
                <article>
                    {
                        !bildebase64 ? null : <img src={`data:image/jpeg;base64,${bildebase64}`} width={100}/>
                    }
                    <header dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(_highlight && _highlight.title && _highlight.title[0] ? _highlight.title[0] : title) }}/>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(_highlight && _highlight.subtitle && _highlight.subtitle[0] ? _highlight.subtitle[0] : subtitle) }}/>
                    <dl>
                        <dt>Modell</dt>
                        <dd>{modellar}</dd>
                        <dt>Totalpris</dt>
                        <dd>{numberWithCommas(totalpris)} kr</dd>
                        <dt>Kilometer</dt>
                        <dd>{kilometer} km</dd>
                        {!prisperkm ? null : <>
                            <dt>Pris/Km</dt>
                            <dd>{data?.interface.search.aggregationsAsJson.prisperkmStats.min
                                ? prisperkm == data?.interface.search.aggregationsAsJson.prisperkmStats.min
                                    ? <em>{prisperkm}</em>
                                    : prisperkm
                                : prisperkm
                            }</dd>
                        </>}
                        {!prisperhestekreft ? null : <>
                            <dt>Pris/Hk</dt>
                            <dd>{data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min
                                ? prisperhestekreft == data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min
                                    ? <em>{prisperhestekreft}</em>
                                    : prisperhestekreft
                                : prisperhestekreft
                            }</dd>
                        </>}
                        {!prisperar ? null : <>
                            <dt>Pris/Alder</dt>
                            <dd>{data?.interface.search.aggregationsAsJson.prisperarStats.min
                                ? prisperar == data?.interface.search.aggregationsAsJson.prisperarStats.min
                                    ? <em>{prisperar}</em>
                                    : prisperar
                                : prisperar
                            }</dd>
                        </>}
                    </dl>
                </article>
            </li>)
        }
        </ul>
    </div>;
}