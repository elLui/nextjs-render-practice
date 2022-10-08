import path from 'path';
import fs from 'fs/promises';
import styles from "../styles/Home.module.css";

export default function ProductDetailPage (props) {

    const { loadedProduct } = props;

    if (!loadedProduct) {
        return (
            <p>Loading...</p>
        )
    }

    return (<div className={ styles.container }>
            <div className={ styles.main }>
                <h1>{ loadedProduct.title }</h1>
                <p>{ loadedProduct.description }</p>
            </div>
        </div>
    )
}


// context can be used
export async function getStaticProps (context) {
    // params holds a dictionary of key:value pairs
    const { params } = context;

    const productId = params.pid;

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

// tells next.js what productId should be generated
export async function getStaticPaths () {

    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            // { params: { pid: 'p3' } },
            // { params: { pid: 'p4' } },
            // { params: { pid: 'p5' } },
        ],
        // fallback: true - will only pre-generate pages specified in paths: yet will allow us to access other pages not defined
        // within paths: by making calls to the data just in time -
        // in this example p1 && p2 are pre-rendered // calls to p3,p4,p5 are not generated until they are called upon
        fallback: true
    }

}