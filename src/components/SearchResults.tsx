import type { GraphQL } from '../types/GraphQL';

import DOMPurify from 'dompurify';

function numberWithSeparator(x: number, separator = ' ') {
    return !x ? '' : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
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
                                ? 'c-red'
                                : modellar == data?.interface.search.aggregationsAsJson.modellarStats.max
                                    ? 'c-green'
                                    : ''
                            : ''
                        }>{modellar}</dd>
                        <dt>Totalpris</dt>
                        <dd className={
                            data?.interface.search.aggregationsAsJson.prisStats.min
                            ? pris == data?.interface.search.aggregationsAsJson.prisStats.min
                                ? 'c-green'
                                : pris == data?.interface.search.aggregationsAsJson.prisStats.max
                                    ? 'c-red'
                                    : ''
                            : ''
                        }>{numberWithSeparator(pris)} kr</dd>
                        <dt>Kilometer</dt>
                        <dd className={
                            data?.interface.search.aggregationsAsJson.kmStats.min
                            ? km == data?.interface.search.aggregationsAsJson.kmStats.min
                                ? 'c-green'
                                : km == data?.interface.search.aggregationsAsJson.kmStats.max
                                    ? 'c-red'
                                    : ''
                            : ''
                        }>{numberWithSeparator(km, '.')} km</dd>
                        <dt>Effekt</dt>
                        <dd className={
                            data?.interface.search.aggregationsAsJson.effektStats.min
                            ? hestekrefter == data?.interface.search.aggregationsAsJson.effektStats.min
                                ? 'c-red'
                                : hestekrefter == data?.interface.search.aggregationsAsJson.effektStats.max
                                    ? 'c-green'
                                    : ''
                            : ''
                        }>{hestekrefter}</dd>
                        {!prisperkm ? null : <>
                            <dt>Pris/Km</dt>
                            <dd>{data?.interface.search.aggregationsAsJson.prisperkmStats.min
                                ? prisperkm == data?.interface.search.aggregationsAsJson.prisperkmStats.min
                                    ? <em className='c-green'>{prisperkm}</em>
                                    : prisperkm == data?.interface.search.aggregationsAsJson.prisperkmStats.max
                                        ? <em className='c-red'>{prisperkm}</em>
                                        : prisperkm
                                : prisperkm
                            }</dd>
                        </>}
                        {!prisperhestekreft ? null : <>
                            <dt>Pris/Hk</dt>
                            <dd>{data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min
                                ? prisperhestekreft == data?.interface.search.aggregationsAsJson.prisperhestekreftStats.min
                                    ? <em className='c-green'>{prisperhestekreft}</em>
                                    : prisperhestekreft == data?.interface.search.aggregationsAsJson.prisperhestekreftStats.max
                                        ? <em className='c-red'>{prisperhestekreft}</em>
                                        : prisperhestekreft
                                : prisperhestekreft
                            }</dd>
                        </>}
                        {!prisperar ? null : <>
                            <dt>Pris/Alder</dt>
                            <dd>{data?.interface.search.aggregationsAsJson.prisperarStats.min
                                ? prisperar == data?.interface.search.aggregationsAsJson.prisperarStats.min
                                    ? <em className='c-green'>{prisperar}</em>
                                    : prisperar == data?.interface.search.aggregationsAsJson.prisperarStats.max
                                        ? <em className='c-red'>{prisperar}</em>
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