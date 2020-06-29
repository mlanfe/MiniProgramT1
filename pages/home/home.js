import { getHomeMultiData, getHomeGoods} from '../../service/home'
Page({
  data: {
    banners:[],
    recommends:[],
    titles:["流行","新款","精选"],
    goods:{
      pop:{list:[], page:0},
      new:{list:[], page:0},
      sell:{list:[], page:0}
    },
    currentTitle:"pop",
    isShow:false
  },
  onLoad: function () {
    this._getHomeMultiData()
    this._getHomeGoods("pop")
    this._getHomeGoods("new")
    this._getHomeGoods("sell")
  },
  // ------------------与网络请求相关的方法-------------------------
  _getHomeGoods(type){
    const page = this.data.goods[type].page + 1
    getHomeGoods(type,page).then(res => {
      const list = res.data.data.list

      // 不能直接写成: newList = this.data.goods[type].list.push(...list)
      // push返回值是新数组的宽度
      const newList = this.data.goods[type].list
      newList.push(...list)

      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]:newList,
        [pageKey]:page
      })
    })
  },
  _getHomeMultiData(){
    getHomeMultiData().then(res => {
      console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res. data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    }).catch(res => {
      console.log('error'+res)
    })
  },
  // --------------------------监听tabbar的点击--------------------
  titleTap(event){
    const type=["pop","new","sell"]
    const index =event.detail.titleIndex
    this.setData({
      currentTitle:type[index]
    })
  } ,
  // ----------------上拉加载更多----------------------- 
  onReachBottom(){
    console.log("页面滚动到底部");
    this._getHomeGoods(this.data.currentTitle)
  },
  // ----------------监听页面滚动位置--------------------
  onPageScroll(opt){
    const y = opt.scrollTop
    //官方推荐: 不用再滚动函数中频繁调用this.setData()
    const show = (y>=1000)
    if(this.data.isShow != show){
      this.setData({
        isShow: show
      })
    }
  }
})