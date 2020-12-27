import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { generateDefaultUISchema } from '@jsonforms/core';
// const schema = require('../schema/GB-SCHEMA.json')
// const uischema = require('../schema/GB-UISCHEMA.json')
// const data = require('../schema/SI-DATA.json')
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { Container } from '@material-ui/core';
export const FormComponent = (props: { uischema: any; schema: any; data: any; open:boolean }) =>{
  const { uischema, schema, data, open} = props;
  if(schema!==null){
    console.log(schema)
    const _uischema = generateDefaultUISchema(schema);
    console.log("****",_uischema)
  }
    return (
        <Container style={open?{backgroundColor:"#f5f5f5"}:{}}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
        />
        </Container>
        
    )
}