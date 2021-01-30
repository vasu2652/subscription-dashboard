import React, { useEffect, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { getStuffedSchema } from '../lib/util'; 
//import { generateDefaultUISchema } from '@jsonforms/core';
// const schema = require('../schema/GB-SCHEMA.json')
// const uischema = require('../schema/GB-UISCHEMA.json')
// const data = require('../schema/SI-DATA.json')
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { Container } from '@material-ui/core';
export const FormComponent = (props: { uischema: any; schema: any; data: any; open?:boolean, setFormdata:Function
}) =>{
  const { uischema, schema, data, open =false, setFormdata} = props;
  const [stuffedSchema, setStuffedSchema] = useState(schema);
  useEffect(()=>{
    if(schema['dynamic_data']){
      setStuffedSchema(getStuffedSchema(schema));
    }
  },[schema])
    return (
        <Container style={open?{backgroundColor:"#f5f5f5"}:{}}>
        <JsonForms
          schema={stuffedSchema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setFormdata(data)}
        />
        </Container>
        
    )
}