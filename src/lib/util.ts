import { QueryMetaMapper, QueryDefinations } from "../constants";
import * as _ from 'lodash';

export const fetchDetails = async (query:string, pageNumber?:number, rowsPerPage?:number,pattern?:string) => {
    try {
      const getVariables = (query?:string) => {
        if(query==="get_subscription_count_by_status" || (pageNumber && rowsPerPage)!){
          return {};
        }

        const skip = rowsPerPage! * pageNumber!;
        const take = rowsPerPage!;
        return pattern?{ skip, take, pattern }: { skip, take }
      }
      
    const apiResponse = await fetch(`https://aph-staging-api.apollo247.com/graphql`, {
        method: "POST",
        headers: {
          "AUTHORIZATION": 'Bearer 3d1833da7020e0602165529446587434',
          "mobilenumber": "+918919666249",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query : QueryDefinations[query],
          variables:{
            ...getVariables()
          }
        })
      });
      const { data } = await apiResponse.json();
      const { response, count=0 } = data[QueryMetaMapper[query]['response']];
      return Promise.resolve({
        response,
        count
      })
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export const postForm = (entity:string, data:any)=>{
  try {
    const query = `mutation DashboardGenericUpsertEntity($entity:String!, $data:JSON!){
      DashboardGenericUpsertEntity(entity:$entity, data:$data)
    }`;
    return new Promise(async (resolve,reject)=>{
      fetch(`https://aph-staging-api.apollo247.com/graphql`, {
        method: "POST",
        headers: {
          "AUTHORIZATION": 'Bearer 3d1833da7020e0602165529446587434',
          "mobilenumber": "+919010637524",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          variables:{
            entity,
            data
          }
        })
      }).then(res=>res.json()).then(resolve).catch(reject);
    })
  } catch (error) {
      console.error(error.toString());
      return Promise.reject(error);
  }
}

export const getStuffedSchema = (schema:any)=>{
    const { dynamic_data } = schema;
    Object.keys(dynamic_data).forEach(async (key:string)=>{
      switch(dynamic_data[key].type){
        case "enum":{
          const { meta:{ entity, params, path }} = dynamic_data[key];
          const {response} = await fetchDetails(entity);
          const values = response.map((val: { [x: string]: any; })=>{
            return val[params];
          });
          _.set(schema,`${path}.enum`,values);
        }
      }
    })
    return schema;
}

