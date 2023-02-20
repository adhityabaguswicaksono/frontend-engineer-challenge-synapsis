import Head from "next/head";
import { useRouter } from "next/router";
import React, {Component} from "react";

function createUser() {
    return(
        <>
        <Head>
        <title>Create User</title>
        </Head>
        <h1>Create Profile</h1>

        <div>
        <form onSubmit={onSubmitForm}>
        {/* <label>ID Number</label><br/>
        <input type="number" id="id" name="id" required></input><br/><br/> */}

        <label>Name</label><br/>
        <input type="text" id="name" name="name" required></input><br/><br/>

        <label>Email</label><br/>
        <input type="email" id="email" name="email" required></input><br/><br/>

                <label>Gender</label><br/>
                <select name="gender" id="gender" defaultValue="male">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                <br/><br/>
                <label>Status</label><br/>
                <select name="status" id="status" defaultValue="active">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                <br/><br/>
                <input type="submit" value="Submit"></input>
            </form>
            </div>
        </>
    )
}

export default createUser

function onSubmitForm(event) {
    event.preventDefault()
        fetch(`https://gorest.co.in/public/v2/users?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`, {method:"GET"})
        .then((response) => {
            response.json()
        }).then((data) => {
            console.info(data)
        })

    if(confirm("Are you sure to create this profile?")){

        // const idUser = 

        fetch(`https://gorest.co.in/public/v2/users?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`,
        {
            method: "POST",
            body: JSON.stringify({
                // id: event.target.id.value,
                name: event.target.name.value,
                email: event.target.email.value,
                gender: event.target.gender.value,
                status: event.target.status.value,
            }),
        }).then((data) => {
            alert("Yeay!!! Your Profile Have Been Created!!!")
        })
    }
}

// export const getStaticPaths = async () => {
//     const responseUser = await fetch(`https://gorest.co.in/public/v2/users?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`);
//     const dataUser = await responseUser.json();

//     const paths = dataUser.map((item) => ({
//         params: {
//             userId : `${item.id}`
//         }
//     }))

//     return{
//         paths,
//         fallback: false,
//     };
// };

// export const getStaticProps = async ({params}) => {
//     const responseUser = await fetch(`https://gorest.co.in/public/v2/users`);
//     const dataUser = await responseUser.json();

//     return{
//         props: {
//             dataUser
//         },
//     };
// };