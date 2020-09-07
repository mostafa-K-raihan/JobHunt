import React from 'react'
import { Form, Col } from 'react-bootstrap';

export default function JobSearchForm({ params, onChangeParams }) {
	return (
		<Form>
			<Form.Row className="align-items-end">
				<Form.Group as={Col}>
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" name="description" value={params.description} onChange={onChangeParams}></Form.Control>
				</Form.Group>

				<Form.Group as={Col}>
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" name="location" value={params.location} onChange={onChangeParams}></Form.Control>
				</Form.Group>

				<Form.Group as={Col} xs="auto" className="ml-2">
					<Form.Check className="mb-2" type="checkbox" value={params.full_time} name="full_time" id="full_time" label="Only Full time" onChange={onChangeParams}></Form.Check>
				</Form.Group>
			</Form.Row>
		</Form>
	)
}
