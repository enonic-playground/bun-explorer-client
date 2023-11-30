import {useWhenInitAsync} from '@seamusleahy/init-hooks';
import * as gql from 'gql-query-builder';
import { useManualQuery } from 'graphql-hooks';
// import { useState } from 'react';
import {COLLECTION} from '../constants';
import ReactSlider from 'react-slider';

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

export function Modell({
    min,
    max,
    setModelMin,
    setModelMax
}: {
    min: number
    max: number,
    setModelMin: (min: number) => void,
    setModelMax: (max: number) => void
}) {
    const [ fetchResults, { loading, error, data } ] = useManualQuery(GQL.query);
    useWhenInitAsync(() => {
        fetchResults({
            variables: {
                name: COLLECTION,
                searchString: '',
                count: 0,
                aggregations: [{
                    name: "modellarMin",
                    min: {
                        field: "modellar"
                    }
                },{
                    name: "modellarMax",
                    max: {
                        field: "modellar"
                    }
                }]
            }
        });
    });
    return <div className="modell">
        <h2>Modell</h2>
        {!data?.interface?.search?.aggregationsAsJson ? null : <ReactSlider
            className="horizontal-slider"
            defaultValue={[
                data?.interface?.search?.aggregationsAsJson?.modellarMin?.value,
                data?.interface?.search?.aggregationsAsJson?.modellarMax?.value
            ]}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={data?.interface?.search?.aggregationsAsJson?.modellarMin?.value}
            max={data?.interface?.search?.aggregationsAsJson?.modellarMax?.value}
            minDistance={0}
            onAfterChange={(values, thumbIndex) => {
                if (min !== values[0]) {
                    setModelMin(values[0]);
                }
                if (max !== values[1]) {
                    setModelMax(values[1]);
                }
            }}
            pearling
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            value={[min, max]}
        />}
    </div>;
}