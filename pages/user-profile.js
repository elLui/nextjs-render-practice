// example of a page that can not pre-rendered through getStaticProps -
export default function UserProfile (props) {


    return (
        <h1>{ props.username }</h1>
    )


}

export async function getServerSideProps (context) {

    // using this function allows access to req && res objects - default node objects
    const { params, req, res } = context;
    console.log (req);
    console.log (res);


    return {
        props: {
            username: 'elluis'
        }
    }
}