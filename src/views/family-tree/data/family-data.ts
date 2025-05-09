export const familyData = [
  {
    id: 100001,
    name: '祖父',
    formerName: '祖父',
    avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
    specialChar: '甲', // 排行字
    isAlive: true, // 是否健在
    rank: '长子', // 排行
    place: '江苏南京', // 出生地
    bornDate: '1900-01-01', // 出生日期
    deathDate: '1980-01-01', // 死亡日期
    desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
    spouse: {
      id: 100002,
      name: '祖母',
      formerName: '祖母',
      avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
      isAlive: true, // 是否健在
      place: '江苏南京', // 出生地
      bornDate: '1900-01-01', // 出生日期
      deathDate: '1980-01-01', // 死亡日期
      desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机' // 描述
    },
    children: [
      {
        id: 100002,
        name: '父亲',
        formerName: '父亲',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
        specialChar: '乙', // 排行字
        isAlive: true, // 是否健在
        rank: '次子', // 排行
        place: '江苏南京', // 出生地
        bornDate: '1920-01-01', // 出生日期
        deathDate: '1990-01-01', // 死亡日期
        desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
        children: [
          { id: 3, name: '我' },
          { id: 4, name: '妹妹' }
        ]
      },
      {
        id: 100003,
        name: '叔叔',
        formerName: '叔叔',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
        specialChar: '丙', // 排行字
        isAlive: true, // 是否健在
        rank: '三子', // 排行
        place: '江苏南京', // 出生地
        bornDate: '1920-01-01', // 出生日期
        deathDate: '1990-01-01', // 死亡日期
        desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
        children: [{ id: 6, name: '堂弟' }]
      },
      {
        id: 100004,
        name: '姑姑',
        formerName: '姑姑',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
        specialChar: '丁', // 排行字
        isAlive: true, // 是否健在
        rank: '四子', // 排行
        place: '江苏南京', // 出生地
        bornDate: '1920-01-01', // 出生日期
        deathDate: '1990-01-01', // 死亡日期
        desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
        children: [
          { id: 8, name: '表姐' },
          { id: 9, name: '表弟' }
        ]
      }
    ]
  },
  {
    id: 100005,
    name: '外祖父',
    formerName: '外祖父',
    avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
    specialChar: '戊', // 排行字
    isAlive: true, // 是否健在
    rank: '长子', // 排行
    place: '江苏南京', // 出生地
    bornDate: '1900-01-01', // 出生日期
    deathDate: '1980-01-01', // 死亡日期
    desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
    children: [
      {
        id: 100006,
        name: '舅舅',
        formerName: '舅舅',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
        specialChar: '己', // 排行字
        isAlive: true, // 是否健在
        rank: '次子', // 排行
        place: '江苏南京', // 出生地
        bornDate: '1920-01-01', // 出生日期
        deathDate: '1990-01-01', // 死亡日期
        desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
        children: [{ id: 12, name: '表妹' }]
      },
      {
        id: 100007,
        name: '母亲',
        formerName: '母亲',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png', // 头像
        specialChar: '庚', // 排行字
        isAlive: true, // 是否健在
        rank: '三子', // 排行
        place: '江苏南京', // 出生地
        bornDate: '1920-01-01', // 出生日期
        deathDate: '1990-01-01', // 死亡日期
        desc: '杰卡斯都看见了撒接口里数据库快捷方式发多少手动封口机', // 描述
        children: [
          { id: 14, name: '我' },
          { id: 15, name: '妹妹' }
        ]
      }
    ]
  }
  // ...Array.from({ length: 100 }, (_, i) => ({
  //   id: 16 + i,
  //   name: `祖父${i + 2}`,
  //   bornDate: '1900-01-01',
  //   deathDate: '1980-01-01'
  // }))
]
