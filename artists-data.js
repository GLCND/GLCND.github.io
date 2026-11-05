/* 我爱去图书馆 — 歌手与主题数据（首页与「歌手的歌」子页共用）
   ★ 改歌手资料、代表曲目、专辑、主题配色，都在这个文件里，改一次两页同步生效 */
const ARTISTS = [
  {
    id: 'fangdong', num: '01', name: '房东的猫', en: "The Landlord's Cat",
    from: '武汉 / 2013', genre: '民谣 · 双人组合',
    album: '云烟成雨', art: 'assets/art-fangdong-fresh.png', artLabel: '树荫与白裙',
    themeNote: '清新树荫 · 王心怡与吴佩岭官方宣传照',
    coverMode: true,
    kicker: "THE LANDLORD'S CAT · 树荫下的白裙",
    vertical: '云烟成雨',
    heroDesc: '大树底下，白裙、吉他和一整个明亮的下午。<br>她们把那些没说出口的小事，唱得很轻。<br>这一页取官方宣传照里的草绿与天光。',
    theme: { paper: '#EDF4EE', paper2: '#DBEADD', ink: '#20302A', accent: '#4C8060', accent2: '#669E78', heroAccent: '#BFE6C9', muted: '#6F8776', line: 'rgba(32,58,42,.18)', shadeRgb: '22, 52, 38' },
    tags: ['民谣', '校园', '清新'],
    tagline: '两个女孩，把日常唱成一阵很轻的风。',
    bio: '成立于武汉的民谣组合，由主唱王心怡与吉他手吴佩岭组成。一把吉他、干净的和声，写的多是校园、雨天、没说出口的话，和那些小到不值一提却总也忘不掉的瞬间。她们的歌像傍晚六点的光，不刺眼，但一直在。',
    songs: ['云烟成雨', '下一站茶山刘', '秋酿', '美好事物', '你是我最愚蠢的一次浪漫'],
    note: '适合黄昏、公交靠窗的座位，和一点不打算说破的心事。'
  },
  {
    id: 'caodong', num: '02', name: '草东没有派对', en: 'No Party For Cao Dong',
    from: '中国台湾', genre: '独立摇滚 · 后朋',
    album: '丑奴儿', art: 'assets/art-caodong.png', artLabel: '灰绿街巷',
    kicker: 'NO PARTY FOR CAO DONG · 丑奴儿',
    vertical: '丑奴儿',
    heroDesc: '把丧气唱成鼓点，把无力唱成嘶吼。<br>《丑奴儿》里那条灰绿色的街，藏着一代人的困顿。<br>别在情绪太好的时候听。',
    theme: { paper: '#DDE4DC', paper2: '#CBD6CB', ink: '#1D2620', accent: '#455C4A', accent2: '#5C7761', heroAccent: '#A9C7AF' },
    tags: ['摇滚', '金曲奖', '丧与爆发'],
    tagline: '把丧气唱成鼓点，把无力唱成嘶吼。',
    bio: '来自中国台湾的独立摇滚乐队，以粗粝的吉他、忽而压抑忽而炸裂的唱腔，写一代人说不清的困顿。2016 年专辑《丑奴儿》横空出世，2017 年《大风吹》拿下金曲奖年度歌曲，让「草东」成了许多人心里的一个情绪出口。',
    songs: ['大风吹', '山海', '烂泥', '丑', '但'],
    note: '别在情绪太好的时候听，也别在情绪太差的时候听。其余时间随便。'
  },
  {
    id: 'zhaolei', num: '03', name: '赵雷', en: 'Zhao Lei',
    from: '北京', genre: '民谣 · 唱作人',
    album: '吉姆餐厅', art: 'assets/art-jim.png', artLabel: '旧纸手绘封面',
    kicker: 'ZHAO LEI · 吉姆餐厅 / JIM RESTAURANT',
    vertical: '吉姆餐厅',
    heroDesc: '一棵不长叶子的树，几颗红苹果，<br>和一家只在深夜营业的小餐厅。<br>《吉姆餐厅》的旧牛皮纸与墨黑线条，装着回不去的日常。',
    theme: { paper: '#E4D8C6', paper2: '#D2C3AB', ink: '#2C241E', accent: '#A8402A', accent2: '#C05A3C', heroAccent: '#F0DDB4' },
    tags: ['民谣', '旧纸手绘', '少年锦时'],
    tagline: '把日子过成一家只在深夜营业的小餐厅。',
    bio: '北京出生的民谣唱作人，从地下通道、酒吧一路唱到万人场馆。2014 年《吉姆餐厅》用一棵盆栽枯树和几颗红苹果做了封面，里头装的是《少年锦时》《我们的时光》《理想》《三十岁的女人》——都是些具体、朴素、后来才发觉回不去的日子。2017 年一首《成都》，让整条玉林路都成了别人的回忆。',
    songs: ['吉姆餐厅', '少年锦时', '我们的时光', '理想', '三十岁的女人', '成都'],
    note: '吉姆餐厅是他在深夜给自己留的位置。有些歌不用大，够坐两个人就行。',
    coverMode: true
  },
  {
    id: 'stefanie', num: '04', name: '孙燕姿', en: 'Stefanie Sun',
    from: '新加坡 / 2000', genre: '华语流行',
    album: '逆光', art: 'assets/art-stefanie.png', artLabel: '逆光侧脸',
    kicker: 'STEFANIE SUN · 逆光',
    vertical: '逆光',
    heroDesc: '声音里有风，也有不肯低头的骨头。<br>《逆光》里的天蓝与暖白，是往前走时的那道光。<br>每一次副歌，都还有人跟着唱。',
    theme: { paper: '#DEECF4', paper2: '#C9DFEC', ink: '#162A3A', accent: '#356487', accent2: '#48799C', heroAccent: '#8CD6FA' },
    tags: ['华语流行', '清亮声线', '成长'],
    tagline: '声音里有风，也有不肯低头的骨头。',
    bio: '新加坡华语流行歌手，2000 年同名专辑一出道就惊艳乐坛。清亮里带一点颗粒感的嗓音，唱的大多是成长、告别和自我确认。二十多年过去，那些歌依然能在任何一个副歌处被整场人合唱出来。',
    songs: ['遇见', '天黑黑', '我怀念的', '逆光', '开始懂了', '克卜勒', '绿光'],
    note: '《天黑黑》是童年，《逆光》是长大以后。中间隔着一整个青春。'
  },
  {
    id: 'tongyang', num: '05', name: '痛仰乐队', en: 'Miserable Faith',
    from: '北京 / 1999', genre: '中国摇滚 · 公路',
    album: '不要停止我的音乐', art: 'assets/hero-nezha.png', artLabel: '哪吒图腾',
    kicker: 'MISERABLE FAITH · 哪吒 / 愿爱无忧',
    vertical: '痛仰乐队 · 哪吒',
    heroDesc: '从武汉的校园民谣，到华北平原的小号；<br>从哪吒脚下的风火轮，到夜空里最亮的那颗星。<br>这些是我耳机里住了很久的人。',
    theme: { paper: '#F2E8D5', paper2: '#E8DCC4', ink: '#191410', accent: '#C4331F', accent2: '#E04A30', heroAccent: '#EF5740' },
    tags: ['摇滚', '哪吒', '公路之歌'],
    tagline: '愿爱无忧，公路不止。',
    bio: '1999 年成立的中国摇滚老牌乐队，主唱高虎。从早期锋利的硬核说唱，到后来开阔温热的公路摇滚，他们一直在路上。那只不肯低头、脚踏风火轮的哪吒是乐队的精神图腾——也是这个页面默认的主视觉。',
    songs: ['公路之歌', '再见杰克', '为你唱首歌', '愿爱无忧', '不', '西湖'],
    note: '「一直往南方开，一直往南方开。」愿爱无忧，也愿我们始终还有下一站。',
    featured: true, badge: '✦ 默认主视觉 · 哪吒'
  },
  {
    id: 'escape', num: '06', name: '逃跑计划', en: 'Escape Plan',
    from: '北京 / 2005', genre: '英伦摇滚 · 流行摇滚',
    album: '海鸥', art: 'assets/art-haiou.png', artLabel: '海鸥与礁石 · 回到海洋',
    kicker: 'ESCAPE PLAN · 海鸥 / 回到海洋',
    vertical: '海鸥 · 回到海洋',
    heroDesc: '昨夜的潮汐，今晨已褪去。<br>《海鸥》封面上那片番茄红与暖白，是海风再起时的一声呼喊。<br>伤痛会过去，遗憾留下来。',
    theme: { paper: '#F7EBE6', paper2: '#EED5CD', ink: '#3A1512', accent: '#C83227', accent2: '#E25340', heroAccent: '#FFD6C2' },
    tags: ['摇滚', '海边', '释怀'],
    tagline: '但愿那海风再起，海鸥落在那礁石。',
    bio: '成军于北京的摇滚乐队，主唱毛川。明亮的英伦式编曲，配上直白到近乎笨拙的真诚，《夜空中最亮的星》成了一代人的合唱曲。2021 年，离开家乡青岛多年的毛川带着《回到海洋》回到海边，其中《海鸥》用潮汐、礁石与教堂的婚礼，写了一次安静的告别。',
    songs: ['海鸥', '夜空中最亮的星', '一万次悲伤', '梦中的你', '阳光照进回忆里', '再见，再见'],
    note: '「我终于对着大海放声喊出你的名字。」有些遗憾不必圆满，喊出来就够了。',
    wide: true
  },
  {
    id: 'omnipotent', num: '07', name: '万能青年旅店', en: 'Omnipotent Youth Society',
    from: '石家庄', genre: '艺术摇滚 · 独立',
    album: '冀西南林路行', art: 'assets/art-omnipotent.png', artLabel: '华北平原与小号',
    kicker: 'OMNIPOTENT YOUTH SOCIETY · 冀西南林路行',
    vertical: '冀西南林路行',
    heroDesc: '在华北平原的雾里，用小号吹出时代的闷响。<br>《冀西南林路行》的烟尘灰蓝，压得很低。<br>如此生活三十年，直到大厦崩塌。',
    theme: { paper: '#E4E2D7', paper2: '#D2D0C2', ink: '#292A25', accent: '#514233', accent2: '#6A5843', heroAccent: '#D2C8AC' },
    tags: ['摇滚', '小号', '华北平原'],
    tagline: '在华北平原的雾里，用小号吹出时代的闷响。',
    bio: '来自石家庄的摇滚乐队，作品极少，分量却极重。2010 年同名专辑、2020 年《冀西南林路行》，把工业城市的失落、体面与崩塌，写成了带着小号和弦乐的史诗。听他们需要整块时间，不适合随手一划。',
    songs: ['杀死那个石家庄人', '秦皇岛', '十万嬉皮', '不万能的喜剧', '山雀', '采石'],
    note: '「如此生活三十年，直到大厦崩塌。」每次听，还是会在那一句停下来。',
    wide: true
  }
];

/* 同时挂到 window，方便子页在 file:// 下稳定读取 */
window.ARTISTS = ARTISTS;
