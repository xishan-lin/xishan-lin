// 文章后缀
export enum ArticleFileSuffix {
  MD = 'md',
  HTML = 'html',
}

// 文章类型
export enum ArticleType {
  INFORM = 'inform', // 通知类
  ARTICLE = 'article', // 文章类
}

export interface ArticleListItemType {
  id: number; // 文章id
  title: string; // 文章标题
  desc: string; // 文章描述
  articleType: ArticleType; // 文章类型
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
  author: string; // 作者
  category: string; // 分类
  tags: string[]; // 标签
  fileSrc: string; // 文件路径
  fileSuffix: ArticleFileSuffix; // 文件后缀
  avatar: string; // 文章头像
} 