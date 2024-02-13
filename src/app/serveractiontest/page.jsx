const { default: addPost, deletePost } = require("@/lib/action")

const ServerActionTest = () => {
    return(
        <div>

        <form action={addPost}>
            <input type="text" name="title"/>
            <input type="text" name="desc"/>
            <input type="text" name="slug"/>
            <input type="text" name="userId"/>
            <input type="text" name="img"/>
            <button>Create</button>
        </form>

        <form action={deletePost}>                                                  
            <input type="text" name="id" placeholder="PostId"/>
            <button>Delete</button>
        </form>

        </div>
    )
}

export default ServerActionTest;