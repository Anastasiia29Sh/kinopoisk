<template>
  <div class="actions-film">
    <div
      :class="['add-bookmarks', flag['isBookmarks'] ? 'is-bookmarks' : '']"
      @click="actBookmarks()"
    >
      <p></p>
      <button></button>
    </div>
    <div class="estimate">
      <button
        :class="['like', flag['isLike'] ? 'is-like' : '']"
        id="like"
        @click="actLikes()"
      ></button>
      <button
        :class="['dislike', flag['isDislike'] ? 'is-dislike' : '']"
        id="dislike"
        @click="actDislikes()"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      flag: { isBookmarks: false, isLike: false, isDislike: false },
    };
  },
  computed: {
    ...mapState({
      allBookmarks: (state) => state.businessLogicBookmarks.bookmarks,
      allLikes: (state) => state.businessLogicLike.like,
      allDislikes: (state) => state.businessLogicDislike.dislike,
    }),
  },
  watch: {
    idFilm() {
      if (this.allBookmarks.includes(this.idFilm))
        this.flag["isBookmarks"] = true;
      if (this.allLikes.includes(this.idFilm)) this.flag["isLike"] = true;
      if (this.allDislikes.includes(this.idFilm)) this.flag["isDislike"] = true;
    },
  },
  methods: {
    ...mapActions({
      addBookmarks: "addBookmarks",
      deleteBookmarks: "deleteBookmarks",
      addLike: "addLike",
      deleteLike: "deleteLike",
      addDislike: "addDislike",
      deleteDislike: "deleteDislike",
    }),
    actBookmarks() {
      if (this.allBookmarks.includes(this.idFilm))
        this.flag["isBookmarks"] = true;
      if (this.flag["isBookmarks"]) {
        this.deleteBookmarks(this.idFilm);
        this.flag["isBookmarks"] = false;
      } else {
        this.addBookmarks(this.idFilm);
        this.flag["isBookmarks"] = true;
      }
    },
    actLikes() {
      if (this.allLikes.includes(this.idFilm)) this.flag["isLike"] = true;
      if (this.flag["isLike"]) {
        this.deleteLike(this.idFilm);
        this.flag["isLike"] = false;
        document.getElementById("like").disabled = false;
        document.getElementById("dislike").disabled = false;
      } else {
        this.addLike(this.idFilm);
        this.flag["isLike"] = true;
        document.getElementById("dislike").disabled = true;
      }
    },
    actDislikes() {
      if (this.allDislikes.includes(this.idFilm)) this.flag["isDislike"] = true;
      if (this.flag["isDislike"]) {
        this.deleteDislike(this.idFilm);
        this.flag["isDislike"] = false;
        document.getElementById("like").disabled = false;
        document.getElementById("dislike").disabled = false;
      } else {
        this.addDislike(this.idFilm);
        this.flag["isDislike"] = true;
        document.getElementById("like").disabled = true;
      }
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