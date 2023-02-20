import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import * as ReactDOM from 'react-dom';

function HomePage ({dataBlogs, dataUsers}){
    return (
        <>
        <Head>
            <title>Blog Post Web</title>
        </Head>
        <div>
            <h1>
                Blog Posts
            </h1>
            <div>
            {dataBlogs.map((blog) => (
                <div key={blog.id}>
                    <h2>
                        <Link href={`./blogs/${blog.id}`}>
                        {blog.title}
                        </Link>
                    </h2>
                </div>
            ))}

            </div>
            <div>
                <h1>Search Account</h1>
                    <form onSubmit={searchUser}>
                        <input type="text" id="user" name="user" />
                        <button type="submit">Search</button>
                    </form>
                    <Link href={"./users/create"}>
                        <button>
                            Create User
                        </button>
                    </Link>
                <div id="dataUser">
                        {dataUsers.map((user) => (
                            <div key={user.id}>
                                <h2>
                                    <Link href={`./users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </h2>
                            </div>
                        ))}
                </div>
            </div>
    </div>
    </>
    )
}

export default HomePage

const searchUser = async (event) => {
    event.preventDefault()

    const responseUser = await fetch(`https://gorest.co.in/public/v2/users/`, {method: 'GET'})
    const dataUsers = await responseUser.json()

    const searchUser = event.target.user.value.toLowerCase()
    const dataUser = document.getElementById('dataUser')

    if(searchUser.length == 0){
        return (
            ReactDOM.render(dataUsers.map((user) => (
                <div key={user.id}>
                    <h2>
                        <Link href={`./users/${user.id}`}>
                            {user.name}
                        </Link>
                    </h2>
                </div>
            )),
            dataUser)
        )
    } else {
        const dataUsersFilter = []
    
        dataUsers.map((user) => {
            user["name"].toLowerCase().includes(searchUser) ? (dataUsersFilter.push(user)) : ("")
        })

        if(dataUsersFilter.length > 0){
            return (
                ReactDOM.render(dataUsersFilter.map((user) => (
                    <div key={user.id}>
                        <h2>
                            <Link href={`./users/${user.id}`}>
                                {user.name}
                            </Link>
                        </h2>
                    </div>
                )),
                dataUser)
            )
        } else {
            return (
                ReactDOM.render(<h2>No User Data</h2>,dataUser)
            )
        }
        
    }
};

export const getStaticProps = async () => {
    const responseBlog = await fetch("https://gorest.co.in/public/v2/posts/", {method: 'GET'});
    const dataBlogs = await responseBlog.json();

    const responseUser = await fetch(`https://gorest.co.in/public/v2/users/`, {method: 'GET'});
    const dataUsers = await responseUser.json();

    return{
        props: {
            dataBlogs,
            dataUsers
        },
    };
};
