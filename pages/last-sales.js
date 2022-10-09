import { useEffect, useState } from "react";
import useSWR from 'swr';

export default function LastSalesPage (props) {

    const [ sales, setSales ] = useState (props.sales);
    const {
        data, error
    } = useSWR ('https://elluis-nextjs-practic-default-rtdb.firebaseio.com/sales.json', (url) => fetch (url).then (res => res.json ()));


    useEffect (() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push ({
                    id: key, username: data[key].username, volume: data[key].volume,
                })
            }
            setSales (transformedSales);
        }
    }, [ data ])

    if (error) {
        return <p>Error loading...</p>
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
    }

    //--- working version of common useEffect() data fetching hook below ---//
    // all commented statements in block below are components of this pattern

    // const [ sales, setSales ] = useState ();
    // const [ isLoading, setIsLoading ] = useState (false);
    // useEffect (() => {
    //     setIsLoading (true);
    //     fetch ('https://elluis-nextjs-practic-default-rtdb.firebaseio.com/sales.json')
    //         .then ((response) => response.json ())
    //         .then (data => {
    //             const transformedSales = [];
    //             for (const key in data) {
    //                 transformedSales.push ({ id: key, username: data[key].username, volume: data[key].volume })
    //             }
    //
    //             setSales (transformedSales);
    //             setIsLoading (false);
    //
    //         })
    // }, [])
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    // if (!sales) {
    //     return <p>-no data yet dude</p>;
    // }


    return (<ul>
        { sales.map ((sale) => {
            return (<li key={ sale.id }>{ sale.username } - ${ sale.volume }</li>)
        }) }
    </ul>);
}

export async function getStaticProps () {
    // we can not useSWR() - since this is not part of the component
    // this will need to be accomplished with fetch()

    const response = await fetch ('https://elluis-nextjs-practic-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json ();

    const transformedSales = [];

    for (const key in data) {
        transformedSales.push ({
            id: key, username: data[key].username, volume: data[key].volume,
        });
    }
    return { props: { sales: transformedSales }, revalidate: 10 };


}