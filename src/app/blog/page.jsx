import PostCard from '@/components/postcard/postcard';
import styles from './blog.module.css'
import { getPosts, getUsers } from '@/lib/data';

const getData = async () => {
    const res = await fetch('http://localhost:3000/api/blog')
    const posts = await res.json()
    return posts
  }

const BlogPage = async() =>{
    // const posts = await getPosts(); 
    // const user = await getUsers(); 
    const posts = await getData();

    // console.log(posts);
    // console.log(user);
    return(
        <div className={styles.container}>
            {
                posts.map((post)=>(
                    <div key={post.id} className={styles.post}>
                        <PostCard post={post}/>
                    </div>
                ))
            }
            {/* <div className={styles.post}>
            <PostCard/>
            </div>
            <div className={styles.post}>
            <PostCard/>
            </div>
            <div className={styles.post}>
            <PostCard/>
            </div>
            <div className={styles.post}>
            <PostCard/>
            </div> */}

        </div>
    )
}
export default BlogPage;