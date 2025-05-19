import{d as c,b as n,c as d,r as p,o as u,g as _,l as e,t as a,f as m}from"./index-B-TCadFN.js";import{_ as h}from"./_plugin-vue_export-helper-DlAUqK2U.js";const v={class:"article-detail"},f={class:"title"},b={class:"meta"},g={class:"author"},y={class:"date"},x={class:"date"},D=["innerHTML"],A=c({__name:"ArticleDetail",setup(B){const i=n(),r=d(()=>Number(i.params.id)),t=p({title:"示例文章标题",author:"张三",createdAt:"2024-06-01T10:00:00Z",updatedAt:"2024-06-02T12:00:00Z",content:`
    <video controls style="max-width:100%;margin:16px 0;">
      <source src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" type="video/mp4">      
      您的浏览器不支持 video 标签。
    </video>
    
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1GWojYDEo3&page=1" style="max-width:100%;margin:16px 0;" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
    
    `});function o(s){return new Date(s).toLocaleString()}return u(()=>{console.log("id.value =====> ",r.value)}),(s,l)=>(m(),_("div",v,[e("h1",f,a(t.value.title),1),e("div",b,[e("span",g,"作者："+a(t.value.author),1),e("span",y,"发布时间："+a(o(t.value.createdAt)),1),e("span",x,"更新时间："+a(o(t.value.updatedAt)),1)]),e("div",{class:"content",innerHTML:t.value.content},null,8,D)]))}}),E=h(A,[["__scopeId","data-v-7b8e3e76"]]);export{E as default};
