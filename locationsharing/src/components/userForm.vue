<template>
  <div v-if="showComponent" class="columns is-mobile is-centered">
    <div class=" box column is-half">
      <section>
        <o-field label="First Name" message="">
          <o-input type="text" v-model="formVal.fname"> </o-input>
        </o-field>
        <o-field label="Last Name" message="">
          <o-input type="text" v-model="formVal.lname"></o-input>
        </o-field>
        <o-field label="Phone Number" :message="numberError ? 'Invalid phone number' : ''" :variant="numberError ? 'danger' : ''">
          <o-input type="text" v-model="formVal.phoneNumber">
          </o-input>
        </o-field>
        <o-field>
          <o-switch v-model="share">Share Location</o-switch>
        </o-field>
        <o-button @click="submitForm">Submit</o-button>
      </section>
    </div>
  </div>
  <googleMap v-if="!showComponent"></googleMap>
  <o-loading :full-page="isFullPage" v-model:active="loader" :can-cancel="true">
  </o-loading>
</template>

<script>
import axios from 'axios'
import googleMap from './googleMap.vue'
import { OField, OInput, OButton, OSwitch, OLoading } from '@oruga-ui/oruga-next'
import { ref } from 'vue'
export default {
  name: "userForm",
  components: {
    OField,
    OInput,
    OButton,
    OSwitch,
    OLoading,
    googleMap
  },
  data() {
    return {
      formVal: {
        fname: null,
        lname: null,
        phoneNumber: null,
        location: {
          long: null,
          lat: null
        },
      },
      loader: false,
      numberError: false,
      success: false,
      showComponent: true,
      share: ref(false)
    }
  },
  watch: {
    share(update) {
      if (update === true) {
        this.getLocation()
      }
    }
  },
  methods: {
    async submitForm() {
      //check for valid phone number
      if (this.share === false) {
        return
      }
      if (!(/^\d+$/.test(this.formVal.phoneNumber) && this.formVal.phoneNumber.length == 10)) {
        this.numberError = true
        return
      }
      this.loader = true
      await this.getLocation()
      //send info to sever
      axios.post("http://localhost:6099/maps", this.formVal
      ).then((response) => {
        console.log(response)
        this.showComponent = false
        this.numberError = false
        this.success = true
        this.resetForm()
        this.loader = false
      }).catch((error) => {
        alert(error)
      })
    },
    resetForm() {
      this.formVal.fname = null
      this.formVal.lname = null
      this.formVal.phoneNumber = null
    },
    async getLocation() {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }).catch((error) => {
        alert(error)
      })
      if (position) {
        this.formVal.location.lat = position.coords.latitude
        this.formVal.location.long = position.coords.longitude
      }
    }
  },
}
</script>