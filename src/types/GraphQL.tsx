export namespace GraphQL {
    export interface Hit {
        // _highlight
        _json: {
            antall_dorer: number
            antall_seter: number
            avgiftsklasse: string
            bilen_star_i: string
            bildebase64: string
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
        count: number
        hits: Hit[]
        total: number
    }
    
    export interface Interface {
        search: Search
    }
}