var item = {
    template: '#item',
    data: function () {
        return {
            title: 'hello item',
            msg: false
        }
    },
    methods: {
        showMsg: function () {
            console.log(this.msg);
            this.msg = !this.msg
        }
    }
}

new Vue({
    el: '#app',
    data: {
        flag: false,
        items: [
                {name: 'Peach', age:15},
                {name: 'Luich', age:18},
                {name: 'Yoshi', age:6}
                ]
        
    },
    components: {
        item: item,
    },
    methods: {
        flagTrigger: function () {
            this.flag = !this.flag;
        }
    }
});