export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  time: string;
  emoji: string;
  category: string;
  apiId?: string;
  imageUrl?: string;
  author?: string;
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Jello Shot",
    description: "The timeless classic that never misses. Simple, effective, and gets the job done.",
    ingredients: [
      "1 packet Jellit Original",
      "1 cup boiling water",
      "1 cup vodka",
      "Ice cubes"
    ],
    instructions: [
      "Mix Jellit powder with boiling water until dissolved",
      "Add vodka and stir well",
      "Pour into shot glasses or ice cube trays",
      "Refrigerate for 2-3 hours",
      "Serve cold and enjoy responsibly"
    ],
    difficulty: "Easy",
    time: "3 hours",
    emoji: "🍸",
    category: "Classic"
  },
  {
    id: 2,
    title: "Rainbow Jelly Parfait",
    description: "Instagram-worthy layers that hit different. Perfect for brunch or as a dessert.",
    ingredients: [
      "3 different Jellit colors",
      "Yogurt or cream",
      "Fresh berries",
      "Granola for topping"
    ],
    instructions: [
      "Prepare each Jellit color separately",
      "Let each layer set before adding the next",
      "Alternate jelly and yogurt layers",
      "Top with berries and granola",
      "Chill for 4 hours before serving"
    ],
    difficulty: "Medium",
    time: "5 hours",
    emoji: "🌈",
    category: "Dessert"
  },
  {
    id: 3,
    title: "Spiked Bubble Tea Jelly",
    description: "Bubble tea but make it jelly. Gen Z approved and totally aesthetic.",
    ingredients: [
      "1 packet Jellit Electric Blue",
      "Sweet tea",
      "Rum or tequila",
      "Tapioca pearls",
      "Milk of choice"
    ],
    instructions: [
      "Cook tapioca pearls according to package",
      "Mix Jellit with sweet tea and alcohol",
      "Let set in the fridge",
      "Layer jelly, milk, and pearls in a glass",
      "Add a straw and serve"
    ],
    difficulty: "Medium",
    time: "4 hours",
    emoji: "🧋",
    category: "Fusion"
  },
  {
    id: 4,
    title: "Jelly Cocktail Garnish",
    description: "Elevate your cocktail game with jelly garnishes. It's giving mixologist vibes.",
    ingredients: [
      "Jellit in various colors",
      "Fruit juice",
      "Clear alcohol",
      "Cookie cutters or molds"
    ],
    instructions: [
      "Make thin layers of jelly with different flavors",
      "Once set, cut into shapes with cookie cutters",
      "Use as garnish for any cocktail",
      "Store in fridge until ready to serve",
      "Watch your cocktails become main character energy"
    ],
    difficulty: "Easy",
    time: "3 hours",
    emoji: "🍹",
    category: "Cocktail"
  },
  {
    id: 5,
    title: "Jelly Popsicles",
    description: "Nostalgia meets adulthood. Freeze your jelly into popsicles for a fun twist.",
    ingredients: [
      "2 packets Jellit",
      "Fruit juice or soda",
      "Alcohol (optional)",
      "Popsicle molds"
    ],
    instructions: [
      "Dissolve Jellit in hot liquid",
      "Add alcohol if desired",
      "Pour into popsicle molds",
      "Freeze for 6 hours or overnight",
      "Enjoy frozen jelly goodness"
    ],
    difficulty: "Easy",
    time: "7 hours",
    emoji: "🍦",
    category: "Dessert"
  },
  {
    id: 6,
    title: "Midnight Jelly Punch Bowl",
    description: "The ultimate party centerpiece. A whole bowl of jelly that serves the squad.",
    ingredients: [
      "4 packets Jellit Party Pack",
      "Fruit punch",
      "Champagne or prosecco",
      "Fresh fruit pieces",
      "Edible glitter"
    ],
    instructions: [
      "Mix Jellit with warm fruit punch",
      "Add champagne once slightly cooled",
      "Pour into a decorative bowl",
      "Add fruit pieces and edible glitter",
      "Let set and serve with a ladle"
    ],
    difficulty: "Medium",
    time: "4 hours",
    emoji: "🥂",
    category: "Party"
  }
];
