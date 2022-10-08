import path from 'path';
import fs from 'fs/promises';
import { Fragment } from "react";

export default function ProductDetailPage (props) {

    const { loadedProduct } = props;

    return (
        <Fragment>
            <h1>{ loadedProduct.title }</h1>
            <p>{ loadedProduct.description }</p>
        </Fragment>
    )
}


// context can be used
export async function getStaticProps (context) {
    // params holds a dictionary of key:value pairs
    const { params } = context;

    const productId = params.pid;
    c

    console.log (productId);

    const filePath = path.join (process.cwd (), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile (filePath);
    const data = JSON.parse (jsonData);

    const product = data.products.find (product => product.id === productId);

    return {
        props: {
            loadedProduct: product
        }
    }
}