import React, { useState } from 'react';
import { View, Image } from 'react-native';

const placeholder = require('./assets/placeholder.png');

export default function LazyImage({ source, style, resizeMode = 'contain' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {!loaded && (
        <Image
          source={placeholder}
          style={[style, { position: 'absolute' }]}
          resizeMode={resizeMode}
        />
      )}
      <Image
        source={source}
        style={style}
        onLoad={() => setLoaded(true)}
        resizeMode={resizeMode}
      />
    </View>
  );
}
