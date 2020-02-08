var vm = new Vue({
    el: "#app",
    data: {
        show1: false,
        show2: false,
        show3: false,
        show4:true,
    },
    methods: {
        changeStatus: function (e) {
            // 如果点击了一级菜单的按钮，那么就改变它对应的二级菜单的状态
            if (e == 1) {
                this.show4 = false;
                this.show2 = false;
                this.show3 = false;
                this.show1 = true;
            } else if (e == 2) {
                this.show4 = false;
                this.show1 = false;
                this.show3 = false;
                this.show2 = true;
            } else if (e == 3) {
                this.show4 = false;
                this.show1 = false;
                this.show2 = false;
                this.show3 = true;
            } else {
                this.show2 = false;
                this.show3 = false;
                this.show1 = false;
                this.show4 = true;
            }
        }
    }
}) 