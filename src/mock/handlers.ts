// src/mocks/handlers.js
// mocking api handler

import { BASE_URL, MOCK_URL } from '@/constants/constant';
import { CategoryApis, ProductApis, BannerApis } from '@/constants/apiUrl';
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

  http.get(`${MOCK_URL}${CategoryApis.getCategory}`, async () => {
    return HttpResponse.json({
      contents: [
        {
          id: 1,
          name: '전자제품',
          parentCategoryId: null,
          subCategories: [
            {
              id: 2,
              name: '스마트폰',
              parentCategoryId: 1,
              subCategories: [],
            },
            {
              id: 3,
              name: '노트북',
              parentCategoryId: 1,
              subCategories: [],
            },
            {
              id: 4,
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

  http.get(`${MOCK_URL}${BannerApis.getBanner}`, async () => {
    return HttpResponse.json([
      {
        id: 1,
        type: 'PRODUCT',
        title: '설 선물세트 사전예약! 특가',
        bannerOrder: 1,
        iconUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
        productBanner: {
          id: 1,
          url: '/products/1',
          linkType: 'INTERNAL',
          image: {
            id: 101,
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png',
            fileOrder: 1,
          },
        },
      },
      {
        id: 2,
        type: 'EVENT',
        title: '여름맞이 특별 프로모션',
        bannerOrder: 2,
        iconUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png',
        productBanner: {
          id: 2,
          url: 'https://external-site.com/event/2',
          linkType: 'EXTERNAL',
          image: {
            id: 102,
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png',
            fileOrder: 1,
          },
        },
      },
      {
        id: 3,
        type: 'PRODUCT',
        title: '봄 신상품 할인전',
        bannerOrder: 3,
        iconUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
        productBanner: {
          id: 3,
          url: '/products/3',
          linkType: 'INTERNAL',
          image: {
            id: 103,
            url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png',
            fileOrder: 2,
          },
        },
      },
    ]);
  }),

  http.get(`${MOCK_URL}${PRODUCT_URL}`, async () => {
    return HttpResponse.json({
      content: [
        {
          productId: 7,
          name: '여성티셔츠',
          description: '겨울 티셔츠',
          price: 3000,
          category: {
            productCategoryId: 8,
            name: '여성 의류',
            parentProductCategoryId: 2,
            subProductCategories: [],
          },
          provider: {
            providerId: 2,
            name: 'FashionWorld',
            description: '모든 사람을 위한 스타일리시한 의류',
          },
          options: [
            {
              id: 1,
              name: '색상',
              optionDetails: [
                {
                  value: '검정',
                  quantity: 50,
                  additionalPrice: 0,
                  fileOrder: 1,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
                },
                {
                  value: '은색',
                  quantity: 30,
                  additionalPrice: 10000,
                  fileOrder: 2,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
                },
              ],
            },
          ],
          rating: 4.8,
        },
        {
          productId: 3,
          name: '러닝화',
          description: '가볍고 편안한 러닝화',
          price: 25000,
          category: {
            productCategoryId: 2,
            name: '패션',
            parentProductCategoryId: null,
            subProductCategories: [
              {
                productCategoryId: 7,
                name: '남성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
              {
                productCategoryId: 8,
                name: '여성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
            ],
          },
          provider: {
            providerId: 2,
            name: 'FashionWorld',
            description: '모든 사람을 위한 스타일리시한 의류',
          },
          options: [
            {
              id: 1,
              name: '색상',
              optionDetails: [
                {
                  value: '검정',
                  quantity: 50,
                  additionalPrice: 0,
                  fileOrder: 1,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png',
                },
                {
                  value: '은색',
                  quantity: 30,
                  additionalPrice: 10000,
                  fileOrder: 2,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png',
                },
              ],
            },
          ],
          rating: 4.9,
        },
        {
          productId: 6,
          name: '스타일리시한 티셔츠',
          description: '트렌디하고 편안한 티셔츠',
          price: 25000,
          category: {
            productCategoryId: 2,
            name: '패션',
            parentProductCategoryId: null,
            subProductCategories: [
              {
                productCategoryId: 7,
                name: '남성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
              {
                productCategoryId: 8,
                name: '여성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
            ],
          },
          provider: {
            providerId: 2,
            name: 'FashionWorld',
            description: '모든 사람을 위한 스타일리시한 의류',
          },
          options: [
            {
              id: 1,
              name: '색상',
              optionDetails: [
                {
                  value: '검정',
                  quantity: 50,
                  additionalPrice: 0,
                  fileOrder: 1,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png',
                },
                {
                  value: '은색',
                  quantity: 30,
                  additionalPrice: 10000,
                  fileOrder: 2,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png',
                },
              ],
            },
          ],
          rating: 4.2,
        },
      ],
    });
  }),

  http.get(`${MOCK_URL}/v1/products/:productId`, ({ params }) => {
    const { productId } = params;
    console.log(productId);

    return HttpResponse.json({
      productId: 7,
      name: '여성티셔츠',
      description: '겨울 티셔츠',
      price: 3000,
      category: {
        productCategoryId: 8,
        name: '여성 의류',
        parentProductCategoryId: 2,
        subProductCategories: [],
      },
      provider: {
        providerId: 2,
        name: 'FashionWorld',
        description: '모든 사람을 위한 스타일리시한 의류',
      },
      options: [
        {
          id: 1,
          name: '색상',
          optionDetails: [
            {
              value: '검정',
              quantity: 50,
              additionalPrice: 0,
              fileOrder: 1,
              url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
            },
            {
              value: '은색',
              quantity: 30,
              additionalPrice: 10000,
              fileOrder: 2,
              url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
            },
          ],
        },
      ],
      rating: 4.8,
    });
  }),

  // 상품 목록 API
  http.get(`${BASE_URL}${ProductApis.getProducts}`, () => {
    return HttpResponse.json({
      content: [
        {
          productId: 7,
          name: '여성티셔츠',
          description: '겨울 티셔츠',
          price: 3000,
          category: {
            productCategoryId: 8,
            name: '여성 의류',
            parentProductCategoryId: 2,
            subProductCategories: [],
          },
          provider: {
            providerId: 2,
            name: 'FashionWorld',
            description: '모든 사람을 위한 스타일리시한 의류',
          },
          options: [
            {
              id: 1,
              name: '색상',
              optionDetails: [
                {
                  value: '검정',
                  quantity: 50,
                  additionalPrice: 0,
                  fileOrder: 1,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
                },
                {
                  value: '은색',
                  quantity: 30,
                  additionalPrice: 10000,
                  fileOrder: 2,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
                },
              ],
            },
          ],
          rating: 4.8,
        },
        {
          productId: 3,
          name: '러닝화',
          description: '가볍고 편안한 러닝화',
          price: 25000,
          category: {
            productCategoryId: 2,
            name: '패션',
            parentProductCategoryId: null,
            subProductCategories: [
              {
                productCategoryId: 7,
                name: '남성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
              {
                productCategoryId: 8,
                name: '여성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
            ],
          },
          provider: {
            providerId: 2,
            name: 'FashionWorld',
            description: '모든 사람을 위한 스타일리시한 의류',
          },
          options: [
            {
              id: 1,
              name: '색상',
              optionDetails: [
                {
                  value: '검정',
                  quantity: 50,
                  additionalPrice: 0,
                  fileOrder: 1,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png',
                },
                {
                  value: '은색',
                  quantity: 30,
                  additionalPrice: 10000,
                  fileOrder: 2,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png',
                },
              ],
            },
          ],
          rating: 4.9,
        },
        {
          productId: 6,
          name: '스타일리시한 티셔츠',
          description: '트렌디하고 편안한 티셔츠',
          price: 25000,
          category: {
            productCategoryId: 2,
            name: '패션',
            parentProductCategoryId: null,
            subProductCategories: [
              {
                productCategoryId: 7,
                name: '남성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
              {
                productCategoryId: 8,
                name: '여성 의류',
                parentProductCategoryId: 2,
                subProductCategories: [],
              },
            ],
          },
          provider: {
            providerId: 2,
            name: 'FashionWorld',
            description: '모든 사람을 위한 스타일리시한 의류',
          },
          options: [
            {
              id: 1,
              name: '색상',
              optionDetails: [
                {
                  value: '검정',
                  quantity: 50,
                  additionalPrice: 0,
                  fileOrder: 1,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png',
                },
                {
                  value: '은색',
                  quantity: 30,
                  additionalPrice: 10000,
                  fileOrder: 2,
                  url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png',
                },
              ],
            },
          ],
          rating: 4.2,
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
