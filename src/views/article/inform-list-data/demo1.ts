export interface Article {
  title: string
  author: string
  createdAt: string
  updatedAt: string
  content: string
}

export const article: Article = {
  title: '示例文章标题11',
  author: '张三',
  createdAt: '2024-06-01',
  updatedAt: '2024-06-02',
  content: `
    <video controls style="display: block; width: 80%; max-width: 800px; min-width: 400px; height: 300px; margin:16px auto;">
      <source src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" type="video/mp4">      
      您的浏览器不支持 video 标签。
    </video>
    
    <iframe
      src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1"
      style="display: block; width: 80%; max-width: 800px; min-width: 400px; height: 300px; margin: 16px auto;"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true">
    </iframe>
    `
}
