const dummyData = {
  data: {
    products: {
      edges: [
        {
          node: {
            id: 'product0',
            title: 'Slides',
            description: `Simple, minimal and comfortable, these slides feature a classic design 
            in the perfect shade of iron. Whether you're just lounging around the 
            house or running errands, these slides will offer all-day comfort.`,
            featuredImage: {
              id: 'image0',
              url: 'imageUrl0',
            },
            variants: {
              edges: [
                {
                  node: {
                    price: {
                      amount: '25.0',
                      currencyCode: 'CAD',
                    },
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: 'product1',
            title: 'Sweatpants',
            description: `Soft and comfortable sweatpants in stylish shades. They are 
            perfect for lounging with their cozy stretch fabric that offers just the 
            right amount of warmth. Enjoy the ultimate relaxation experience!`,
            featuredImage: {
              id: 'image1',
              url: 'imageUrl1',
            },
            variants: {
              edges: [
                {
                  node: {
                    price: {
                      amount: '35.0',
                      currencyCode: 'CAD',
                    },
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: 'product2',
            title: "Men's T-shirt",
            description: `Crafted from organic cotton, this classic T-shirt features 
            a relaxed fit, crew neckline and timeless look. Enjoy the breathable 
            comfort of 100% organic cotton.`,
            featuredImage: {
              id: 'image2',
              url: 'imageUrl2',
            },
            variants: {
              edges: [
                {
                  node: {
                    price: {
                      amount: '40.0',
                      currencyCode: 'CAD',
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
};

export default dummyData;
