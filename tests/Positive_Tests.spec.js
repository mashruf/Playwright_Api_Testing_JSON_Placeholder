const {test,expect} = require('@playwright/test');

test("TC_POS_001: Verify all posts are retrieved",async({request})=>{
   const allPosts = await request.get(`/posts`)

   const allPostsResponseBody = await allPosts.json();


   expect(allPosts.status()).toBe(200);
   expect(allPosts.ok()).toBeTruthy();
   expect(Array.isArray(allPostsResponseBody)).toBeTruthy();
   expect(allPostsResponseBody).toHaveLength(100);
})

test("TC_POS_002: Verify a single post by id",async({request})=>{

   const id = 10;

   const singlePost = await request.get(`/posts/${id}`)

   const singlePostBody = await singlePost.json();


   expect(singlePost.status()).toBe(200);
   expect(singlePost.ok()).toBeTruthy();
   expect(singlePostBody).toHaveProperty("id",id);
}
)
test("TC_POS_003: Verify all comments of a post is retrieved",async({request})=>{

   const id = 10;

   const comments = await request.get(`/posts/${id}/comments`)

   const commentsBody = await comments.json();


   expect(comments.status()).toBe(200);
   expect(comments.ok()).toBeTruthy();
   expect(Array.isArray(commentsBody)).toBeTruthy();
   
   for(const comment of commentsBody){
      expect(comment).toHaveProperty("postId",id)
   }
})

test("TC_POS_004: Verify all comments of a post is retrieved by query parameter",async({request})=>{

   const id = 10;

   const comments = await request.get(`/comments`,{
      params:{
         postId : id
      }
   })

   const commentsBody = await comments.json();


   expect(comments.status()).toBe(200);
   expect(comments.ok()).toBeTruthy();
   expect(Array.isArray(commentsBody)).toBeTruthy();
   
   for(const comment of commentsBody){
      expect(comment).toHaveProperty("postId",id)
   }
})

test("TC_POS_005: Verify creating a post",async({request})=>{

   const title = "foo";
   const body = "bar";
   const userId = 1;

   const post = await request.post(`/posts`,{
      data:{
         title: title,
         body: body,
         userId: userId
      },
      headers:{
         'Content-type': 'application/json; charset=UTF-8',
      }
   })

   const postBody = await post.json();


   expect(post.status()).toBe(201);
   expect(postBody).toHaveProperty("id");
   expect(postBody).toHaveProperty("title",title);
   expect(postBody).toHaveProperty("body",body);
   expect(postBody).toHaveProperty("userId",userId);

})

test("TC_POS_006: Verify full update of a post",async({request})=>{

   const title = "foo";
   const body = "lol";
   const userId = 1;
   const id = 10;

   const updateFullPost = await request.put(`/posts/${id}`,{
      data:{
         id: id,
         title: title,
         body: body,
         userId: userId
      },
      headers:{
         'Content-type': 'application/json; charset=UTF-8',
      }
   })

   const updateFullPostBody = await updateFullPost.json();


   expect(updateFullPost.ok()).toBeTruthy();
   expect(updateFullPost.status()).toBe(200);
   expect(updateFullPostBody).toHaveProperty("id",id);
   expect(updateFullPostBody).toHaveProperty("title",title);
   expect(updateFullPostBody).toHaveProperty("body",body);
   expect(updateFullPostBody).toHaveProperty("userId",userId);

})

test("TC_POS_007: Verify partial update of a post",async({request})=>{

   const title = "Fruits";
   const id = 10;

   const updatePartialPost = await request.patch(`/posts/${id}`,{
      data:{
   
         title: title
      },
      headers:{
         'Content-type': 'application/json; charset=UTF-8',
      }
   })

   const updatePartialPostBody = await updatePartialPost.json();

   expect(updatePartialPost.ok()).toBeTruthy();
   expect(updatePartialPost.status()).toBe(200);
   expect(updatePartialPostBody).toHaveProperty("id");
   expect(updatePartialPostBody).toHaveProperty("title",title);
   expect(updatePartialPostBody).toHaveProperty("body");
   expect(updatePartialPostBody).toHaveProperty("userId");

})

test("TC_POS_008: Verify deleting a post",async({request})=>{

   const id = 10;

   const deletePost = await request.delete(`/posts/${id}`)

   expect(deletePost.status()).toBe(200);
   expect(deletePost.ok()).toBeTruthy();

})



