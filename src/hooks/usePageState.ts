import {useWhenInit} from '@seamusleahy/init-hooks';
import * as gql from 'gql-query-builder';
import { useManualQuery } from 'graphql-hooks';
import { useState } from 'react';
import { useUpdateEffect } from './useUpdateEffect';
import {COLLECTION} from '../constants';

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
        fetchResults({
            variables: {
                name: COLLECTION,
                searchString: '',
                filters: [{
                    hasValue: {
                        field: "modellar",
                        intValues: range(modelMin, modelMax)
                      }
                }]
            }
        });
    }, [
        modelMin,
        modelMax
    ])

    return {
        // currentPage,
        data,
        // hint,
        loading,
        modelMin, setModelMin,
        modelMax, setModelMax,
        onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            // console.debug('onFormSubmit', q, searchString);
            event.preventDefault();
	        if (searchString !== q) {
                setSearchString(q);
                fetchResults({
                    variables: {
                        name: COLLECTION,
                        searchString: q, // q probably hasn't made it into searchString yet...
                        filters: [{
                            hasValue: {
                                field: "modellar",
                                intValues: range(modelMin, modelMax)
                              }
                        }]
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