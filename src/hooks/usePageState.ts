import type { GraphQL } from '../types/GraphQL';


import {useWhenInit} from '@seamusleahy/init-hooks';
import * as gql from 'gql-query-builder';
import { useManualQuery } from 'graphql-hooks';
import { useState } from 'react';
import { useUpdateEffect } from './useUpdateEffect';
import {COLLECTION} from '../constants';
import {range} from '../utils/range';

interface Filter {
    hasValue: {
        field: string
        floatValues?: number[]
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
            aggregations: {
                list: true,
                required: false,
                type: 'AggregationInput',
            },
            count: {
                list: false,
                required: false,
                type: 'Int',
            },
            filters: {
                list: true,
                required: false,
                type: 'FilterInput',
            },
            searchString: {
                list: false,
                required: true,
                type: 'String',
            },
            start: {
                list: false,
                required: false,
                type: 'Int',
            },
        },
        fields: [
            'count',
            'total',
            'aggregationsAsJson',
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

const AGGREGATIONS = [{
    name: "prisperkmStats",
    stats: {
        field: "prisperkm"
    } 
},{
    name: "prisperarStats",
    stats: {
        field: "prisperar"
    } 
},{
    name: "prisperhestekreftStats",
    stats: {
        field: "prisperhestekreft"
    }
}];

export function usePageState() {
    const [ q, setQ ] = useState<string>('');
    const [ modelMin, setModelMin ] = useState(2000);
    const [ modelMax, setModelMax ] = useState(2023);
    const [ drivstoffValues, setDrivstoffValues ] = useState<string[]>([]);
    const [ searchString, setSearchString ] = useState<string>(q);
    const [ fetchResults, { loading, error, data } ] = useManualQuery<{
        interface: GraphQL.Interface
    }>(GQL.query);

    const [ best, setBest ] = useState<'km'|'alder'|'effekt'>();
    const [ bestValue, setBestValue ] = useState<number>();
    // console.debug('best', best, 'bestValue', bestValue);

    const [perPage, setPerPage] = useState<number>(10);
    const [start, setStart] = useState<number>(0);

    const [firstOnPage, setFirstOnPage] = useState<number>(1);
    const [lastOnPage, setLastOnPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    useWhenInit(() => {
        fetchResults({
            variables: {
                aggregations: AGGREGATIONS,
                count: perPage,
                name: COLLECTION,
                searchString: '',
                start,
            }
        });
    });

    useUpdateEffect(() => {
        setFirstOnPage(start + 1);
    },[
        start
    ]);

    useUpdateEffect(() => {
        const newTotal = data?.interface.search.total || 0;
        setTotal(newTotal);
    },[
        data
    ]);

    useUpdateEffect(() => {
        const startPlussPerPage = start + perPage;
        setLastOnPage(Math.min(startPlussPerPage, total));
    },[
        perPage,
        start,
        total
    ]);

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
        if(best && bestValue) {
            filters.push({
                hasValue: {
                    field: best === 'alder' ? 'prisperar' : best === 'km' ? 'prisperkm' : 'prisperhestekreft',
                    floatValues: [bestValue]
                }
            });
        }
        fetchResults({
            variables: {
                aggregations: AGGREGATIONS,
                count: perPage,
                name: COLLECTION,
                searchString: '',
                filters,
                start,
            }
        });
    }, [
        best,
        perPage,
        drivstoffValues,
        modelMin,
        modelMax,
        start
    ])

    return {
        best, setBest, bestValue, setBestValue,
        data,
        drivstoffValues, setDrivstoffValues,
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
                if(best && bestValue) {
                    filters.push({
                        hasValue: {
                            field: best === 'alder' ? 'prisperar' : best === 'km' ? 'prisperkm' : 'prisperhestekreft',
                            floatValues: [bestValue]
                        }
                    });
                }
                fetchResults({
                    variables: {
                        aggregations: AGGREGATIONS,
                        count: perPage,
                        name: COLLECTION,
                        searchString: q, // q probably hasn't made it into searchString yet...
                        filters,
                        start,
                    }
                });
            }
        },
        onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== q) {
                setQ(event.target.value);
            }
        },
        perPage, setPerPage,
        placeholder: 'Search',
        q,
        searchString,
        start, setStart,
        firstOnPage, lastOnPage, total,
    }
}