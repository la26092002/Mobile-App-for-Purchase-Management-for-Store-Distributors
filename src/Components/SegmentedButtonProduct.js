
import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
export default function SegmentedButtonProduct({setPart}) {
    const [value, setValue] = React.useState('');
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
            value: 1,
            label: 'Produit',
          },
          {
            value: 2,
            label: 'Pack',
          },
          { value: 3, label: 'Category' },
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