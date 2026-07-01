export interface ProductVariant {
  color: string;
  images: string[];
  stockText: string;
}

export const PRODUCT_VARIANTS: Record<string, ProductVariant[]> = {
  'shop-1': [
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1549064492-6783177e07ca?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 3 items left'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-2': [
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Only 1 item left'
    },
    {
      color: 'Grey',
      images: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-3': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Blue',
      images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 2 items left'
    }
  ],
  'shop-4': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 4 items left'
    }
  ],
  'shop-5': [
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-6': [
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 2 items left'
    }
  ],
  'shop-7': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Crimson',
      images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Only 2 items left'
    },
    {
      color: 'Emerald',
      images: ['https://images.unsplash.com/photo-1618932260643-eee4a2f6c9a6?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-8': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 3 items left'
    }
  ],
  'shop-9': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Blue',
      images: ['https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 5 items left'
    }
  ],
  'shop-10': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 4 items left'
    },
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-11': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Emerald',
      images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Only 2 items left'
    },
    {
      color: 'Crimson',
      images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 3 items left'
    }
  ],
  'shop-12': [
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 4 items left'
    }
  ],
  'shop-13': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Grey',
      images: ['https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 3 items left'
    },
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-14': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Only 2 items left'
    }
  ],
  'shop-15': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 3 items left'
    }
  ],
  'shop-16': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-17': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 2 items left'
    }
  ],
  'shop-18': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Blue',
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 4 items left'
    },
    {
      color: 'Crimson',
      images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-19': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1621570019587-6d385f28661d?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-20': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Emerald',
      images: ['https://images.unsplash.com/photo-1618932260643-eee4a2f6c9a6?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Only 1 item left'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-21': [
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1549064492-6783177e07ca?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 2 items left'
    },
    {
      color: 'Blue',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    }
  ],
  'shop-22': [
    {
      color: 'Beige',
      images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 4 items left'
    }
  ],
  'shop-23': [
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Grey',
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 3 items left'
    }
  ],
  'shop-24': [
    {
      color: 'White',
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'],
      stockText: 'In Stock - Ready to Tailor'
    },
    {
      color: 'Black',
      images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Low Stock - 2 items left'
    },
    {
      color: 'Gold',
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'],
      stockText: 'Only 3 items left'
    }
  ]
};
