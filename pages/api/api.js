export function getBlogsData() {
    const getStaticProps = async () => {
        const responseBlog = await fetch("https://gorest.co.in/public/v2/posts");
        const dataBlog = await responseBlog.json();
    
        return{
            props: {
                dataBlog
            },
        };
    };
}

export function getUsersData() {
    const getStaticProps = async () => {
        const responseUser = await fetch(`https://gorest.co.in/public/v2/users/`);
        const dataUser = await responseUser.json();
    
        return{
            props: {
                dataUser
            },
        };
    };
}