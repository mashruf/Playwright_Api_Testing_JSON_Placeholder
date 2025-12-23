const { test, expect } = require('@playwright/test');

test("TC_NEG_001: Verify 404 for invalid endpoint", async ({ request }) => {

    // sending request and storing the response
    const invalidEndpoint = await request.get(`/postss`);

    expect(invalidEndpoint.status()).toBe(404); // asserting the status code
})

test("TC_NEG_002: Verify single post is not retrieved with invalid id", async ({ request }) => {

    // setting invalid id
    const id = 999;

    // sending request and storing the response
    const invalidId = await request.get(`/posts/${id}`);

    expect(invalidId.status()).toBe(404); // asserting the status code
})

test("TC_NEG_003: Verify single post is not retrieved with invalid endpoint", async ({ request }) => {

    const id = 10; // setting id between 1-100

    // sending request and storing the response
    const invalidEndpoint = await request.get(`/postss/${id}`);

    expect(invalidEndpoint.status()).toBe(404); // asserting the status code
})

test("TC_NEG_004: Verify all comments of a post is not retrieved with invalid endpoint", async ({ request }) => {

    const id = 10; // setting id

    //  sending request and storing response
    const invalidEndpoint = await request.get(`/postss/${id}/comments`);

    expect(invalidEndpoint.status()).toBe(404); // asserting status code
})

test("TC_NEG_005: Verify all comments of a post is not retrieved with invalid id", async ({ request }) => {

    const id = 999; // setting invalid id

    // sending request and storing the response
    const invalidId = await request.get(`/posts/${id}/comments`);

    expect(invalidId.status()).toBe(404); // asserting status code
})

test("TC_NEG_006: Verify all comments of a post are not retrieved by query parameter with invalid endpoint", async ({ request }) => {

    const id = 10; // setting id between 1-100

    // sending request and storing the response
    const invalidEndpoint = await request.get(`/commentss`, {
        params: {
            id: id
        }
    });

    expect(invalidEndpoint.status()).toBe(404); // asserting the status code
})

test("TC_NEG_007: Verify all comments of a post are not retrieved by query parameter with invalid id", async ({ request }) => {

    const invalidId = 999; // setting invalid id

    // sending request and storing response
    const invalId = await request.get(`/comments`, {
        params: {
            id: invalidId
        }
    });

    expect(invalId.status()).toBe(404); // assertion the status code
})

test("TC_NEG_008: Verify creating a post with empty request body", async ({ request }) => {

    // sending request and storing the response
    const post = await request.post(`/posts`, {
        data: {

        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })


    expect(post.status()).toBe(400); // asserting the status code
})

test("TC_NEG_009: Verify creating a post with invalid data type", async ({ request }) => {

    const userId = "1"; // setting invalid type of user id
    const title = "foo"; // setting title
    const body = "bar"; // setting body

    // sending request and storing the response
    const post = await request.post(`/posts`, {
        data: {
            tittle: title,
            body: body,
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    expect(post.status()).toBe(400); // asserting the status code
})

test("TC_NEG_010: Verify full update of a post with invalid id", async ({ request }) => {

    const title = "foo"; // setting title
    const body = "lol"; // setting body
    const userId = 1; // setting user id between 1-10
    const id = 999; //  setting invalid id

    // sending request and storing the response
    const updateFullPost = await request.put(`/posts/${id}`, {
        data: {
            id: id,
            title: title,
            body: body,
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(404); // asserting status code

})

test("TC_POS_011: Verify full update of a post with missing required fields", async ({ request }) => {

    const userId = 1; // setting id between 1-10
    const id = 10; // setting user id between 1-100

    // sending request and storing the response
    const updateFullPost = await request.put(`/posts/${id}`, {
        data: {
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(400); // asserting status code

})

test("TC_NEG_012: Verify full update of a post with invalid data type", async ({ request }) => {

    const title = "foo"; // setting title
    const body = "lol"; // setting body
    const userId = "1"; // setting invalid type of user id
    const id = 10; // setting id between 1-100

    // sending request and storing the response
    const updateFullPost = await request.put(`/posts/${id}`, {
        data: {
            id: id,
            title: title,
            body: body,
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(400); // asserting the status code

})

test("TC_NEG_013: Verify full update of a post with empty request body", async ({ request }) => {

    const id = 10; // setting id between 1-100

    // sending request and storing the response
    const updateFullPost = await request.put(`/posts/${id}`, {
        data: {},
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(400); // asserting the status code

})

test("TC_NEG_014: Verify full update of a post with invalid endpoint", async ({ request }) => {

    const title = "foo"; // setting title
    const body = "lol"; // setting body
    const id = 10; // setting id between 1-100
    const userId = 1; // setting user id between 1-10

    // sending request and storing the response
    const updateFullPost = await request.put(`/postss/${id}`, {
        data: {
            id: id,
            tittle: title,
            body: body,
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(404); // asserting the status code

})

test("TC_NEG_015: Verify partial update of a post with invalid id", async ({ request }) => {

    const id = 999; // setting invalid id
    const body = "Fruits" // setting body

    // sending request and storing the response
    const updatePartialPost = await request.patch(`/posts/${id}`, {
        data: {
            title: body
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updatePartialPost.status()).toBe(404); // asserting the status code

})

test("TC_NEG_016: Verify partial update of a post with invalid data type", async ({ request }) => {

    const id = 10; // setting id between 1-100
    const body = 1000; // setting invalid data type for body

    // sending request and storing the response
    const updatePartialPost = await request.patch(`/posts/${id}`, {
        data: {
            body: body
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updatePartialPost.status()).toBe(400); // asserting the status code

})

test("TC_NEG_017: Verify partial update of a post with empty request body", async ({ request }) => {

    const id = 10; // setting the id between 1-100

    // sending request and storing the response
    const updatePartialPost = await request.patch(`/posts/${id}`, {
        data: {},
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updatePartialPost.status()).toBe(400); // asserting the status code

})

test("TC_NEG_018: Verify partial update of a post with invalid endpoint", async ({ request }) => {

    const id = 10; // setting id between 1-100
    const body = "Fruits" // setting body

    // sending request and storing the response
    const updatePartialPost = await request.patch(`/postss/${id}`, {
        data: {
            body: body
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    expect(updatePartialPost.status()).toBe(404); // asserting the status code

})

test("TC_NEG_019: Verify deleting a post with invalid endpoint", async ({ request }) => {

    const id = 10; // setting id between 1-100

    // sending request and storing the response
    const deletePost = await request.delete(`/postss/${id}`)

    expect(deletePost.status()).toBe(404); // asserting the status code

})

test("TC_NEG_020: Verify deleting a post with invalid id", async ({ request }) => {

    const id = 999; // setting invalid id

    // sending request and storing the response
    const deletePost = await request.delete(`/posts/${id}`)

    expect(deletePost.status()).toBe(404); // asserting the status code

})


