<template>
  <div>
    <li v-for="post of posts" :key="post.slug">
      <NuxtLink :to="getSlug(post.slug)">
        {{ post.title }}
      </NuxtLink>
    </li>
  </div>
</template>

<script>
export default {
  name: 'WritingPage',
  async asyncData ({ $content }) {
    const posts = await $content('writing').fetch()

    return {
      posts
    }
  },
  methods: {
    getSlug: (slug) => {
      return '/' + slug
    }
  }
}
</script>
