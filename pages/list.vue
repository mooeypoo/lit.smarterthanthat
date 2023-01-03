<template>
  <div>
    <li v-for="post of posts" :key="post.slug">
      <NuxtLink :to="post.slug">
        {{ post.title }}
      </NuxtLink>
    </li>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  async asyncData ({ $content }) {
    const posts = await $content('writing').fetch()

    return {
      posts
    }
  }
}
</script>
