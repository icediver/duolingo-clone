import {
	BooleanInput,
	Edit,
	ReferenceInput,
	SimpleForm,
	TextInput,
	required,
} from 'react-admin';

export function UpdateChallengeOption() {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="text" validate={[required()]} label="Text" />
				<BooleanInput
					source="correct"
					validate={[required()]}
					label="Correct option"
				/>
				<ReferenceInput source="challengeId" reference="challenges" />
				<TextInput
					source="imageSrc"
					validate={[required()]}
					label="Image URL"
				/>

				<TextInput
					source="audioSrc"
					validate={[required()]}
					label="Audio URL"
				/>
			</SimpleForm>
		</Edit>
	);
}
