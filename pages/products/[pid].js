import path from 'path';
import fs from 'fs/promises';
import styles from "../../styles/Home.module.css";

export default function ProductDetailPage (props) {

    const { loadedProduct } = props;

    if (!loadedProduct) {
        return (<p>Loading...</p>)
    }

    return (<div className={ styles.container }>
        <div className={ styles.main }>
            <h1>{ loadedProduct.title }</h1>
            <p>{ loadedProduct.description }</p>
        </div>
    </div>)
}

async function getData () {
    const filePath = path.join (process.cwd (), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile (filePath);
    return JSON.parse (jsonData);
}

// context can be used
export async function getStaticProps (context) {
    // params holds a dictionary of key:value pairs
    const { params } = context;
    const productId = params.pid;
    const data = await getData ();
    const product = data.products.find (product => product.id === productId);

    if (!product) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            loadedProduct: product
        }
    }
}

// tells next.js what productId should be generated
export async function getStaticPaths () {

    const data = await getData ();
    const ids = data.products.map ((product) => product.id);
    const pathWithParams = ids.map (id => ({ params: { pid: id } }))


    return {
        paths: pathWithParams,
        fallback: true
        // paths: [ { params: { pid: 'p1' } }, { params: { pid: 'p2' } }, // { params: { pid: 'p3' } },
        // { params: { pid: 'p4' } },
        // { params: { pid: 'p5' } },]
        // fallback: true - will only pre-generate pages specified in paths: yet will allow us to access other pages not defined
        // within paths: by making calls to the data just in time -
        // in this example p1 && p2 are pre-rendered // calls to p3,p4,p5 are not generated until they are called upon
        // setting fallback: 'blacking' allows us to serve pages without a 'loading...' screen -
        // fallback: 'blocking'
    }

}