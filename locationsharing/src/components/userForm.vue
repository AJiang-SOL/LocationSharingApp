<template>
  <section>
    <o-field label="First Name" message="">
      <o-input type="text" v-model="formVal.fname"> </o-input>
    </o-field>

    <o-field label="Last Name" variant="success" message="">
      <o-input type="text" v-model="formVal.lname"></o-input>
    </o-field>
    <o-field label="Phone Number">
      <o-input type="text" v-model="formVal.phoneNumber">
      </o-input>
    </o-field>
    <o-field>
      <o-switch v-model="share">Share Location</o-switch>
    </o-field>
    <o-button @click="submitForm">Submit</o-button>
  </section>
</template>

<script>
import axios from 'axios'
import { OField, OInput, OButton, OSwitch } from '@oruga-ui/oruga-next'
import { ref } from 'vue'
export default {
  name: "userForm",
  components: {
    OField,
    OInput,
    OButton,
    OSwitch
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
      numberError: false,
      success: false,
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
      await this.getLocation()
      console.log(this.formVal)
      //check for valid phone number
      if (!(/^\d+$/.test(this.formVal.phoneNumber) && this.formVal.phoneNumber.length == 10)) {
        this.numberError = true
        return
      }
      //send info to sever
      axios.post("http://localhost:6099/maps", this.formVal
      ).then((response) => {
        console.log(response)

        this.numberError = false
      }).catch((error) => {
        console.log(error)
      })
      // Reset the form
      this.success = true
      this.resetForm()
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
        console.log(error)
        this.share = false
      })
      if (position) {
        this.formVal.location.lat = position.coords.latitude
        this.formVal.location.long = position.coords.longitude
      }
    }
  },
}
</script>