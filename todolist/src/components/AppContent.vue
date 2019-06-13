<template>
  <div class="additem">
    <form @submit.prevent="submit">
      <div class="prop">
        <label>主题</label>
        <input
          type="text"
          autocomplete="off"
          v-model="current.title"
          @click="toggle_continue(true)"
        >
      </div>
      <div class="continue" v-show="is_continue">
        <div class="prop">
          <label>备注</label>
          <textarea v-model="current.desc"></textarea>
        </div>
        <div class="prop">
          <label>日期</label>
          <input type="datetime-local" v-model="current.time">
        </div>
        <div class="prop">
          <label>类型</label>
          <br>
          <input type="radio" name="type" value="1" id="work" v-model="current.type" checked>
          <label class="icon"  for="work"><img src="../assets/work.png" title="工作"></label>
          <input type="radio" name="type" value="2" id="play" v-model="current.type">
          <label class="icon" for="play"><img src="../assets/play.png" title="娱乐"></label>
          <input type="radio" name="type" value="3" id="relax" v-model="current.type">
          <label class="icon" for="relax"><img src="../assets/relax.png" title="休息"></label>
          <input type="radio" name="type" value="4" id="important" v-model="current.type">
          <label class="icon" for="important"><img src="../assets/important.png" title="重要事件"></label>
        </div>
        <button type="submit" @click="toggle_continue(false)">确认</button>
      </div>
    </form>
    <div class="task">
      <p v-if="todo_list.length">任务列表</p>
      <ListItem
        :todo="todo"
        v-for="(todo, index) in todo_list"
        :key="index"
        @toggle_complete="toggle_complete"
        @set_continue="set_continue"
        @remove="remove"
      ></ListItem>
      <p v-if="completed_list.length">完成列表</p>
      <ListItem
        :todo="todo"
        v-for="(todo, index) in completed_list"
        :key="'com_'+index"
        @toggle_complete="toggle_complete"
        @set_continue="set_continue"
        @remove="remove"
      ></ListItem>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ListItem from "./ListItem";

export default {
  name: "AppContent",
  components: {
    ListItem
  },
  data() {
    return {
      // todo: {},
      current: {
        id: null,
        title: "",
        desc: "",
        time: "",
        type: null,
        completed: false,
        time_confirmed: false
      },
      list: [],
      last_id: 0,
      is_continue: false
    };
  },
  mounted() {
    this.list = ms.get("list") || this.list;
    this.last_id = ms.get("id") || this.last_id;

    setInterval(() => {
      this.check_time();
    }, 1000);

    // Event.$on('toggle_complete', id => {
    //   this.toggle_complete(id);
    // });

    // Event.$on('set_current', todo => {
    //   this.set_current(todo);
    // });

    // Event.$on('show_detail', id => {
    //   this.show_detail(id);
    // });
  },
  methods: {
    copy(obj) {
      return Object.assign({}, obj);
    },

    find_index(id) {
      return this.list.findIndex(item => {
        return item.id == id;
      });
    },

    reset_current() {
      this.current = this.copy({
        id: null,
        title: "",
        desc: "",
        time: "",
        type: null,
        completed: false,
        time_confirmed: false
      });
    },

    set_current(todo) {
      this.current = this.copy(todo);
    },

    toggle_complete(id) {
      let index = this.find_index(id);
      Vue.set(this.list[index], "completed", !this.list[index].completed);
    },

    submit() {
      let id = this.current.id;
      let title = this.current.title;
      if (id) {
        //如果id存在就更新
        let index = this.find_index(id);
        Vue.set(this.list, index, this.current);
      } else {
        //否则创建一个新的listitem,id++
        if (!title && title !== 0) return;
        var todo = this.copy(this.current);
        this.last_id++;
        todo.id = this.last_id;
        ms.set("id", this.last_id);
        // console.log(todo);
        this.list.push(todo);
      }
      // console.log(this.list);
      this.reset_current();
    },

    remove(id) {
      let index = this.find_index(id);
      this.list.splice(index, 1);
    },

    check_time() {
      this.list.forEach(item => {
        let time = item.time;
        if (!time || item.time_confirmed) return;
        time = new Date(time).getTime();
        let now = new Date().getTime();
        if (now >= time) {
          let confirmed = confirm(item.title);
          Vue.set(item, "time_confirmed", confirmed);
        }
      });
    },

    toggle_continue(boo) {
      this.is_continue = boo;
    },
    // 将要设置的数据放入表单并张开表单
    set_continue(todo) {
      this.set_current(todo);
      this.toggle_continue(true);
    }
  },
  computed: {
    todo_list() {
      return this.list.filter(item => {
        return item.completed == false;
      });
    },
    completed_list() {
      return this.list.filter(item => {
        return item.completed == true;
      });
    }
  },
  watch: {
    list: {
      deep: true,
      handler(n, o) {
        if (n) {
          ms.set("list", n);
        } else {
          ms.set("list", []);
        }
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  padding: 0 10px;
}

input[type="text"],
input[type="datetime-local"],
textarea,
button {
  display: block;
  outline: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

input[type="text"],
input[type="datetime-local"],
textarea {
  width: 100%;
  margin: 8px 0;
  padding: 5px 5px;
}

button {
  background: #fff;
  margin: 16px auto;
  width: 100px;
  height: 50px;
}

input:focus,
textarea:focus {
  border: 1px solid #63c8f7;
}

label {
  font-size: 16px;
}

p {
  padding: 6px 0;
  background: #1212;
}

img {
  width: 30px;
  height: 30px;
  margin: 5px;
}

input[type="radio"] {
  display: none;
}

.icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin: 0 6px;
}

.prop {
  margin: 16px 0;
}

.task {
  margin-top: 36px;
  border: 1px solid #1212;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}

button, .icon {
  cursor: pointer;
}

input[type="radio"]:checked + label {
  background: #1212;
}

button:hover {
  background: rgba(0, 0, 0, 0.04);
}

button:active {
  background: rgba(0, 0, 0, 0.08);
}
</style>
