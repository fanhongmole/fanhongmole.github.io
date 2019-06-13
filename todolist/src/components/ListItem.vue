<template>
  <div class="listitem" @click="action('set_continue', todo)" :title="todo.time">
    <div :class="type_icon(todo.type)"></div>
    <div class="itemtitle">{{todo.title}}</div>
    <button
      class="btn-com"
      @click="action('toggle_complete', todo.id)"
    >{{is_completed(todo.completed)}}</button>
    <button class="btn-del" @click="action('remove', todo.id)">删除</button>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["todo"],

  data() {
    return {
      icon: [
        {
          icon1: true
        },
        {
          icon2: true
        },
        {
          icon3: true
        },
        {
          icon4: true
        },
      ]
    };
  },

  methods: {
    action(name, param) {
      this.$emit(name, param);
    },

    is_completed(completed) {
      if (completed) return "差点";
      return "完成";
    },

    type_icon(type) {
      return this.icon[type - 1];
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listitem {
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  border-radius: 4px;
}

button {
  position: absolute;
  display: none;
  outline: none;
  border: none;
  bottom: 6px;
  background-color: transparent;
  color: rgb(99, 99, 99);
}

.btn-com {
  left: 16px;
}

.btn-del {
  right: 16px;
}

button,
.listitem {
  cursor: pointer;
}

button:hover {
  color: rgb(32, 32, 32);
}

button:active {
  font-size: 101%;
}

.icon1 {
  background-image: url(../assets/work.png);
}

.icon2 {
  background-image: url(../assets/play.png);
}

.icon3 {
  background-image: url(../assets/relax.png);
}

.icon4 {
  background-image: url(../assets/important.png);
}

.icon1,
.icon2,
.icon3,
.icon4 {
  margin: 10px auto 5px auto;
  width: 50px;
  height: 50px;
  background-size: 100%;
  background-repeat: no-repeat;
}

.listitem:hover {
  background: rgba(0, 0, 0, 0.05);
}

.listitem:hover button {
  display: inline-block;
}
</style>
