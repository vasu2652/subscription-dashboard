import { mappings, queries } from "../constants";
import * as _ from 'lodash';
export const fetchDetails = async (entity:string) => {
    try {
    const apiResponse = await fetch(`${process.env.APOLLO247_BASEURL!}/graphql`, {
        method: "POST",
        headers: {
          "AUTHORIZATION": process.env.APOLLO247_TOKEN!,
          "mobilenumber": "+918919666249",
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
export const postForm = (entity:string, data:any, action:string)=>{
  try {
    return new Promise(async (resolve,reject)=>{
      fetch(`${process.env.APOLLO247_BASEURL!}/api/dashboard/${entity}`, {
        method: "POST",
        headers: {
          "AUTHORIZATION": process.env.APOLLO247_TOKEN!,
          "mobilenumber": "+919010637524",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res=>res.json()).then(resolve).catch(reject);
    })

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
