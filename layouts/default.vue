<template>
  <v-app
    id="main-app"
    :dark="$vuetify.theme.dark"
  >
    <v-app-bar
      app
      :dark="$vuetify.theme.dark"
      fixed
      :color="$vuetify.theme.dark ? '#002f54' : '#2196f3'"
    >
      <v-avatar
        size="36px"
        class="mr-5"
        @click="$router.push({ path: '/' })"
      >
        <img
          alt="Moriel Schottlender"
          src="~/assets/images/moriel.jpg"
        >
      </v-avatar>
      <v-toolbar-title>
        Litmoo's Test
      </v-toolbar-title>

      <v-spacer />
      <v-switch
        v-model="$vuetify.theme.dark"
        color="blue"
        inset
        hide-details
        :dark="$vuetify.theme.dark"
        :append-icon="$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
      />

      <template
        v-if="$store.state.post"
        #extension
      >
        <v-row>
          <v-col
            align="center"
          >
            <v-toolbar-title>
              {{ $store.state.post.title }}
            </v-toolbar-title>
          </v-col>
        </v-row>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'IndexPage',
  head () {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  },
  watch: {
    $route (to) {
      if (to.name !== 'slug') {
        this.$store.commit('unsetPost')
      }
    }
  }
}
</script>

<style>
.v-card__title {
  /* Override card titles */
  word-break: break-word !important;
}
</style>
