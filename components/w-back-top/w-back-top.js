// components/w-back-top/w-back-top.js
Component({
  data:{

  },
  methods: {
    backTop(){
      wx.pageScrollTo({
        duration: 500,
        scrollTop:0
      })
    }
  }
})
