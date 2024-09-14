const characters: Character[] = [
  {
    name: "루트",
    portrait: "/portrait/루트.png",
    tokens: [
      {
        img: "/token/루트.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "울프",
    portrait: "/portrait/울프.png",
    tokens: [
      {
        img: "/token/울프.png",
        type: "counter",
        count: 0,
        maxCount: 5
      }
    ]
  },
  {
    name: "비올라",
    portrait: "/portrait/비올라.png",
    tokens: [
      {
        img: "/token/비올라.png",
        type: "counter",
        count: 0,
        maxCount: 3
      }
    ]
  },
  {
    name: "델피",
    portrait: "/portrait/델피.png",
    tokens: [
      {
        img: "/token/델피.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "키스",
    portrait: "/portrait/키스.png",
    tokens: [
      {
        img: "/token/키스.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "니아",
    portrait: "/portrait/니아.png",
    tokens: [
      {
        img: "/token/니아.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "레브",
    portrait: "/portrait/레브.png",
    tokens: [
      {
        img: "/token/레브.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "타오",
    portrait: "/portrait/타오.png",
    tokens: [
      {
        img: "",
        type: "counter",
        count: 0,
        maxCount: 4
      },
      {
        img: "",
        type: "counter",
        count: 0,
        maxCount: 4
      }
    ]
  },
  {
    name: "리타",
    portrait: "/portrait/리타.png",
    tokens: []
  }
];

export interface Token {
  img: string;
  type: "toggle" | "counter";
  toggle?: boolean;
  count?: number;
  maxCount?: number;
}

export interface Character {
  name: "루트" | "울프" | "비올라" | "델피" | "키스" | "니아" | "레브" | "타오" | "리타";
  portrait: string;
  tokens: Token[];
}

export default characters;
