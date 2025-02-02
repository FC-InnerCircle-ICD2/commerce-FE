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

  http.get(`${MOCK_URL}/v1/products/:productId`, ({ params }) => {
    const { productId } = params;
    
    // 여기서는 예시로 productId가 '100'일 때의 응답이 작성됨
    if (productId === '100') {
      return HttpResponse.json({
        options: [
          {
            optionDetails: [
              {
                images: [
                  {
                    id: 10,
                    fileOrder: 1,
                    url: "https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png",
                    representative: true
                  }
                ],
                id: 1,
                value: "256GB",
                quantity: 20,
                order: 1,
                additionalPrice: 10000
              },
              {
                images: [
                  {
                    id: 10,
                    fileOrder: 1,
                    url: "https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png",
                    representative: true
                  }
                ],
                id: 2,
                value: "512GB",
                quantity: 10,
                order: 2,
                additionalPrice: 20000
              }
            ],
            id: 1,
            name: "저장용량"
          }
        ],
        id: 100,
        name: "노트북 X1",
        description: "고성능 노트북입니다.",
        price: 1599000,
        category: {
          id: 1,
          name: "전자제품",
          parentCategoryId: null,
          subCategories: [
            {
              id: 2,
              name: "스마트폰",
              parentCategoryId: 1,
              subCategories: []
            },
            {
              id: 3,
              name: "노트북",
              parentCategoryId: 1,
              subCategories: []
            }
          ]
        },
        provider: {
          id: 10,
          name: "ABC 전자",
          description: "전자제품 전문 업체입니다."
        }
      });
    } else {
      // productId가 '100'이 아닌 경우 404 에러 반환
      return HttpResponse.json(
        {
          errorCode: "PRODUCT-0006",
          errorMessage: "해당 상품을 찾을 수 없습니다."
        },
        { status: 404 }
      );
    }
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
