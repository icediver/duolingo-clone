import { Create, SimpleForm, TextInput, required } from 'react-admin';

export function CreateCourse() {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="title" validate={[required()]} label="Title" />
				<TextInput source="imageSrc" validate={[required()]} label="imageSrc" />
			</SimpleForm>
		</Create>
	);
}
