// 文章列表数据
import type { ArticleListItemType } from './ArticleListItemType'
import { ArticleFileType } from './ArticleListItemType'

export const articlesListData: ArticleListItemType[] = [
  {
    id: 1, // 文章id
    title: '文章标题', // 文章标题
    desc: '文章描述', // 文章描述
    createdAt: '2021-01-01', // 创建时间
    updatedAt: '2021-01-01', // 更新时间
    author: '作者1', // 作者
    category: '分类1', // 分类
    tags: ['标签1', '标签2'], // 标签
    fileSrc: '/articles/article-list/demo/test.md', // 文件路径
    fileType: ArticleFileType.MD, // 文件类型
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/001.jpg', // 文章头像
  },
  {
    id: 2,
    title: '文章2',
    desc: '文章2',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    author: '作者2',
    category: '分类2',
    tags: ['标签1', '标签2'],
    fileSrc: '/articles/inform-list/2021家谱会通知.ts',
    fileType: ArticleFileType.HTML,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/002.jpg',
  },
  {
    id: 3,
    title: '文章3',
    desc: '文章3',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    author: '作者3',
    category: '分类3',
    tags: ['标签1', '标签2'],
    fileSrc: '/articles/article-list/demo/test.md',
    fileType: ArticleFileType.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/003.jpg',
  },
  {
    id: 4,
    title: '文章4',
    desc: '文章4',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    author: '作者4',
    category: '分类4',
    tags: ['标签1', '标签2'],
    fileSrc: '/articles/article-list/demo/test.md',
    fileType: ArticleFileType.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/004.jpg',
  },
  {
    id: 5,
    title: '文章5',
    desc: '文章5',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    author: '作者5',
    category: '分类5',
    tags: ['标签1', '标签2'],
    fileSrc: '/articles/article-list/demo/test.md',
    fileType: ArticleFileType.MD,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/005.jpg',
  },
  {
    id: 6,
    title: '文章6',
    desc: '文章6',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    author: '作者6',
    category: '分类6',
    tags: ['标签1', '标签2'],
    fileSrc: '/articles/article-list/阮元诗集.html',
    fileType: ArticleFileType.HTML,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/006.jpg',
  },
  {
    id: 7,
    title: '文章7',
    desc: '文章7',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    author: '作者7',
    category: '分类7',
    tags: ['标签1', '标签2'],
    fileSrc: '/articles/inform-list/demo.html',
    fileType: ArticleFileType.HTML,
    avatar: 'https://cdn.jsdelivr.net/gh/xishan-lin/resourcesRepo@main/image-demos/006.jpg',
  }
]