import * as React from "react";
import {View, StyleSheet, Button} from "react-native";
import MapView from 'react-native-maps';
import {useRef, useState} from "react"; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapComponent = React.forwardRef<any, any>(({}, ref) => {
  return (
    <View style={styles.container}>
      <MapView
        ref = {ref}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
      </MapView>

    </View>
  )
});

const MapWrapper = () => {
  const mapRef = useRef<MapView | null>();

  const handleZoomIn = () => {
    mapRef.current?.animateToRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    }, 1000);
  }

  const handleZoomOut = () => {
    mapRef.current?.animateToRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 100,
      longitudeDelta: 100,
    }, 1000);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          title="Zoom in"
          onPress={() => handleZoomIn()}
        />
        <Button
          title="Zoom out"
          onPress={() => handleZoomOut()}
        />
      </View>

      <View style={{position: 'relative', maxHeight: 600}}>
        <MapComponent ref={mapRef} />
      </View>
    </View>
  )
}

export default MapWrapper;
