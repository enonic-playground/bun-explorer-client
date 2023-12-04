export namespace GraphQL {
    export interface Hit {
        _highlight: {
            _allText: string[]
            title: string[]
            subtitle: string[]
        }
        _json: {
            antall_dorer: number
            antall_seter: number
            avgiftsklasse: string
            bilen_star_i: string
            bildebase64: string
            drivstoff: string
            effekt: number
            kilometer: number
            farge: string
            fargebeskrivelse: string
            gang_registrert: string
            girkasse: string
            hjuldrift: string
            interiorfarge: string
            karosseri: string
            modellar: string
            prisperar: number
            prisperhestekreft: number
            prisperkm: number
            salgsform: string
            subtitle: string
            title: string
            totalpris: number
            utstyr: string[]
            vedlikehold: string
            vekt: number
        }
        _score: number
    }
    
    export interface Search {
        aggregationsAsJson: {
            prisperarStats: {
                avg: number
                count: number
                max?: number
                min?: number
                sum: number
            }
            prisperhestekreftStats: {
                avg: number
                count: number
                max?: number
                min?: number
                sum: number
            }
            prisperkmStats: {
                avg: number
                count: number
                max?: number
                min?: number
                sum: number
            }
        }
        count: number
        hits: Hit[]
        total: number
    }
    
    export interface Interface {
        search: Search
    }

    export interface Sort {
        field: string
        direction: "asc" | "desc"
        location?: {
            lat: number
            lon: number
        }
        // unit?: "km"
    }
}