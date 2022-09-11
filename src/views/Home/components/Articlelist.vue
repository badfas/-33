<template>
  <div>
    <Articleitem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></Articleitem>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import Articleitem from './ArticleItem.vue'
export default {
  name: 'articlelist',
  components: {
    Articleitem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getFirstArticle()
  },
  methods: {
    async getFirstArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
