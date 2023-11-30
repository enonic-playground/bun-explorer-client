import type {SearchFormProps} from '../index.d';


export function SearchForm({
    // currentPage,
    disabled,
    onFormSubmit,
    onInputChange,
    placeholder,
    q,
    // searchString
}: SearchFormProps) {
    return <div className="search-form">
        <form
            acceptCharset="utf-8"
            className="search-form__form"
            onSubmit={onFormSubmit}
            >
            <input
                autoComplete="off"
                className="search-form__input"
                disabled={disabled}
                name="q"
                onChange={onInputChange}
                placeholder={placeholder}
                type="text"
                value={q}
            />
            <button className="search-form__button" disabled={disabled} tabIndex={-1} type="submit">
                <svg className="search-form__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                    <path d="M35.52 31.23l-8.88-8.88c1.45-2.24 2.3-4.9 2.3-7.76C28.94 6.7 22.5.25 14.6.25A14.36 14.36 0 0 0 .25 14.6c0 7.92 6.44 14.35 14.35 14.35 2.85 0 5.51-.85 7.75-2.3l8.88 8.88c.3.3.78.3 1.07 0l3.23-3.22c.3-.3.3-.78 0-1.07zM4.81 14.59a9.8 9.8 0 0 1 19.57 0 9.8 9.8 0 0 1-19.57 0z"></path>
                </svg>
            </button>
        </form>
    </div>;
}