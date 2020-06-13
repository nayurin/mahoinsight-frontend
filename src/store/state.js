const state = {
  item: {},
  chara: {},
  quest: {},
  events: {},
  backendBaseURL: process.env.NODE_ENV === 'production' ? 'https://mahomaho-insight.info/api' : 'http://127.0.0.1:23333/api',
  CDNBaseURL: process.env.NODE_ENV === 'production' ? 'https://mahomaho-insight-cos-1302341499.cos.ap-shanghai.myqcloud.com' : '',
  maxRank: 8,
  maxLevel: 90,
  curRank: 0,
  curLevel: 0,
  rankColor: {
    1: "blue",
    2: "brown",
    3: "brown",
    4: "grey darken-1",
    5: "grey darken-1",
    6: "grey darken-1",
    7: "amber darken-2",
    8: "amber darken-2"
  },
  difficulties: ["normal", "hard", "other"],
  widthThreshold: [300, 600],
  gitcommit: "unknown",
  mobile: false
}

export default state
