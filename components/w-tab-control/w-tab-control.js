// components/w-tab-control/w-tab-control.js
Component({
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },
  data: {
    currentIndex:0
  },
  methods: {
    titleTap(event){
      const index = event.currentTarget.dataset.titleIndex
      this.setData({
        currentIndex:index
      })
      this.triggerEvent("titleTap",{titleIndex:index},{})
    }
  }
})
