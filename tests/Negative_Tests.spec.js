const { test, expect } = require('@playwright/test');

test("TC_NEG_001: Verify 404 for invalid endpoint", async ({ request }) => {
    const invalidEndpoint = await request.get(`/postss`);

    expect(invalidEndpoint.status()).toBe(404);
})

test("TC_NEG_002: Verify single post is not retrieved with invalid id", async ({ request }) => {

    const id = 999;
    const invalidId = await request.get(`/posts/${id}`);

    expect(invalidId.status()).toBe(404);
})

test("TC_NEG_003: Verify single post is not retrieved with invalid endpoint", async ({ request }) => {

    const id = 10;
    const invalidEndpoint = await request.get(`/postss/${id}`);

    expect(invalidEndpoint.status()).toBe(404);
})

test("TC_NEG_004: Verify all comments of a post is not retrieved with invalid endpoint", async ({ request }) => {

    const id = 10;
    const invalidEndpoint = await request.get(`/postss/${id}/comments`);

    expect(invalidEndpoint.status()).toBe(404);
})

test("TC_NEG_005: Verify all comments of a post is not retrieved with invalid id", async ({ request }) => {

    const id = 999;
    const invalidId = await request.get(`/posts/${id}/comments`);

    expect(invalidId.status()).toBe(404);
})

test("TC_NEG_006: Verify all comments of a post are not retrieved by query parameter with invalid endpoint", async ({ request }) => {

    const id = 10;
    const invalidEndpoint = await request.get(`/commentss`, {
        params: {
            id: id
        }
    });

    expect(invalidEndpoint.status()).toBe(404);
})

test("TC_NEG_007: Verify all comments of a post are not retrieved by query parameter with invalid id", async ({ request }) => {

    const invalidId = 999;
    const invalId = await request.get(`/comments`, {
        params: {
            id: invalidId
        }
    });

    expect(invalId.status()).toBe(404);
})

test("TC_NEG_008: Verify creating a post with empty request body", async ({ request }) => {


    const post = await request.post(`/posts`, {
        data: {

        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })


    expect(post.status()).toBe(400);
})

test("TC_NEG_009: Verify creating a post with invalid data type", async ({ request }) => {

    const userId = "1";

    const post = await request.post(`/posts`, {
        data: {
            tittle: "foo",
            body: "bar",
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    expect(post.status()).toBe(400);
})

test("TC_NEG_010: Verify full update of a post with invalid id", async ({ request }) => {

    const title = "foo";
    const body = "lol";
    const userId = 1;
    const id = 999;

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
    expect(updateFullPost.status()).toBe(404);

})

test("TC_POS_011: Verify full update of a post with missing required fields", async ({ request }) => {

    const userId = 1;
    const id = 10;

    const updateFullPost = await request.put(`/posts/${id}`, {
        data: {
            userId: userId
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(400);

})

test("TC_NEG_012: Verify full update of a post with invalid data type", async ({ request }) => {

    const title = "foo";
    const body = "lol";
    const userId = "1";
    const id = 10;

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
    expect(updateFullPost.status()).toBe(400);

})

test("TC_NEG_013: Verify full update of a post with empty request body", async ({ request }) => {

    const id = 10;

    const updateFullPost = await request.put(`/posts/${id}`, {
        data: {},
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updateFullPost.status()).toBe(400);

})

test("TC_NEG_014: Verify full update of a post with invalid endpoint", async ({ request }) => {

    const title = "foo";
    const body = "lol";
    const id = 10;
    const userId = 1;

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
    expect(updateFullPost.status()).toBe(404);

})

test("TC_NEG_015: Verify partial update of a post with invalid id", async ({ request }) => {

    const id = 999;
    const body = "Fruits"

    const updatePartialPost = await request.patch(`/posts/${id}`, {
        data: {
            title: body
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updatePartialPost.status()).toBe(404);

})

test("TC_NEG_016: Verify partial update of a post with invalid data type", async ({ request }) => {

    const id = 10;
    const body = 1000;

    const updatePartialPost = await request.patch(`/posts/${id}`, {
        data: {
            body: body
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updatePartialPost.status()).toBe(400);

})

test("TC_NEG_017: Verify partial update of a post with empty request body", async ({ request }) => {

    const id = 10;

    const updatePartialPost = await request.patch(`/posts/${id}`, {
        data: {},
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    expect(updatePartialPost.status()).toBe(400);

})

test("TC_NEG_018: Verify partial update of a post with invalid endpoint", async ({ request }) => {

    const id = 10;
    const body = "Fruits"

    const updatePartialPost = await request.patch(`/postss/${id}`, {
        data: {
            body: body
        },
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    expect(updatePartialPost.status()).toBe(404);

})

test("TC_NEG_019: Verify deleting a post with invalid endpoint", async ({ request }) => {

    const id = 10;

    const deletePost = await request.delete(`/postss/${id}`)

    expect(deletePost.status()).toBe(404);

})

test("TC_NEG_020: Verify deleting a post with invalid id", async ({ request }) => {

    const id = 999;

    const deletePost = await request.delete(`/posts/${id}`)

    expect(deletePost.status()).toBe(404);

})


