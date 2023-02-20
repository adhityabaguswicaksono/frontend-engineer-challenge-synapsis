import Head from "next/head";
import { useRouter } from "next/router";
import React, {Component} from "react";

class changeUser extends Component {

    constructor({dataUser}) {
        super();
        this.state = {
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            gender: dataUser.gender,
            status: dataUser.status
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmitForm(event) {
        event.preventDefault()

        if(confirm("Are you sure to change this profile?")){
            fetch(`https://gorest.co.in/public/v2/users/${this.state.id}?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`,
            {
                method: "PUT",
                body: JSON.stringify(this.state),
            }).then((data) => {
                alert("Yeay!!! Your Profile Have Been Updated!!!")
            })
        }
    }

    render(){
        return(
            <>
            <Head>
            <title>Change Profile</title>
            </Head>
            <h1>Change Profile</h1>

            <div>
            <form onSubmit={this.onSubmitForm}>
            <label>ID Number</label><br/>
            <input type="number" id="id" name="id" value={this.state.id} onChange={this.onInputchange} disabled required></input><br/><br/>

            <label>Name</label><br/>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.onInputchange} required></input><br/><br/>

            <label>Email</label><br/>
            <input type="email" id="email" name="email" value={this.state.email} onChange={this.onInputchange} required></input><br/><br/>

                    <label>Gender</label><br/>
                    {
                        this.state.gender == "female" ? (
                            <select name="gender" id="gender" defaultValue="female" onChange={this.onInputchange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        ) : (
                            <select name="gender" id="gender" defaultValue="male" onChange={this.onInputchange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        )
                    }

                    <br/><br/>
                    <label>Status</label><br/>
                    {
                        this.state.status == "inactive" ? (
                            <select name="status" id="status" defaultValue="inactive" onChange={this.onInputchange}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        ) : (
                            <select name="status" id="status" defaultValue="active" onChange={this.onInputchange}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        )
                    }

                    <br/><br/>
                    <input type="submit" value="Submit"></input>
                </form>
                </div>
            </>
        )
    }
}

export default changeUser

export const getStaticPaths = async () => {
    const responseUser = await fetch(`https://gorest.co.in/public/v2/users?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`);
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
    const responseUser = await fetch(`https://gorest.co.in/public/v2/users/${params.userId}?access-token=29d0dcbaca1cbd51e9d8aa29051c222130297fb37cdfb46988890357457e82a9`);
    const dataUser = await responseUser.json();

    return{
        props: {
            dataUser
        },
    };
};