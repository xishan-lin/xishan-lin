// 文章列表数据
import type { ArticleListItemType } from './ArticleListItemType'
import { ArticleFileSuffix, ArticleType } from './ArticleListItemType'

export const articlesListData: ArticleListItemType[] = [
  {
    id: 1, // 文章id
    title: '陈集旧德祠', // 文章标题
    desc: '本文介绍修建于陈集镇的旧德祠。', // 文章描述
    articleType: ArticleType.ARTICLE, // 文章类型
    createdAt: '2025-05-22', // 创建时间
    updatedAt: '2025-05-22', // 更新时间
    author: '林', // 作者
    category: '祠堂', // 分类
    tags: ['陈集', '旧德祠'], // 标签
    fileSrc: '/articles/article-list/陈集旧德祠.md', // 文件路径
    fileSuffix: ArticleFileSuffix.MD, // 文件类型
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/001.jpg', // 文章头像
  },
  {
    id: 2,
    title: '2025家谱会通知',
    desc: '本文介绍陈集家谱会通知。',
    articleType: ArticleType.INFORM, // 文章类型
    createdAt: '2025-05-22',
    updatedAt: '2025-05-22',
    author: '林',
    category: '家谱会',
    tags: ['陈集', '家谱会'],
    fileSrc: '/articles/inform-list/2025家谱会通知.md',
    fileSuffix: ArticleFileSuffix.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/avatar/lin-1.jpg',
  },
  {
    id: 3,
    title: '陈集天后宫',
    desc: '本文介绍修建于陈集镇的天后宫。',
    articleType: ArticleType.ARTICLE, // 文章类型
    createdAt: '2024-05-22',
    updatedAt: '2025-04-22',
    author: '林',
    category: '祠堂',
    tags: ['陈集', '天后宫'],
    fileSrc: '/articles/article-list/陈集天后宫.md',
    fileSuffix: ArticleFileSuffix.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/002.jpg',
  },
  {
    id: 4,
    title: '林溥',
    desc: '本文介绍林溥生平传记。',
    articleType: ArticleType.ARTICLE, // 文章类型
    createdAt: '2024-05-22',
    updatedAt: '2025-04-22',
    author: '林',
    category: '人物',
    tags: ['林溥'],
    fileSrc: '/articles/article-list/林溥.md',
    fileSuffix: ArticleFileSuffix.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/003.jpg',
  },
  {
    id: 5,
    title: '林述曾',
    desc: '本文介绍林述曾生平传记。',
    articleType: ArticleType.ARTICLE, // 文章类型
    createdAt: '2024-05-22',
    updatedAt: '2025-04-22',
    author: '林',
    category: '人物',
    tags: ['林述曾'],
    fileSrc: '/articles/article-list/林述曾.md',
    fileSuffix: ArticleFileSuffix.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/004.jpg',
  },
  {
    id: 6,
    title: '阮元诗集',
    desc: '本文介绍阮元诗集。',
    articleType: ArticleType.ARTICLE, // 文章类型
    createdAt: '2024-05-22',
    updatedAt: '2025-04-22',
    author: '林',
    category: '诗集',
    tags: ['阮元'],
    fileSrc: '/articles/article-list/阮元诗集-安徽高考作文题.html',
    fileSuffix: ArticleFileSuffix.HTML,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/006.jpg',
  },
  {
    id: 7,
    title: '林苏门',
    desc: '本文介绍林苏门生平传记。',
    articleType: ArticleType.ARTICLE, // 文章类型
    createdAt: '2024-05-22',
    updatedAt: '2025-04-22',
    author: '林',
    category: '人物',
    tags: ['林苏门'],
    fileSrc: '/articles/article-list/林苏门.md',
    fileSuffix: ArticleFileSuffix.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/007.jpg',
  },
  {
    id: 8,
    title: '2021家谱会圆满结束',
    desc: '本文介绍2021家谱会圆满结束。',
    articleType: ArticleType.INFORM, // 文章类型
    createdAt: '2021-10-22',
    updatedAt: '2021-10-23',
    author: '林',
    category: '家谱会',
    tags: ['家谱会'],
    fileSrc: '/articles/inform-list/2021家谱会圆满结束.html',
    fileSuffix: ArticleFileSuffix.HTML,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/family-party/2021/013.jpg',
  },
  {
    id: 9,
    title: '2023家谱会圆满结束',
    desc: '本文介绍2023家谱会圆满结束。',
    articleType: ArticleType.INFORM, // 文章类型
    createdAt: '2023-10-22',
    updatedAt: '2023-10-23',
    author: '林',
    category: '家谱会',
    tags: ['家谱会'],
    fileSrc: '/articles/inform-list/2023家谱会圆满结束.md',
    fileSuffix: ArticleFileSuffix.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/family-party/2023/001.jpeg',
  },
]