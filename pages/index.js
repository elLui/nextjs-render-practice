import Head from 'next/head'
import styles from '../styles/Home.module.css'

// working with the fs module within our default export would fail - as it can only be used on the
// server side - however, using it in our getStaticProps() function it will run on the server side
import fs from 'fs/promises';
import path from 'path';

export default function Home (props) {

    const { products } = props;


    return (<div className={ styles.container }>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={ styles.main }>
            <ul>
                { products.map ((product) => {
                    return (<li key={ product.id }>{ product.title }</li>)
                }) }
            </ul>
        </main>
        <footer className={ styles.footer }>
            <h2>the foot</h2>
        </footer>
    </div>)
}


export async function getStaticProps () {

    console.log ('processing...');

    // construct a filepath // cwd is at ./ of project
    const filePath = path.join (process.cwd (), 'data', 'dummy-backend.json');
    // fs/promise returns a promise, thus await can be used here
    const jsonData = await fs.readFile (filePath);
    // convert to a JSON object
    const data = JSON.parse (jsonData);



    // getStaticProps() will always need to return an object
    return {
        props: {
            products: data.products,
        },
        // revalidate: will regenerate on every request, at MOST every X seconds
        // if page is refreshed before revalidation time, it will serve the old data
        // BUT
        // if page request is made it will always generate, store, and serve the NEW page -
        // development_server will always regenerate data as a new request -
        revalidate: 10
    };
}
