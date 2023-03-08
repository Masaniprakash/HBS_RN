import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CheckBox = ({value}) => {
	const [checked, setChecked] = useState(false);
	return (
		<SafeAreaView style={styles.container}>
			<Checkbox
				// disabled={true}
				value={value}
				status={checked ? 'checked' : 'unchecked'}
				onPress={() => {
					setChecked(!checked);
				}}
				color={'green'}
				uncheckColor={'red'}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		  justifyContent: 'center',
		  alignItems: 'center'
	},
});
export default CheckBox;