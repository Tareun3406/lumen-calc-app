const characters: readonly Character[] = Object.freeze([
  {
    name: "세츠메이",
    portrait: "/portrait/setz.png",
    hp: {
      maxHp: 3000,
      hpHand: [
        [1500, 9],
        [2000, 8],
        [2500, 7],
        [3000, 6],
      ]
    },
    tokens: [
      {
        name: "훈련 부대",
        img: "/token/setz.png",
        type: "TOGGLE",
        toggle: false,
        description: "루멘 페이즈 시 상대보다 체력이 적다면 [연습] 1장을 루멘 존에 배치할 수 있다. (최대 1장)"
      },
      {
        name: "신속",
        img: "/token/fast.png",
        type: "TOGGLE",
        toggle: false,
        description: "자신의 모든 기술 속도가 1 빨라진다. 수비 기술 사용 시 사이드 덱에 돌아간다."
      },
      {
        name: "정확",
        img: "/token/accurate.png",
        type: "TOGGLE",
        toggle: false,
        description: "자신의 모든 기술 데미지 + 100, 수비 기술 사용 시 사이드 덱에 돌아간다."
      }
    ]
  },
  {
    name: "루트",
    portrait: "/portrait/root.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "차지",
        img: "/token/root.png",
        type: "TOGGLE",
        toggle: false,
        description: "[차지] 공격기술만 레디 가능, 해당 기술은 2 느려지고 데미지가 200 증가한다."
      }
    ]
  },
  {
    name: "울프",
    portrait: "/portrait/wolf.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "하울링",
        img: "/token/wolf.png",
        type: "COUNTER",
        toggle: false,
        count: 0,
        maxCount: 5,
        toggleCount: 5,
        description:
          "하울링 카운터가 5 소모하고 위압 발동 가능. 위압시 자신은 공격기술만 레디 가능하며 상대는 수비기술만 레디할 수 있다."
      }
    ]
  },
  {
    name: "비올라",
    portrait: "/portrait/viola.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "은연",
        img: "/token/viola.png",
        type: "COUNTER",
        toggle: false,
        count: 0,
        maxCount: 3,
        toggleCount: 1,
        description: "콤보시 은연카운터를 3 소모하여 원하는 속도로 사용 가능하다."
      }
    ]
  },
  {
    name: "델피",
    portrait: "/portrait/delphi.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "다운 스탠스",
        img: "/token/delphi.png",
        type: "TOGGLE",
        toggle: false,
        description: "[다운 스탠스] 효과가 없는 기술 사용시 1 느려진다."
      }
    ]
  },
  {
    name: "키스",
    portrait: "/portrait/kiss.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "예고",
        img: "/token/kiss.png",
        type: "TOGGLE",
        toggle: false,
        description:
          "[예고장]이 루멘존을 벗어날 경우 [예고] 상태가 해제된다. [예고장] 브레이크시 -2fp 및 사이드덱 1장 브레이크"
      }
    ]
  },
  {
    name: "니아",
    portrait: "/portrait/nia.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "오버리밋",
        img: "/token/nia.png",
        type: "TOGGLE",
        toggle: false,
        description:
          "[오버리밋] 모든 니아 공격 데미지 +100, 리커버리 페이즈시 루멘존 니아 기술 1장 브레이크 또는 패,리스트에서 2장 루멘존으로 이동"
      }
    ]
  },
  {
    name: "레브",
    portrait: "/portrait/rev.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "암야",
        img: "/token/rev.png",
        type: "TOGGLE",
        toggle: false,
        description:
          "상쇄시 자신이 데미지를 주었다면 추가로 100 데미지 주고 [암야] 상태가 된다. [암야] 상대 특수판정 제거"
      },
      {
        name: "단검",
        img: "/token/dagger.png",
        type: "COUNTER",
        count: 0,
        maxCount: 6,
        description: "콤보시 [단검] 토큰을 모두 브레이크할 수 있다. 그 후 토큰 3장당 200 데미지"
      }
    ]
  },
  {
    name: "타오",
    portrait: "/portrait/tao.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6],
      ]
    },
    tokens: [
      {
        name: "조화",
        img: "/token/harmony.png",
        type: "TOGGLE",
        toggle: false,
        description:
          "음, 양 카운터가 모두 최대일때 [조화] 상태가 되며 어느 한쪽이 3 미만이 될경우 [조화] 상태가 해제된다."
      },
      {
        name: "음",
        img: "/token/yin.png",
        type: "COUNTER",
        count: 0,
        maxCount: 4,
        description: "히트시 +1FP, [조화] 루멘페이즈시 +1FP"
      },
      {
        name: "양",
        img: "/token/yang.png",
        type: "COUNTER",
        count: 0,
        maxCount: 4,
        description: "타오 기술 카운터시 +100 데미지, [조화] 타오 기술 데미지 +100"
      }
    ]
  },
  {
    name: "리타",
    portrait: "/portrait/lita.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [1000, 10],
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6]
      ]
    },
    tokens: [
      {
        name: "레기온",
        img: "/token/lita.png",
        type: "TOGGLE",
        toggle: false,
        description: "자신에게 [성녀] 부여, 루멘 페이즈 시 하나의 레기온을 축복한다."
      },
      {
        name: "축복-가디언",
        img: "/token/guardian.png",
        type: "TOGGLE",
        toggle: false,
        description: "[가디언] 방어 및 상쇄 시 +2FP"
      },
      {
        name: "축복-어쌔신",
        img: "/token/assassin.png",
        type: "TOGGLE",
        toggle: false,
        description: "[어쌔신] 카운터시 추가로 100 데미지"
      },
      {
        name: "축복-팔라딘",
        img: "/token/paladin.png",
        type: "TOGGLE",
        toggle: false,
        description: "[팔라딘] 콤보 시 리스트에서 기술 1장 획득"
      },
      {
        name: "빛의 루멘",
        img: "/token/lita-effect.png",
        type: "TOGGLE",
        toggle: false,
        description:
          "체력 1000 이하 발동 가능. 모든 레기온의 축복 효과 적용, 모든 받는 데미지 -100, [성녀] 효과 기술 데미지 +100"
      }
    ]
  },
  {
    name: "린",
    portrait: "/portrait/lin.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6]
      ]
    },
    tokens: [
      {
        name: "불씨",
        img: "/token/ember.png",
        type: "COUNTER",
        toggle: false,
        count: 0,
        maxCount: 1000,
        toggleCount: 1,
        description:
          "자신의 [린] 기술이 브레이크 될 때마다 불씨 카운터 +1"
      }
    ]
  },
  {
    name: "요한",
    portrait: "/portrait/joan.png",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6]
      ]
    },
    tokens: [
      {
        name: "예지",
        img: "/token/coin.png",
        type: "COUNTER",
        toggle: false,
        count: 2,
        maxCount: 3,
        toggleCount: 1,
        description:
          "루멘 페이즈 시 -1 하고 [서드아이] 발동가능, 이번턴 상대는 무작위 한장을 공개 및 유지하고 먼저 레디해야한다. 체력이 2000 이하가 될경우 +1"
      },
      {
        name: "디제스터 원",
        img: "/token/disaster-one.png",
        type: "TOGGLE",
        toggle: false,
        description:
          "판도라 박스의 효과로 활성화."
      }
    ]
  },
  {
    name: "선택없음",
    portrait: "",
    hp: {
      maxHp: 5000,
      hpHand: [
        [2000, 9],
        [3000, 8],
        [4000, 7],
        [5000, 6]
      ]
    },
    tokens: [
    ]
  }
]);

export interface Token {
  name: string;
  img: string;
  type: "TOGGLE" | "COUNTER";
  toggle?: boolean;
  count?: number;
  maxCount?: number;
  toggleCount?: number;
  description: string;
}

export interface Character {
  name: "세츠메이" | "루트" | "울프" | "비올라" | "델피" | "키스" | "니아" | "레브" | "타오" | "리타" | "린" | "요한" | "선택없음";
  portrait: string;
  hp: {
    maxHp: number;
    hpHand: [number, number][]
  }
  tokens: Token[];
}

export default characters;
