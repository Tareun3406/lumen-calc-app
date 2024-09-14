const characters: Character[] = [
  {
    name: "루트",
    portrait: "/portrait/root.png",
    tokens: [
      {
        img: "/token/root.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "울프",
    portrait: "/portrait/wolf.png",
    tokens: [
      {
        img: "/token/wolf.png",
        type: "counter",
        count: 0,
        maxCount: 5
      }
    ]
  },
  {
    name: "비올라",
    portrait: "/portrait/viola.png",
    tokens: [
      {
        img: "/token/viola.png",
        type: "counter",
        count: 0,
        maxCount: 3
      }
    ]
  },
  {
    name: "델피",
    portrait: "/portrait/delphi.png",
    tokens: [
      {
        img: "/token/delphi.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "키스",
    portrait: "/portrait/kiss.png",
    tokens: [
      {
        img: "/token/kiss.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "니아",
    portrait: "/portrait/nia.png",
    tokens: [
      {
        img: "/token/nia.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "레브",
    portrait: "/portrait/rev.png",
    tokens: [
      {
        img: "/token/rev.png",
        type: "toggle",
        toggle: false
      }
    ]
  },
  {
    name: "타오",
    portrait: "/portrait/tao.png",
    tokens: [
      {
        img: "/token/tao1.png",
        type: "counter",
        count: 0,
        maxCount: 4
      },
      {
        img: "/token/tao2.png",
        type: "counter",
        count: 0,
        maxCount: 4
      }
    ]
  },
  {
    name: "리타",
    portrait: "/portrait/lita.png",
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
