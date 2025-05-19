export interface Article {
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export const article: Article = {
  title: '示例文章标题22',
  author: '张三',
  createdAt: '2024-06-01T10:00:00Z',
  updatedAt: '2024-06-02T12:00:00Z',
  content: `
    <video controls style="max-width:100%;margin:16px 0;">
      <source src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" type="video/mp4">      
      您的浏览器不支持 video 标签。
    </video>
    
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" style="max-width:100%;margin:16px 0;" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
    `,
};
