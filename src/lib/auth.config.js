// export const authConfig = {
//     pages:{
//         signIn:"/login"
//     },
//     providers:[],
//     callbacks:{
//         async jwt({token,user}){
//             // console.log("user");
//             // console.log(user);
//             if(user){
//                 token.id = user.id;
//                 token.isAdmin = user.isAdmin;
//             }
            
//             return token;
//         },
//         async session({session,token,user}){
//             if(token){
//             session.user.id = token.id;
//             session.user.isAdmin = token.isAdmin;}
//             return session;
//         },
//         authorized({auth,request}){
//             console.log(auth);
//             return true;
//         }
//     }
// }

export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
        }
        return token;
      },
      async session({ session, token}) {
        if (token) {
          session.user.id = token.id;
          session.user.isAdmin = token.isAdmin;
        }
        return session;
      },
      authorized({ auth, request }) {
        // console.log(auth);
        const user =auth?.user;
        const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
        const isOnLoginPanel = request.nextUrl?.pathname.startsWith("/login");
        const isOnBlogPanel = request.nextUrl?.pathname.startsWith("/blog");
        
        // only allow access to admin for admin users/dashboard
        if (isOnAdminPanel && !user?.isAdmin) {
          return false;
        }
        // only allow access to blog for logged in users
        if (isOnBlogPanel && !user) {
          return false;
        }
        // only authenticated users can reach login page
        if (isOnLoginPanel && user) {
          return Response.redirect(new URL("/", request.nextUrl));
        }     
        
        return true;
      },
    },
  };
  