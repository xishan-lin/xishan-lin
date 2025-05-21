export enum ArticleFileType {
  MD = 'markdown',
  HTML = 'html',
}

export interface ArticleListItemType {
  id: number; // 文章id
  title: string; // 文章标题
  desc: string; // 文章描述
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
  author: string; // 作者
  category: string; // 分类
  tags: string[]; // 标签
  fileSrc: string; // 文件路径
  fileType: ArticleFileType; // 文件类型
  avatar: string; // 文章头像
} 