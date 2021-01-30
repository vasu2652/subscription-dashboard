import { mappings, queries } from "../constants";
import * as _ from 'lodash';
export const fetchDetails = async (entity:string) => {
    try {
    const apiResponse = await fetch('https://aph-staging-api.apollo247.com/graphql', {
        method: "POST",
        headers: {
          "AUTHORIZATION": "Bearer 3d1833da7020e0602165529446587434",
          "mobilenumber": "+919010637524",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query : queries[entity]
        })
      });
      const { data } = await apiResponse.json();
      const { response } = data[mappings[entity]['response']];
      return Promise.resolve(response)
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}
export const getStuffedSchema = (schema:any)=>{
    const { dynamic_data } = schema;
    Object.keys(dynamic_data).forEach(async (key:string)=>{
      switch(dynamic_data[key].type){
        case "enum":{
          const { meta:{ entity, params, path }} = dynamic_data[key];
          const response = await fetchDetails(entity);
          const values = response.map((val: { [x: string]: any; })=>{
            return val[params];
          });
          _.set(schema,`${path}.enum`,values);
        }
      }
    })
    return schema;
  }