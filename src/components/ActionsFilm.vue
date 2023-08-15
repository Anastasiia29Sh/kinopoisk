<template>
  <div class="actions-film">
    <div
      :class="['add-bookmarks', flag['isBookmarks'] ? 'is-bookmarks' : '']"
      @click="addBookmarks()"
    >
      <p></p>
      <button></button>
    </div>
    <div class="estimate">
      <button
        :class="['like', flag['isLike'] ? 'is-like' : '']"
        id="like"
        @click="addLike()"
      ></button>
      <button
        :class="['dislike', flag['isDislike'] ? 'is-dislike' : '']"
        id="dislike"
        @click="addDislike()"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionsFilm",
  props: {
    idFilm: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      masLocalStorage: { bookmarks: [], like: [], dislike: [] },
      flag: { isBookmarks: false, isLike: false, isDislike: false },
    };
  },
  mounted() {
    this.masLocalStorage["bookmarks"] = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    this.masLocalStorage["like"] = JSON.parse(
      localStorage.getItem("like") || "[]"
    );
    this.masLocalStorage["dislike"] = JSON.parse(
      localStorage.getItem("dislike") || "[]"
    );
  },
  watch: {
    idFilm() {
      if (this.masLocalStorage["bookmarks"].includes(this.idFilm))
        this.flag["isBookmarks"] = true;
      if (this.masLocalStorage["like"].includes(this.idFilm))
        this.flag["isLike"] = true;
      if (this.masLocalStorage["dislike"].includes(this.idFilm))
        this.flag["isDislike"] = true;
    },
  },
  methods: {
    addBookmarks() {
      this.saveLocalStorage("bookmarks", "isBookmarks");
    },
    addLike() {
      this.saveLocalStorage("like", "isLike");
    },
    addDislike() {
      this.saveLocalStorage("dislike", "isDislike");
    },

    saveLocalStorage(nameStorage, nameFlag) {
      if (this.masLocalStorage[nameStorage].includes(this.idFilm))
        this.flag[nameFlag] = true;
      if (this.flag[nameFlag]) {
        this.masLocalStorage[nameStorage] = this.masLocalStorage[
          nameStorage
        ].filter((e) => e !== this.idFilm);
        this.flag[nameFlag] = false;
        let but = document.getElementById("like");
        but.disabled = false;
        let but1 = document.getElementById("dislike");
        but1.disabled = false;
      } else {
        this.masLocalStorage[nameStorage].push(this.idFilm);
        this.flag[nameFlag] = true;
        if (nameFlag === "isLike") {
          let but = document.getElementById("dislike");
          but.disabled = true;
        } else if (nameFlag === "isDislike") {
          let but = document.getElementById("like");
          but.disabled = true;
        }
      }
      localStorage.setItem(
        nameStorage,
        JSON.stringify(this.masLocalStorage[nameStorage])
      );
    },
  },
};
</script>


<style scoped lang="scss">
$sm: 576px;
$md: 768px;
$lg: 992px;
$xl: 1200px;
.actions-film {
  display: flex;
  flex-direction: row;
  gap: 15px;
  .add-bookmarks {
    button {
      width: 35px;
      height: 35px;
      background-image: url(../assets/bookmark.svg);
      display: none;
      border: 0px;
      background-repeat: no-repeat;
    }
    cursor: pointer;
    p {
      color: #c7c7c7;
      &::after {
        content: "Добавить в закладки";
      }
      &::before {
        content: "";
        background-image: url(../assets/bookmark.svg);
        background-size: cover;
        height: 25px;
        width: 25px;
        margin-right: 3px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .is-bookmarks {
    button {
      background-image: url(../assets/bookmark2.png);
      background-size: 100%;
    }
    p::after {
      content: "Удалить из закладок";
    }
    p::before {
      background-image: url(../assets/bookmark2.png);
      background-size: 100%;
    }
  }
  .estimate {
    button {
      border: 1px solid #838383;
      width: 35px;
      height: 35px;
      margin-right: 7px;
      background-size: 85%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .like {
      background-image: url(../assets/like.svg);
    }
    .dislike {
      background-image: url(../assets/dislike.svg);
      background-size: 98%;
      background-position-y: -2px;
    }
    .is-like {
      background-image: url(../assets/like1.png);
    }
    .is-dislike {
      background-image: url(../assets/dislike1.png);
    }
  }
}
@media screen and (max-width: $xl) {
  .actions-film {
    .add-bookmarks {
      button {
        display: block;
      }
      p {
        display: none;
      }
    }
  }
}
</style>