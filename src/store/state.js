const state = {
  item: {},
  chara: {},
  quest: {},
  events: {},
  clanbattle: {},
  backendBaseURL: process.env.NODE_ENV === 'production' ? 'https://mahomaho-insight.info/api' : 'http://127.0.0.1:23333/api',
  CDNBaseURL: process.env.NODE_ENV === 'production' ? 'https://mahomaho-insight-cos-1302341499.cos.ap-shanghai.myqcloud.com' : '',
  maxRank: 9,
  maxLevel: 95,
  furthestArea: 11,
  maxUELevel: 100,
  curRank: 0,
  curLevel: 0,
  curAtk: 0,
  equipSelected: [],
  equipSelectedFrom: [],
  equipSelectedTo: [],
  rankFrom: 0,
  rankTo: 0,
  rankColor: {
    1: 'blue',
    2: 'brown',
    3: 'brown',
    4: 'grey darken-1',
    5: 'grey darken-1',
    6: 'grey darken-1',
    7: 'amber darken-2',
    8: 'amber darken-2',
    9: 'amber darken-2'
  },
  difficulties: ['normal', 'hard', 'other'],
  widthThreshold: [300, 600],
  gitcommit: 'unknown',
  mobile: false,
  charaFragByTokens: {
    地下城商店: [31060, 31034, 31006, 31045, 31051, 31010, 31029],
    竞技场商店: [31001, 31004, 31046, 31053, 31011],
    公主竞技场商店: [31016, 31007, 31017, 31012, 31009],
    行会商店: [31025, 31022, 31042, 31043, 31018]
  },
  loaded: false,
  activeProfile: null,
  profile: {},
  lastUpdatedChara: 0
}

export default state
