<template>

    <div class="field">
        <label class="label">First Name</label>
        <div class="control">
            <input class="input" v-model="formVal.fname" type="text" placeholder="Ex. John">
        </div>
    </div>

    <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
            <input class="input" v-model="formVal.lname" type="text" placeholder="Ex. Doe">
        </div> 
    </div>

    <div class="field">
        <label class="label">Phone Number</label>
        <div class="control">
            <input class="input" v-model="formVal.phoneNumber" type="tel" placeholder="Ex. 6017891444">
        </div>
        <p class="help is-danger" v-if="numberError">This number is invalid</p>
    </div>

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-link"  @click="submitForm" >Submit</button>
        </div>
        <div class="control">
            <button class="button is-link is-light"  @click="resetForm">Cancel</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "userForm",
    data() {
        return {
            formVal: {
                fname: null,
                lname: null,
                phoneNumber: null,
            },
            numberError: false,
            success: false
        }
    },
    methods: {
        submitForm() {
            console.log(this.formVal.fname)
            console.log(this.formVal.lname)
            console.log(this.formVal.phoneNumber)
            //check for valid phone number
            if (!(/^\d+$/.test(this.formVal.phoneNumber) && this.formVal.phoneNumber.length == 10)){
                this.numberError = true
                return
            }
            //send info to sever
            
            axios.post("http://localhost:6099/maps", this.formVal
            ).then((response)=>{
                console.log(response)

                this.numberError = false
            }).catch((error)=>{
                console.log(error)
            })
            // Reset the form
            this.success = true
            this.resetForm()
        },
        resetForm(){
            this.formVal.fname= null
            this.formVal.lname= null
            this.formVal.phoneNumber= null
        }
    },
}
</script>