<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <v-parallax
      :src="getImageDetails(post).src"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center col-sm-12 col-md-9"
        >
          <v-card
            class="mx-auto"
            outlined
            shaped
            dark
          >
            <v-card-title class="justify-center word-break">
              <span>{{ post.title }}</span>
            </v-card-title>
            <v-card-subtitle
              v-if="post.description"
              class="justify-center"
            >
              {{ post.description }}
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col
                  class="ma-0 pa-0"
                >
                  <v-chip
                    v-for="tag in post.tags"
                    :key="post.slug + tag"
                    class="ma-2 text-capitalize"
                    x-small
                    color="blue"
                    label
                    outlined
                  >
                    {{ tag }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-row
                v-if="post.date"
                class="text-subtitle-2"
              >
                <v-col
                  v-if="post.date"
                  class="pa-1"
                >
                  {{ showDate(post.date) }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row
      v-if="getImageDetails(post).credit"
    >
      <v-col
        class="text-right text-caption"
        v-html="getImageDetails(post).credit"
      />
    </v-row>
    <v-divider
      class="my-5"
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
  },
  methods: {
    showDate (dateStr) {
      const d = new Date(dateStr)
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    getImageDetails (post) {
      // eslint-disable-next-line no-console
      const details = {
        src: post.image
          // Post image
          ? post.image
          // Default image
          : 'assets/fountain-pen-writing.jpg',
        credit: ''
      }

      if (post.image) {
        details.credit = post.image_credit ? post.image_credit : ''
      } else {
        // There's a default image, use credit for default image
        details.credit = '<a href="https://commons.wikimedia.org/wiki/File:Fountain_pen_writing_(literacy).jpg">Petar Milošević</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons'
      }

      return details
    }
  }
}
</script>
