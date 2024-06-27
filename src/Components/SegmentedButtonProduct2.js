
import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
export default function SegmentedButtonProduct2({setPart}) {
    const [value, setValue] = React.useState(0);
    useEffect(() => {
      setPart(value)
    }, [value])
    
  return (
    <>
       <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
            {
                value: 0,
                label: 'Les Ventes',
              },
            {
            value: 1,
            label: 'Ajouter une Vente',
          },
        ]}
      />
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
  });