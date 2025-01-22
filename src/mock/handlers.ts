// src/mocks/handlers.js
// mocking api handler

import { BASE_URL } from '@/constants/constant';
import { CategoryApis, ProductApis } from '@/constants/apiUrl';
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

  // 상품 목록 API
  http.get(`${BASE_URL}${ProductApis.getProducts}`, () => {
    return HttpResponse.json({
      contents: [
        {
          productId: 100,
          name: '스마트폰',
          description: '최신 모델의 스마트폰입니다.',
          price: 10000,
          category: {
            categoryId: 2,
            name: '스마트폰',
            parentCategoryId: 1,
            subCategories: [],
          },
          provider: {
            providerId: 10,
            name: 'ABC 전자',
            description: '전자제품 전문 업체입니다.',
          },
          options: [
            {
              id: 1,
              name: 'Color',
              value: 'Black',
              quantity: 50,
              optionOrder: 1,
              sellPrice: 1000,
            },
          ],
          images: [
            {
              id: 10,
              url: 'https://your-s3-bucket.s3.amazonaws.com/images/products/100/photo1.jpg',
              fileOrder: 1,
              isRepresentative: true,
            },
          ],
        },
        {
          productId: 101,
          name: '노트북',
          description: '고성능 노트북입니다.',
          category: {
            categoryId: 3,
            name: '노트북',
            parentCategoryId: 1,
            subCategories: [],
          },
          provider: {
            providerId: 10,
            name: 'ABC 전자',
            description: '전자제품 전문 업체입니다.',
          },
          options: [
            {
              id: 2,
              name: 'Storage',
              value: '256GB',
              quantity: 30,
              optionOrder: 2,
              sellPrice: 1500,
            },
          ],
          images: [
            {
              id: 11,
              url: 'https://your-s3-bucket.s3.amazonaws.com/images/products/101/photo1.jpg',
              fileOrder: 1,
              isRepresentative: true,
            },
          ],
        },
      ],
      page: {
        size: 10,
        number: 0,
        totalElements: 0,
        totalPages: 0,
      },
    });
  }),
];
