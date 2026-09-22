export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageUrl?: string;
  category: string;
  emoji?: string;
  apiId?: string;
  stock?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Jellit Original - Neon Pink",
    description: "The OG jelly powder that started it all. Turns any liquid into instant jelly. Perfect for those aesthetic cocktail pics. One packet = 10 jelly shots.",
    price: 12.99,
    image: "🩷",
    category: "Original",
    emoji: "🩷"
  },
  {
    id: 2,
    name: "Jellit Electric Blue",
    description: "Voltage in a packet. This blue jelly powder glows under blacklight. Your party drinks just leveled up. Warning: may cause spontaneous dance moves.",
    price: 14.99,
    image: "💙",
    category: "Original",
    emoji: "💙"
  },
  {
    id: 3,
    name: "Jellit Sunset Orange",
    description: "Main character energy. Capture golden hour vibes in your drinks. Perfect for summer rooftop parties and brunch that hits different.",
    price: 13.99,
    image: "🧡",
    category: "Original",
    emoji: "🧡"
  },
  {
    id: 4,
    name: "Jellit Party Pack - Rainbow",
    description: "All the vibes, none of the commitment. Get 5 colors in one pack. Pink, Blue, Orange, Green, and Purple. Your group chat will be jealous.",
    price: 24.99,
    image: "🌈",
    category: "Bundle",
    emoji: "🌈"
  },
  {
    id: 5,
    name: "Jellit Sour Edition",
    description: "For the ones who like it sour. Same jelly magic with a tangy twist. Perfect for those who think regular is boring. We see you.",
    price: 15.99,
    image: "🍋",
    category: "Special",
    emoji: "🍋"
  },
  {
    id: 6,
    name: "Jellit Zero Sugar",
    description: "Jelly without the guilt. Same texture, zero sugar. Your fitness journey just got more fun. No cap.",
    price: 16.99,
    image: "🥬",
    category: "Special",
    emoji: "🥬"
  },
  {
    id: 7,
    name: "Jellit Mega Size",
    description: "Go big or go home. 50 servings in one pack. For when you're hosting the party of the century. You're welcome.",
    price: 29.99,
    image: "🎉",
    category: "Bundle",
    emoji: "🎉"
  },
  {
    id: 8,
    name: "Jellit Mystery Flavor",
    description: "Gen Z roulette. You don't know what you're getting until you try it. Could be wild cherry, could be something unhinged. Dare to find out?",
    price: 17.99,
    image: "🎭",
    category: "Special",
    emoji: "🎭"
  }
];
