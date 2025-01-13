// src/mocks/handlers.js
// mocking api handler

import { BASE_URL } from '@/constants/constant';
import { CategoryApis } from '@/utils/apiUrl';
import { http, HttpResponse, PathParams } from 'msw';

const allPosts = new Map();

// mocking할 api 설정
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),

  http.get('http://example.com/client', () => {
    return HttpResponse.json({
      test: 'success',
    });
  }),

  http.post<PathParams, { id: string; value: string }>('http://example.com/posts', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = await request.json();

    // Push the new post to the map of all posts.
    allPosts.set(newPost.id, newPost);

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newPost, { status: 201 });
  }),

  http.delete('/posts/:id', ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params;

    // Let's attempt to grab the post by its ID.
    const deletedPost = allPosts.get(id);

    // Respond with a "404 Not Found" response if the given
    // post ID does not exist.
    if (!deletedPost) {
      return new HttpResponse(null, { status: 404 });
    }

    // Delete the post from the "allPosts" map.
    allPosts.delete(id);

    // Respond with a "200 OK" response and the deleted post.
    return HttpResponse.json(deletedPost);
  }),

  http.get(`${BASE_URL}${CategoryApis.getCategory}`, () => {
    return HttpResponse.json({
      productCategories: [
        {
          productCategoryId: 1,
          name: '전자제품',
          parentCategoryId: null,
          subCategories: [
            {
              productCategoryId: 2,
              name: '스마트폰',
              parentCategoryId: 1,
              subCategories: [],
            },
            {
              productCategoryId: 3,
              name: '노트북',
              parentCategoryId: 1,
              subCategories: [],
            },
          ],
        },
        {
          productCategoryId: 4,
          name: '가전제품',
          parentCategoryId: null,
          subCategories: [],
        },
      ],
    });
  }),
];
