import React, { useEffect, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { getStuffedSchema } from '../lib/util'; 
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { Container } from '@material-ui/core';
export const FormComponent = (props: { uischema: any; schema: any; data: any; open?:boolean, setFormdata:Function, page:number, rowsPerPage:number
}) =>{
  const { uischema, schema, data, open =false, setFormdata, page, rowsPerPage} = props;
  const [stuffedSchema, setStuffedSchema] = useState(schema);
  useEffect(()=>{
    if(schema['dynamic_data']){
      setStuffedSchema(getStuffedSchema(schema, page, rowsPerPage));
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