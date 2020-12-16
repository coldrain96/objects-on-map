<template>
  <div class="map">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      style="height: 100%"
      data-projection="EPSG:4326"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      >
      </vl-view>

      <vl-interaction-select
        :features.sync="selectedFeatures"
      >
        <template slot-scope="select">
          <vl-style-box>
            <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
            <vl-style-fill color="red"></vl-style-fill>
            <vl-style-circle :radius="5">
              <vl-style-stroke color="red" :width="7"></vl-style-stroke>
              <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
            </vl-style-circle>
          </vl-style-box>

          <vl-overlay
            class="feature-popup"
            v-for="feature in select.features"
            :key="feature.id"
            :id="feature.id"
            :position="pointOnSurface(feature.geometry)"
            :auto-pan="true"
            :auto-pan-animation="{ duration: 300 }"
          >
            <template slot-scope="popup">
              <b-card
              >
                <b-card-text>
                  lat: {{ popup.position[1].toFixed(6) }} <br/>
                  lon: {{ popup.position[0].toFixed(6) }}
                </b-card-text>
              </b-card>
            </template>
          </vl-overlay>
        </template>
      </vl-interaction-select>

      <template v-for="object in GET_MAP_OBJECTS">
        <vl-feature :key="object.id">
          <vl-geom-point :coordinates="[object.lon, object.lat]"></vl-geom-point>
        </vl-feature>
      </template>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { findPointOnSurface } from 'vuelayers/lib/ol-ext'

  export default {
    data() {
      return {
        zoom: 12,
        center: [37.617298, 55.755825],
        rotation: 0,
        selectedFeatures: [],
        selectedPoint: [],
      }
    },
    methods: {
      ...mapActions([
        'INIT_FIND_MAP_OBJECT_BY_COORDINATES'
      ]),
      pointOnSurface(point) {
        return findPointOnSurface(point)
      },
    },
    computed: {
      ...mapGetters([
        'GET_MAP_OBJECTS',
        'GET_SELECTED_MAP_OBJECT'
      ]),
    }
  }
</script>

<style lang="scss">
  .map {
    width: 100%;
    height: 100%;
  }
</style>
