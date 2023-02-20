import Head from "next/head";
import Link from "next/link";

function UserDetail({dataUser}){
    return (
        <>
        <Head>
            <title>View Profile</title>
        </Head>
            <h1>Profile</h1>
            <div>
                <div>
                    <h2>ID Number</h2>
                    <h3>{dataUser.id}</h3>
                </div>
                <div>
                    <h2>Name</h2>
                    <h3>{dataUser.name}</h3>
                </div>
                <div>
                    <h2>Email</h2>
                    <h3>{dataUser.email}</h3>
                </div>
                <div>
                    <h2>Gender</h2>
                    <h3>{dataUser.gender}</h3>
                </div>
                <div>
                    <h2>Status</h2>
                    <h3>{dataUser.status}</h3>
                </div>
            </div>
            <div>
                <Link href={`./update/${dataUser.id}`}>
                    <button>
                        Change Button
                    </button>
                </Link>
                <button onClick={(e) => deleteUser(dataUser.id)}>Delete User</button>
            </div>
        </>
    )
}

export default UserDetail

function deleteUser(id) {
    if(confirm("Are You Sure to Delete This User?")){
        fetch(`https://gorest.co.in/public/v2/users/${id}?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`,
        {
            method: "DELETE",
        }).then((response) => console.info(response.text, response.status))
    }
}

export const getStaticPaths = async () => {
    const responseUser = await fetch(`https://gorest.co.in/public/v2/users`);
    const dataUser = await responseUser.json();

    const paths = dataUser.map((item) => ({
        params: {
            userId : `${item.id}`
        }
    }))

    return{
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({params}) => {
    const responseUser = await fetch(`https://gorest.co.in/public/v2/users/${params.userId}`);
    const dataUser = await responseUser.json();

    return{
        props: {
            dataUser
        },
    };
};