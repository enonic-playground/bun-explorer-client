import {useWhenInitAsync} from '@seamusleahy/init-hooks';
import * as gql from 'gql-query-builder';
import { useManualQuery } from 'graphql-hooks';
// import { useState } from 'react';
import {COLLECTION} from '../constants';

const GQL = gql.query({
    operation: 'interface',
    variables: {
        name: {
            list: false,
            required: true,
            type: 'String',
            // value: COLLECTION
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
                // value: 0
            },
            searchString: {
                list: false,
                required: true,
                type: 'String',
                // value: ''
            }
        },
        fields: [
            'aggregationsAsJson',
        ]
    }]
});

export function Drivstoff({
    drivstoffValues,
    setDrivstoffValues
}: {
    drivstoffValues: string[],
    setDrivstoffValues: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const [ fetchResults, { loading, error, data } ] = useManualQuery(GQL.query);
    useWhenInitAsync(() => {
        fetchResults({
            variables: {
                name: COLLECTION,
                searchString: '',
                count: 0,
                aggregations: [{
                    name:"drivstoff",
                    terms: {
                        field: "drivstoff"
                    }
                }]
            }
        });
    });
    // console.log('drivstoffValues', drivstoffValues);
    // console.log('data', data);
    return <div className="drivstoff">
        <h2>Drivstoff</h2>
        <div>
            {!data?.interface?.search?.aggregationsAsJson?.drivstoff?.buckets ? null
            : data?.interface?.search?.aggregationsAsJson?.drivstoff?.buckets?.map(({
                key,
                docCount
            }: {
                key: string
                docCount: number
            }) => {
                return <div key={`drivstoff-${key}`}>
                    <input
                        checked={drivstoffValues.includes(key)}
                        type="checkbox"
                        id={`drivstoff-${key}`}
                        name={`drivstoff-${key}`}
                        onChange={(event) => {
                            if (event.target.checked) {
                                setDrivstoffValues(prev => [...prev, key]);
                            } else {
                                setDrivstoffValues(prev => prev.filter(drivstoff => drivstoff !== key));
                            }
                        }}
                    />
                    <label htmlFor={`drivstoff-${key}`}>{key} ({docCount})</label>
                </div>;
            })
        }
        </div>
    </div>;
}