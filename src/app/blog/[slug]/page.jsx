import PostUser from '@/components/postUser/postUser';
import style from './singlepost.module.css';
import Image from 'next/image';
import { Suspense } from 'react';
import { getPost, getUser } from '@/lib/data';

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`)
    const posts = await res.json();
    return posts;
  }

export const generateMetadata = async({params}) => {
    const slug = params.slug;
    const post = await getPost(slug);
    return {
        title: post.title,
        description: post.desc,
    };
};


const SinglePostPage = async({params}) =>{
    // console.log(params);
    const slug = params.slug;
    const post = await getData(slug);
    // console.log(slug);
    // const post = await getPost(slug);
    // const user = await getUser(slug);
//    console.log(post);

    return(
        <div className={style.container}>
           {post.img && <div className={style.imgContainer}>
                <Image src={post.img} alt="post" fill className={style.img}/>
            </div>}
            <div className={style.textContainer}>
                <h1 className={style.title}>{post.title}</h1>
                <div className={style.detail}>
                    {/* <Image src="/noavatar.png" alt="user" width={50} height={50} className={style.avatar}/> */}
                {/* <div className={style.detailText}>
                    <span className={style.detailTitle}>Author</span>
                    <span className={style.detailValue}>Terry Jefferson</span>
                </div> */}
                <Suspense fallback={<div>Loading...</div>}>
                <PostUser userId ={post.userId}/>
                </Suspense>
                <div className={style.detailText}>
                    <span className={style.detailTitle}>Published</span>
                    <span className={style.detailValue}>{post.createdAt.toString().slice(4,16)}</span>

                </div>
                </div>
                <div className={style.content}>
                    {post.desc}
                </div>
            </div>

        </div>
    )
}
export default SinglePostPage;