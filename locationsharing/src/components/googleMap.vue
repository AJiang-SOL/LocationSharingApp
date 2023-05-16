<template>
    <GoogleMap api-key="AIzaSyBD0dirUoiHMG-LiLDqJ4-ZloDzV1DueKg" style="width: 100%; height: 700px" :center="center"
        :zoom="2">
        <MarkerCluster>
            <Marker v-for="(item, key) in state.allLocation" :options="{ position: item }" :key="key">
                <InfoWindow>
                    {{ state.userInfo[key].fname }}
                    {{ state.userInfo[key].lname }}:
                    {{ state.userInfo[key].address }}
                </InfoWindow>
            </Marker>
        </MarkerCluster>
    </GoogleMap>
    <OTable :data="state.tableData" style="margin-top: 20px;">
        <o-table-column v-for="(column, index) in columns" :key="index" :field="column.field" :label="column.label"
            #default="{ row }">
            {{ row[column.field] }}
        </o-table-column>
    </OTable>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { defineComponent, reactive, ref } from "vue"
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from "vue3-google-map"
import { OTable, OTableColumn } from '@oruga-ui/oruga-next'
export default defineComponent({
    components: { GoogleMap, Marker, MarkerCluster, OTable, OTableColumn, InfoWindow },
    setup() {
        const center = { lat: -28.024, lng: 140.887 }
        const columns = ref([
            {
                field: 'fname',
                label: 'First Name'
            },
            {
                field: 'lname',
                label: 'Last Name'
            }, {
                field: 'number',
                label: 'phone number'
            },
            {
                field: 'address',
                label: 'Address'
            },
        ])
        const state = reactive({
            allLocation: {},
            userInfo: {},
            tableData: []
        });
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:6099/maps')
                state.allLocation = response.data.MARKERDIC;
                state.userInfo = response.data.USERDIC;
                for (const [key, value] of Object.entries(response.data.USERDIC)) {
                    value.number = key;
                    state.tableData.push(value);
                }
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
        console.log(state)
        return { center, state, columns }
    }
})
</script>