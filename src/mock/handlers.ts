// src/mocks/handlers.js
// mocking api handler

import { MOCK_URL } from '@/constants/constant';
import { BannerApis, CategoryApis } from '@/constants/apiUrl';
import { http, HttpResponse, PathParams } from 'msw';
import { PRODUCT_URL } from '@/api/product';

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

  http.get(`${MOCK_URL}${CategoryApis.getCategory}`, () => {
    return HttpResponse.json({
      contents: [
        {
          categoryId: 1,
          name: '전자제품',
          parentCategoryId: null,
          subCategories: [
            {
              categoryId: 2,
              name: '스마트폰',
              parentCategoryId: 1,
              subCategories: [],
            },
            {
              categoryId: 3,
              name: '노트북',
              parentCategoryId: 1,
              subCategories: [],
            },
            {
              categoryId: 4,
              name: '가전제품',
              parentCategoryId: null,
              subCategories: [],
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

  http.get(`${MOCK_URL}${BannerApis.getBanner}`, () => {
    return HttpResponse.json([
      {
        id: 1,
        type: 'PRODUCT',
        title: '설 선물세트 사전예약! 특가',
        bannerOrder: 1,
        iconUrl: 'https://your-s3-bucket.s3.amazonaws.com/images/banners/1/icons/new_year.png',
        productBanner: {
          id: 1,
          url: '/products/1',
          linkType: 'INTERNAL',
          image: {
            id: 101,
            url: 'https://your-s3-bucket.s3.amazonaws.com/images/banners/1/product/photo1.jpg',
            fileOrder: 1,
          },
        },
      },
      {
        id: 2,
        type: 'EVENT',
        title: '여름맞이 특별 프로모션',
        bannerOrder: 2,
        iconUrl: 'https://your-s3-bucket.s3.amazonaws.com/images/banners/2/icons/summer_promo.png',
        productBanner: {
          id: 2,
          url: 'https://external-site.com/event/2',
          linkType: 'EXTERNAL',
          image: {
            id: 102,
            url: 'https://your-s3-bucket.s3.amazonaws.com/images/banners/2/product/photo2.jpg',
            fileOrder: 1,
          },
        },
      },
      {
        id: 3,
        type: 'PRODUCT',
        title: '봄 신상품 할인전',
        bannerOrder: 3,
        iconUrl: 'https://your-s3-bucket.s3.amazonaws.com/images/banners/3/icons/spring_sale.png',
        productBanner: {
          id: 3,
          url: '/products/3',
          linkType: 'INTERNAL',
          image: {
            id: 103,
            url: 'https://your-s3-bucket.s3.amazonaws.com/images/banners/3/product/photo3.jpg',
            fileOrder: 2,
          },
        },
      },
    ]);
  }),

  http.get(`${MOCK_URL}${PRODUCT_URL}`, () => {
    return HttpResponse.json({
      productes: [
        {
          productId: 100,
          name: '피카츄',
          description: '피카츄',
          price: 999,
          productCategory: {
            productCategoryId: 2,
            name: '스마트폰',
            parentCategoryId: 1,
            subCategories: [],
          },
          provider: {
            providerId: 10,
            name: '김지훈',
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
              url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
              fileOrder: 1,
              isRepresentative: true,
            },
          ],
        },
        {
          productId: 101,
          name: '피츄',
          description: '피츄',
          price: 50505,
          productCategory: {
            productCategoryId: 2,
            name: '스마트폰',
            parentCategoryId: 1,
            subCategories: [],
          },
          provider: {
            providerId: 10,
            name: '김지훈',
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
              url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png',
              fileOrder: 1,
              isRepresentative: true,
            },
          ],
        },
        {
          productId: 102,
          name: '에몽가',
          description: '에몽가',
          price: 50505,
          productCategory: {
            productCategoryId: 2,
            name: '스마트폰',
            parentCategoryId: 1,
            subCategories: [],
          },
          provider: {
            providerId: 10,
            name: '김지훈',
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
              url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/587.png',
              fileOrder: 1,
              isRepresentative: true,
            },
          ],
        },
      ],
    });
  }),
];
