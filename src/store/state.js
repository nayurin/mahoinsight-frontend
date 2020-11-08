// inject props [maxRank / maxLevel / maxUELevel /furthestArea / rankColor / charaFragByTokens] from cached/config.json for flexable configures
const state = {
  events: {},
  database: {},
  backendBaseURL: process.env.NODE_ENV === 'production' ? 'https://mahomaho-insight.info/api' : 'http://127.0.0.1:23333/api',
  CDNBaseURL: process.env.NODE_ENV === 'production' ? 'https://mahomaho-insight-cos-1302341499.cos.ap-shanghai.myqcloud.com' : '',
  curRank: 0,
  curLevel: 0,
  curAtk: {},
  equipSelected: [],
  difficulties: ['normal', 'hard', 'other'],
  widthThreshold: [300, 600],
  gitcommit: 'unknown',
  mobile: false,
  loaded: false,
  activeProfile: null,
  profile: {},
  lastUpdatedChara: 0,
  ngFlag: false,
  context: {}
}

export default state
