import { useEffect, useState } from "react";

export default function LastSalesPage ()
{

    const [ sales, setSales ] = useState ();
    const [ isLoading, setIsLoading ] = useState (false);

    useEffect (() => {
        setIsLoading (true);

        fetch ('https://elluis-nextjs-practic-default-rtdb.firebaseio.com/sales.json')
            .then ((response) => response.json ())
            .then (data => {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push ({ id: key, username: data[key].username, volume: data[key].volume })
            }

            setSales (transformedSales);
            setIsLoading (false);

        })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!sales) {
        return <p>-no data yet dude</p>;
    }


    return (
        <ul>
        { sales.map ((sale) => {
            return (<li key={ sale.id }>{ sale.username } - ${ sale.volume }</li>)
        }) }
    </ul>
    );
}