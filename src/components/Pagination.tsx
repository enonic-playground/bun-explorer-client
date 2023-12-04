import type { GraphQL } from '../types/GraphQL';

import {range} from '../utils/range';


export function Pagination({
    data,
    perPage,
    setPerPage,
    start,
    setStart
}: {
    data: {
        interface: GraphQL.Interface
    } | undefined
    perPage: number
    setPerPage: (perPage: number) => void
    start: number
    setStart: (start: number) => void
}) {
    const total = data?.interface.search.total;
    const pages = total ? Math.ceil(total / perPage) : 0;
    const page = Math.ceil(start / perPage) + 1;

    return <div className='pagination'>
        <h2>Pagination</h2>
        <input
            id='perPage'
            inputMode='numeric'
            onKeyDown={(event) => (
                event.key === 'e'
                || event.key === '-'
                || event.key === '.'
            ) && event.preventDefault()}
            onInput={(event) => {
                const { value } = event.target as unknown as { value: string }
                const newPerPage = parseInt(value);
                if (newPerPage > 100) {
                    setPerPage(100);
                } else if (newPerPage < 1) {
                    setPerPage(1);
                } else {
                    setPerPage(newPerPage);
                }
            }}
            min={1}
            max={100}
            name='perPage'
            pattern="\d{1,3}"
            size={3}
            step={1}
            type='number'
            value={perPage}
        />
        <label htmlFor="perPage">Per page</label>
        <br />
        <input
            id='start'
            inputMode='numeric'
            onKeyDown={(event) => (
                event.key === 'e'
                || event.key === '-'
                || event.key === '.'
            ) && event.preventDefault()}
            onInput={(event) => {
                const { value } = event.target as unknown as { value: string }
                const newStart = parseInt(value);
                if (newStart > 100) {
                    setStart(100);
                } else if (newStart < 0) {
                    setStart(0);
                } else {
                    setStart(newStart);
                }
            }}
            min={0}
            max={100}
            name='start'
            pattern="\d{1,3}"
            size={3}
            step={1}
            type='number'
            value={start}
        />
        <label htmlFor="start">Offset</label>
        <br />
        {!data ? null : <>
            <input
                disabled
                id='total'
                name='total'
                readOnly
                size={total?.toString().length}
                type='number'
                value={total}
            />
            <label htmlFor="total">Total</label>
            <br />
            
            <br />
            <button disabled={start==0} onClick={() => setStart(0)}>Første (1)</button>
            <br />
            <button disabled={start==0} onClick={() => {
                const newStart = (page - 2) * perPage;
                setStart(newStart)
            }}>Forrige ({Math.max(page - 1, 1)})</button>
            <br />
            <input
                disabled
                id='page'
                name='page'
                readOnly
                size={page?.toString().length}
                type='number'
                value={page}
            />
            <label htmlFor="page">Page</label>
            <br />
            <button disabled={page === pages} onClick={() => {
                const newStart = (page) * perPage;
                setStart(newStart)
            }}>Neste ({Math.min(page + 1, pages)})</button>
            <br />
            <button disabled={page === pages} onClick={() => {
                const newStart = (pages - 1) * perPage;
                setStart(newStart)
            }}>Siste ({pages})</button>
            <br/>
            <input
                disabled
                id='pages'
                name='pages'
                readOnly
                size={pages?.toString().length}
                type='number'
                value={pages}
            />
            <label htmlFor="pages">Pages</label>
            <br />
            <br/>
            <h3>Page</h3>
            {pages <= 0 ? null : range(1, pages+1).map((p, i) => <div key={i}>
                <button disabled={false} onClick={() => {
                    const newStart = (p - 1) * perPage;
                    setStart(newStart);
                }}>{p}</button>
            </div>)}
        </>}
    </div>;
}