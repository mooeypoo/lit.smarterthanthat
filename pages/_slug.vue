<template>
  <div>
    <v-parallax
      :src="post.image"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <v-card
            class="mx-auto"
            outlined
            shaped
            max-width="70%"
            dark
          >
            <v-card-title class="justify-center word-break">
              <span>{{ post.title }}</span>
            </v-card-title>
            <v-card-subtitle class="justify-center">
              {{ post.description }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-parallax>
    <v-chip
      v-for="tag in post.tags"
      :key="post.slug + tag"
      class="mt-2 mr-2"
      color="primary"
    >
      {{ tag }}
    </v-chip>
    <v-divider
      class="my-2"
    />
    <nuxt-content :document="post" />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error, store }) {
    let post
    try {
      post = await $content('writing', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({ message: 'Post not found' })
    }

    if (post) {
      try {
        store.commit('setPost', post)
      } catch (e) {
        error({ message: e.message })
      }
    }

    return {
      post
    }
  }
}
</script>
