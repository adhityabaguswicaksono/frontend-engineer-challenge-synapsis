import Head from "next/head";

function BlogDetail({dataBlog, dataCommentFilter}){
    return (
        <>
        <Head>
            <title>{dataBlog.title}</title>
        </Head>
        <div>
            <h1>
                {dataBlog.title}
            </h1>
            <p>
                {dataBlog.body}
            </p>
        </div>
        <div>
            <h2>Comment</h2>
            <div>
                { dataCommentFilter.length > 0 ? (
                    dataCommentFilter.map((comment) => (
                            <div key={comment.id}>
                                <h4>
                                    From {comment.name}
                                </h4>
                                <p>
                                    {comment.body}
                                </p>
                            </div>
                        )
                    )) : ("No comment here...")
                    }
            </div>
        </div>
        </>
    )
}

export default BlogDetail

export const getStaticPaths = async () => {
    const responseBlog = await fetch(`https://gorest.co.in/public/v2/posts/`);
    const dataBlog = await responseBlog.json();

    const paths = dataBlog.map((item) => ({
        params: {
            blogId : `${item.id}`
        }
    }))

    return{
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({params}) => {
    const responseBlog = await fetch(`https://gorest.co.in/public/v2/posts/${params.blogId}`);
    const responseComment = await fetch(`https://gorest.co.in/public/v2/comments`);
    const dataBlog = await responseBlog.json();
    const dataComment = await responseComment.json();
    const dataCommentFilter = [];

    dataComment.map((comment) => {
        comment.post_id == params.blogId ? (dataCommentFilter.push(comment)) : ("")
    })

    return{
        props: {
            dataBlog,
            dataCommentFilter,
        },
    };
};