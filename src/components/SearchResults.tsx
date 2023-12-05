import type { GraphQL } from '../types/GraphQL';

import DOMPurify from 'dompurify';

function numberWithSeparator(x: number, separator = ' ') {
    return !x ? '' : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function stringWithSeparator(s: string, separator = ' ') {
    return !s ? '' : s.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
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
    return <div className="search-results">
        <ul>
        {
            !data ? null : data.interface.search.hits.map(({
                _highlight,
                _json: {
                    bildebase64,
                    hestekrefter,
                    km,
                    modellar,
                    pris,
                    prisperar,
                    prisperkm,
                    prisperhestekreft,
                    subtitle,
                    title
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
                        <dd className={
                            data?.interface.search.aggregationsAsJson.modellarStats.min
                            ? modellar == data?.interface.search.aggregationsAsJson.modellarStats.min
                                ? 'c-worst'
                                : modellar == data?.interface.search.aggregationsAsJson.modellarStats.max
                                    ? 'c-best'
                                    : ''
                            : ''
                        }>{modellar}</dd>
                        <dt>Totalpris</dt>
                        <dd className={
                            data?.interface.search.aggregationsAsJson.prisStats.min
                            ? pris == data?.interface.search.aggregationsAsJson.prisStats.min
                                ? 'c-best'
                                : pris == data?.interface.search.aggregationsAsJson.prisStats.max
                                    ? 'c-worst'
                                    : ''
                            : ''
                        }>{numberWithSeparator(pris)} kr</dd>
                        <dt>Kilometer</dt>
                        <dd className={
                            data?.interface.search.aggregationsAsJson.kmStats.min
                            ? km == data?.interface.search.aggregationsAsJson.kmStats.min
                                ? 'c-best'
                                : km == data?.interface.search.aggregationsAsJson.kmStats.max
                                    ? 'c-worst'
                                    : ''
                            : ''
                        }>{numberWithSeparator(km, '.')} km</dd>
                        <dt>Effekt</dt>
                        <dd className={
                            data?.interface.search.aggregationsAsJson.effektStats.min
                            ? hestekrefter == data?.interface.search.aggregationsAsJson.effektStats.min
                                ? 'c-worst'
                                : hestekrefter == data?.interface.search.aggregationsAsJson.effektStats.max
                                    ? 'c-best'
                                    : ''
                            : ''
                        }>{hestekrefter} Hk</dd>
                        {!prisperkm ? null : <>
                            <dt>Pris/Km</dt>
                            <dd className={
                                data?.interface.search.aggregationsAsJson.prisperkmStats.min
                                ? prisperkm == data?.interface.search.aggregationsAsJson.prisperkmStats.min
                                    ? 'c-best'
                                    : prisperkm == data?.interface.search.aggregationsAsJson.prisperkmStats.max
                                        ? 'c-worst'
                                        : ''
                                : ''
                            }>{stringWithSeparator(Number(prisperkm).toFixed(2))} kr</dd>
                        </>}
                        {!prisperhestekreft ? null : <>
                            <dt>Pris/Hk</dt>
                            <dd className={
                                data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min
                                ? prisperhestekreft == data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min
                                    ? 'c-best'
                                    : prisperhestekreft == data?.interface.search.aggregationsAsJson.prisperhestekreftStats.max
                                        ? 'c-worst'
                                        : ''
                                : ''
                            }>{stringWithSeparator(Number(prisperhestekreft).toFixed(2))} kr</dd>
                        </>}
                        {!prisperar ? null : <>
                            <dt>Pris/Alder</dt>
                            <dd className={
                                data?.interface.search.aggregationsAsJson.prisperarStats.min
                                ? prisperar == data?.interface.search.aggregationsAsJson.prisperarStats.min
                                    ? 'c-best'
                                    : prisperar == data?.interface.search.aggregationsAsJson.prisperarStats.max
                                        ? 'c-worst'
                                        : ''
                                : ''
                            }>{stringWithSeparator(Number(prisperar).toFixed(2))} kr</dd>
                        </>}
                    </dl>
                </article>
            </li>)
        }
        </ul>
    </div>;
}