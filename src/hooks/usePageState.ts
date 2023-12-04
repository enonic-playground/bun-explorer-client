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
            highlight: {
                list: false,
                required: false,
                type: 'InputTypeHighlight',
            },
            searchString: {
                list: false,
                required: true,
                type: 'String',
            },
            sort: {
                list: true,
                required: false,
                type: 'SortInput',
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

const HIGHLIGHT = {
    fields: [{
        field: "title"
    },{
        field: "subtitle"
    },{
        field: "_allText"
    }]
};

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
    const [sort, setSort] = useState<GraphQL.Sort[]>([{
        field: "_score",
        direction: "desc"
    }]);
    const [sortField, setSortField] = useState<string>('_score');

    useWhenInit(() => {
        fetchResults({
            variables: {
                aggregations: AGGREGATIONS,
                count: perPage,
                // highlight: HIGHLIGHT,
                name: COLLECTION,
                searchString: '',
                sort,
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
        switch (sortField) {
            case 'prisperkm':
                setSort([{
                    field: "prisperkm",
                    direction: "asc"
                }]);
                break;
            case 'prisperar':
                setSort([{
                    field: "prisperar",
                    direction: "asc"
                }]);
                break;
            case 'prisperhestekreft':
                setSort([{
                    field: "prisperhestekreft",
                    direction: "asc"
                }]);
                break;
            default:
                setSort([{
                    field: "_score",
                    direction: "desc"
                }]);
        }
    },[
        sortField
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
                highlight: HIGHLIGHT,
                name: COLLECTION,
                searchString,
                filters,
                sort,
                start,
            }
        });
    }, [
        best,
        perPage,
        drivstoffValues,
        modelMin,
        modelMax,
        sort,
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
                        highlight: HIGHLIGHT,
                        name: COLLECTION,
                        searchString: q, // q probably hasn't made it into searchString yet...
                        filters,
                        sort,
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
        sortField, setSortField
    }
}