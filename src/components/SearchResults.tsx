export function SearchResults({
    data,
    loading
}: {
    data: {
        interface: {
            search: {
                hits: {
                    // _highlight
                    _json: {
                        antall_dorer: number
                        antall_seter: number
                        avgiftsklasse: string
                        bilen_star_i: string
                        drivstoff: string
                        effekt: number
                        farge: string
                        fargebeskrivelse: string
                        gang_registrert: string
                        girkasse: string
                        hjuldrift: string
                        interiorfarge: string
                        karosseri: string
                        modellar: string
                        salgsform: string
                        subtitle: string
                        title: string
                        totalpris: number
                        utstyr: string[]
                        vedlikehold: string
                        vekt: number
                    }
                    _score: number
                }[]
            }
        }
    }|undefined,
    loading: boolean
}) {
    return <div className="search-results">
        <ul>
        {
            !data ? null : data.interface.search.hits.map(({_json: {
                modellar,
                subtitle,
                title,
                totalpris
            }}, i) => <li key={i}>
                <article>
                    <header>{title}</header>
                    <p>{subtitle}</p>
                    <div className="d-f jc-sb">
                        <p>{modellar}</p>
                        <p>{totalpris}</p>
                    </div>
                </article>
            </li>)
        }
        </ul>
    </div>;
}