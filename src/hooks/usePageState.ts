import {useWhenInit} from '@seamusleahy/init-hooks';
import * as gql from 'gql-query-builder';
import { useManualQuery } from 'graphql-hooks';
import { useState } from 'react';
import { useUpdateEffect } from './useUpdateEffect';
import {COLLECTION} from '../constants';

interface Filter {
    hasValue: {
        field: string
        intValues?: number[]
        stringValues?: string[]
    }
}

const GQL = gql.query({
    operation: 'interface',
    variables: {
        name: {
            list: false,
            required: true,
            type: 'String',
        }
    },
    fields: [{
        operation: 'search',
        variables: {
            // aggregations: {
            //     list: true,
            //     required: false,
            //     type: 'AggregationInput',
            // },
            filters: {
                list: true,
                required: false,
                type: 'FilterInput',
            },
            searchString: {
                list: false,
                required: true,
                type: 'String',
            }
        },
        fields: [
            'count',
            'total',
            // 'aggregationsAsJson',
            {
                hits: [
                    '_highlight',
                    '_json',
                    '_score',
                ]
            }
        ]
    }]
});


const range = (start: number, end: number) => start === end ? [start] : Array.from({length: (end - start)}, (v, k) => k + start);

export function usePageState() {
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const [ q, setQ ] = useState<string>('');
    const [ modelMin, setModelMin ] = useState(2000);
    const [ modelMax, setModelMax ] = useState(2023);
    const [ drivstoffValues, setDrivstoffValues ] = useState<string[]>([]);
    const [ searchString, setSearchString ] = useState<string>(q);
    const [ fetchResults, { loading, error, data } ] = useManualQuery(GQL.query);
    // if (error) {
    //     console.error(error);
    // }

    useWhenInit(() => {
        fetchResults({
            variables: {
                name: COLLECTION,
                searchString: '',
            }
        });
    });

    useUpdateEffect(() => {
        const filters: Filter[] = [{
            hasValue: {
                field: "modellar",
                intValues: range(modelMin, modelMax)
            }
        }];
        if (drivstoffValues.length) {
            filters.push({
                hasValue: {
                    field: "drivstoff",
                    stringValues: drivstoffValues
                }
            });
        }
        fetchResults({
            variables: {
                name: COLLECTION,
                searchString: '',
                filters
            }
        });
    }, [
        drivstoffValues,
        modelMin,
        modelMax
    ])

    return {
        // currentPage,
        data,
        drivstoffValues, setDrivstoffValues,
        // hint,
        loading,
        modelMin, setModelMin,
        modelMax, setModelMax,
        onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            // console.debug('onFormSubmit', q, searchString);
            event.preventDefault();
	        if (searchString !== q) {
                setSearchString(q);
                const filters: Filter[] = [{
                    hasValue: {
                        field: "modellar",
                        intValues: range(modelMin, modelMax)
                    }
                }];
                if (drivstoffValues.length) {
                    filters.push({
                        hasValue: {
                            field: "drivstoff",
                            stringValues: drivstoffValues
                        }
                    });
                }
                fetchResults({
                    variables: {
                        name: COLLECTION,
                        searchString: q, // q probably hasn't made it into searchString yet...
                        filters
                    }
                });
            }
        },
        onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== q) {
                setQ(event.target.value);
            }
        },
        placeholder: 'Search',
        q,
        searchString,
    }
}