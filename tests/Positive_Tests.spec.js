const {test,expect} = require('@playwright/test');

test("TC_POS_001: Verify all posts are retrieved",async({request})=>{
   // sending request and storing the response
   const allPosts = await request.get(`/posts`)

   // extracting json from response
   const allPostsResponseBody = await allPosts.json();


   expect(allPosts.status()).toBe(200); // asserting status code
   expect(allPosts.ok()).toBeTruthy(); // asserting response message
   expect(Array.isArray(allPostsResponseBody)).toBeTruthy(); // asserting response body is an array
   expect(allPostsResponseBody).toHaveLength(100); // asserting array length is 100
})

test("TC_POS_002: Verify a single post by id",async({request})=>{

   // setting id between 1-100
   const id = 10;

   // sending request and storing the response
   const singlePost = await request.get(`/posts/${id}`)

   // extracting json from the response
   const singlePostBody = await singlePost.json();


   expect(singlePost.status()).toBe(200); // asserting status code
   expect(singlePost.ok()).toBeTruthy(); // asserting response message
   expect(singlePostBody).toHaveProperty("id",id); // asserting whether the correct id is returned
}
)
test("TC_POS_003: Verify all comments of a post is retrieved",async({request})=>{

   // setting id between 1-100
   const id = 10;

   // sending request and storing the response
   const comments = await request.get(`/posts/${id}/comments`)

   // extracting json from response
   const commentsBody = await comments.json();


   expect(comments.status()).toBe(200); // asserting status code
   expect(comments.ok()).toBeTruthy(); // asserting response message
   expect(Array.isArray(commentsBody)).toBeTruthy(); // asserting an array is returned
   

   for(const comment of commentsBody){ // asserting every comment is under correct post
      expect(comment).toHaveProperty("postId",id)
   }
})

test("TC_POS_004: Verify all comments of a post is retrieved by query parameter",async({request})=>{

   // setting id between 1-100
   const id = 10;

   // sending request and storing the response
   const comments = await request.get(`/comments`,{
      params:{
         postId : id
      }
   })

   // extracting json from response
   const commentsBody = await comments.json();


   expect(comments.status()).toBe(200); // asserting the status code
   expect(comments.ok()).toBeTruthy(); // asserting the response message
   expect(Array.isArray(commentsBody)).toBeTruthy(); // asserting the response body is an array
   
   for(const comment of commentsBody){ // asserting every comment is under correct post
      expect(comment).toHaveProperty("postId",id)
   }
})

test("TC_POS_005: Verify creating a post",async({request})=>{

   const title = "foo"; // setting title
   const body = "bar"; // setting body
   const userId = 1; // setting user id between 1-10

   // sending request and storing the response
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

   // extract json from response
   const postBody = await post.json();


   expect(post.status()).toBe(201); // asserting status code
   expect(postBody).toHaveProperty("id"); // asserting response has property id and its value is correct
   expect(postBody).toHaveProperty("title",title); // asserting response has property title and its value is correct
   expect(postBody).toHaveProperty("body",body); // asserting response has property body and its value is correct
   expect(postBody).toHaveProperty("userId",userId); // asserting response has property user id and its value is correct

})

test("TC_POS_006: Verify full update of a post",async({request})=>{

   const title = "foo"; // setting title
   const body = "lol"; // setting body
   const userId = 1; // setting user id from 1-10
   const id = 10; // setting id from 1-100

   // sending request and storing the response
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

   // extract json from response
   const updateFullPostBody = await updateFullPost.json();


   expect(updateFullPost.ok()).toBeTruthy(); // asserting the response message
   expect(updateFullPost.status()).toBe(200); // asserting the status code
   expect(updateFullPostBody).toHaveProperty("id",id);  // asserting response has property id and its value is correct
   expect(updateFullPostBody).toHaveProperty("title",title); // asserting response has property title and its value is correct
   expect(updateFullPostBody).toHaveProperty("body",body); // asserting response has property body and its value is correct
   expect(updateFullPostBody).toHaveProperty("userId",userId); // asserting response has property user id and its value is correct

})

test("TC_POS_007: Verify partial update of a post",async({request})=>{

   const title = "Fruits"; // setting title
   const id = 10; // setting id between 1-100

   // sending request and storing the response
   const updatePartialPost = await request.patch(`/posts/${id}`,{
      data:{
   
         title: title
      },
      headers:{
         'Content-type': 'application/json; charset=UTF-8',
      }
   })

   // extracting json from response
   const updatePartialPostBody = await updatePartialPost.json();

   expect(updatePartialPost.ok()).toBeTruthy(); // asserting the response message
   expect(updatePartialPost.status()).toBe(200); // asserting the status code
   expect(updatePartialPostBody).toHaveProperty("id"); // asserting response has property id and its value is correct
   expect(updatePartialPostBody).toHaveProperty("title",title); // asserting response has property title and its value is correct
   expect(updatePartialPostBody).toHaveProperty("body"); // asserting response has property body and its value is correct
   expect(updatePartialPostBody).toHaveProperty("userId"); // asserting response has property user id and its value is correct

})

test("TC_POS_008: Verify deleting a post",async({request})=>{

   // setting id between 1-10
   const id = 10;

   // sending request and storing the response
   const deletePost = await request.delete(`/posts/${id}`)

   expect(deletePost.status()).toBe(200); // asserting status code
   expect(deletePost.ok()).toBeTruthy(); // asserting response message

})



