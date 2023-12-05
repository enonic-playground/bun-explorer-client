export interface Filter {
    exists?: {
        field: string
    }
    hasValue?: {
        field: string
        floatValues?: number[]
        intValues?: number[]
        stringValues?: string[]
    }
    notExists?: {
        field: string
    }
}