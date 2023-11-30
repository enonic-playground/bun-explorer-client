import type React from 'react'


export interface SearchFormProps {
    // currentPage: number
    disabled: boolean
    onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    q: string
    // searchString: string
}